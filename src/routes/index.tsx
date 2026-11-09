import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/sections/Hero";
import { TrustStrip, Varieties } from "@/sections/Varieties";
import { CatalogueExplorer } from "@/components/CatalogueExplorer";
import { Compliance } from "@/sections/Compliance";
import { Process, Season, Story, WhyUs } from "@/sections/Story";
import { FinalCTA, Gallery, Products, Testimonials } from "@/sections/Showcase";
import { Contact, Footer } from "@/sections/Contact";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "CHINNAGUWALA SHIVAHARI EXPORTS PRIVATE LIMITED | Official Product Catalogue & FSSAI Central License",
      },
      {
        name: "description",
        content:
          "Official product catalogue of CHINNAGUWALA SHIVAHARI EXPORTS PRIVATE LIMITED (CS Shivahari Exports). 190 Indian agricultural products across 22 categories — Mangoes, Fruits, Vegetables, Spices, Tamarind, Millets, Rice, Pulses, Bamboo & Packaging under FSSAI Central License 10126999000631.",
      },
      {
        property: "og:title",
        content: "CS Shivahari Exports | From Our Farms to Global Markets — Official Catalogue",
      },
      {
        property: "og:description",
        content:
          "190 agricultural products exported from India. FSSAI Central License No. 10126999000631. Download official catalogue and request B2B export quotes.",
      },
      { property: "og:image", content: "/assets/company-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/assets/company-logo.png" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="w-full max-w-full overflow-x-clip">
      <Navbar />
      <Hero />
      <TrustStrip />
      <CatalogueExplorer />
      <Varieties />
      <Compliance />
      <Story />
      <WhyUs />
      <Products />
      <Process />
      <Gallery />
      <Season />
      <Testimonials />
      <FinalCTA />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
