import os
import io
import fitz
from PIL import Image

pdf_path = r'C:\Users\HP\.gemini\antigravity\brain\fcd54348-f752-43f4-a506-603905b4317a\.user_uploaded\media_1794145549808_65b94215.pdf'
out_dir = r'c:\Users\HP\Downloads\mongop\public\products'
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)

def get_page_image(pno):
    page = doc[pno]
    imgs = page.get_images()
    img_xref = max(imgs, key=lambda x: x[2] * x[3])[0]
    return Image.open(io.BytesIO(doc.extract_image(img_xref)['image']))

# Save cover image
cover_img = get_page_image(0)
cover_img.save(os.path.join(out_dir, 'catalogue-cover.jpg'), quality=95)
print('Cover saved.')

PAGE_DEFINITIONS = [
    {
        'page_num': 1,
        'cat_id': '01-mangoes',
        'cat_name': '01. Mangoes',
        'layout': [
            ['Banganapalli Mango', 'Alphonso Mango'],
            ['Neelam Mango', 'Mango Pulp'],
            ['Dried Mango']
        ]
    },
    {
        'page_num': 2,
        'cat_id': '02-fresh-fruits',
        'cat_name': '02. Fresh Fruits',
        'layout': [
            ['Pomegranate', 'Watermelon'],
            ['Custard Apple', 'Banana'],
            ['Papaya', 'Guava'],
            ['Grapes', 'Sapota']
        ]
    },
    {
        'page_num': 3,
        'cat_id': '03-fresh-vegetables',
        'cat_name': '03. Fresh Vegetables',
        'layout': [
            ['Brinjal', 'Drumstick', 'Lady Finger (Okra)', 'Green Beans'],
            ['Cauliflower', 'Carrot', 'Cucumber', 'Bitter Gourd'],
            ['Bottle Gourd', 'Ridge Gourd', 'Green Peas', 'Capsicum']
        ]
    },
    {
        'page_num': 4,
        'cat_id': '04-coriander-mint',
        'cat_name': '04. Coriander & Mint',
        'layout': [
            ['Fresh Coriander Leaves', 'Fresh Mint Leaves', 'Dried Coriander Leaves'],
            ['Dried Mint Leaves', 'Coriander Powder', 'Mint Powder'],
            ['Coriander Seeds'] # centered
        ]
    },
    {
        'page_num': 5,
        'cat_id': '05-turmeric-products',
        'cat_name': '05. Turmeric Products',
        'layout': [
            ['Raw Turmeric', 'Dry Turmeric Fingers'],
            ['Turmeric Powder', 'Turmeric Extract']
        ]
    },
    {
        'page_num': 6,
        'cat_id': '06-chilli-products',
        'cat_name': '06. Chilli Products',
        'layout': [
            ['Fresh Green Chilli', 'Fresh Red Chilli'],
            ['Dry Red Chilli', 'Guntur Sannam Chilli'],
            ['Teja Chilli', 'Chilli Powder'],
            ['Chilli Flakes', 'Chilli Paste']
        ]
    },
    {
        'page_num': 7,
        'cat_id': '07-tamarind-products',
        'cat_name': '07. Tamarind Products',
        'layout': [
            ['Raw Tamarind', 'Seedless Tamarind', 'Tamarind with Seeds'],
            ['Tamarind Pulp', 'Tamarind Paste', 'Tamarind Slabs'],
            ['Tamarind Seeds'] # centered
        ]
    },
    {
        'page_num': 8,
        'cat_id': '08-moringa-products',
        'cat_name': '08. Moringa Products',
        'layout': [
            ['Fresh Moringa Leaves', 'Dried Moringa Leaves'],
            ['Moringa Leaf Powder', 'Moringa Drumsticks / Pods'],
            ['Moringa Seeds'] # centered
        ]
    },
    {
        'page_num': 9,
        'cat_id': '09-herbal-products',
        'cat_name': '09. Herbal Products',
        'layout': [
            ['Neem Leaves', 'Neem Powder', 'Neem Seeds'],
            ['Aloe Vera', 'Aloe Vera Powder', 'Tulsi Leaves'],
            ['Tulsi Powder', 'Amla', 'Amla Powder']
        ]
    },
    {
        'page_num': 10,
        'cat_id': '10-tomato-products',
        'cat_name': '10. Tomato Products',
        'layout': [
            ['Fresh Tomatoes', 'Cherry Tomatoes'],
            ['Tomato Paste', 'Tomato Sauce'],
            ['Tomato Ketchup', 'Tomato Powder'],
            ['Dried Tomatoes', 'Tomato Flakes']
        ]
    },
    {
        'page_num': 11,
        'cat_id': '11-lemon-products',
        'cat_name': '11. Lemon Products',
        'layout': [
            ['Fresh Lemon', 'Yellow Lemon'],
            ['Green Lemon', 'Lemon Juice'],
            ['Lemon Concentrate', 'Dried Lemon']
        ]
    },
    {
        'page_num': 12,
        'cat_id': '12-millets',
        'cat_name': '12. Millets',
        'layout': [
            ['Finger Millet (Ragi)', 'Foxtail Millet', 'Little Millet'],
            ['Kodo Millet', 'Barnyard Millet', 'Proso Millet'],
            ['Millet Flour', 'Millet Rice', 'Millet Flakes']
        ]
    },
    {
        'page_num': 13,
        'cat_id': '13-onion-products',
        'cat_name': '13. Onion Products',
        'layout': [
            ['Fresh Red Onion', 'Shallots'],
            ['Dehydrated Onion', 'Onion Flakes'],
            ['Onion Powder', 'Onion Paste']
        ]
    },
    {
        'page_num': 14,
        'cat_id': '14-garlic-ginger',
        'cat_name': '14. Garlic & Ginger',
        'layout': [
            ['Fresh Garlic', 'Peeled Garlic', 'Dried Garlic'],
            ['Garlic Powder', 'Garlic Paste', 'Fresh Ginger'],
            ['Dried Ginger', 'Ginger Powder', 'Ginger Paste']
        ]
    },
    {
        'page_num': 15,
        'cat_id': '15-dehydrated-ingredients',
        'cat_name': '15. Dehydrated Ingredients',
        'layout': [
            ['Dehydrated Onion', 'Dehydrated Garlic'],
            ['Dehydrated Ginger', 'Dehydrated Tomato'],
            ['Dehydrated Carrot', 'Dehydrated Beetroot']
        ]
    },
    {
        'page_num': 16,
        'cat_id': '16-bamboo-products',
        'cat_name': '16. Bamboo Products',
        'layout': [
            ['Bamboo Plates', 'Bamboo Cups', 'Bamboo Water Bottles'],
            ['Bamboo Straws', 'Bamboo Cutlery', 'Bamboo Bowls'],
            ['Bamboo Trays', 'Bamboo Toothbrushes', 'Bamboo Containers'],
            ['Bamboo Kitchen Products'] # centered
        ]
    },
    {
        'page_num': 17,
        'cat_id': '17-packaging-solutions',
        'cat_name': '17. Packaging Solutions',
        'layout': [
            ['Jute Bags', 'Paper Pouches', 'Corrugated Boxes'],
            ['Paper Bags', 'Biodegradable Clamshells', 'Packaging Tapes'],
            ['Glass Jars', 'PET Bottles', 'Metal Tins'],
            ['Foil Bags', 'Wrapping Papers', 'Biodegradable Fillers']
        ]
    },
    {
        'page_num': 18,
        'cat_id': '18-medical-supplies',
        'cat_name': '18. Medical Supplies',
        'layout': [
            ['Surgical Gloves', 'Disposable Face Masks', 'Surgical Gowns'],
            ['Disposable Caps', 'Medical Shoe Covers', 'Syringes'],
            ['IV Sets', 'Bandages', 'Medical Gauze'],
            ['Surgical Dressings', 'Disposable Medical Kits', 'Medical Consumables']
        ]
    },
    {
        'page_num': 19,
        'cat_id': '20-other-agricultural-products',
        'cat_name': '20. Other Agricultural Products',
        'layout': [
            ['Groundnuts', 'Sesame Seeds', 'Sunflower Seeds'],
            ['Castor Seeds', 'Coconut', 'Copra'],
            ['Jaggery', 'Sugarcane Products', 'Pulses'],
            ['Beans', 'Green Gram', 'Black Gram'],
            ['Red Gram', 'Chickpeas', 'Horse Gram']
        ]
    },
    {
        'page_num': 20,
        'cat_id': '21-spices-and-seasonings',
        'cat_name': '21. Spices and Seasonings',
        'layout': [
            ['Black Pepper', 'Green Cardamom', 'Cloves'],
            ['Cinnamon', 'Star Anise', 'Cumin Seeds'],
            ['Coriander Seeds', 'Turmeric Fingers', 'Red Chilli Powder'],
            ['Mustard Seeds', 'Fenugreek Seeds', 'Fennel Seeds'],
            ['Bay Leaves', 'Nutmeg', 'Mace']
        ]
    },
    {
        'page_num': 21,
        'cat_id': '21-rice-grains',
        'cat_name': '21. Rice & Grains',
        'layout': [
            ['Basmati Rice', 'Sona Masoori Rice'],
            ['Black Rice', 'Brown Rice'],
            ['Red Rice'] # centered
        ]
    },
    {
        'page_num': 22,
        'cat_id': '22-pulses-legumes',
        'cat_name': '22. Pulses & Legumes',
        'layout': [
            ['Toor Dal', 'Moong Dal', 'Urad Dal'],
            ['Chana Dal', 'Masoor Dal', 'Whole Green Gram'],
            ['Black Gram', 'Chickpeas', 'Kabuli Chana'],
            ['Kidney Beans', 'Cowpeas', 'Horse Gram']
        ]
    }
]

