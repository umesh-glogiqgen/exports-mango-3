import io
import os
import re
import sys
import fitz
from PIL import Image
import numpy as np

pdf_path = r"C:\Users\HP\.gemini\antigravity\brain\fcd54348-f752-43f4-a506-603905b4317a\.user_uploaded\media_1794145549808_65b94215.pdf"
out_dir = r"c:\Users\HP\Downloads\mongop\public\products"
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)


def get_page_image(pno):
  page = doc[pno]
  imgs = page.get_images()
  img_xref = max(imgs, key=lambda x: x[2] * x[3])[0]
  return Image.open(io.BytesIO(doc.extract_image(img_xref)["image"]))


# Ensure cover is saved
cover_img = get_page_image(0)
cover_img.save(os.path.join(out_dir, "catalogue-cover.jpg"), quality=95)
print("Cover saved.")


def slugify(text):
  text = text.lower()
  text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
  return text


from extract_all import PAGE_DEFINITIONS


def clean_crop_cell(cell_img, prod_name, is_large_page):
  arr = np.array(cell_img)
  h, w, c = arr.shape

  # Sample background from borders
  bg_samples = np.concatenate([
      arr[:15, :15].reshape(-1, 3),
      arr[:15, -15:].reshape(-1, 3),
      arr[-15:, :15].reshape(-1, 3),
      arr[-15:, -15:].reshape(-1, 3),
  ])
  bg_color = np.median(bg_samples, axis=0)

  # Color difference from background
  diff = np.max(np.abs(arr.astype(float) - bg_color), axis=-1)
  mask = diff > 20

  # Vertical profile: fraction of non-bg pixels in each row
  v_profile = np.mean(mask, axis=1)

  # Text is in upper 40% of cell
  search_start = max(10, int(h * 0.08))
  search_end = int(h * 0.42)

  # Smooth profile
  kernel_size = 5
  smoothed = np.convolve(v_profile, np.ones(kernel_size) / kernel_size, mode="same")

  # Find local minimum between text peak and product
  min_val = 1.0
  valley_y = search_start
  for y in range(search_start, search_end):
    if smoothed[y] <= min_val:
      min_val = smoothed[y]
      valley_y = y

  # Advance past the empty gap
  prod_y_start = valley_y
  while prod_y_start < int(h * 0.55) and smoothed[prod_y_start] < 0.025:
    prod_y_start += 1

  # Now find bottom of product
  prod_y_end = h - 1
  while prod_y_end > prod_y_start and smoothed[prod_y_end] < 0.02:
    prod_y_end -= 1

  # Horizontal extent
  if prod_y_end > prod_y_start + 10:
    prod_mask = mask[prod_y_start : prod_y_end + 1, :]
    h_profile = np.mean(prod_mask, axis=0)
    col_has_content = np.where(h_profile > 0.015)[0]
    if len(col_has_content) > 0:
      prod_x_start = max(0, col_has_content.min() - 8)
      prod_x_end = min(w, col_has_content.max() + 8)
    else:
      prod_x_start, prod_x_end = 0, w
  else:
    prod_x_start, prod_x_end = 0, w

  # Slight vertical padding
  prod_y_start = max(valley_y, prod_y_start - 4)
  prod_y_end = min(h, prod_y_end + 6)

  crop = cell_img.crop((prod_x_start, prod_y_start, prod_x_end, prod_y_end))
  cw, ch = crop.size

  # Border pixels background
  c_arr = np.array(crop)
  b_pixels = np.concatenate(
      [c_arr[0, :], c_arr[-1, :], c_arr[:, 0], c_arr[:, -1]]
  )
  crop_bg = tuple(np.median(b_pixels, axis=0).astype(int))

  # Create square canvas with generous, elegant margin
  margin = max(32, int(max(cw, ch) * 0.10))
  dim = max(cw, ch) + margin * 2
  sq = Image.new("RGB", (dim, dim), color=crop_bg)
  sq.paste(crop, ((dim - cw) // 2, (dim - ch) // 2))

  # Resize to standard crisp web size
  target_size = 500 if is_large_page else 400
  final_img = sq.resize((target_size, target_size), Image.Resampling.LANCZOS)
  return final_img


extracted_count = 0
seen_slugs = []

for page_def in PAGE_DEFINITIONS:
  pno = page_def["page_num"]
  cat_id = page_def["cat_id"]
  layout = page_def["layout"]

  img = get_page_image(pno)
  w, h = img.size
  is_large = w > 1000

  cat_dir = os.path.join(out_dir, cat_id)
  os.makedirs(cat_dir, exist_ok=True)

  if is_large:
    banner_bottom = 360
    footer_top = 1620
    left_margin = 60
    right_margin = 1284
  else:
    banner_bottom = 205
    footer_top = 920
    left_margin = 35
    right_margin = 712

  total_rows = len(layout)
  row_height = (footer_top - banner_bottom) / total_rows
  total_width = right_margin - left_margin

  for r_idx, row in enumerate(layout):
    row_y1 = banner_bottom + r_idx * row_height
    row_y2 = banner_bottom + (r_idx + 1) * row_height
    num_cols = len(row)

    is_centered = num_cols == 1 and total_rows > 1

    if is_centered:
      if cat_id == "01-mangoes":
        # On Page 1 (Mangoes), Dried Mango is in the LEFT COLUMN (Col 0), NOT centered!
        col_width = total_width / 2
        x1 = left_margin
        x2 = left_margin + col_width
      elif total_rows == 4 and r_idx == 3:  # Bamboo
        col_width = total_width / 3
        center_x = (left_margin + right_margin) / 2
        x1 = center_x - col_width / 2
        x2 = center_x + col_width / 2
      elif total_rows == 3 and r_idx == 2 and cat_id in [
          "04-coriander-mint",
          "07-tamarind-products",
      ]:
        col_width = total_width / 3
        center_x = (left_margin + right_margin) / 2
        x1 = center_x - col_width / 2
        x2 = center_x + col_width / 2
      else:
        col_width = total_width / 2
        center_x = (left_margin + right_margin) / 2
        x1 = center_x - col_width / 2
        x2 = center_x + col_width / 2

      prod_name = row[0]
      prod_slug = slugify(prod_name)
      if prod_slug in seen_slugs:
        cat_prefix = cat_id.split("-")[0]
        prod_slug_unique = f"{prod_slug}-{cat_prefix}"
      else:
        prod_slug_unique = prod_slug
      seen_slugs.append(prod_slug)

      cell = img.crop((int(x1), int(row_y1), int(x2), int(row_y2)))
      clean_img = clean_crop_cell(cell, prod_name, is_large)

      img_filename = f"{prod_slug_unique}.jpg"
      clean_img.save(os.path.join(cat_dir, img_filename), quality=94)
      extracted_count += 1
    else:
      col_width = total_width / num_cols
      for c_idx, prod_name in enumerate(row):
        x1 = left_margin + c_idx * col_width
        x2 = left_margin + (c_idx + 1) * col_width

        prod_slug = slugify(prod_name)
        if prod_slug in seen_slugs:
          cat_prefix = cat_id.split("-")[0]
          prod_slug_unique = f"{prod_slug}-{cat_prefix}"
        else:
          prod_slug_unique = prod_slug
        seen_slugs.append(prod_slug)

        cell = img.crop((int(x1), int(row_y1), int(x2), int(row_y2)))
        clean_img = clean_crop_cell(cell, prod_name, is_large)

        img_filename = f"{prod_slug_unique}.jpg"
        clean_img.save(os.path.join(cat_dir, img_filename), quality=94)
        extracted_count += 1

print(
    f"\nSUCCESS: Extracted and cleaned {extracted_count} products across"
    f" {len(PAGE_DEFINITIONS)} categories."
)
