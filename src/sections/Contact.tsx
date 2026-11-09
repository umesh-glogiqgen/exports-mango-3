import { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { FOOTER_PRODUCT_LINKS, NAV_LINKS, SITE, whatsappLink } from "@/config/site";
import { Logo, Reveal, SectionHeading } from "@/components/primitives";

// ─── Contact cards ─────────────────────────────────────────────────────────────

export const contacts = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: whatsappLink(),
    ext: true,
  },
  {
    icon: Phone,
    label: "Phone",
    value: SITE.PHONE_NUMBER,
    href: `tel:${SITE.PHONE_NUMBER.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: SITE.EMAIL_ADDRESS,
    href: `mailto:${SITE.EMAIL_ADDRESS}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: SITE.BUSINESS_ADDRESS,
    href: `https://maps.google.com/?q=${encodeURIComponent(SITE.BUSINESS_ADDRESS)}`,
    ext: true,
  },
];

const socials = [
  { icon: MessageCircle, label: "WhatsApp", href: whatsappLink(), ext: true },
  { icon: Instagram, label: "Instagram", href: SITE.INSTAGRAM_URL, ext: true },
  { icon: Facebook, label: "Facebook", href: SITE.FACEBOOK_URL, ext: true },
  { icon: Linkedin, label: "LinkedIn", href: SITE.LINKEDIN_URL, ext: true },
];

// ─── Enquiry Form ──────────────────────────────────────────────────────────────

const PRODUCT_OPTIONS = [
  "Fresh Fruits",
  "Fresh Vegetables",
  "Indian Spices",
  "Tamarind & Products",
  "Rice & Grains",
  "Pulses & Legumes",
  "Seeds",
  "Dehydrated & Processed Products",
  "Multiple Products",
  "Other / Not Listed",
];

interface FormData {
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp: string;
  product: string;
  quantity: string;
  packaging: string;
  destinationPort: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  company: "",
  country: "",
  email: "",
  whatsapp: "",
  product: "",
  quantity: "",
  packaging: "",
  destinationPort: "",
  message: "",
};

