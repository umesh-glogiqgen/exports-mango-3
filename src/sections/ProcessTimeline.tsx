import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckCircle2,
  Ship,
  Plane,
  Anchor,
  Play,
  RotateCcw,
  Sparkles,
  MapPin,
  ShieldCheck,
  PackageCheck,
  Clock,
  Compass,
} from "lucide-react";
import { SectionHeading, ease } from "@/components/primitives";
import { PROCESS_STEPS } from "@/data/content";

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [autoPlaying, setAutoPlaying] = useState<boolean>(false);
  const [hasReachedEnd, setHasReachedEnd] = useState<boolean>(false);
  const [destinationMode, setDestinationMode] = useState<"europe" | "middle-east" | "southeast-asia">("europe");

  // GSAP ScrollTrigger Integration
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        setActiveStep(8);
        setHasReachedEnd(true);
        return;
      }

      ScrollTrigger.create({
        trigger: el,
        start: "top 65%",
        end: "bottom 35%",
        scrub: 0.5,
        onUpdate: (self) => {
          // Map progress 0 -> 1 to steps 1 -> 8
          const step = Math.min(
            8,
            Math.max(1, Math.floor(self.progress * 8) + 1)
          );
          setActiveStep(step);
          if (step === 8) {
            setHasReachedEnd(true);
          }
        },
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, []);

  // Automated cinematic playback
  useEffect(() => {
    if (!autoPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= 8) {
          setAutoPlaying(false);
          setHasReachedEnd(true);
          return 8;
        }
        if (prev + 1 === 8) {
          setHasReachedEnd(true);
        }
        return prev + 1;
      });
    }, 1100);

    return () => clearInterval(interval);
  }, [autoPlaying]);

  const handleReplay = () => {
    setActiveStep(1);
    setHasReachedEnd(false);
    setAutoPlaying(true);
  };

  // Route coordinates for destinations
  const routes = {
    europe: {
      destName: "Rotterdam / Hamburg / Felixstowe",
      destRegion: "European Union & UK",
      destX: 430,
      destY: 155,
      routePath: "M 630 265 Q 520 220, 480 200 T 430 155",
      transitTime: "18 - 22 Days",
      seaPort: "JNPT / Krishnapatnam → Port of Rotterdam",
    },
    "middle-east": {
      destName: "Jebel Ali / Dubai / Doha",
      destRegion: "Gulf GCC Region",
      destX: 515,
      destY: 220,
      routePath: "M 630 265 Q 570 240, 515 220",
      transitTime: "4 - 7 Days",
      seaPort: "Krishnapatnam / Chennai → Jebel Ali Port",
    },
    "southeast-asia": {
      destName: "Singapore / Port Klang",
      destRegion: "ASEAN Markets",
      destX: 740,
      destY: 300,
      routePath: "M 630 265 Q 685 285, 740 300",
      transitTime: "5 - 8 Days",
      seaPort: "Chennai Port → Port of Singapore",
    },
  };

  const currentRoute = routes[destinationMode];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden bg-deep py-24 md:py-36 text-ivory"
    >
      {/* Background radial atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.09),transparent_65%)]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-forest/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Phase 1: Section Header Reveal */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            light
            eyebrow="Our Export Journey"
            title={
              <>
                From Source <em className="text-gold italic font-serif">to Shipment</em>
              </>
            }
            subtitle="A structured, reliable export coordination process from buyer enquiry to destination delivery."
          />

          {/* Cinematic Interactive Controls */}
          <div className="flex items-center gap-3 shrink-0 pb-2">
            <span className="flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold text-gold shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
              </span>
              Stage {String(activeStep).padStart(2, "0")} of 08 · {PROCESS_STEPS[activeStep - 1]?.title}
            </span>

            <button
              onClick={handleReplay}
              className="group flex items-center gap-1.5 rounded-full border border-ivory/20 bg-ivory/5 px-3 py-1.5 text-xs font-medium text-ivory/80 transition-all hover:border-gold/50 hover:bg-gold/10 hover:text-gold active:scale-95"
              title="Replay entire export journey animation"
            >
              <RotateCcw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-180 text-gold" />
              <span>Replay</span>
            </button>
          </div>
        </div>

        {/* Phase 2 & 3: Main Timeline with Golden Progress Line */}
        <div className="relative mt-16 md:mt-20">
          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Background Track Line */}
            <div className="absolute top-6 left-0 right-0 h-[2px] bg-ivory/10 z-0" />

            {/* Dynamic Golden Progress Line */}
            <div
              className="absolute top-6 left-0 h-[2.5px] bg-gradient-to-r from-gold/50 via-gold to-gold shadow-[0_0_12px_rgba(212,175,55,0.7)] transition-all duration-700 ease-out z-0"
              style={{
                width: `${((activeStep - 1) / 7) * 100}%`,
              }}
            />

            {/* 8 Timeline Nodes Grid */}
            <ol className="relative z-10 grid grid-cols-8 gap-3">
              {PROCESS_STEPS.map((step, i) => {
                const stepNum = i + 1;
                const isPassed = stepNum < activeStep;
                const isActive = stepNum === activeStep;
                const isFuture = stepNum > activeStep;

                return (
                  <li
                    key={step.number}
                    onClick={() => setActiveStep(stepNum)}
                    className="group relative flex flex-col cursor-pointer transition-all duration-300"
                  >
                    {/* Circle Node */}
                    <div className="relative mb-5 flex items-center">
                      <div
                        className={`relative grid h-12 w-12 place-items-center rounded-full font-display text-base transition-all duration-500 ${
                          isActive
                            ? "border-2 border-gold bg-forest text-gold ring-4 ring-gold/25 shadow-[0_0_22px_rgba(212,175,55,0.6)] scale-110"
                            : isPassed
                            ? "border border-gold/70 bg-deep text-gold shadow-sm"
                            : "border border-ivory/20 bg-deep/80 text-ivory/30 group-hover:border-ivory/40"
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
                      </div>
                    </div>

                    {/* Step Title & Description */}
                    <div className="pr-2">
                      <h3
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-gold font-serif font-bold text-base"
                            : isPassed
                            ? "text-ivory font-serif"
                            : "text-ivory/50 group-hover:text-ivory/80 font-serif"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`mt-2 text-[0.72rem] leading-relaxed transition-colors duration-300 ${
                          isActive
                            ? "text-ivory/90 font-medium"
                            : isPassed
                            ? "text-ivory/65"
                            : "text-ivory/35"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Active Indicator Underline */}
                    {isActive && (
                      <motion.div
                        layoutId="active-step-bar"
                        className="mt-3 h-0.5 w-8 bg-gold rounded-full"
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Mobile & Tablet Vertical Timeline */}
          <div className="lg:hidden relative pl-8 border-l border-ivory/15 space-y-8">
            {/* Mobile Vertical Golden Progress Fill */}
            <div
              className="absolute top-0 left-[-1px] w-[2px] bg-gradient-to-b from-gold/50 via-gold to-gold shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all duration-700 ease-out"
              style={{
                height: `${((activeStep - 1) / 7) * 100}%`,
              }}
            />

            {PROCESS_STEPS.map((step, i) => {
              const stepNum = i + 1;
              const isPassed = stepNum < activeStep;
              const isActive = stepNum === activeStep;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(stepNum)}
                  className="relative flex items-start gap-4 cursor-pointer"
                >
                  {/* Vertical Node Indicator */}
                  <div
                    className={`absolute -left-[45px] grid h-8 w-8 place-items-center rounded-full text-xs font-display transition-all duration-300 ${
                      isActive
                        ? "border-2 border-gold bg-forest text-gold ring-4 ring-gold/25 shadow-md scale-110"
                        : isPassed
                        ? "border border-gold bg-deep text-gold"
                        : "border border-ivory/20 bg-deep text-ivory/40"
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle2 className="h-4 w-4 text-gold" />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <h3
                      className={`text-base font-serif ${
                        isActive
                          ? "text-gold font-bold"
                          : isPassed
                          ? "text-ivory"
                          : "text-ivory/50"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`mt-1 text-xs leading-relaxed ${
                        isActive ? "text-ivory/90" : "text-ivory/50"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phase 4: Special Destination Animation Card: Delivery 🌍 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className={`mt-16 md:mt-24 overflow-hidden rounded-3xl border transition-all duration-700 ${
            activeStep >= 7
              ? "border-gold/60 bg-gradient-to-b from-[#0e271c] via-[#091a13] to-deep shadow-[0_12px_45px_-10px_rgba(212,175,55,0.25)] ring-1 ring-gold/20"
              : "border-ivory/15 bg-ivory/5"
          }`}
        >
          {/* Card Top Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ivory/10 px-6 py-4 md:px-8 bg-ivory/[0.02]">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold/15 text-gold border border-gold/30">
                <Compass className="h-5 w-5" />
              </span>
              <div>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">
                  Global Logistics Corridor · Stage 08 Destination Handover
                </span>
                <h4 className="text-base font-serif font-medium text-ivory">
                  From Indian Source to International Seaports
                </h4>
              </div>
            </div>

            {/* Destination Selector Tabs */}
            <div className="flex items-center gap-1.5 rounded-xl bg-deep/80 p-1 border border-ivory/15 text-xs">
              <button
                onClick={() => setDestinationMode("europe")}
                className={`rounded-lg px-3 py-1 font-medium transition-all ${
                  destinationMode === "europe"
                    ? "bg-gold text-deep font-semibold shadow"
                    : "text-ivory/60 hover:text-ivory hover:bg-ivory/5"
                }`}
              >
                Europe (EU & UK)
              </button>
              <button
                onClick={() => setDestinationMode("middle-east")}
                className={`rounded-lg px-3 py-1 font-medium transition-all ${
                  destinationMode === "middle-east"
                    ? "bg-gold text-deep font-semibold shadow"
                    : "text-ivory/60 hover:text-ivory hover:bg-ivory/5"
                }`}
              >
                Middle East (GCC)
              </button>
              <button
                onClick={() => setDestinationMode("southeast-asia")}
                className={`rounded-lg px-3 py-1 font-medium transition-all ${
                  destinationMode === "southeast-asia"
                    ? "bg-gold text-deep font-semibold shadow"
                    : "text-ivory/60 hover:text-ivory hover:bg-ivory/5"
                }`}
              >
                Southeast Asia
              </button>
            </div>
          </div>

          {/* Interactive World Map & Route Simulation */}
          <div className="relative p-4 md:p-8">
            <div className="relative aspect-[21/9] min-h-[300px] w-full overflow-hidden rounded-2xl border border-ivory/10 bg-[#06140e] flex items-center justify-center">
              {/* Subtle map coordinate grid lines */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(212,175,55,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.2) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />

              {/* Minimalist World Map Vector Graphic */}
              <svg
                viewBox="0 0 1000 450"
                className="h-full w-full object-contain pointer-events-none select-none"
              >
                <defs>
                  {/* Golden Route Gradient */}
                  <linearGradient id="routeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#E8C547" stopOpacity="1" />
                    <stop offset="100%" stopColor="#E53935" stopOpacity="1" />
                  </linearGradient>

                  {/* Red Drop Pin Shadow Filter */}
                  <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.6" />
                  </filter>
                </defs>

                {/* Stylized Continents Outlines (Minimalist Geo) */}
                <g fill="rgba(244, 240, 230, 0.04)" stroke="rgba(212, 175, 55, 0.22)" strokeWidth="1">
                  {/* Western Europe */}
                  <path d="M 370 120 Q 400 110, 440 130 T 470 180 Q 440 200, 390 190 T 370 120 Z" />
                  {/* Mediterranean & North Africa */}
                  <path d="M 370 200 Q 450 190, 520 220 T 500 300 Q 400 310, 370 240 Z" />
                  {/* Middle East & Arabian Peninsula */}
                  <path d="M 480 200 Q 530 195, 560 220 T 530 270 Q 490 260, 480 200 Z" />
                  {/* Indian Subcontinent */}
                  <path d="M 590 210 Q 640 210, 670 235 T 645 320 Q 620 330, 605 280 T 590 210 Z" />
                  {/* East / Southeast Asia */}
                  <path d="M 680 180 Q 780 170, 840 210 T 800 310 Q 750 330, 710 260 Z" />
                </g>

                {/* India Origin Point Marker */}
                <g transform="translate(630, 265)">
                  {/* Origin Pulse */}
                  <circle r="14" fill="#D4AF37" opacity="0.25" className="animate-ping" />
                  <circle r="6" fill="#D4AF37" stroke="#07150F" strokeWidth="2" />
                  <text
                    x="12"
                    y="4"
                    fill="#E8C547"
                    fontSize="11"
                    fontFamily="Manrope, sans-serif"
                    fontWeight="600"
                    letterSpacing="0.05em"
                  >
                    ORIGIN: Andhra Pradesh, India
                  </text>
                </g>

                {/* Animated Golden Shipping Corridor Route */}
                {activeStep >= 7 && (
                  <motion.path
                    d={currentRoute.routePath}
                    fill="none"
                    stroke="url(#routeGrad)"
                    strokeWidth="3"
                    strokeDasharray="6,6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.4, ease: "easeInOut" }}
                  />
                )}

                {/* Moving Transit Waypoint (Ship/Plane) */}
                {activeStep >= 7 && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <circle
                      cx={(630 + currentRoute.destX) / 2}
                      cy={(265 + currentRoute.destY) / 2}
                      r="4"
                      fill="#E8C547"
                      className="animate-pulse"
                    />
                  </motion.g>
                )}

                {/* Stage 08 Destination Pin Drop Animation */}
                <g transform={`translate(${currentRoute.destX}, ${currentRoute.destY})`}>
                  {/* Landing impact ripples when stage 08 or end is active */}
                  {activeStep === 8 && (
                    <>
                      <circle
                        r="24"
                        fill="none"
                        stroke="#E53935"
                        strokeWidth="1.5"
                        opacity="0.6"
                        className="animate-ping"
                      />
                      <circle
                        r="38"
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="1"
                        opacity="0.3"
                      />
                    </>
                  )}

                  {/* Ground Shadow underneath the pin */}
                  <ellipse
                    cx="0"
                    cy="2"
                    rx={activeStep === 8 ? "8" : "3"}
                    ry={activeStep === 8 ? "3" : "1.5"}
                    fill="#000000"
                    opacity="0.5"
                  />

                  {/* RED Destination Location Pin (#E53935) */}
                  <motion.g
                    filter="url(#pinShadow)"
                    initial={{ y: -50, opacity: 0, scale: 0.5 }}
                    animate={
                      activeStep === 8
                        ? { y: 0, opacity: 1, scale: 1 }
                        : { y: -20, opacity: 0.4, scale: 0.8 }
                    }
                    transition={{
                      type: "spring",
                      damping: 12,
                      stiffness: 220,
                      mass: 0.8,
                    }}
                  >
                    {/* SVG Map Pin Path */}
                    <path
                      d="M 0 -28 C -7 -28, -12 -23, -12 -16 C -12 -8, 0 0, 0 0 C 0 0, 12 -8, 12 -16 C 12 -23, 7 -28, 0 -28 Z"
                      fill="#E53935"
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                    />
                    {/* Pin Center Dot */}
                    <circle cx="0" cy="-17" r="4" fill="#FFFFFF" />
                  </motion.g>

                  {/* Destination Label */}
                  <motion.g
                    initial={{ opacity: 0, x: -10 }}
                    animate={activeStep === 8 ? { opacity: 1, x: 0 } : { opacity: 0.5, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <rect
                      x="16"
                      y="-26"
                      width="210"
                      height="30"
                      rx="6"
                      fill="rgba(10, 28, 20, 0.85)"
                      stroke="#E53935"
                      strokeWidth="1"
                    />
                    <text
                      x="24"
                      y="-14"
                      fill="#FFFFFF"
                      fontSize="10"
                      fontFamily="Manrope, sans-serif"
                      fontWeight="700"
                    >
                      DESTINATION: {currentRoute.destName}
                    </text>
                    <text
                      x="24"
                      y="-3"
                      fill="#E8C547"
                      fontSize="8.5"
                      fontFamily="Manrope, sans-serif"
                      fontWeight="500"
                    >
                      ✓ Customs Cleared & Final Delivery
                    </text>
                  </motion.g>
                </g>
              </svg>

              {/* Watermark badge on bottom right of map */}
              <div className="absolute bottom-3 right-4 flex items-center gap-2 rounded-lg bg-deep/90 px-3 py-1 border border-ivory/15 text-[0.68rem] text-ivory/70 backdrop-blur">
                <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                <span>FSSAI Central License 10126999000631 Certified</span>
              </div>
            </div>

            {/* Bottom 3-Card Summary Strip */}
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-ivory/10 bg-ivory/[0.03] p-4">
                <div className="flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-wider">
                  <PackageCheck className="h-4 w-4" />
                  <span>Sourcing & Quality</span>
                </div>
                <p className="mt-1 text-sm font-serif font-medium text-ivory">
                  100% Export-Grade Inspection
                </p>
                <p className="mt-0.5 text-xs text-ivory/55">
                  Direct farm belts across Andhra Pradesh & pan-India.
                </p>
              </div>

              <div className="rounded-2xl border border-ivory/10 bg-ivory/[0.03] p-4">
                <div className="flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-wider">
                  <Ship className="h-4 w-4" />
                  <span>Port Logistics</span>
                </div>
                <p className="mt-1 text-sm font-serif font-medium text-ivory">
                  {currentRoute.seaPort}
                </p>
                <p className="mt-0.5 text-xs text-ivory/55">
                  Reefer containers, bulk break-bulk, or air cargo logistics.
                </p>
              </div>

              <div className="rounded-2xl border border-gold/30 bg-gold/[0.06] p-4">
                <div className="flex items-center gap-2 text-[#E53935] text-xs font-semibold uppercase tracking-wider">
                  <MapPin className="h-4 w-4 fill-[#E53935] text-ivory" />
                  <span>Destination Arrival</span>
                </div>
                <p className="mt-1 text-sm font-serif font-medium text-ivory">
                  {currentRoute.destRegion} · {currentRoute.transitTime}
                </p>
                <p className="mt-0.5 text-xs text-ivory/55">
                  Full Bill of Lading, Phytosanitary, and customs clearance support.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
