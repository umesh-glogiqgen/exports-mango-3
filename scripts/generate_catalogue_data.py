import json

PAGE_DEFINITIONS = [
    {
        'page_num': 2,
        'cat_id': '01-mangoes',
        'cat_number': '01',
        'cat_name': 'Mangoes',
        'fssai_covered': True,
        'fssai_category': '04 - Fruits and vegetables',
        'product_type': 'Fresh Fruits & Pulp',
        'layout': [
            ['Banganapalli Mango', 'Alphonso Mango'],
            ['Neelam Mango', 'Mango Pulp'],
            ['Dried Mango']
        ]
    },
    {
        'page_num': 3,
        'cat_id': '02-fresh-fruits',
        'cat_number': '02',
        'cat_name': 'Fresh Fruits',
        'fssai_covered': True,
        'fssai_category': '04 - Fruits and vegetables',
        'product_type': 'Fresh Fruits',
        'layout': [
            ['Pomegranate', 'Watermelon'],
            ['Custard Apple', 'Banana'],
            ['Papaya', 'Guava'],
            ['Grapes', 'Sapota']
        ]
    },
    {
        'page_num': 4,
        'cat_id': '03-fresh-vegetables',
        'cat_number': '03',
        'cat_name': 'Fresh Vegetables',
        'fssai_covered': True,
        'fssai_category': '04 - Fruits and vegetables',
        'product_type': 'Fresh Produce',
        'layout': [
            ['Brinjal', 'Drumstick', 'Lady Finger (Okra)', 'Green Beans'],
            ['Cauliflower', 'Carrot', 'Cucumber', 'Bitter Gourd'],
            ['Bottle Gourd', 'Ridge Gourd', 'Green Peas', 'Capsicum']
        ]
    },
    {
        'page_num': 5,
        'cat_id': '04-coriander-mint',
        'cat_number': '04',
        'cat_name': 'Coriander & Mint',
        'fssai_covered': True,
        'fssai_category': '04 - Fruits and vegetables / 12 - Spices',
        'product_type': 'Herbs, Seeds & Powders',
        'layout': [
            ['Fresh Coriander Leaves', 'Fresh Mint Leaves', 'Dried Coriander Leaves'],
            ['Dried Mint Leaves', 'Coriander Powder', 'Mint Powder'],
            ['Coriander Seeds']
        ]
    },
    {
        'page_num': 6,
        'cat_id': '05-turmeric-products',
        'cat_number': '05',
        'cat_name': 'Turmeric Products',
        'fssai_covered': True,
        'fssai_category': '12 - Salts, spices, soups, sauces and protein products',
        'product_type': 'Spices & Extracts',
        'layout': [
            ['Raw Turmeric', 'Dry Turmeric Fingers'],
            ['Turmeric Powder', 'Turmeric Extract']
        ]
    },
    {
        'page_num': 7,
        'cat_id': '06-chilli-products',
        'cat_number': '06',
        'cat_name': 'Chilli Products',
        'fssai_covered': True,
        'fssai_category': '12 - Salts, spices, soups, sauces and protein products',
        'product_type': 'Fresh & Processed Chillies',
        'layout': [
            ['Fresh Green Chilli', 'Fresh Red Chilli'],
            ['Dry Red Chilli', 'Guntur Sannam Chilli'],
            ['Teja Chilli', 'Chilli Powder'],
            ['Chilli Flakes', 'Chilli Paste']
        ]
    },
    {
        'page_num': 8,
        'cat_id': '07-tamarind-products',
        'cat_number': '07',
        'cat_name': 'Tamarind Products',
        'fssai_covered': True,
        'fssai_category': '04 - Fruits and vegetables / 16 - Prepared Foods',
        'product_type': 'Tamarind & Pulp',
        'layout': [
            ['Raw Tamarind', 'Seedless Tamarind', 'Tamarind with Seeds'],
            ['Tamarind Pulp', 'Tamarind Paste', 'Tamarind Slabs'],
            ['Tamarind Seeds']
        ]
    },
    {
        'page_num': 9,
        'cat_id': '08-moringa-products',
        'cat_number': '08',
        'cat_name': 'Moringa Products',
        'fssai_covered': True,
        'fssai_category': '04 - Fruits and vegetables / 13 - Foodstuffs',
        'product_type': 'Moringa Produce & Powders',
        'layout': [
            ['Fresh Moringa Leaves', 'Dried Moringa Leaves'],
            ['Moringa Leaf Powder', 'Moringa Drumsticks / Pods'],
            ['Moringa Seeds']
        ]
    },
    {
        'page_num': 10,
        'cat_id': '09-herbal-products',
        'cat_number': '09',
        'cat_name': 'Herbal Products',
        'fssai_covered': True,
        'fssai_category': '13 - Foodstuffs intended for particular nutritional uses',
        'product_type': 'Natural Herbs & Powders',
        'layout': [
            ['Neem Leaves', 'Neem Powder', 'Neem Seeds'],
            ['Aloe Vera', 'Aloe Vera Powder', 'Tulsi Leaves'],
            ['Tulsi Powder', 'Amla', 'Amla Powder']
        ]
    },
    {
        'page_num': 11,
        'cat_id': '10-tomato-products',
        'cat_number': '10',
        'cat_name': 'Tomato Products',
        'fssai_covered': True,
        'fssai_category': '04 - Fruits and vegetables / 12 - Sauces / 16 - Prepared Foods',
        'product_type': 'Fresh Tomatoes & Sauces',
        'layout': [
            ['Fresh Tomatoes', 'Cherry Tomatoes'],
            ['Tomato Paste', 'Tomato Sauce'],
            ['Tomato Ketchup', 'Tomato Powder'],
            ['Dried Tomatoes', 'Tomato Flakes']
        ]
    },
    {
        'page_num': 12,
        'cat_id': '11-lemon-products',
        'cat_number': '11',
        'cat_name': 'Lemon Products',
        'fssai_covered': True,
        'fssai_category': '04 - Fruits and vegetables / 14 - Beverages',
        'product_type': 'Citrus & Concentrates',
        'layout': [
            ['Fresh Lemon', 'Yellow Lemon'],
            ['Green Lemon', 'Lemon Juice'],
            ['Lemon Concentrate', 'Dried Lemon']
        ]
    },
    {
        'page_num': 13,
        'cat_id': '12-millets',
        'cat_number': '12',
        'cat_name': 'Millets',
        'fssai_covered': True,
        'fssai_category': '06 - Cereals and cereal products',
        'product_type': 'Nutritious Millets & Grains',
        'layout': [
            ['Finger Millet (Ragi)', 'Foxtail Millet', 'Little Millet'],
            ['Kodo Millet', 'Barnyard Millet', 'Proso Millet'],
            ['Millet Flour', 'Millet Rice', 'Millet Flakes']
        ]
    },
    {
        'page_num': 14,
        'cat_id': '13-onion-products',
        'cat_number': '13',
        'cat_name': 'Onion Products',
        'fssai_covered': True,
        'fssai_category': '04 - Fruits and vegetables / 16 - Prepared Foods',
        'product_type': 'Fresh, Dehydrated & Pastes',
        'layout': [
            ['Fresh Red Onion', 'Shallots'],
            ['Dehydrated Onion', 'Onion Flakes'],
            ['Onion Powder', 'Onion Paste']
        ]
    },
    {
        'page_num': 15,
        'cat_id': '14-garlic-ginger',
        'cat_number': '14',
        'cat_name': 'Garlic & Ginger',
        'fssai_covered': True,
        'fssai_category': '04 - Fruits and vegetables / 12 - Spices',
        'product_type': 'Fresh, Dried & Pastes',
        'layout': [
            ['Fresh Garlic', 'Peeled Garlic', 'Dried Garlic'],
            ['Garlic Powder', 'Garlic Paste', 'Fresh Ginger'],
            ['Dried Ginger', 'Ginger Powder', 'Ginger Paste']
        ]
    },
    {
        'page_num': 16,
        'cat_id': '15-dehydrated-ingredients',
        'cat_number': '15',
        'cat_name': 'Dehydrated Ingredients',
        'fssai_covered': True,
        'fssai_category': '04 - Fruits and vegetables (Dehydrated)',
        'product_type': 'Dehydrated Vegetables & Roots',
        'layout': [
            ['Dehydrated Onion', 'Dehydrated Garlic'],
            ['Dehydrated Ginger', 'Dehydrated Tomato'],
            ['Dehydrated Carrot', 'Dehydrated Beetroot']
        ]
    },
    {
        'page_num': 17,
        'cat_id': '16-bamboo-products',
        'cat_number': '16',
        'cat_name': 'Bamboo Products',
        'fssai_covered': False,
        'fssai_category': 'Not Applicable (Non-Food Eco-Friendly Product)',
        'product_type': 'Sustainable Eco-Friendly Bamboo',
        'layout': [
            ['Bamboo Plates', 'Bamboo Cups', 'Bamboo Water Bottles'],
            ['Bamboo Straws', 'Bamboo Cutlery', 'Bamboo Bowls'],
            ['Bamboo Trays', 'Bamboo Toothbrushes', 'Bamboo Containers'],
            ['Bamboo Kitchen Products']
        ]
    },
    {
        'page_num': 18,
        'cat_id': '17-packaging-solutions',
        'cat_number': '17',
        'cat_name': 'Packaging Solutions',
        'fssai_covered': False,
        'fssai_category': 'Not Applicable (Non-Food Packaging Solution)',
        'product_type': 'Export & Eco-Packaging Solutions',
        'layout': [
            ['Jute Bags', 'Paper Pouches', 'Corrugated Boxes'],
            ['Paper Bags', 'Biodegradable Clamshells', 'Packaging Tapes'],
            ['Glass Jars', 'PET Bottles', 'Metal Tins'],
            ['Foil Bags', 'Wrapping Papers', 'Biodegradable Fillers']
        ]
    },
    {
        'page_num': 19,
        'cat_id': '18-medical-supplies',
        'cat_number': '18',
        'cat_name': 'Medical Supplies',
        'fssai_covered': False,
        'fssai_category': 'Not Applicable (Non-Food Medical Supplies)',
        'product_type': 'Surgical & Disposable Supplies',
        'layout': [
            ['Surgical Gloves', 'Disposable Face Masks', 'Surgical Gowns'],
            ['Disposable Caps', 'Medical Shoe Covers', 'Syringes'],
            ['IV Sets', 'Bandages', 'Medical Gauze'],
            ['Surgical Dressings', 'Disposable Medical Kits', 'Medical Consumables']
        ]
    },
    {
        'page_num': 20,
        'cat_id': '20-other-agricultural-products',
        'cat_number': '20',
        'cat_name': 'Other Agricultural Products',
        'fssai_covered': True,
        'fssai_category': '04 - Nuts and seeds / 06 - Pulses / 11 - Sweeteners',
        'product_type': 'Agricultural Commodities & Seeds',
        'layout': [
            ['Groundnuts', 'Sesame Seeds', 'Sunflower Seeds'],
            ['Castor Seeds', 'Coconut', 'Copra'],
            ['Jaggery', 'Sugarcane Products', 'Pulses'],
            ['Beans', 'Green Gram', 'Black Gram'],
            ['Red Gram', 'Chickpeas', 'Horse Gram']
        ]
    },
    {
        'page_num': 21,
        'cat_id': '21-spices-and-seasonings',
        'cat_number': '21',
        'cat_name': 'Spices and Seasonings',
        'fssai_covered': True,
        'fssai_category': '12 - Salts, spices, soups, sauces and protein products',
        'product_type': 'Whole & Ground Spices',
        'layout': [
            ['Black Pepper', 'Green Cardamom', 'Cloves'],
            ['Cinnamon', 'Star Anise', 'Cumin Seeds'],
            ['Coriander Seeds', 'Turmeric Fingers', 'Red Chilli Powder'],
            ['Mustard Seeds', 'Fenugreek Seeds', 'Fennel Seeds'],
            ['Bay Leaves', 'Nutmeg', 'Mace']
        ]
    },
    {
        'page_num': 22,
        'cat_id': '21-rice-grains',
        'cat_number': '21',
        'cat_name': 'Rice & Grains',
        'fssai_covered': True,
        'fssai_category': '06 - Cereals and cereal products',
        'product_type': 'Premium Indian Rice & Grains',
        'layout': [
            ['Basmati Rice', 'Sona Masoori Rice'],
            ['Black Rice', 'Brown Rice'],
            ['Red Rice']
        ]
    },
    {
        'page_num': 23,
        'cat_id': '22-pulses-legumes',
        'cat_number': '22',
        'cat_name': 'Pulses & Legumes',
        'fssai_covered': True,
        'fssai_category': '06 - Cereals, pulses and legumes',
        'product_type': 'Indian Dals & Legumes',
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

all_products = []
all_categories = []

seen_slugs = set()

for c in PAGE_DEFINITIONS:
    cat_id = c['cat_id']
    cat_number = c['cat_number']
    cat_name = f"{cat_number}. {c['cat_name']}"
    page_num = c['page_num']
    fssai_covered = c['fssai_covered']
    fssai_category = c['fssai_category']
    product_type = c['product_type']
    
    cat_products = []
    
    for row in c['layout']:
        for prod_name in row:
            base_slug = slugify(prod_name)
            # handle duplicates across categories
            if base_slug in seen_slugs:
                slug = f"{base_slug}-{cat_number}"
            else:
                slug = base_slug
            seen_slugs.add(slug)
            
            prod_id = f"cs-{cat_number}-{slug}"
            image_path = f"/products/{cat_id}/{slug}.jpg"
            
            item = {
                'id': prod_id,
                'name': prod_name,
                'category': cat_name,
                'categoryId': cat_id,
                'categoryNumber': cat_number,
                'pageNumber': page_num,
                'image': image_path,
                'shortDescription': f"Featured in CHINNAGUWALA SHIVAHARI EXPORTS official catalogue ({cat_name}, Page {page_num}).",
                'detailedDescription': f"{prod_name} is part of the official {cat_name} export portfolio sourced directly from Indian agricultural supply chains for global international buyers.",
                'productType': product_type,
                'availabilityStatus': "Available for Export Order",
                'fssaiCovered': fssai_covered,
                'fssaiCategory': fssai_category if fssai_covered else "Not Applicable (Non-Food Product)",
                'additionalSpecifications': {
                    "Catalogue Page": f"Page {page_num} of 23",
                    "Official Category": cat_name,
                    "Country of Origin": "India",
                    "Sourcing Network": "Andhra Pradesh & Pan-India Agriculture",
                    "FSSAI Compliance": fssai_category if fssai_covered else "Non-Food Category"
                }
            }
            cat_products.append(item)
            all_products.append(item)
            
    all_categories.append({
        'id': cat_id,
        'number': cat_number,
        'name': cat_name,
        'pageNumber': page_num,
        'itemCount': len(cat_products),
        'fssaiCovered': fssai_covered,
        'fssaiCategoryNote': fssai_category,
        'productType': product_type,
        'productCount': len(cat_products)
    })

print(f"Total Products: {len(all_products)}")
print(f"Total Categories: {len(all_categories)}")

ts_content = f"""// ============================================================
// CHINNAGUWALA SHIVAHARI EXPORTS PRIVATE LIMITED
// Complete Official Product Catalogue Dataset
// Extracted from final_product_catalogue_with_cover.pdf (23 pages)
// and verified against FSSAI Central License 10126999000631
// ============================================================

export interface ProductItem {{
  id: string;
  name: string;
  category: string;
  categoryId: string;
  categoryNumber: string;
  pageNumber: number;
  image: string;
  shortDescription: string;
  detailedDescription: string;
  productType: string;
  availabilityStatus: string;
  fssaiCovered: boolean;
  fssaiCategory: string;
  additionalSpecifications: Record<string, string>;
}}

export interface ProductCategoryData {{
  id: string;
  number: string;
  name: string;
  pageNumber: number;
  itemCount: number;
  fssaiCovered: boolean;
  fssaiCategoryNote: string;
  productType: string;
  productCount: number;
}}

export const CATALOGUE_CATEGORIES: ProductCategoryData[] = {json.dumps(all_categories, indent=2)};

export const CATALOGUE_PRODUCTS: ProductItem[] = {json.dumps(all_products, indent=2)};
"""

with open(r'c:\Users\HP\Downloads\mongop\src\data\catalogueData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("src/data/catalogueData.ts generated successfully!")

