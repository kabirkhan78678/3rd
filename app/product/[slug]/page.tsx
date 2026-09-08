"use client";
import { useState } from "react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, ChevronDown, ChevronLeft, ChevronRight, Star, Truck, RotateCcw, Shield } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { getProductBySlug, getRelatedProducts, formatPrice, getDiscountPercent, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { staggerContainer, fadeUp, slideInLeft, slideInRight, scaleIn, VIEWPORT_ONCE } from "@/lib/animations";
import Link from "next/link";
import { use } from "react";

interface Params {
  slug: string;
}

export default function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const [imgIndex, setImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const discount = product.salePrice ? getDiscountPercent(product.price, product.salePrice) : 0;

  const handleAddToCart = async () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    setAdding(true);
    addItem(product, selectedSize, selectedColor, qty);
    await new Promise((r) => setTimeout(r, 1000));
    setAdding(false);
  };

  const accordionData = [
    {
      id: "details",
      title: "Product Details",
      content: product.details.map((d) => `• ${d}`).join("\n"),
    },
    {
      id: "shipping",
      title: "Shipping & Delivery",
      content: "Free standard shipping on orders over $150. Express shipping available at checkout. Estimated delivery: 3-7 business days.",
    },
    {
      id: "returns",
      title: "Returns & Exchanges",
      content: "Easy 30-day returns on all unworn items. Free returns on orders over $100. Exchange for a different size or color at no extra cost.",
    },
  ];

  return (
    <div style={{ paddingTop: 80 }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav style={{ display: "flex", gap: 8, alignItems: "center", paddingBlock: 20, fontSize: 13, color: "var(--color-muted)" }}>
          <Link href="/" style={{ color: "var(--color-muted)" }}>Home</Link>
          <span>/</span>
          <Link href={`/${product.category}`} style={{ color: "var(--color-muted)", textTransform: "capitalize" }}>{product.category}</Link>
          <span>/</span>
          <span style={{ color: "var(--color-text)", fontWeight: 600 }}>{product.name}</span>
        </nav>

        {/* Main layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start", paddingBottom: 80 }}>

          {/* ── Gallery ── */}
          <motion.div variants={slideInLeft} initial="hidden" animate="visible">
            {/* Main image */}
            <div style={{ position: "relative", aspectRatio: "3/4", background: "var(--color-surface)", overflow: "hidden", marginBottom: 12 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={imgIndex}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <Image
                    src={product.images[imgIndex]}
                    alt={product.name}
                    fill
                    priority
                    style={{ objectFit: "cover" }}
                    sizes="50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <div style={{ position: "absolute", top: 16, left: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                {product.isNew && <span className="badge badge-new">New</span>}
                {product.salePrice && <span className="badge badge-sale">-{discount}%</span>}
              </div>

              {/* Nav arrows */}
              {product.images.length > 1 && (
                <>
                  <button onClick={() => setImgIndex((i) => (i - 1 + product.images.length) % product.images.length)}
                    style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "white", border: "none", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-md)" }}>
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={() => setImgIndex((i) => (i + 1) % product.images.length)}
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "white", border: "none", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-md)" }}>
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div style={{ display: "flex", gap: 8 }}>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  style={{
                    width: 80,
                    height: 100,
                    position: "relative",
                    border: `2px solid ${i === imgIndex ? "var(--color-primary)" : "transparent"}`,
                    cursor: "pointer",
                    background: "var(--color-surface)",
                    overflow: "hidden",
                    transition: "border-color 0.2s",
                    flexShrink: 0,
                  }}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img} alt="" fill style={{ objectFit: "cover" }} sizes="80px" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Product Info ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{ position: "sticky", top: 100 }}
          >
            <motion.div variants={fadeUp}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 8 }}>
                {product.category} · {product.subcategory}
              </p>
              <h1 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.1 }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <div style={{ display: "flex", color: "#f59e0b" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span style={{ fontSize: 13, color: "var(--color-muted)" }}>
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                <span style={{ fontSize: 28, fontWeight: 800 }} className={product.salePrice ? "price-sale" : ""}>
                  {formatPrice(product.salePrice ?? product.price)}
                </span>
                {product.salePrice && (
                  <span className="price price-original" style={{ fontSize: 18 }}>
                    {formatPrice(product.price)}
                  </span>
                )}
                {product.salePrice && (
                  <span className="badge badge-sale">Save {discount}%</span>
                )}
              </div>

              <p style={{ color: "var(--color-muted)", fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
                {product.description}
              </p>
            </motion.div>

            {/* Color */}
            <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
                Color: <span style={{ fontWeight: 400, color: "var(--color-muted)" }}>{selectedColor}</span>
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    className={`color-swatch ${selectedColor === color.name ? "selected" : ""}`}
                    style={{
                      background: color.hex,
                      border: selectedColor === color.name ? "2.5px solid var(--color-primary)" : "2px solid transparent",
                      outline: color.hex === "#ffffff" ? "1px solid var(--color-border)" : "none",
                    }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </motion.div>

            {/* Size */}
            <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <p style={{ fontSize: 13, fontWeight: 600 }}>
                  Size: <span style={{ fontWeight: 400, color: "var(--color-muted)" }}>{selectedSize || "Select"}</span>
                </p>
                <button style={{ fontSize: 12, color: "var(--color-muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                  Size Guide
                </button>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ fontSize: 12, color: "var(--color-sale)", marginTop: 8, fontWeight: 600 }}
                >
                  Please select a size
                </motion.p>
              )}
            </motion.div>

            {/* Quantity */}
            <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Quantity</p>
              <div style={{ display: "flex", alignItems: "center", border: "1.5px solid var(--color-border)", width: "fit-content" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>−</button>
                <span style={{ padding: "10px 20px", fontWeight: 700, minWidth: 40, textAlign: "center" }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>+</button>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: "16px 24px",
                  background: adding ? "var(--color-accent)" : "var(--color-primary)",
                  color: adding ? "var(--color-text)" : "white",
                  border: "none",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.3s",
                }}
              >
                <ShoppingBag size={18} />
                {adding ? "Added to Cart!" : "Add to Cart"}
              </motion.button>

              <motion.button
                onClick={() => toggle(product.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "16px",
                  border: "1.5px solid var(--color-border-dark)",
                  background: "transparent",
                  cursor: "pointer",
                  color: wishlisted ? "var(--color-sale)" : "var(--color-text)",
                  display: "flex",
                  alignItems: "center",
                  transition: "all 0.2s",
                }}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={20} fill={wishlisted ? "currentColor" : "none"} />
              </motion.button>
            </motion.div>

            <motion.button
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-outline btn-full btn-lg"
              style={{ marginBottom: 32 }}
            >
              Buy Now
            </motion.button>

            {/* Trust signals */}
            <motion.div variants={fadeUp} style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
              {[
                { icon: Truck, text: "Free shipping over $150" },
                { icon: RotateCcw, text: "30-day returns" },
                { icon: Shield, text: "Secure checkout" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--color-muted)" }}>
                  <Icon size={14} />
                  {text}
                </div>
              ))}
            </motion.div>

            {/* Accordion */}
            <motion.div variants={fadeUp}>
              {accordionData.map(({ id, title, content }) => (
                <div key={id} className="accordion-item">
                  <button
                    className="accordion-trigger"
                    onClick={() => setAccordionOpen(accordionOpen === id ? null : id)}
                    aria-expanded={accordionOpen === id}
                  >
                    {title}
                    <motion.div animate={{ rotate: accordionOpen === id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {accordionOpen === id && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="accordion-content"
                      >
                        <p style={{ paddingBottom: 20, whiteSpace: "pre-line" }}>{content}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section style={{ paddingBottom: 80 }}>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 40 }}>
              You May Also Like
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
