import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileCheck2,
  Building2,
  Calendar,
  CheckCircle2,
  FileText,
  ExternalLink,
  Award,
  Globe2,
} from "lucide-react";
import { SITE } from "@/config/site";
import { Reveal, SectionHeading } from "@/components/primitives";

const complianceDetails = [
  {
    icon: ShieldCheck,
    title: "FSSAI Central License",
    value: SITE.FSSAI_LICENSE_NUMBER,
    sub: `Issued by ${SITE.FSSAI_ISSUING_AUTHORITY} (Category: ${SITE.FSSAI_LICENSE_CATEGORY})`,
  },
  {
    icon: Calendar,
    title: "License Validity Period",
    value: `${SITE.FSSAI_ISSUED_ON} to ${SITE.FSSAI_VALID_UPTO}`,
    sub: "Annual Fee Paid Upto Date Verified on FoSCoS portal",
  },
  {
    icon: Globe2,
    title: "DGFT Import Export Code (IEC)",
    value: SITE.DGFT_IEC_CODE,
    sub: `Company: ${SITE.BUSINESS_NAME}`,
  },
  {
    icon: Building2,
    title: "Authorized Premises",
    value: "Madanapalle, Andhra Pradesh",
    sub: SITE.AUTHORIZED_PREMISES,
  },
];

const fssaiCategories = [
  { code: "04", name: "Fruits and Vegetables, Nuts and Seeds, Fresh Pulses & Legumes" },
  { code: "06", name: "Cereals and Cereal Products, Derived from Grains, Pulses & Legumes" },
  { code: "12", name: "Salts, Spices, Soups, Sauces, Seasonings and Protein Products" },
  { code: "13", name: "Foodstuffs Intended for Particular Nutritional Uses (Herbal & Moringa)" },
  { code: "14", name: "Beverages, Excluding Dairy Products (Juices & Concentrates)" },
  { code: "16", name: "Prepared Foods, Pastes, Purees & Processed Food Products" },
  { code: "11", name: "Sweeteners, Including Honey & Sugarcane Products" },
  { code: "100", name: "Standardised Food Products (Covered Under FSS Act 2006 Standards)" },
];

export function Compliance() {
  return (
    <section id="compliance" className="bg-ivory py-24 md:py-36 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Government Certifications & Compliance"
          title={
            <>
              FSSAI Central License &amp;{" "}
              <em className="text-gold font-serif">Export Credentials</em>
            </>
          }
          subtitle="CHINNAGUWALA SHIVAHARI EXPORTS PRIVATE LIMITED operates under central statutory licensing from the Food Safety and Standards Authority of India (FSSAI) and the Directorate General of Foreign Trade (DGFT)."
        />

        {/* 4 Key License Metric Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {complianceDetails.map(({ icon: Icon, title, value, sub }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/50">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest/10 text-forest mb-4">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="text-xs font-semibold text-gold uppercase tracking-wider">{title}</p>
                <h3 className="mt-1.5 text-lg font-bold text-deep font-sans">{value}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed mt-auto pt-2">
                  {sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Official FSSAI Central License Document Banner */}
        <Reveal delay={0.2}>
          <div className="mt-10 overflow-hidden rounded-3xl border border-forest/30 bg-gradient-to-br from-forest/5 via-cream/40 to-ivory p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-forest text-ivory px-3.5 py-1 text-xs font-bold uppercase tracking-wide">
                  <Award className="h-3.5 w-3.5" />
                  <span>Verified Government Credential · Form C</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-deep font-sans">
                  FSSAI Central License No: {SITE.FSSAI_LICENSE_NUMBER}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
                  Authorized for <strong className="text-deep">Trader/Merchant Exporter</strong>,
                  Importer, Wholesaler, Distributor and Retailer activities under the Food Safety
                  and Standards Act, 2006.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/fssai_central_license.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-xs font-semibold text-ivory transition-all hover:bg-forest/90 shadow-md hover:-translate-y-0.5"
                >
                  <FileText className="h-4 w-4" />
                  <span>View Full FSSAI License PDF</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                </a>
              </div>
            </div>

            {/* Product Annexure Highlights */}
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-xs font-bold text-deep uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-forest" />
                <span>Authorized Food Product Categories Under Central License Annexure:</span>
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {fssaiCategories.map(({ code, name }) => (
                  <div
                    key={code}
                    className="flex items-start gap-2.5 rounded-2xl border border-border/80 bg-background/80 p-3 text-xs"
                  >
                    <span className="shrink-0 rounded-lg bg-forest/10 px-2 py-0.5 font-bold text-forest">
                      Cat {code}
                    </span>
                    <span className="text-muted-foreground leading-snug">{name}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[0.72rem] text-muted-foreground italic">
                * Note: Non-food items (such as Bamboo Products, Packaging Solutions, and Medical
                Supplies) are exported under DGFT IE Code registration and destination import
                standards, and are clearly distinguished from FSSAI food items.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
