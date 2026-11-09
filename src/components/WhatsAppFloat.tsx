import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/config/site";

/**
 * Floating WhatsApp button — fixed bottom-right.
 * Does not obscure mobile content or primary CTAs.
 */
export function WhatsAppFloat() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with CS Shivahari Exports on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_25px_-5px_rgba(37,211,102,0.6)] transition-shadow duration-300 hover:shadow-[0_12px_35px_-5px_rgba(37,211,102,0.75)] md:bottom-8 md:right-8"
    >
      <MessageCircle className="h-7 w-7" fill="white" strokeWidth={0} />
      {/* Subtle ping animation */}
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
    </motion.a>
  );
}
