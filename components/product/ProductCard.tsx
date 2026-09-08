"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Product, formatPrice, getDiscountPercent } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { fadeUp } from "@/lib/animations";

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: "default" | "compact" | "large";
}

export default function ProductCard({ product, index = 0, variant: _variant = "default" }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [imgIndex, setImgIndex] = useState(0);
  const [adding, setAdding] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[0] || "M";
    const defaultColor = product.colors[0]?.name || "Default";
    setAdding(true);
    addItem(product, defaultSize, defaultColor);
    await new Promise((r) => setTimeout(r, 800));
    setAdding(false);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  };

  const price = product.salePrice ?? product.price;
  const discount = product.salePrice ? getDiscountPercent(product.price, product.salePrice) : 0;

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.07 }}
      className="product-card"
      style={{ borderRadius: "var(--radius-sm)" }}
    >
      <Link href={`/product/${product.slug}`} style={{ display: "block", textDecoration: "none" }}>
        {/* Image */}
        <div
          className="card-image"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <div className="aspect-product" style={{ background: "var(--color-surface)" }}>
            <Image
              src={product.images[imgIndex] || "/images/men-tee.jpg"}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              onError={() => {}}
            />
          </div>

          {/* Badges */}
          <div style={{ position: "absolute", top: 12, left: 12, display: "flex", flexDirection: "column", gap: 6 }}>
            {product.isNew && <span className="badge badge-new">New</span>}
            {product.salePrice && <span className="badge badge-sale">-{discount}%</span>}
            {product.isBestSeller && !product.isNew && <span className="badge badge-bestseller">Best Seller</span>}
          </div>

          {/* Wishlist */}
          <motion.button
            onClick={handleWishlist}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "white",
              border: "none",
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "var(--shadow-md)",
              color: wishlisted ? "var(--color-sale)" : "var(--color-muted)",
              transition: "color 0.2s",
            }}
          >
            <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
          </motion.button>

          {/* Second image on hover */}
          {product.images.length > 1 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0,
                transition: "opacity 0.4s ease",
              }}
              onMouseEnter={(e) => {
                setImgIndex(1);
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
              onMouseLeave={() => setImgIndex(0)}
            >
              <Image
                src={product.images[1]}
                alt={`${product.name} alt view`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          )}

          {/* Actions */}
          <div className="card-actions" style={{ padding: "12px 16px", display: "flex", gap: 8 }}>
            <motion.button
              onClick={handleQuickAdd}
              whileTap={{ scale: 0.95 }}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "10px",
                background: adding ? "var(--color-accent)" : "transparent",
                border: "1px solid rgba(255,255,255,0.3)",
                color: adding ? "var(--color-text)" : "white",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
            >
              <ShoppingBag size={14} />
              {adding ? "Added!" : "Quick Add"}
            </motion.button>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 12px",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
                transition: "all 0.2s",
              }}
              aria-label="Quick view"
            >
              <Eye size={14} />
            </span>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "14px 4px 4px" }}>
          <p style={{ fontSize: 11, color: "var(--color-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
            {product.subcategory}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 8, lineHeight: 1.3 }}>
            {product.name}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className={`price ${product.salePrice ? "price-sale" : ""}`}>
              {formatPrice(price)}
            </span>
            {product.salePrice && (
              <span className="price price-original">{formatPrice(product.price)}</span>
            )}
          </div>

          {/* Color swatches */}
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.name}
                className="color-swatch"
                title={color.name}
                style={{
                  background: color.hex,
                  width: 18,
                  height: 18,
                  border: color.hex === "#ffffff" ? "1px solid var(--color-border)" : "none",
                }}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
