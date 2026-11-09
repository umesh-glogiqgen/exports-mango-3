import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageCircle, X } from "lucide-react";
import { NAV_LINKS, SITE, whatsappLink } from "@/config/site";
import { CTAButton, Logo, ease } from "./primitives";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const light = !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-ivory/90 py-3 shadow-soft backdrop-blur-xl" : "py-5",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#home" aria-label="CS Shivahari Exports — Home">
          <Logo light={light} />
        </a>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-6 xl:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "link-underline text-xs font-semibold tracking-wide transition-colors uppercase",
                  light ? "text-ivory/90" : "text-deep/80 hover:text-deep",
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden xl:flex items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200",
              light
                ? "border-ivory/40 text-ivory hover:bg-ivory hover:text-deep"
                : "border-forest/30 text-forest hover:bg-forest hover:text-ivory",
            )}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
          <CTAButton className="min-h-10 py-2.5 text-xs" href="#contact">
            Request a Quote
          </CTAButton>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          className={cn(
            "relative z-50 grid h-11 w-11 place-items-center rounded-full xl:hidden",
            light ? "text-ivory" : "text-deep",
          )}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-0 z-40 flex flex-col bg-ivory px-6 pt-28 pb-10 xl:hidden overflow-y-auto"
          >
            <ul className="space-y-1">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, ease }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-3xl text-deep border-b border-border/50"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3">
              <CTAButton href="#contact" className="w-full justify-center">
                Request a Quote
              </CTAButton>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-forest/30 py-3 text-sm font-semibold text-forest"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
            <p className="mt-auto pt-8 text-xs text-muted-foreground">{SITE.BUSINESS_NAME}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
