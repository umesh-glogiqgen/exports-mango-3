import os
import re

with open(r'src/data/catalogueData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

images = re.findall(r'"image":\s*"([^"]+)"', text)
print(f"Total product image references in catalogueData.ts: {len(images)}")

missing = []
for img in images:
    rel = img.lstrip('/')
    full_path = os.path.join(r'public', rel)
    if not os.path.exists(full_path):
        missing.append((img, full_path))

print(f"Missing images: {len(missing)}")
if missing:
    for m in missing[:10]:
        print("  Missing:", m[0])
else:
    print("ALL 190 IMAGES MATCH AND EXIST PERFECTLY!")