import re
def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text).strip('-')
    return text

extracted_count = 0
catalog_data = []

for page_def in PAGE_DEFINITIONS:
    pno = page_def['page_num']
    cat_id = page_def['cat_id']
    cat_name = page_def['cat_name']
    layout = page_def['layout']
    
    img = get_page_image(pno)
    w, h = img.size
    
    cat_dir = os.path.join(out_dir, cat_id)
    os.makedirs(cat_dir, exist_ok=True)
    
    # Calculate margins
    if w > 1000:
        # 1344 x 1800 pages
        banner_bottom = 350
        footer_top = 1650
        left_margin = 60
        right_margin = 1284
    else:
        # 747 x 1000 pages
        banner_bottom = 200
        footer_top = 940
        left_margin = 35
        right_margin = 712
        
    total_rows = len(layout)
    row_height = (footer_top - banner_bottom) / total_rows
    total_width = right_margin - left_margin
    
    for r_idx, row in enumerate(layout):
        row_y1 = banner_bottom + r_idx * row_height
        row_y2 = banner_bottom + (r_idx + 1) * row_height
        num_cols = len(row)
        
        # Check if single item centered on a page designed for 2 or 3 cols
        is_centered = (num_cols == 1 and total_rows > 1)
        
        if is_centered:
            # Determine expected column width for centered item
            if total_rows == 4 and r_idx == 3: # Bamboo 10 items (3 cols x 3 rows + 1)
                col_width = total_width / 3
            elif total_rows == 3 and r_idx == 2 and cat_id in ['04-coriander-mint', '07-tamarind-products']: # 3 cols
                col_width = total_width / 3
            else: # 2 cols (Moringa, Mangoes, Rice)
                col_width = total_width / 2
                
            center_x = (left_margin + right_margin) / 2
            x1 = center_x - col_width / 2
            x2 = center_x + col_width / 2
            
            prod_name = row[0]
            prod_slug = slugify(prod_name)
            crop_box = (int(x1), int(row_y1), int(x2), int(row_y2))
            cropped = img.crop(crop_box)
            
            img_filename = f'{prod_slug}.jpg'
            img_rel_path = f'/products/{cat_id}/{img_filename}'
            cropped.save(os.path.join(cat_dir, img_filename), quality=92)
            extracted_count += 1
            
            catalog_data.append({
                'id': f'{cat_id}-{prod_slug}',
                'name': prod_name,
                'slug': prod_slug,
                'categoryId': cat_id,
                'categoryName': cat_name,
                'image': img_rel_path,
                'page': pno + 1
            })
        else:
            col_width = total_width / num_cols
            for c_idx, prod_name in enumerate(row):
                x1 = left_margin + c_idx * col_width
                x2 = left_margin + (c_idx + 1) * col_width
                
                prod_slug = slugify(prod_name)
                # handle duplicate slugs across categories e.g. pulses, seeds
                prod_slug_unique = f'{prod_slug}-{cat_id.split("-")[0]}' if prod_slug in [x['slug'] for x in catalog_data] else prod_slug
                
                crop_box = (int(x1), int(row_y1), int(x2), int(row_y2))
                cropped = img.crop(crop_box)
                
                img_filename = f'{prod_slug_unique}.jpg'
                img_rel_path = f'/products/{cat_id}/{img_filename}'
                cropped.save(os.path.join(cat_dir, img_filename), quality=92)
                extracted_count += 1
                
                catalog_data.append({
                    'id': f'{cat_id}-{prod_slug_unique}',
                    'name': prod_name,
                    'slug': prod_slug_unique,
                    'categoryId': cat_id,
                    'categoryName': cat_name,
                    'image': img_rel_path,
                    'page': pno + 1
                })

print(f'Total products extracted: {extracted_count}')
print(f'Total categories: {len(PAGE_DEFINITIONS)}')

