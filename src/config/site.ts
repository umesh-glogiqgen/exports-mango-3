// ============================================================
// CHINNAGUWALA SHIVAHARI EXPORTS PRIVATE LIMITED — Site Config
// Verified from official FSSAI Central License & Product Catalogue
// ============================================================

export const SITE = {
  BUSINESS_NAME: "CHINNAGUWALA SHIVAHARI EXPORTS PRIVATE LIMITED",
  BUSINESS_NAME_SHORT: "CS Shivahari Exports",
  LEGAL_NAME: "CHINNAGUWALA SHIVAHARI EXPORTS PRIVATE LIMITED",
  BRAND_NAME: "CS Shivahari Exports",
  TAGLINE: "From Our Farms to Global Markets",

  // Compliance & Registration (Verified from FSSAI Central License Form C)
  FSSAI_LICENSE_NUMBER: "10126999000631",
  FSSAI_LICENSE_CATEGORY: "Central License",
  FSSAI_ISSUING_AUTHORITY: "FSSAI Chennai",
  FSSAI_ISSUED_ON: "04-11-2026",
  FSSAI_VALID_UPTO: "03-11-2027",
  DGFT_IEC_CODE: "AAOCC2307F",
  PAN_NUMBER: "AAOCC2307FFT001",
  ESTD_DATE: "20-10-2026",

  // Authorized Business Activities
  AUTHORIZED_ACTIVITIES: [
    "Trade/Retail - Trader/Merchant - Exporter",
    "Trade/Retail - Importer",
    "Trade/Retail - Wholesaler",
    "Trade/Retail - Retailer",
    "Trade/Retail - Distributor",
  ],

  // Contact & Address
  PHONE_NUMBER: "+91 91219 24481",
  WHATSAPP_NUMBER: "919121924481",
  EMAIL_ADDRESS: "chinnaguwala@gmail.com",
  BUSINESS_ADDRESS:
    "12-41, Kagathi, Madanapalle, Chittoor / Annamayya, Andhra Pradesh - 517257, India",
  REGISTERED_ADDRESS:
    "12-41, W/O KADIRAPPA, MOTLAPALLI MOTL KAGATHI, Chowdepalle, Madanapalle, Chittoor / Annamayya, Andhra Pradesh - 517257, India",
  AUTHORIZED_PREMISES:
    "12-41, KAGATHI, Madanpalle, MOTLAPALLI, Chittoor, Annamayya, Andhra Pradesh - 517257, India",

  INSTAGRAM_URL: "https://instagram.com/",
  FACEBOOK_URL: "https://facebook.com/",
  LINKEDIN_URL: "https://linkedin.com/",
  WEBSITE_URL: "https://csshivahariexports.com",

  DEFAULT_MESSAGE:
    "Hello CS Shivahari Exports, I would like to enquire about your products for export.",
};

export function whatsappLink(message: string = SITE.DEFAULT_MESSAGE) {
  return `https://wa.me/${SITE.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Catalogue", href: "#catalogue" },
  { label: "Compliance & FSSAI", href: "#compliance" },
  { label: "About Us", href: "#about" },
  { label: "Our Process", href: "#process" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const FOOTER_PRODUCT_LINKS = [
  { label: "Mangoes (Banganapalli, Alphonso, Neelam)", href: "#products" },
  { label: "Fresh Fruits & Vegetables", href: "#products" },
  { label: "Turmeric & Chilli Products", href: "#products" },
  { label: "Tamarind & Moringa Products", href: "#products" },
  { label: "Millets, Rice & Grains", href: "#products" },
  { label: "Spices & Seasonings", href: "#products" },
  { label: "Pulses & Legumes", href: "#products" },
  { label: "Eco-Friendly Bamboo & Packaging", href: "#products" },
];
