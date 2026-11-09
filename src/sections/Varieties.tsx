import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Package, ShieldCheck, Sprout, Truck } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/data/content";
import { CTAButton, SectionHeading, ease } from "@/components/primitives";
import { whatsappLink } from "@/config/site";

// ─── Trust Strip ──────────────────────────────────────────────────────────────

const trust = [
  { icon: Sprout, label: "Indian Origin" },
  { icon: ShieldCheck, label: "Quality Focused" },
  { icon: Truck, label: "Reliable Sourcing" },
  { icon: Package, label: "Buyer-Specific Packaging" },
  { icon: Globe, label: "Export Coordination" },
];

export function TrustStrip() {
  return (
    <section className="w-full max-w-full overflow-hidden border-b border-border bg-ivory">
      <div className="mx-auto w-full max-w-7xl px-5 py-7 md:px-8">
        <div className="no-scrollbar flex w-full max-w-full gap-10 overflow-x-auto touch-pan-x md:justify-between">
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} className="flex shrink-0 items-center gap-3 text-deep">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-cream text-forest">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Product Category Card ────────────────────────────────────────────────────

function CategoryCard({
  category,
  index,
}: {
  category: (typeof PRODUCT_CATEGORIES)[0];
  index: number;
}) {
  const message = `Hello, I would like to request a quote for ${category.enquiryLabel}.`;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay: (index % 4) * 0.08 }}
      className="group flex flex-col rounded-3xl bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={category.image}
          alt={`${category.name} — Indian agricultural export`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 rounded-full bg-ivory/90 px-3 py-1 text-[0.65rem] font-semibold text-deep uppercase tracking-wider backdrop-blur">
          Agricultural Export
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 pt-5 pb-5">
        <h3 className="text-2xl font-medium text-deep">{category.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{category.description}</p>

        {/* Items */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {category.items.slice(0, 3).map((item) => (
            <li
              key={item}
              className="rounded-full border border-border px-3 py-1 text-[0.68rem] text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-5 flex items-center justify-between rounded-full border border-border px-5 py-3 text-sm font-semibold text-deep transition-all duration-300 group-hover:border-transparent group-hover:bg-forest group-hover:text-ivory"
        >
          Request a Quote <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
}

// ─── Products Section ─────────────────────────────────────────────────────────

export function Varieties() {
  return (
    <section id="products" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading
        eyebrow="Our Agricultural Products"
        title={
          <>
            Sourced from India, <em className="text-gold">Supplied Globally</em>
          </>
        }
        subtitle="Explore agricultural products sourced from India for international buyers and bulk procurement requirements."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCT_CATEGORIES.map((cat, i) => (
          <CategoryCard key={cat.id} category={cat} index={i} />
        ))}
      </div>
      <div className="mt-14 flex justify-center">
        <CTAButton href="#contact" variant="forest">
          Enquire About Any Product
        </CTAButton>
      </div>
    </section>
  );
}