function EnquiryForm({ preselectedProduct }: { preselectedProduct?: string }) {
  const [form, setForm] = useState<FormData>({
    ...initialForm,
    product: preselectedProduct ?? "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Validate required fields
    const required: (keyof FormData)[] = ["name", "company", "country", "email", "product"];
    const missing = required.filter((k) => !form[k].trim());
    if (missing.length) {
      setError("Please fill in all required fields.");
      return;
    }

    // Build mailto body — static site, no backend
    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Country: ${form.country}`,
      `Email: ${form.email}`,
      `WhatsApp / Phone: ${form.whatsapp || "Not provided"}`,
      `Product Required: ${form.product}`,
      `Quantity Required: ${form.quantity || "Not specified"}`,
      `Packaging Requirement: ${form.packaging || "Not specified"}`,
      `Destination Port: ${form.destinationPort || "Not specified"}`,
      `Additional Message:\n${form.message || "None"}`,
    ].join("\n");

    const subject = `Agricultural Export Enquiry — ${form.product} — ${form.company}`;
    const mailtoUrl = `mailto:${SITE.EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-forest/30 bg-cream/60 p-8 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-forest text-ivory">
          <Send className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-deep">Your Enquiry is Ready</h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Your email client should open with your enquiry details pre-filled. Please send the email
          to complete your enquiry. If it did not open,{" "}
          <a href={`mailto:${SITE.EMAIL_ADDRESS}`} className="text-forest underline">
            email us directly
          </a>{" "}
          or{" "}
          <a
            href={whatsappLink(`Hello, I would like to enquire about ${form.product} from India.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-forest underline"
          >
            message us on WhatsApp
          </a>
          .
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-xs text-muted-foreground underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm text-deep placeholder:text-muted-foreground/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all duration-200";
  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="enquiry-name" className={labelClass}>
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            id="enquiry-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="enquiry-company" className={labelClass}>
            Company Name <span className="text-gold">*</span>
          </label>
          <input
            id="enquiry-company"
            name="company"
            type="text"
            required
            value={form.company}
            onChange={handleChange}
            placeholder="Your company"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="enquiry-country" className={labelClass}>
            Country <span className="text-gold">*</span>
          </label>
          <input
            id="enquiry-country"
            name="country"
            type="text"
            required
            value={form.country}
            onChange={handleChange}
            placeholder="Your country"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="enquiry-email" className={labelClass}>
            Email Address <span className="text-gold">*</span>
          </label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="enquiry-whatsapp" className={labelClass}>
            WhatsApp / Phone
          </label>
          <input
            id="enquiry-whatsapp"
            name="whatsapp"
            type="tel"
            value={form.whatsapp}
            onChange={handleChange}
            placeholder="+1 555 000 0000"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="enquiry-product" className={labelClass}>
            Product Required <span className="text-gold">*</span>
          </label>
          <select
            id="enquiry-product"
            name="product"
            required
            value={form.product}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select a product category</option>
            {PRODUCT_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="enquiry-quantity" className={labelClass}>
            Quantity Required
          </label>
          <input
            id="enquiry-quantity"
            name="quantity"
            type="text"
            value={form.quantity}
            onChange={handleChange}
            placeholder="e.g. 10 MT, 5 containers"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="enquiry-packaging" className={labelClass}>
            Packaging Requirement
          </label>
          <input
            id="enquiry-packaging"
            name="packaging"
            type="text"
            value={form.packaging}
            onChange={handleChange}
            placeholder="e.g. Bulk, cartons, custom"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="enquiry-port" className={labelClass}>
            Destination Port
          </label>
          <input
            id="enquiry-port"
            name="destinationPort"
            type="text"
            value={form.destinationPort}
            onChange={handleChange}
            placeholder="e.g. Dubai, Jebel Ali, Rotterdam"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="enquiry-message" className={labelClass}>
          Additional Message
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="Share any additional specifications, requirements or questions..."
          className={inputClass}
        />
      </div>

      {error && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <p className="text-xs text-muted-foreground">
        <span className="text-gold">*</span> Required fields. Submitting will open your email client
        with the enquiry details pre-filled. This is a static website — no server submission occurs.
      </p>

      <button
        type="submit"
        className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-gold px-8 py-3 text-sm font-semibold text-deep shadow-glow transition-all duration-200 hover:brightness-105"
      >
        Send Enquiry
        <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </button>
    </form>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-36">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
        {/* Left — heading + contact cards */}
        <div>
          <SectionHeading
            eyebrow="Get in Touch"
            title={
              <>
                Request a <em className="text-gold">Quote</em>
              </>
            }
            subtitle="Share your product requirements, quantity, destination, and packaging needs. We will get back to you to discuss availability and specifications."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {contacts.map(({ icon: Icon, label, value, href, ext }, i) => (
              <Reveal key={label} delay={i * 0.05}>
                <a
                  href={href}
                  {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-soft"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cream text-forest transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-gold group-hover:text-deep">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                      {label}
                    </span>
                    <span className="block truncate text-sm font-semibold text-deep">{value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right — enquiry form */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-border bg-card p-7 md:p-10">
            <p className="eyebrow mb-6">Product Enquiry Form</p>
            <EnquiryForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.8fr_1fr_1fr_1fr] md:gap-8 md:px-8">
        {/* Brand */}
        <div>
          <Logo light />
          <p className="mt-2 text-xs font-semibold tracking-wider text-gold/70 uppercase">
            {SITE.TAGLINE}
          </p>
          <p className="mt-5 max-w-xs text-sm text-ivory/55 leading-relaxed">
            An India-based agricultural export company connecting Indian agricultural products with
            international buyers, food distributors, and bulk procurement businesses worldwide.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ icon: Icon, label, href, ext }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="grid h-10 w-10 place-items-center rounded-full border border-ivory/15 transition-all duration-200 hover:scale-110 hover:border-gold hover:bg-gold hover:text-deep"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className="eyebrow text-gold">Navigate</p>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-underline text-sm text-ivory/70 hover:text-ivory">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <p className="eyebrow text-gold">Products</p>
          <ul className="mt-5 space-y-3">
            {FOOTER_PRODUCT_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="link-underline text-sm text-ivory/70 hover:text-ivory">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="eyebrow text-gold">Contact</p>
          <ul className="mt-5 space-y-3 text-sm text-ivory/70">
            <li>
              <a href={`tel:${SITE.PHONE_NUMBER.replace(/\s/g, "")}`} className="link-underline">
                {SITE.PHONE_NUMBER}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.EMAIL_ADDRESS}`} className="link-underline break-all">
                {SITE.EMAIL_ADDRESS}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                WhatsApp Enquiry
              </a>
            </li>
            <li className="text-ivory/45">{SITE.BUSINESS_ADDRESS}</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-6 text-xs text-ivory/40 sm:flex-row md:px-8">
          <p>
            © {currentYear} {SITE.BUSINESS_NAME}. All rights reserved.
          </p>
          <p>From Indian Farms to Global Markets</p>
        </div>
      </div>
    </footer>
  );
}
