import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";

export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Official Company Logo with authentic emblem from BROTHERS.pdf
 */
export function Logo({ light, className }: { light?: boolean; className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <img
        src="/assets/logo-128.png"
        alt="CHINNAGUWALA SHIVAHARI EXPORTS PRIVATE LIMITED"
        className="h-10 w-10 shrink-0 object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
      />
      {/* Wordmark */}
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl font-semibold tracking-tight",
            light ? "text-ivory" : "text-deep",
          )}
        >
          CS Shivahari
        </span>
        <span
          className={cn(
            "text-[0.6rem] font-sans font-medium tracking-[0.18em] uppercase",
            light ? "text-ivory/60" : "text-muted-foreground",
          )}
        >
          Exports Pvt Ltd
        </span>
      </span>
    </span>
  );
}

type BtnProps = {
  children: ReactNode;
  message?: string;
  variant?: "gold" | "outline" | "forest" | "ghostLight";
  className?: string;
  href?: string;
};

export function CTAButton({ children, message, variant = "gold", className, href }: BtnProps) {
  const external = !href || href.startsWith("http");
  const styles = {
    gold: "bg-gradient-gold text-deep shadow-glow hover:brightness-105",
    forest: "bg-forest text-ivory hover:bg-deep",
    outline: "border border-forest/25 text-forest hover:bg-forest hover:text-ivory",
    ghostLight: "border border-ivory/40 text-ivory hover:bg-ivory hover:text-deep",
  }[variant];
  return (
    <motion.a
      whileTap={{ scale: 0.97 }}
      href={href ?? whatsappLink(message)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200",
        styles,
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </motion.a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
  light,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={cn(
          "mt-4 text-4xl leading-[1.05] font-medium md:text-6xl",
          light ? "text-ivory" : "text-deep",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-base md:text-lg",
            light ? "text-ivory/70" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
