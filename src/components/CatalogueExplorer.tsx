import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  CheckCircle2,
  FileText,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  X,
  Package,
  Layers,
  Sparkles,
} from "lucide-react";
import { CATALOGUE_CATEGORIES, CATALOGUE_PRODUCTS, type ProductItem } from "@/data/catalogueData";
import { whatsappLink, SITE } from "@/config/site";
import { ease } from "./primitives";

export function CatalogueExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [complianceFilter, setComplianceFilter] = useState<"all" | "fssai" | "non-food">("all");
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(30);

  // Filter products based on search, category, and compliance
  const filteredProducts = useMemo(() => {
    return CATALOGUE_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.categoryId !== selectedCategory) {
        return false;
      }
      // Compliance filter
      if (complianceFilter === "fssai" && !product.fssaiCovered) {
        return false;
      }
      if (complianceFilter === "non-food" && product.fssaiCovered) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesType = product.productType.toLowerCase().includes(query);
        return matchesName || matchesCat || matchesType;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, complianceFilter]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const selectedCategoryData = useMemo(() => {
    if (selectedCategory === "all") return null;
    return CATALOGUE_CATEGORIES.find((c) => c.id === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="catalogue"
      className="relative w-full max-w-full overflow-hidden bg-cream/30 py-24 md:py-36 border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-forest/5 px-3.5 py-1 text-xs font-semibold text-forest uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-forest" />
              <span>Official 23-Page Product Catalogue · 190 Products</span>
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-deep sm:text-4xl md:text-5xl font-display">
              Complete <em className="text-gold italic font-serif">Export Portfolio</em>
            </h2>
            <p className="mt-3 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
              Explore all 190 products across 22 categories extracted directly from the official{" "}
              <strong className="text-deep font-semibold">
                CHINNAGUWALA SHIVAHARI EXPORTS PRIVATE LIMITED
              </strong>{" "}
              catalogue. Each product is matched with its verified catalogue page and FSSAI Central
              License compliance status.
            </p>
          </div>

          {/* Download Official PDF Catalogue button */}
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="/final_product_catalogue_with_cover.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-forest/30 bg-forest px-5 py-3 text-xs font-semibold text-ivory transition-all hover:bg-forest/90 shadow-md hover:-translate-y-0.5"
            >
              <FileText className="h-4 w-4" />
              <span>Download Official PDF (23 Pages)</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mt-12 rounded-3xl border border-border bg-card p-5 md:p-7 shadow-soft">
          {/* Top row: Search input + Compliance filter tabs */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search across all 190 products (e.g. Alphonso, Chilli, Moringa, Basmati, Bamboo)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(30);
                }}
                className="w-full rounded-2xl border border-border bg-background py-3.5 pl-11 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Compliance Filter Radios */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-muted-foreground font-medium flex items-center gap-1.5 mr-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Filter by:</span>
              </span>
              <button
                onClick={() => {
                  setComplianceFilter("all");
                  setVisibleCount(30);
                }}
                className={`rounded-xl px-3.5 py-2 font-medium transition-all ${
                  complianceFilter === "all"
                    ? "bg-deep text-ivory shadow-sm"
                    : "bg-muted/70 text-deep hover:bg-muted"
                }`}
              >
                All (190)
              </button>
              <button
                onClick={() => {
                  setComplianceFilter("fssai");
                  setVisibleCount(30);
                }}
                className={`rounded-xl px-3.5 py-2 font-medium transition-all flex items-center gap-1.5 ${
                  complianceFilter === "fssai"
                    ? "bg-forest text-ivory shadow-sm"
                    : "bg-muted/70 text-forest hover:bg-muted"
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>FSSAI Certified Food (156)</span>
              </button>
              <button
                onClick={() => {
                  setComplianceFilter("non-food");
                  setVisibleCount(30);
                }}
                className={`rounded-xl px-3.5 py-2 font-medium transition-all ${
                  complianceFilter === "non-food"
                    ? "bg-deep text-ivory shadow-sm"
                    : "bg-muted/70 text-deep hover:bg-muted"
                }`}
              >
                Eco & Supplies (34)
              </button>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="mt-5 w-full max-w-full overflow-hidden border-t border-border pt-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <span className="font-semibold uppercase tracking-wider text-forest">
                Select Category ({CATALOGUE_CATEGORIES.length} Categories)
              </span>
              <span>
                Showing {filteredProducts.length} of {CATALOGUE_PRODUCTS.length} products
              </span>
            </div>

            <div className="no-scrollbar flex w-full max-w-full gap-2 overflow-x-auto pb-2 touch-pan-x">
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setVisibleCount(30);
                }}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === "all"
                    ? "bg-forest text-ivory shadow-md scale-105"
                    : "border border-border bg-background text-deep hover:border-forest/40"
                }`}
              >
                All Categories (190)
              </button>

              {CATALOGUE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setVisibleCount(30);
                  }}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? "bg-forest text-ivory shadow-md scale-105"
                      : "border border-border bg-background text-deep hover:border-forest/40"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[0.65rem] ${
                      selectedCategory === cat.id
                        ? "bg-ivory/20 text-ivory"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {cat.itemCount}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Category Banner Info (if category selected) */}
          {selectedCategoryData && (
            <div className="mt-4 rounded-2xl bg-cream/60 border border-gold/30 p-4 text-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-forest text-ivory font-bold">
                  {selectedCategoryData.number}
                </span>
                <div>
                  <h3 className="font-bold text-sm text-deep">{selectedCategoryData.name}</h3>
                  <p className="text-muted-foreground">
                    Catalogue Page {selectedCategoryData.pageNumber} of 23 ·{" "}
                    {selectedCategoryData.itemCount} Items · {selectedCategoryData.productType}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedCategoryData.fssaiCovered ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-emerald-800 font-semibold border border-emerald-300">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>
                      FSSAI Central License Covered ({selectedCategoryData.fssaiCategoryNote})
                    </span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-slate-700 font-semibold border border-slate-300">
                    <span>Non-Food Category ({selectedCategoryData.productType})</span>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        {displayedProducts.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
            {displayedProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (idx % 10) * 0.04, ease }}
                className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft hover:border-gold/50"
              >
                {/* Product Image with Badges */}
                <div
                  onClick={() => setActiveModalProduct(product)}
                  className="relative aspect-square overflow-hidden bg-cream/40 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={`${product.name} - ${product.category}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
                    <span className="rounded-md bg-deep/80 px-2 py-0.5 text-[0.62rem] font-semibold text-ivory backdrop-blur-sm shadow-sm">
                      P.{product.pageNumber}
                    </span>
                    {product.fssaiCovered ? (
                      <span className="rounded-md bg-emerald-600/90 px-2 py-0.5 text-[0.62rem] font-semibold text-white backdrop-blur-sm shadow-sm">
                        FSSAI
                      </span>
                    ) : (
                      <span className="rounded-md bg-slate-600/90 px-2 py-0.5 text-[0.62rem] font-semibold text-white backdrop-blur-sm shadow-sm">
                        Export
                      </span>
                    )}
                  </div>

                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-deep/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                    <span className="rounded-full bg-ivory text-deep px-3.5 py-1.5 text-xs font-bold shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="flex flex-1 flex-col p-3.5">
                  <span className="text-[0.65rem] font-semibold text-gold uppercase tracking-wider truncate">
                    {product.category}
                  </span>
                  <h3
                    onClick={() => setActiveModalProduct(product)}
                    className="mt-1 text-sm font-bold text-deep font-sans leading-snug line-clamp-1 cursor-pointer hover:text-forest transition-colors"
                  >
                    {product.name}
                  </h3>
                  <p className="mt-1 text-[0.72rem] text-muted-foreground line-clamp-1">
                    {product.productType}
                  </p>

                  {/* Action Button */}
                  <div className="mt-auto pt-3">
                    <a
                      href={whatsappLink(
                        `Hello CS Shivahari Exports, I would like to request an export quote for ${product.name} (${product.category}, Page ${product.pageNumber}).`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-forest/10 hover:bg-forest text-forest hover:text-ivory py-2 text-[0.72rem] font-semibold transition-all duration-200"
                    >
                      <span>Enquire Quote</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground/60 mx-auto" />
            <h3 className="mt-4 text-lg font-bold text-deep">No products match your search</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search terms or clearing the category and compliance filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setComplianceFilter("all");
              }}
              className="mt-5 rounded-full bg-forest px-6 py-2.5 text-xs font-semibold text-ivory hover:bg-forest/90 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > visibleCount && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 30)}
              className="inline-flex items-center gap-2 rounded-full border border-forest bg-forest px-8 py-3.5 text-xs font-semibold text-ivory transition-all hover:bg-forest/90 shadow-md hover:-translate-y-0.5"
            >
              <Layers className="h-4 w-4" />
              <span>
                Load More Products (Showing {visibleCount} of {filteredProducts.length})
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border p-6 md:p-8 shadow-2xl text-deep"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-cream hover:bg-border text-deep transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid gap-6 md:grid-cols-2 items-start mt-2">
                {/* Product Image */}
                <div className="rounded-2xl overflow-hidden border border-border bg-cream/40 aspect-square">
                  <img
                    src={activeModalProduct.image}
                    alt={activeModalProduct.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Details Column */}
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-forest uppercase tracking-wider">
                    {activeModalProduct.category}
                  </div>
                  <h2 className="mt-2 text-2xl font-bold font-sans text-deep">
                    {activeModalProduct.name}
                  </h2>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {activeModalProduct.productType} · Catalogue Page{" "}
                    {activeModalProduct.pageNumber}
                  </p>

                  {/* FSSAI Badge in Modal */}
                  <div className="mt-4">
                    {activeModalProduct.fssaiCovered ? (
                      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                          <ShieldCheck className="h-4 w-4" />
                          <span>FSSAI Central License Verified</span>
                        </div>
                        <p className="mt-1 text-emerald-700 text-[0.72rem]">
                          Covered under Central License No:{" "}
                          <strong>{SITE.FSSAI_LICENSE_NUMBER}</strong> (
                          {activeModalProduct.fssaiCategory})
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs">
                        <span className="font-bold text-slate-700">
                          Eco & Industrial Export Product
                        </span>
                        <p className="mt-1 text-slate-600 text-[0.72rem]">
                          Non-food category item supplied with destination-specific export packaging
                          & phytosanitary clearance.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Specifications Table */}
                  <div className="mt-5 space-y-2 border-t border-border pt-4 text-xs">
                    {Object.entries(activeModalProduct.additionalSpecifications).map(
                      ([key, val]) => (
                        <div
                          key={key}
                          className="flex justify-between py-1 border-b border-border/50"
                        >
                          <span className="text-muted-foreground">{key}</span>
                          <span className="font-semibold text-deep text-right">{val}</span>
                        </div>
                      ),
                    )}
                    <div className="flex justify-between py-1 border-b border-border/50">
                      <span className="text-muted-foreground">Availability</span>
                      <span className="font-semibold text-forest">
                        {activeModalProduct.availabilityStatus}
                      </span>
                    </div>
                  </div>

                  {/* Direct Enquiry Actions */}
                  <div className="mt-6 flex flex-col gap-2.5">
                    <a
                      href={whatsappLink(
                        `Hello CS Shivahari Exports, I am interested in placing an export order for ${activeModalProduct.name} (${activeModalProduct.category}, Page ${activeModalProduct.pageNumber}). Please provide pricing, MOQ, and shipping specifications.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-forest py-3 text-xs font-semibold text-ivory hover:bg-forest/90 transition-all shadow-md"
                    >
                      <span>Request Quote via WhatsApp</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="#contact"
                      onClick={() => setActiveModalProduct(null)}
                      className="flex items-center justify-center rounded-xl border border-border py-2.5 text-xs font-semibold text-deep hover:bg-cream transition-colors"
                    >
                      Submit Custom B2B Enquiry Form
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
