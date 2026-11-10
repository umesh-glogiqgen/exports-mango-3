import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Instagram, Phone, Mail, ChevronUp, X } from "lucide-react";
import { SITE, whatsappLink } from "@/config/site";

interface SocialAction {
  id: string;
  name: string;
  label: string;
  icon: typeof Instagram;
  href: string;
  bgClass: string;
  textClass?: string;
  external?: boolean;
}

const SOCIAL_ACTIONS: SocialAction[] = [
  {
    id: "instagram",
    name: "Instagram",
    label: "Follow on Instagram",
    icon: Instagram,
    href: SITE.INSTAGRAM_URL || "https://instagram.com/",
    bgClass: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-[0_6px_20px_-3px_rgba(220,39,67,0.5)]",
    external: true,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    label: "Chat on WhatsApp",
    icon: MessageCircle,
    href: whatsappLink(),
    bgClass: "bg-[#25D366] text-white shadow-[0_6px_20px_-3px_rgba(37,211,102,0.5)]",
    external: true,
  },
  {
    id: "phone",
    name: "Direct Call",
    label: SITE.PHONE_NUMBER,
    icon: Phone,
    href: `tel:${SITE.PHONE_NUMBER.replace(/\s+/g, "")}`,
    bgClass: "bg-gradient-to-br from-gold to-[#c59828] text-deep shadow-[0_6px_20px_-3px_rgba(212,175,55,0.5)] font-semibold",
    external: false,
  },
  {
    id: "email",
    name: "Email Inquiry",
    label: SITE.EMAIL_ADDRESS,
    icon: Mail,
    href: `mailto:${SITE.EMAIL_ADDRESS}?subject=${encodeURIComponent("Export Enquiry — CS Shivahari Exports")}`,
    bgClass: "bg-[#0b1b14] border border-gold/40 text-gold shadow-[0_6px_20px_-3px_rgba(0,0,0,0.6)]",
    external: false,
  },
];

/**
 * Expandable Floating Contact & Social Hub.
 * Fixed in bottom-right corner.
 * Clicking the arrow reveals Instagram, WhatsApp, Phone, and Email channels.
 */
export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-5 z-50 flex flex-col items-end md:bottom-8 md:right-8"
      aria-label="Contact and Social Hub"
    >
      {/* Expanded Social Icons Stack */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.85 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 flex flex-col items-end gap-3"
          >
            {SOCIAL_ACTIONS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.id}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.04, duration: 0.2 }}
                  whileHover={{ scale: 1.08, x: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center gap-3"
                  aria-label={item.label}
                >
                  {/* Tooltip Pill */}
                  <span className="pointer-events-none rounded-lg border border-gold/30 bg-deep/95 px-3 py-1.5 text-xs font-medium tracking-wide text-ivory shadow-xl backdrop-blur-md transition-opacity duration-200">
                    <span className="font-semibold text-gold">{item.name}:</span> {item.label}
                  </span>

                  {/* Circular Icon Button */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105 ${item.bgClass}`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={item.id === "whatsapp" ? 0 : 2} fill={item.id === "whatsapp" ? "white" : "none"} />
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Dock */}
      <div className="relative flex items-center gap-2">
        {/* Toggle Arrow Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className={`group flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 shadow-lg backdrop-blur-md transition-all duration-300 ${
            isOpen
              ? "bg-gold text-deep shadow-gold/30"
              : "bg-deep/90 text-gold hover:bg-gold hover:text-deep hover:border-gold"
          }`}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close social channels" : "Show social channels"}
          title={isOpen ? "Close social channels" : "Show Instagram, WhatsApp & more"}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {isOpen ? <X className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </motion.div>
        </motion.button>

        {/* Primary WhatsApp Action Button */}
        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with CS Shivahari Exports on WhatsApp"
          title="Direct WhatsApp Chat"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_25px_-5px_rgba(37,211,102,0.6)] transition-shadow duration-300 hover:shadow-[0_12px_35px_-5px_rgba(37,211,102,0.75)]"
        >
          <MessageCircle className="h-7 w-7" fill="white" strokeWidth={0} />
          {/* Subtle ping pulse */}
          {!isOpen && (
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
          )}
        </motion.a>
      </div>
    </div>
  );
}
