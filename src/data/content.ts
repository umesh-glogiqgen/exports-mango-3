export const IMAGES = {
  hero: "/assets/hero-agri.jpg",
  about: "/assets/orchard.jpg",
  harvest: "/assets/harvest.jpg",
  crates: "/assets/crates.jpg",
  basket: "/assets/basket.jpg",
  fruits: "/assets/cat-fruits.jpg",
  vegetables: "/assets/cat-vegetables.jpg",
  spices: "/assets/cat-spices.jpg",
  tamarind: "/assets/cat-tamarind.jpg",
  rice: "/assets/cat-rice.jpg",
  pulses: "/assets/cat-pulses.jpg",
  seeds: "/assets/cat-seeds.jpg",
  processed: "/assets/cat-processed.jpg",
};

// ─── Agricultural Product Categories ───────────────────────────────────────
export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  items: string[];
  image: string;
  enquiryLabel: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "fresh-fruits",
    name: "Fresh Fruits",
    description:
      "Premium Indian mangoes, seasonal fruits, and buyer-specific fruit requirements sourced from across India.",
    items: [
      "Mangoes (Alphonso, Kesar, Banganapalli)",
      "Seasonal tropical fruits",
      "Buyer-specific fruit requirements",
    ],
    image: "/assets/cat-fruits.jpg",
    enquiryLabel: "Fresh Fruits",
  },
  {
    id: "fresh-vegetables",
    name: "Fresh Vegetables",
    description:
      "Fresh Indian vegetables and seasonal produce prepared to buyer specifications for international shipment.",
    items: ["Fresh vegetables", "Seasonal produce", "Buyer-specified varieties"],
    image: "/assets/cat-vegetables.jpg",
    enquiryLabel: "Fresh Vegetables",
  },
  {
    id: "indian-spices",
    name: "Indian Spices",
    description:
      "Quality Indian spices including chilli, turmeric, coriander and other available varieties for bulk export.",
    items: ["Red Chilli", "Turmeric", "Coriander", "Other available spices"],
    image: "/assets/cat-spices.jpg",
    enquiryLabel: "Indian Spices",
  },
  {
    id: "tamarind",
    name: "Tamarind & Products",
    description:
      "Whole tamarind, seeds, pulp and processed tamarind products for food industry and bulk procurement buyers.",
    items: ["Whole tamarind", "Tamarind seeds", "Tamarind pulp", "Processed tamarind products"],
    image: "/assets/cat-tamarind.jpg",
    enquiryLabel: "Tamarind & Tamarind Products",
  },
  {
    id: "rice-grains",
    name: "Rice & Grains",
    description:
      "Indian rice varieties, millets and other grains sourced for international food distributors and bulk buyers.",
    items: ["Rice varieties", "Millets", "Other grains"],
    image: "/assets/cat-rice.jpg",
    enquiryLabel: "Rice & Grains",
  },
  {
    id: "pulses",
    name: "Pulses & Legumes",
    description:
      "Toor dal, chana, green gram and other pulses prepared and packed to international buyer requirements.",
    items: ["Toor dal", "Chana", "Green gram", "Other pulses"],
    image: "/assets/cat-pulses.jpg",
    enquiryLabel: "Pulses & Legumes",
  },
  {
    id: "seeds",
    name: "Seeds",
    description:
      "Food-grade seeds and agricultural seeds subject to applicable export and destination requirements.",
    items: ["Food-use seeds", "Agricultural seeds (subject to applicable requirements)"],
    image: "/assets/cat-seeds.jpg",
    enquiryLabel: "Seeds",
  },
  {
    id: "processed",
    name: "Dehydrated & Processed",
    description:
      "Dehydrated agricultural products, processed products, and buyer-specific product requirements for food industry buyers.",
    items: [
      "Dehydrated agricultural products",
      "Processed agricultural products",
      "Buyer-specific requirements",
    ],
    image: "/assets/cat-processed.jpg",
    enquiryLabel: "Dehydrated & Processed Products",
  },
];

