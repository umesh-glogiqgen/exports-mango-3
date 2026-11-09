import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import { IMAGES } from "@/data/content";
import { CTAButton, ease } from "@/components/primitives";
import { whatsappLink } from "@/config/site";

const FEATURED_HIGHLIGHTS = [
  {
    id: "fruits",
    label: "Fresh Fruits",
    title: "Indian Mangoes & Fresh Fruits",
    image: "/assets/cat-fruits.jpg",
    badge: "Seasonal & Fresh Harvest",
    desc: "Alphonso, Kesar & Banganapalli mangoes, pomegranates and fresh seasonal fruits packed for international air & sea freight.",
    items: ["Alphonso & Kesar Mangoes", "APEDA Packhouse Approved", "Temperature-Controlled"],
  },
  {
    id: "spices",
    label: "Indian Spices",
    title: "Pure Indian Spices & Herbs",
    image: "/assets/cat-spices.jpg",
    badge: "Export Quality Grade",
    desc: "Premium dried red chilli, high-curcumin turmeric fingers, whole coriander and traditional spices sourced from origin farms.",
    items: ["Guntur Red Chilli", "High-Curcumin Turmeric", "Custom Mesh & Moisture"],
  },
  {
    id: "tamarind",
    label: "Tamarind",
    title: "Whole Tamarind & Concentrates",
    image: "/assets/cat-tamarind.jpg",
    badge: "B2B Bulk & Retail",
    desc: "Slab tamarind, deseeded tamarind, seeds and industrial pulp tailored for international food processing and retail chains.",
    items: ["Deseeded & Pressed Slabs", "Tamarind Pulp / Paste", "Bulk Jute & Carton Packing"],
  },
  {
    id: "rice",
    label: "Rice & Grains",
    title: "Basmati Rice & Millets",
    image: "/assets/cat-rice.jpg",
    badge: "Long Grain & Aromatic",
    desc: "Traditional 1121 & 1509 Basmati rice varieties, non-basmati varieties, and nutritious millets sorted for global markets.",
    items: ["1121 Steamed / Sella Basmati", "Sortex Cleaned & Graded", "Custom Brand Packaging"],
  },
];

const QUICK_CATEGORIES = [
  { name: "Fresh Fruits", img: "/assets/cat-fruits.jpg" },
  { name: "Fresh Vegetables", img: "/assets/cat-vegetables.jpg" },
  { name: "Indian Spices", img: "/assets/cat-spices.jpg" },
  { name: "Tamarind Products", img: "/assets/cat-tamarind.jpg" },
  { name: "Rice & Grains", img: "/assets/cat-rice.jpg" },
  { name: "Pulses & Dal", img: "/assets/cat-pulses.jpg" },
  { name: "Seeds", img: "/assets/cat-seeds.jpg" },
  { name: "Processed Goods", img: "/assets/cat-processed.jpg" },
];

const defaultFeatured = FEATURED_HIGHLIGHTS[0] as (typeof FEATURED_HIGHLIGHTS)[0];

