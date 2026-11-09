import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Award,
  CheckCircle2,
  Globe,
  HandHeart,
  Leaf,
  MapPin,
  Package,
  ShieldCheck,
} from "lucide-react";
import { EXPORT_REGIONS, IMAGES, PROCESS_STEPS, WHY_CHOOSE } from "@/data/content";
import { CTAButton, Reveal, SectionHeading, ease } from "@/components/primitives";
import { whatsappLink } from "@/config/site";

// ─── About / Company Introduction ────────────────────────────────────────────

export function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section id="about" ref={ref} className="bg-cream/60">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:gap-20 md:px-8 md:py-36">
        <motion.div
          initial={{ clipPath: "inset(12% 12% 12% 12% round 2rem)", opacity: 0 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 2rem)", opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.3, ease }}
          className="relative aspect-[4/5] overflow-hidden rounded-[2rem]"
        >
          <motion.img
            style={{ y }}
            src={IMAGES.about}
            alt="Indian agricultural fields — farm sourcing for international export"
            loading="lazy"
            className="h-[116%] w-full object-cover"
          />
        </motion.div>
        <div>
          <SectionHeading
            eyebrow="About Us"
            title={
              <>
                Growing Partnerships <em className="text-gold">Beyond Borders</em>
              </>
            }
          />
          <Reveal delay={0.1}>
            <p className="mt-8 font-display text-xl leading-snug text-deep md:text-2xl">
              "Connecting Indian agricultural products with international buyers through
              quality-focused product selection and reliable export coordination."
            </p>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              CHINNAGUWALA SHIVAHARI EXPORTS PRIVATE LIMITED (CS Shivahari Exports) focuses on
              connecting authentic Indian agricultural products from our farm networks with
              international buyers. Through trusted grower relationships, quality-focused handling,
              and professional export coordination, the company builds dependable, long-term global
              partnerships.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our approach emphasises agricultural sourcing, specification alignment, buyer-specific
              requirements, and professional export coordination — bringing Indian farm produce to
              global markets with care and reliability.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                ["Vision", "Trusted global partner for Indian agricultural products"],
                ["Mission", "Quality products, long-term value"],
                ["Focus", "International B2B export"],
              ].map(([n, l]) => (
                <div key={n}>
                  <p className="font-display text-lg text-forest font-semibold">{n}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <CTAButton href="#contact" variant="forest">
                Discuss Your Requirements
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Export Process Timeline ──────────────────────────────────────────────────

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-deep py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          light
          eyebrow="Our Process"
          title={
            <>
              From Source <em className="text-gold">to Shipment</em>
            </>
          }
          subtitle="A structured, reliable export coordination process from buyer enquiry to destination delivery."
        />
        <div className="relative mt-16">
          {/* Progress line — desktop horizontal */}
          <div className="absolute top-6 left-6 h-[calc(100%-3rem)] w-px bg-ivory/10 md:top-6 md:left-0 md:h-px md:w-full" />
          <motion.div
            initial={{ scaleX: 0, scaleY: 0 }}
            whileInView={{ scaleX: 1, scaleY: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 2.5, ease }}
            className="absolute top-6 left-6 h-[calc(100%-3rem)] w-px origin-top bg-gradient-gold md:left-0 md:h-px md:w-full md:origin-left"
          />
          <ol className="grid gap-10 md:grid-cols-4 lg:grid-cols-8 md:gap-4">
            {PROCESS_STEPS.map((step, i) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.2 + i * 0.2, duration: 0.7, ease }}
                className="relative flex gap-6 md:flex-col"
              >
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/50 bg-deep font-display text-lg text-gold">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-lg text-ivory leading-snug">{step.title}</h3>
                  <p className="mt-2 text-xs text-ivory/55 leading-relaxed">{step.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose CG Brothers ───────────────────────────────────────────────────

const iconMap = [Leaf, ShieldCheck, CheckCircle2, Package, Globe, HandHeart];

export function WhyUs() {
  return (
    <section id="quality" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading
        eyebrow="Why Choose CG Brothers Exports"
        title={
          <>
            Quality you can <em className="text-gold">depend on.</em>
          </>
        }
        subtitle="Our approach focuses on product reliability, buyer alignment, and transparent export coordination."
      />
      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {WHY_CHOOSE.map(({ title, text }, i) => {
          const Icon = iconMap[i] ?? Award;
          return (
            <Reveal
              key={title}
              delay={(i % 3) * 0.08}
              className="group bg-ivory p-8 transition-colors duration-300 hover:bg-card md:p-10"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cream text-forest transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-2xl text-deep">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

// ─── Export Markets ───────────────────────────────────────────────────────────

export function Season() {
  return (
    <section id="markets" className="px-5 md:px-8 py-6">
      <div className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-forest">
        {/* Background imagery */}
        <div className="relative z-10 p-8 md:p-16">
          <p className="eyebrow text-gold">Export Markets</p>
          <h2 className="mt-4 text-4xl text-ivory md:text-5xl">
            Connecting India <em className="text-gold">With the World</em>
          </h2>
          <p className="mt-4 max-w-xl text-sm text-ivory/70 leading-relaxed">
            CHINNAGUWALA SHIVAHARI EXPORTS PRIVATE LIMITED aims to serve international buyers across
            multiple continents. The markets below represent target and potential export
            destinations, subject to product eligibility and destination import requirements.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {EXPORT_REGIONS.map((region) => (
              <div
                key={region.region}
                className="rounded-2xl border border-ivory/15 bg-ivory/5 p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-gold shrink-0" />
                  <p className="text-sm font-semibold text-ivory">{region.region}</p>
                </div>
                <ul className="space-y-1">
                  {region.examples.map((c) => (
                    <li key={c} className="text-xs text-ivory/60">
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[0.6rem] text-gold/70 uppercase tracking-wider">
                  {region.note}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <CTAButton
              message="Hello, I would like to discuss export requirements for your region."
              href={whatsappLink(
                "Hello, I would like to discuss export requirements for your region.",
              )}
            >
              Discuss Your Requirements
            </CTAButton>
          </div>
        </div>

        {/* Decorative globe */}
        <div className="pointer-events-none absolute right-8 top-8 opacity-5 hidden lg:block">
          <Globe className="h-64 w-64 text-ivory" />
        </div>
      </div>
    </section>
  );
}