// ─── Export Process Steps ────────────────────────────────────────────────────
export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Buyer Enquiry",
    description:
      "Receive detailed enquiry with product, quantity, packaging, and destination specifications.",
  },
  {
    number: "02",
    title: "Product Sourcing",
    description:
      "Identify and engage suitable Indian agricultural suppliers for the specified requirements.",
  },
  {
    number: "03",
    title: "Specification Confirmation",
    description:
      "Align product specifications, quality parameters, and buyer requirements with the supplier.",
  },
  {
    number: "04",
    title: "Quality & Preparation",
    description:
      "Coordinate product inspection, grading, sorting, and packaging to agreed buyer specifications.",
  },
  {
    number: "05",
    title: "Packaging & Labelling",
    description:
      "Apply agreed packaging standards — bulk bags, export cartons, or buyer-specified branding.",
  },
  {
    number: "06",
    title: "Documentation",
    description:
      "Prepare commercial invoice, packing list, and coordinate export documentation requirements.",
  },
  {
    number: "07",
    title: "Shipment",
    description:
      "Arrange container loading and coordinate logistics — sea freight or air freight as appropriate.",
  },
  {
    number: "08",
    title: "Delivery",
    description:
      "Coordinate shipment tracking and communicate with the buyer through to destination arrival.",
  },
];

// ─── Export Market Regions ───────────────────────────────────────────────────
export const EXPORT_REGIONS = [
  {
    region: "Middle East",
    examples: ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Oman"],
    note: "Target markets",
  },
  {
    region: "Asia",
    examples: ["Singapore", "Malaysia", "Bangladesh", "Sri Lanka"],
    note: "Target markets",
  },
  {
    region: "Europe",
    examples: ["UK", "Germany", "Netherlands", "France"],
    note: "Subject to product eligibility & import requirements",
  },
  {
    region: "North America",
    examples: ["USA", "Canada"],
    note: "Subject to product eligibility & import requirements",
  },
  {
    region: "Africa",
    examples: ["South Africa", "Kenya", "Tanzania", "Mauritius"],
    note: "Target markets",
  },
];

// ─── Why Choose CS Shivahari Exports ──────────────────────────────────────────
export const WHY_CHOOSE = [
  {
    title: "Indian Origin",
    text: "Products sourced directly from Indian agricultural regions known for quality produce.",
  },
  {
    title: "Quality Focused",
    text: "Product preparation and handling aligned to buyer-specified quality parameters.",
  },
  {
    title: "Reliable Sourcing",
    text: "Established supplier relationships across major Indian agricultural producing regions.",
  },
  {
    title: "Buyer-Specific Packaging",
    text: "Flexible packaging solutions tailored to individual buyer requirements and destination needs.",
  },
  {
    title: "Export Coordination",
    text: "Professional coordination of documentation, logistics and shipment planning.",
  },
  {
    title: "Long-Term Partnership",
    text: "Focused on building dependable, sustainable business relationships with international buyers.",
  },
];

// ─── Gallery Images ─────────────────────────────────────────────────────────
export const GALLERY = [
  {
    src: "/assets/orchard.jpg",
    alt: "Agricultural farm sourcing — Indian fields at golden hour",
    span: "row-span-2",
  },
  { src: "/assets/cat-spices.jpg", alt: "Indian spices prepared for export", span: "" },
  {
    src: "/assets/harvest.jpg",
    alt: "Agricultural produce harvest and field handling",
    span: "row-span-2",
  },
  { src: "/assets/cat-fruits.jpg", alt: "Premium fresh fruits ready for export", span: "" },
  {
    src: "/assets/crates.jpg",
    alt: "Agricultural products packed in export crates",
    span: "md:col-span-2",
  },
  {
    src: "/assets/cat-pulses.jpg",
    alt: "Pulses and legumes sorted and quality-inspected",
    span: "",
  },
];
