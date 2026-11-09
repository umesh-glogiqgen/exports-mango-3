import { motion } from "framer-motion";
import { Box, Container, FileText, Info, Package2, Plane, Ship } from "lucide-react";
import { GALLERY, IMAGES } from "@/data/content";
import { CTAButton, Reveal, SectionHeading, ease } from "@/components/primitives";
import { whatsappLink } from "@/config/site";

// ─── Quality & Certifications Section ────────────────────────────────────────

const qualitySteps = [
  {
    icon: Package2,
    title: "Supplier Selection",
    desc: "Identifying and engaging suitable Indian agricultural suppliers aligned with buyer requirements.",
  },
  {
    icon: FileText,
    title: "Product Inspection",
    desc: "Coordinating product inspection to verify quality parameters at source.",
  },
  {
    icon: Box,
    title: "Grading & Sorting",
    desc: "Ensuring products are graded, sorted, and prepared to agreed buyer specifications.",
  },
  {
    icon: Container,
    title: "Packaging",
    desc: "Appropriate packaging — bulk, cartons, bags, or buyer-branded options as agreed.",
  },
  {
    icon: FileText,
    title: "Documentation",
    desc: "Commercial invoice, packing list, and coordination of applicable export documentation.",
  },
  {
    icon: Info,
    title: "Destination Requirements",
    desc: "Aligning product preparation with destination country import and phytosanitary requirements.",
  },
];

export function Products() {
  return (
    <section id="quality-workflow" className="bg-cream/40 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Quality & Certifications"
          title={
            <>
              Quality <em className="text-gold">Comes First</em>
            </>
          }
          subtitle="International buyers need product consistency, clear specifications, appropriate packaging, and reliable documentation. Our approach focuses on aligning product preparation and export coordination with agreed buyer requirements."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {qualitySteps.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.1}>
              <div className="group flex gap-4 rounded-2xl border border-border bg-ivory p-6 transition-all duration-300 hover:shadow-soft hover:-translate-y-1">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cream text-forest group-hover:bg-forest group-hover:text-ivory transition-all duration-300">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-deep">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Certifications placeholder area */}
        <Reveal delay={0.2}>
          <div className="mt-14 rounded-2xl border border-dashed border-gold/40 bg-ivory p-8 text-center">
            <p className="eyebrow mb-3">Certifications & Registrations</p>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto">
              Applicable certifications and registrations — including IEC, APEDA, FSSAI, GST, Spices
              Board registration, and others — will be displayed here once verified company
              documents are provided. Only genuine, confirmed certifications will be shown.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Packaging & Logistics ────────────────────────────────────────────────────

const packagingOptions = [
  {
    label: "Bulk Packaging",
    desc: "Suitable for grains, pulses, and spices requiring large-volume export.",
  },
  {
    label: "Cartons",
    desc: "Standard export cartons for fresh fruits, vegetables, and packaged goods.",
  },
  { label: "Bags", desc: "Woven and paper bags for agricultural commodities and bulk dry goods." },
  {
    label: "Food-Grade Packaging",
    desc: "Food-safe materials where required for processed and dehydrated products.",
  },
  {
    label: "Buyer-Branded",
    desc: "Custom packaging with buyer branding where feasible and agreed.",
  },
  {
    label: "Custom Requirements",
    desc: "Packaging adapted to product type, destination, and specific buyer needs.",
  },
];

const logisticsOptions = [
  {
    icon: Ship,
    label: "Sea Freight",
    desc: "Primary export method for bulk agricultural shipments.",
  },
  {
    icon: Plane,
    label: "Air Freight",
    desc: "Available for suitable products requiring faster transit, subject to feasibility.",
  },
  {
    icon: Container,
    label: "Container Loading",
    desc: "Professional coordination of container loading and cargo documentation.",
  },
  {
    icon: FileText,
    label: "Export Documentation",
    desc: "Commercial invoice, packing list, and other applicable export documents.",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading
        eyebrow="Packaging & Logistics"
        title={
          <>
            Prepared for <em className="text-gold">International Shipment</em>
          </>
        }
        subtitle="Packaging, logistics methods, and documentation are determined by the product, buyer requirements, destination country, and agreed shipment terms."
      />

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {/* Packaging */}
        <div>
          <p className="eyebrow mb-6">Packaging Options</p>
          <div className="space-y-3">
            {packagingOptions.map(({ label, desc }) => (
              <Reveal key={label}>
                <div className="flex gap-3 rounded-xl border border-border bg-card p-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  <div>
                    <p className="text-sm font-semibold text-deep">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Logistics */}
        <div>
          <p className="eyebrow mb-6">Logistics & Coordination</p>
          <div className="space-y-4">
            {logisticsOptions.map(({ icon: Icon, label, desc }) => (
              <Reveal key={label}>
                <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cream text-forest">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-deep">{label}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-6 rounded-xl bg-cream/60 px-5 py-4 text-xs text-muted-foreground leading-relaxed border border-border">
              <strong className="text-deep">Note:</strong> Actual packaging, shipping methods,
              documentation requirements, and overall feasibility depend on the product type, buyer
              requirements, destination country regulations, and agreed shipment terms.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading
        eyebrow="Gallery"
        title={
          <>
            From Source <em className="text-gold">to Shipment</em>
          </>
        }
        subtitle="Agricultural sourcing, product inspection, packaging, and export — a glimpse into our process."
      />
      <div className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-5">
        {GALLERY.map((g, i) => (
          <motion.div
            key={g.alt}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.07, duration: 0.8, ease }}
            className={`group overflow-hidden rounded-2xl ${g.span}`}
          >
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Enquiry Form / Final CTA ─────────────────────────────────────────────────

export function FinalCTA() {
  return (
    <section className="px-5 pb-24 md:px-8 md:pb-36">
      <div className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-deep">
        <img
          src={IMAGES.hero}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative z-10 px-8 py-20 md:px-16 md:py-32">
          <Reveal>
            <p className="eyebrow text-gold">Agricultural Products from India</p>
            <h2 className="mt-4 text-5xl leading-[0.95] text-ivory md:text-7xl">
              Looking for Agricultural <em className="text-gold">Products from India?</em>
            </h2>
            <p className="mt-6 max-w-xl text-base text-ivory/75 leading-relaxed">
              Tell us your product, quantity, destination, and packaging requirements. We will use
              your enquiry to discuss availability, specifications, and a suitable quotation.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="#contact">Request a Quote</CTAButton>
              <CTAButton
                variant="ghostLight"
                href={whatsappLink(
                  "Hello, I would like to enquire about agricultural products for export from India. Please share more details.",
                )}
              >
                Contact Us on WhatsApp
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
