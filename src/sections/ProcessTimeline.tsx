import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Compass,
  Ship,
  MapPin,
  ShieldCheck,
  PackageCheck,
  FileText,
  Search,
  Scale,
  Sparkles,
  Layers,
  Clock,
  ArrowRight,
} from "lucide-react";
import { SectionHeading, ease } from "@/components/primitives";
import { PROCESS_STEPS } from "@/data/content";

// Rich B2B checkpoints for each stage
const STAGE_DETAILS: Record<
  number,
  {
    category: string;
    icon: typeof Search;
    checkpoints: string[];
    timeline: string;
    keyMetric: string;
  }
> = {
  1: {
    category: "Initial Buyer Engagement",
    icon: Search,
    checkpoints: [
      "Product specification, variety, and grade requirements analysis",
      "Volume, packaging format, and destination port feasibility review",
      "Official B2B quotation, payment terms, and delivery timeline alignment",
    ],
    timeline: "Day 1 – 2",
    keyMetric: "Rapid 24h Inquiry Response",
  },
  2: {
    category: "Farm & Supplier Sourcing",
    icon: Scale,
    checkpoints: [
      "Direct engagement with certified agricultural grower networks in Andhra Pradesh and across India",
      "Crop harvest verification, batch availability, and freshness assessment",
      "Transparent farm-gate price structuring for international competitiveness",
    ],
    timeline: "Day 3 – 5",
    keyMetric: "Direct Farm-Origin Sourcing",
  },
  3: {
    category: "Specifications Alignment",
    icon: FileText,
    checkpoints: [
      "Rigorous alignment on size, moisture percentage, color, and purity tolerance",
      "Formal Proforma Invoice (PI) and sales contract execution",
      "Buyer-specific quality inspection protocols and packing standards sign-off",
    ],
    timeline: "Day 5 – 7",
    keyMetric: "Zero-Discrepancy Contracts",
  },
  4: {
    category: "Quality Grading & Sorting",
    icon: ShieldCheck,
    checkpoints: [
      "Rigorous origin-level quality sorting, grading, and foreign matter removal",
      "FSSAI Central License 10126999000631 compliance verification",
      "Pre-shipment batch testing and high-resolution photo/video confirmation",
    ],
    timeline: "Day 7 – 10",
    keyMetric: "100% Export-Grade Standards",
  },
  5: {
    category: "Export Packaging & Labelling",
    icon: PackageCheck,
    checkpoints: [
      "Food-grade corrugated cartons, ventilated CFB boxes, or bulk PP woven bags",
      "Buyer-specified private label branding, barcodes, batch codes, and traceability marks",
      "Palletization with corner protectors, shrink-wrapping, and strapping",
    ],
    timeline: "Day 10 – 12",
    keyMetric: "Export-Standard Packaging",
  },
  6: {
    category: "Regulatory Documentation",
    icon: FileText,
    checkpoints: [
      "Phytosanitary Certificate issuance from authorized plant quarantine authorities",
      "Certificate of Origin, Commercial Invoice, and itemized Packing List",
      "Customs shipping bill filing, fumigation certificates, and test reports",
    ],
    timeline: "Day 12 – 14",
    keyMetric: "Full Regulatory Compliance",
  },
  7: {
    category: "Container Logistics & Dispatch",
    icon: Ship,
    checkpoints: [
      "Container stuffing under trained supervision at JNPT, Chennai, or Krishnapatnam port",
      "Reefer temperature monitoring (-0.5°C to +14°C) for perishables and fruit consignments",
      "Ocean Bill of Lading (B/L) / Air Waybill (AWB) issuance and dispatch tracking",
    ],
    timeline: "Day 14 – 16",
    keyMetric: "Direct Major Seaport Linkage",
  },
  8: {
    category: "Destination Arrival & Handover",
    icon: MapPin,
    checkpoints: [
      "Continuous live GPS vessel tracking and proactive ETA milestone updates",
      "Destination customs broker coordination and import clearance assistance",
      "Final delivery handover at consignee warehouse / destination terminal",
    ],
    timeline: "Day 18 – 28",
    keyMetric: "Guaranteed Global Port Delivery",
  },
};

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [hasAnimatedIn, setHasAnimatedIn] = useState<boolean>(false);
  const [destinationMode, setDestinationMode] = useState<"europe" | "middle-east" | "southeast-asia">("europe");

  // One-time smooth entry animation when section enters viewport
  // NOTE: This does NOT listen to continuous scroll scrubbing!
  // Scrolling up, down, or outside the section NEVER disrupts or changes the active state.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !hasAnimatedIn) {
          setHasAnimatedIn(true);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimatedIn]);

  // Destination route definitions for Stage 08 world map
  const routes = {
    europe: {
      name: "Rotterdam / Hamburg / Felixstowe",
      region: "European Union & United Kingdom",
      destX: 430,
      destY: 150,
      routePath: "M 630 265 Q 520 220, 480 190 T 430 150",
      transitTime: "18 – 22 Days",
      seaPort: "JNPT / Krishnapatnam → Port of Rotterdam",
    },
    "middle-east": {
      name: "Jebel Ali / Dubai / Doha",
      region: "Gulf GCC Region",
      destX: 515,
      destY: 215,
      routePath: "M 630 265 Q 570 240, 515 215",
      transitTime: "4 – 7 Days",
      seaPort: "Krishnapatnam / Chennai → Jebel Ali Port",
    },
    "southeast-asia": {
      name: "Singapore / Port Klang",
      region: "ASEAN Markets",
      destX: 740,
      destY: 295,
      routePath: "M 630 265 Q 685 280, 740 295",
      transitTime: "5 – 8 Days",
      seaPort: "Chennai Port → Port of Singapore",
    },
  };

  const currentRoute = routes[destinationMode];
  const defaultStep = PROCESS_STEPS[0] as (typeof PROCESS_STEPS)[0];
  const defaultDetail = STAGE_DETAILS[1] as (typeof STAGE_DETAILS)[1];
  const stepData = PROCESS_STEPS[activeStep - 1] ?? defaultStep;
  const detailData = STAGE_DETAILS[activeStep] ?? defaultDetail;
  const StepIcon = detailData.icon;

  const nextStep = () => {
    setActiveStep((prev) => (prev < 8 ? prev + 1 : 1));
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev > 1 ? prev - 1 : 8));
  };

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden bg-deep py-24 md:py-36 text-ivory"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.08),transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-36 -right-36 h-96 w-96 rounded-full bg-forest/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            light
            eyebrow="Our Process"
            title={
              <>
                From Source <em className="text-gold italic font-serif">to Shipment</em>
              </>
            }
            subtitle="A structured, reliable export coordination process from buyer enquiry to destination delivery."
          />

          {/* Stepper Status Pill */}
          <div className="flex items-center gap-3 shrink-0 pb-2">
            <span className="flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
              </span>
              Stage {String(activeStep).padStart(2, "0")} of 08 · {stepData.title}
            </span>

            <button
              onClick={() => setActiveStep(8)}
              className="flex items-center gap-1.5 rounded-full border border-ivory/20 bg-ivory/5 px-3 py-1.5 text-xs font-medium text-ivory/80 transition-all hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
              title="Jump to Stage 08 Destination Delivery"
            >
              <MapPin className="h-3.5 w-3.5 text-[#E53935]" />
              <span>View Delivery 🌍</span>
            </button>
          </div>
        </div>

        {/* ─── STAGE TRACKER (All 8 stages clearly laid out across top) ─── */}
        <div className="relative mt-14 md:mt-18">
          {/* Desktop Stepper Bar */}
          <div className="hidden lg:block relative">
            {/* Connecting Track Line */}
            <div className="absolute top-6 left-6 right-6 h-[2px] bg-ivory/15 z-0" />

            {/* Golden Active Fill Line */}
            <motion.div
              className="absolute top-6 left-6 h-[2.5px] bg-gradient-to-r from-gold/50 via-gold to-gold shadow-[0_0_12px_rgba(212,175,55,0.7)] z-0"
              initial={{ width: "0%" }}
              animate={{ width: `${((activeStep - 1) / 7) * 100}%` }}
              transition={{ duration: 0.5, ease }}
            />

            {/* 8 Stage Nodes */}
            <ol className="relative z-10 grid grid-cols-8 gap-3">
              {PROCESS_STEPS.map((step, i) => {
                const stepNum = i + 1;
                const isPassed = stepNum < activeStep;
                const isActive = stepNum === activeStep;

                return (
                  <li
                    key={step.number}
                    onClick={() => setActiveStep(stepNum)}
                    className="group relative flex flex-col items-center text-center cursor-pointer transition-all duration-300"
                  >
                    {/* Circle Node Button */}
                    <button
                      type="button"
                      aria-label={`Select Stage ${step.number}: ${step.title}`}
                      className={`relative grid h-12 w-12 place-items-center rounded-full font-display text-base transition-all duration-300 ${
                        isActive
                          ? "border-2 border-gold bg-forest text-gold ring-4 ring-gold/25 shadow-[0_0_22px_rgba(212,175,55,0.6)] scale-110"
                          : isPassed
                          ? "border border-gold/70 bg-deep text-gold shadow-sm hover:scale-105"
                          : "border border-ivory/25 bg-deep/90 text-ivory/40 hover:border-gold/50 hover:text-ivory/80"
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="h-5 w-5 text-gold" />
                      ) : (
                        <span className="font-semibold">{step.number}</span>
                      )}

                      {/* Active Pulse Ring */}
                      {isActive && (
                        <span className="absolute inset-0 rounded-full border border-gold animate-ping opacity-60" />
                      )}
                    </button>

                    {/* Step Title Label */}
                    <span
                      className={`mt-3 text-xs leading-snug transition-colors duration-200 line-clamp-2 px-1 ${
                        isActive
                          ? "text-gold font-serif font-bold text-sm"
                          : isPassed
                          ? "text-ivory font-medium"
                          : "text-ivory/50 group-hover:text-ivory/80 font-serif"
                      }`}
                    >
                      {step.title}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Mobile / Tablet Stepper Buttons Carousel */}
          <div className="lg:hidden no-scrollbar flex items-center gap-2 overflow-x-auto pb-2 touch-pan-x">
            {PROCESS_STEPS.map((step, i) => {
              const stepNum = i + 1;
              const isActive = stepNum === activeStep;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(stepNum)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-gold text-deep font-bold shadow-md ring-2 ring-gold/40"
                      : "bg-ivory/5 border border-ivory/15 text-ivory/70 hover:bg-ivory/10"
                  }`}
                >
                  <span className="font-display font-semibold">{step.number}</span>
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── EXPANSIVE 2-COLUMN STAGE SHOWCASE CARD ─── */}
        <div className="mt-8 rounded-3xl border border-ivory/15 bg-gradient-to-b from-[#0b1f16] via-[#07160f] to-deep p-6 md:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
            {/* Left Column: Stage Deep Dive (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col">
              {/* Category Pill & Timeline Estimate */}
              <div className="flex items-center justify-between gap-4 border-b border-ivory/10 pb-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
                  <StepIcon className="h-4 w-4" />
                  <span>{detailData.category}</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-ivory/5 px-2.5 py-1 text-[0.68rem] text-ivory/60 border border-ivory/10">
                  <Clock className="h-3 w-3 text-gold" />
                  <span>{detailData.timeline}</span>
                </div>
              </div>

              {/* Stage Number & Title */}
              <div className="mt-6 flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-2 border-gold/60 bg-forest/80 font-display text-2xl font-bold text-gold shadow-md">
                  {stepData.number}
                </span>
                <div>
                  <span className="text-[0.68rem] font-bold uppercase tracking-widest text-gold/75">
                    Export Phase {stepData.number}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-medium text-ivory">
                    {stepData.title}
                  </h3>
                </div>
              </div>

              {/* Full Description */}
              <p className="mt-4 text-sm leading-relaxed text-ivory/75">
                {stepData.description}
              </p>

              {/* 3 Quality Checkpoints */}
              <div className="mt-6 space-y-2.5 rounded-2xl border border-ivory/10 bg-ivory/[0.02] p-4">
                <p className="text-[0.68rem] font-bold uppercase tracking-wider text-gold/80">
                  Operational Checkpoints & Assurance
                </p>
                {detailData.checkpoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-ivory/85">
                    <CheckCircle2 className="h-4 w-4 text-forest shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Prev / Next Navigation Controls */}
              <div className="mt-6 flex items-center justify-between pt-2">
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 rounded-xl border border-ivory/15 bg-ivory/5 px-4 py-2 text-xs font-medium text-ivory/80 transition-all hover:border-gold/40 hover:bg-ivory/10 hover:text-ivory active:scale-95"
                >
                  <ChevronLeft className="h-4 w-4 text-gold" />
                  <span>Previous Stage</span>
                </button>

                <span className="text-xs text-ivory/50">
                  Step {activeStep} of 8
                </span>

                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 rounded-xl border border-gold/40 bg-gold/15 px-4 py-2 text-xs font-semibold text-gold transition-all hover:bg-gold hover:text-deep active:scale-95 shadow-sm"
                >
                  <span>Next Stage</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Dynamic Visual Engine (7 Cols) */}
            <div className="lg:col-span-7">
              {/* If Stage 07 or 08 is active: Display the Interactive World Map & Route */}
              {activeStep >= 7 ? (
                <div className="overflow-hidden rounded-2xl border border-gold/40 bg-[#06140e] shadow-xl">
                  {/* Map Header with Corridor Tabs */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ivory/10 bg-ivory/[0.02] px-5 py-3">
                    <div className="flex items-center gap-2 text-xs text-gold font-semibold uppercase tracking-wider">
                      <Compass className="h-4 w-4" />
                      <span>Global Shipping Corridor · Port Delivery</span>
                    </div>

                    <div className="flex items-center gap-1 rounded-lg bg-deep/80 p-0.5 border border-ivory/15 text-[0.7rem]">
                      <button
                        onClick={() => setDestinationMode("europe")}
                        className={`rounded px-2.5 py-1 font-medium transition-all ${
                          destinationMode === "europe"
                            ? "bg-gold text-deep font-bold shadow"
                            : "text-ivory/60 hover:text-ivory"
                        }`}
                      >
                        Europe
                      </button>
                      <button
                        onClick={() => setDestinationMode("middle-east")}
                        className={`rounded px-2.5 py-1 font-medium transition-all ${
                          destinationMode === "middle-east"
                            ? "bg-gold text-deep font-bold shadow"
                            : "text-ivory/60 hover:text-ivory"
                        }`}
                      >
                        Middle East
                      </button>
                      <button
                        onClick={() => setDestinationMode("southeast-asia")}
                        className={`rounded px-2.5 py-1 font-medium transition-all ${
                          destinationMode === "southeast-asia"
                            ? "bg-gold text-deep font-bold shadow"
                            : "text-ivory/60 hover:text-ivory"
                        }`}
                      >
                        SE Asia
                      </button>
                    </div>
                  </div>

                  {/* SVG Map Canvas */}
                  <div className="relative aspect-[16/9] w-full flex items-center justify-center p-2">
                    {/* Background coordinate grid */}
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, rgba(212,175,55,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.2) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    />

                    <svg viewBox="0 0 1000 450" className="h-full w-full object-contain pointer-events-none">
                      <defs>
                        <linearGradient id="corridorGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                          <stop offset="60%" stopColor="#E8C547" stopOpacity="1" />
                          <stop offset="100%" stopColor="#E53935" stopOpacity="1" />
                        </linearGradient>
                        <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.7" />
                        </filter>
                      </defs>

                      {/* Continents Outlines */}
                      <g fill="rgba(244, 240, 230, 0.04)" stroke="rgba(212, 175, 55, 0.25)" strokeWidth="1">
                        <path d="M 370 120 Q 400 110, 440 130 T 470 180 Q 440 200, 390 190 T 370 120 Z" />
                        <path d="M 370 200 Q 450 190, 520 220 T 500 300 Q 400 310, 370 240 Z" />
                        <path d="M 480 200 Q 530 195, 560 220 T 530 270 Q 490 260, 480 200 Z" />
                        <path d="M 590 210 Q 640 210, 670 235 T 645 320 Q 620 330, 605 280 T 590 210 Z" />
                        <path d="M 680 180 Q 780 170, 840 210 T 800 310 Q 750 330, 710 260 Z" />
                      </g>

                      {/* Origin: Andhra Pradesh, India */}
                      <g transform="translate(630, 265)">
                        <circle r="16" fill="#D4AF37" opacity="0.25" className="animate-ping" />
                        <circle r="6" fill="#D4AF37" stroke="#07150F" strokeWidth="2" />
                        <text
                          x="12"
                          y="4"
                          fill="#E8C547"
                          fontSize="11"
                          fontFamily="Manrope, sans-serif"
                          fontWeight="700"
                        >
                          ORIGIN: Andhra Pradesh, India
                        </text>
                      </g>

                      {/* Golden Route Line Arc */}
                      <path
                        d={currentRoute.routePath}
                        fill="none"
                        stroke="url(#corridorGrad)"
                        strokeWidth="3.5"
                        strokeDasharray="6,6"
                      />

                      {/* Moving Waypoint Indicator */}
                      <circle
                        cx={(630 + currentRoute.destX) / 2}
                        cy={(265 + currentRoute.destY) / 2}
                        r="4.5"
                        fill="#E8C547"
                        className="animate-pulse"
                      />

                      {/* RED Destination Pin (#E53935) */}
                      <g transform={`translate(${currentRoute.destX}, ${currentRoute.destY})`}>
                        {/* Ripple Impact Waves */}
                        <circle
                          r="22"
                          fill="none"
                          stroke="#E53935"
                          strokeWidth="1.5"
                          opacity="0.6"
                          className="animate-ping"
                        />
                        <circle
                          r="34"
                          fill="none"
                          stroke="#D4AF37"
                          strokeWidth="1"
                          opacity="0.3"
                        />

                        {/* Ground Shadow */}
                        <ellipse cx="0" cy="2" rx="7" ry="2.5" fill="#000000" opacity="0.6" />

                        {/* Red Pin Drop */}
                        <motion.g
                          filter="url(#pinShadow)"
                          initial={{ y: -35, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 260, damping: 15 }}
                        >
                          <path
                            d="M 0 -28 C -7 -28, -12 -23, -12 -16 C -12 -8, 0 0, 0 0 C 0 0, 12 -8, 12 -16 C 12 -23, 7 -28, 0 -28 Z"
                            fill="#E53935"
                            stroke="#FFFFFF"
                            strokeWidth="1.2"
                          />
                          <circle cx="0" cy="-17" r="4" fill="#FFFFFF" />
                        </motion.g>

                        {/* Destination Tag */}
                        <g>
                          <rect
                            x="16"
                            y="-25"
                            width="215"
                            height="30"
                            rx="6"
                            fill="rgba(8, 22, 16, 0.9)"
                            stroke="#E53935"
                            strokeWidth="1"
                          />
                          <text
                            x="24"
                            y="-13"
                            fill="#FFFFFF"
                            fontSize="10"
                            fontFamily="Manrope, sans-serif"
                            fontWeight="700"
                          >
                            DESTINATION: {currentRoute.name}
                          </text>
                          <text
                            x="24"
                            y="-3"
                            fill="#E8C547"
                            fontSize="8.5"
                            fontFamily="Manrope, sans-serif"
                            fontWeight="600"
                          >
                            ✓ Customs Cleared & Final Delivery Handover
                          </text>
                        </g>
                      </g>
                    </svg>

                    {/* FSSAI Badge */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-deep/90 px-2.5 py-1 text-[0.65rem] text-ivory/70 border border-ivory/15 backdrop-blur">
                      <ShieldCheck className="h-3 w-3 text-gold" />
                      <span>FSSAI Central License 10126999000631</span>
                    </div>
                  </div>

                  {/* Route Summary Details */}
                  <div className="grid grid-cols-2 gap-px border-t border-ivory/10 bg-ivory/10 text-xs">
                    <div className="bg-[#06140e] p-3.5">
                      <span className="text-[0.68rem] font-bold text-gold/80 uppercase">Logistics Corridor</span>
                      <p className="mt-0.5 font-medium text-ivory">{currentRoute.seaPort}</p>
                    </div>
                    <div className="bg-[#06140e] p-3.5">
                      <span className="text-[0.68rem] font-bold text-[#E53935] uppercase">Transit & Handover</span>
                      <p className="mt-0.5 font-medium text-ivory">{currentRoute.region} · {currentRoute.transitTime}</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Stages 01 to 06: Visual Agricultural Quality & Sourcing Architecture Card */
                <div className="relative overflow-hidden rounded-2xl border border-ivory/15 bg-gradient-to-br from-[#0c241a] to-[#07160f] p-6 md:p-8">
                  <div className="flex items-center justify-between border-b border-ivory/10 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/15 text-gold border border-gold/30">
                        <Layers className="h-4 w-4" />
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                        Export Sourcing Workflow
                      </span>
                    </div>
                    <span className="rounded-full bg-forest/40 border border-forest px-2.5 py-0.5 text-[0.68rem] text-gold font-medium">
                      Stage {activeStep} of 8
                    </span>
                  </div>

                  {/* Animated Central Node Representation */}
                  <div className="mt-6 flex flex-col items-center justify-center text-center py-6">
                    <div className="relative">
                      <div className="grid h-20 w-20 place-items-center rounded-3xl border-2 border-gold bg-deep text-gold shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                        <StepIcon className="h-9 w-9 text-gold" />
                      </div>
                      <span className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-forest text-[0.7rem] font-bold text-ivory border border-gold">
                        0{activeStep}
                      </span>
                    </div>

                    <h4 className="mt-4 font-serif text-xl font-medium text-ivory">
                      {stepData.title}
                    </h4>
                    <p className="mt-1 max-w-md text-xs text-ivory/65 leading-relaxed">
                      {detailData.keyMetric}
                    </p>
                  </div>

                  {/* 3 Step Progression Mini-Flow */}
                  <div className="mt-6 grid grid-cols-3 gap-2 border-t border-ivory/10 pt-4 text-center">
                    <div className={`rounded-xl p-2.5 border transition-all ${activeStep === 1 ? 'border-gold bg-gold/10' : 'border-ivory/10 bg-ivory/[0.02]'}`}>
                      <span className="text-[0.62rem] font-semibold uppercase text-gold">1. Source</span>
                      <p className="mt-0.5 text-xs text-ivory/80 font-medium">Farms & Growers</p>
                    </div>
                    <div className={`rounded-xl p-2.5 border transition-all ${activeStep >= 2 && activeStep <= 5 ? 'border-gold bg-gold/10' : 'border-ivory/10 bg-ivory/[0.02]'}`}>
                      <span className="text-[0.62rem] font-semibold uppercase text-gold">2. Grade & Pack</span>
                      <p className="mt-0.5 text-xs text-ivory/80 font-medium">FSSAI Certified</p>
                    </div>
                    <div className={`rounded-xl p-2.5 border transition-all ${activeStep >= 6 ? 'border-gold bg-gold/10' : 'border-ivory/10 bg-ivory/[0.02]'}`}>
                      <span className="text-[0.62rem] font-semibold uppercase text-gold">3. Dispatch</span>
                      <p className="mt-0.5 text-xs text-ivory/80 font-medium">Port Logistics</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