export function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const featured = FEATURED_HIGHLIGHTS[activeTab] ?? defaultFeatured;

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-deep pt-28 pb-12 md:pt-32 md:pb-14"
    >
      {/* Background Image with Crisp Contrast Overlay */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Indian agricultural products export"
          className="h-full w-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Main Two-Column Hero Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Heading, Value Prop, Highlights & CTAs */}
          <div className="lg:col-span-7">
            {/* Top Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease }}
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ivory/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-gold uppercase backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span>Indian Agricultural Exports · B2B Sourcing</span>
            </motion.div>

            {/* Main Title */}
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-ivory sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
              From Indian Farms <br />
              <span className="italic text-gold">To Global Markets</span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8, ease }}
              className="mt-5 max-w-xl text-base text-ivory/85 md:text-lg leading-relaxed font-sans"
            >
              <strong className="text-ivory font-semibold">
                CHINNAGUWALA SHIVAHARI EXPORTS PRIVATE LIMITED
              </strong>{" "}
              (CS Shivahari Exports) connects international buyers directly with our farms across
              Andhra Pradesh and India — exporting 190 products across 22 categories under FSSAI
              Central License 10126999000631 with rigorous source inspection and global shipping.
            </motion.p>

            {/* Key Value Points */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease }}
              className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-ivory/90 sm:gap-6 sm:text-sm"
            >
              <div className="flex items-center gap-2 rounded-lg bg-ivory/5 px-3 py-1.5 border border-ivory/10 backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                <span>100% Export Grade Produce</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-ivory/5 px-3 py-1.5 border border-ivory/10 backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
                <span>Origin Quality Inspection</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-ivory/5 px-3 py-1.5 border border-ivory/10 backdrop-blur-sm">
                <PackageCheck className="h-4 w-4 text-gold shrink-0" />
                <span>Custom Packing & Port Logistics</span>
              </div>
            </motion.div>

            {/* Call To Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8, ease }}
              className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center"
            >
              <CTAButton href="#contact" className="shadow-glow">
                Request a Quote
              </CTAButton>
              <CTAButton variant="ghostLight" href="#catalogue">
                Browse 190 Products (22 Categories)
              </CTAButton>
            </motion.div>
          </div>

          {/* Right Column: Featured Interactive Product Card Showcase */}
          <div className="w-full min-w-0 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease }}
              className="rounded-3xl border border-ivory/20 bg-ivory/10 p-4 shadow-2xl backdrop-blur-xl md:p-6"
            >
              {/* Category Switcher Tabs */}
              <div className="grid grid-cols-4 gap-1.5 rounded-2xl bg-deep/60 p-1.5 border border-ivory/10">
                {FEATURED_HIGHLIGHTS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(idx)}
                    className={`rounded-xl py-2 px-1 text-center text-xs font-semibold transition-all duration-300 ${
                      activeTab === idx
                        ? "bg-gold text-deep shadow-md font-bold"
                        : "text-ivory/70 hover:text-ivory hover:bg-ivory/10"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Active Product Showcase Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={featured.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease }}
                  className="mt-4 overflow-hidden rounded-2xl bg-card text-deep shadow-soft"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 rounded-full bg-forest px-3 py-1 text-[0.7rem] font-bold tracking-wide text-ivory uppercase shadow-md">
                      {featured.badge}
                    </span>
                    <span className="absolute bottom-3 left-3 text-xs font-medium text-ivory/90 backdrop-blur-sm bg-deep/40 px-2.5 py-1 rounded-md border border-ivory/20">
                      ✓ Sourced Across Indian Farm Belts
                    </span>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <h2 className="text-xl font-bold text-deep font-sans">{featured.title}</h2>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {featured.desc}
                    </p>

                    {/* Features checklist */}
                    <div className="mt-3.5 space-y-1.5 border-t border-border pt-3 text-xs text-deep/80">
                      {featured.items.map((point) => (
                        <div key={point} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-forest shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Quick Action Button */}
                    <div className="mt-4 pt-2">
                      <a
                        href={whatsappLink(
                          `Hello CS Shivahari Exports, I would like to request an export quote for ${featured.title}.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-forest py-2.5 text-xs font-semibold text-ivory transition-all hover:bg-forest/90 shadow-md"
                      >
                        Enquire for {featured.label}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Product Carousel Strip */}
      <div className="relative z-10 mt-10 w-full max-w-full overflow-hidden border-t border-ivory/10 bg-deep/70 py-4 backdrop-blur-md">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold/80 mb-3">
            Quick Catalog Preview · Click Any Product to Explore
          </p>
          <div className="no-scrollbar flex w-full max-w-full gap-4 overflow-x-auto pb-1 touch-pan-x">
            {QUICK_CATEGORIES.map((item) => (
              <a
                key={item.name}
                href="#products"
                className="group flex shrink-0 items-center gap-2.5 rounded-xl border border-ivory/15 bg-ivory/5 px-3 py-1.5 transition-all hover:border-gold/50 hover:bg-ivory/10 hover:shadow-md"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-8 w-8 rounded-lg object-cover border border-ivory/20"
                />
                <span className="text-xs font-medium text-ivory group-hover:text-gold transition-colors whitespace-nowrap">
                  {item.name}
                </span>
                <ArrowRight className="h-3 w-3 text-ivory/50 group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
