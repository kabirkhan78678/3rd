// data/products.ts
// Centralized product data — replace images, names, and prices here

export type ProductCategory = "men" | "women";
export type ProductSubcategory =
  | "t-shirts"
  | "shirts"
  | "jackets"
  | "hoodies"
  | "pants"
  | "shorts"
  | "accessories"
  | "tops"
  | "dresses"
  | "jeans";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  price: number;
  salePrice?: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  details: string[];
  tags: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  // ─── MEN ─────────────────────────────────────────────────────────────────
  {
    id: "m001",
    slug: "urban-legends-graphic-tee",
    name: "Urban Legends Graphic Tee",
    category: "men",
    subcategory: "t-shirts",
    price: 65,
    images: ["/images/men-tee.jpg", "/images/men-hoodie.jpg"],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "White", hex: "#ffffff" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "Our signature graphic tee built for those who refuse to go unnoticed. Heavyweight 100% cotton, oversized fit, bold statement front print. This is not streetwear — this is a declaration.",
    details: [
      "100% heavyweight cotton (280gsm)",
      "Oversized boxy fit",
      "Pre-shrunk for longevity",
      "Double-stitched seams",
      "Screen-printed graphic",
    ],
    tags: ["graphic", "oversized", "bestseller"],
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    rating: 4.8,
    reviews: 241,
  },
  {
    id: "m002",
    slug: "void-bomber-jacket",
    name: "Void Bomber Jacket",
    category: "men",
    subcategory: "jackets",
    price: 195,
    salePrice: 145,
    images: ["/images/men-jacket.jpg", "/images/men-tee.jpg"],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Olive", hex: "#4a5240" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "The Void Bomber redefines the classic silhouette. Satin shell with ribbed cuffs and collar, a clean back panel for your next customisation, premium YKK zip closure.",
    details: [
      "100% nylon shell",
      "Ribbed collar, cuffs and hem",
      "YKK zip closure",
      "Interior zip pocket",
      "Regular fit",
    ],
    tags: ["jacket", "bomber", "sale"],
    isNew: false,
    isBestSeller: false,
    isFeatured: true,
    inStock: true,
    rating: 4.6,
    reviews: 88,
  },
  {
    id: "m003",
    slug: "klub-core-heavyweight-hoodie",
    name: "Klub Core Heavyweight Hoodie",
    category: "men",
    subcategory: "hoodies",
    price: 120,
    images: ["/images/men-hoodie.jpg", "/images/men-jacket.jpg"],
    colors: [
      { name: "Cream", hex: "#f5f0e8" },
      { name: "Black", hex: "#0a0a0a" },
      { name: "Lime", hex: "#b5f000" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "The hoodie every wardrobe needs. Heavyweight fleece, premium kangaroo pocket, adjustable drawstring. Built to last, designed to stand out.",
    details: [
      "400gsm heavyweight fleece",
      "90% cotton, 10% polyester",
      "Oversized relaxed fit",
      "Kangaroo pocket",
      "Double-lined hood",
    ],
    tags: ["hoodie", "heavyweight", "essentials"],
    isNew: true,
    isBestSeller: true,
    isFeatured: false,
    inStock: true,
    rating: 4.9,
    reviews: 312,
  },
  {
    id: "m004",
    slug: "tactical-cargo-jogger",
    name: "Tactical Cargo Jogger",
    category: "men",
    subcategory: "pants",
    price: 110,
    images: ["/images/men-cargo.jpg", "/images/men-tee.jpg"],
    colors: [
      { name: "Olive", hex: "#4a5240" },
      { name: "Black", hex: "#0a0a0a" },
      { name: "Stone", hex: "#8a8070" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Technical meets street. Multi-pocket cargo construction with elastic waist and cuffed ankle. The everyday utility pant elevated.",
    details: [
      "Cotton-nylon blend twill",
      "6-pocket design with cargo pockets",
      "Elastic waistband with drawstring",
      "Cuffed ankle hem",
      "Relaxed tapered fit",
    ],
    tags: ["cargo", "tactical", "pants"],
    isNew: true,
    isBestSeller: false,
    isFeatured: false,
    inStock: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "m005",
    slug: "minimal-long-sleeve",
    name: "Minimal Long Sleeve",
    category: "men",
    subcategory: "t-shirts",
    price: 75,
    images: ["/images/men-cargo.jpg", "/images/men-hoodie.jpg"],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "White", hex: "#ffffff" },
      { name: "Lime", hex: "#b5f000" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Understated. Clean. The perfect base layer or standalone piece. Our premium cotton blend long sleeve in three essential colorways.",
    details: [
      "95% cotton, 5% elastane",
      "Fitted silhouette",
      "Crew neck",
      "Reinforced stitching at cuffs",
    ],
    tags: ["minimal", "longsleeve", "essentials"],
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    inStock: true,
    rating: 4.5,
    reviews: 98,
  },
  {
    id: "m006",
    slug: "crux-tech-short",
    name: "Crux Tech Short",
    category: "men",
    subcategory: "shorts",
    price: 85,
    salePrice: 65,
    images: ["/images/men-tee.jpg", "/images/men-cargo.jpg"],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Olive", hex: "#4a5240" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "The technical short built for movement and style. Quick-dry fabric, secure zip pockets, adjustable waistband. Sport meets street.",
    details: [
      "Quick-dry performance fabric",
      "Zip side pockets",
      "Internal drawstring",
      "Mid-thigh length",
      "Relaxed athletic fit",
    ],
    tags: ["shorts", "technical", "sale"],
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    inStock: true,
    rating: 4.4,
    reviews: 67,
  },
  // ─── WOMEN ───────────────────────────────────────────────────────────────
  {
    id: "w001",
    slug: "electric-crop-hoodie",
    name: "Electric Crop Hoodie",
    category: "women",
    subcategory: "hoodies",
    price: 95,
    images: ["/images/women-hoodie.jpg", "/images/women-jacket.jpg"],
    colors: [
      { name: "Lime", hex: "#b5f000" },
      { name: "Black", hex: "#0a0a0a" },
      { name: "White", hex: "#ffffff" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Vibrant. Cropped. Statement-making. The Electric Crop Hoodie is the piece your wardrobe has been waiting for. Premium fleece, soft-touch interior, relaxed fit that hits perfectly above the waist.",
    details: [
      "350gsm premium fleece",
      "Cropped relaxed fit",
      "Adjustable drawstring",
      "Side pockets",
      "Ribbed cuffs and hem",
    ],
    tags: ["crop", "hoodie", "statement"],
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    rating: 4.9,
    reviews: 287,
  },
  {
    id: "w002",
    slug: "asymmetric-mini-dress",
    name: "Asymmetric Mini Dress",
    category: "women",
    subcategory: "dresses",
    price: 135,
    images: ["/images/women-dress.jpg", "/images/women-top.jpg"],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Cream", hex: "#f5f0e8" },
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "The dress that does not need an occasion. Asymmetric hem, fitted ribbed silhouette, sleek one-shoulder construction. Wear it to everything.",
    details: [
      "Ribbed jersey fabric",
      "One-shoulder design",
      "Asymmetric hem",
      "Form-fitting silhouette",
      "95% cotton, 5% elastane",
    ],
    tags: ["dress", "asymmetric", "editorial"],
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    inStock: true,
    rating: 4.7,
    reviews: 134,
  },
  {
    id: "w003",
    slug: "oversized-blazer-jacket",
    name: "Oversized Blazer Jacket",
    category: "women",
    subcategory: "jackets",
    price: 185,
    images: ["/images/women-jacket.jpg", "/images/women-dress.jpg"],
    colors: [
      { name: "Cream", hex: "#f5f0e8" },
      { name: "Black", hex: "#0a0a0a" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "The power blazer reimagined for now. Oversized shoulders, clean lapels, single-button closure. Pair over a crop top or wear as a dress — both work.",
    details: [
      "Premium woven fabric",
      "Oversized relaxed fit",
      "Single-button closure",
      "Flap front pockets",
      "Fully lined",
    ],
    tags: ["blazer", "jacket", "oversized"],
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    rating: 4.8,
    reviews: 198,
  },
  {
    id: "w004",
    slug: "one-shoulder-crop-top",
    name: "One Shoulder Crop Top",
    category: "women",
    subcategory: "tops",
    price: 60,
    images: ["/images/women-top.jpg", "/images/women-hoodie.jpg"],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Cream", hex: "#f5f0e8" },
      { name: "Lime", hex: "#b5f000" },
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Clean lines, elevated basics. The one-shoulder crop top is your versatile canvas. Ribbed cotton, asymmetric neckline, cropped to perfection.",
    details: [
      "Ribbed cotton jersey",
      "One-shoulder design",
      "Cropped fit",
      "Stretchy and comfortable",
    ],
    tags: ["top", "crop", "asymmetric"],
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    inStock: true,
    rating: 4.6,
    reviews: 112,
  },
  {
    id: "w005",
    slug: "wide-leg-tailored-trouser",
    name: "Wide Leg Tailored Trouser",
    category: "women",
    subcategory: "pants",
    price: 125,
    images: ["/images/women-top.jpg", "/images/women-jacket.jpg"],
    colors: [
      { name: "Cream", hex: "#f5f0e8" },
      { name: "Black", hex: "#0a0a0a" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "The trouser that instantly elevates any look. Wide flowing silhouette, high waist, clean front pleat. Boardroom to bar in one piece.",
    details: [
      "Premium woven crepe",
      "High-waist wide-leg silhouette",
      "Front pleat detail",
      "Side zip closure",
      "Fully lined",
    ],
    tags: ["trousers", "wide-leg", "tailored"],
    isNew: true,
    isBestSeller: false,
    isFeatured: false,
    inStock: true,
    rating: 4.5,
    reviews: 78,
  },
  {
    id: "w006",
    slug: "statement-mini-skirt",
    name: "Statement Mini Skirt",
    category: "women",
    subcategory: "shorts",
    price: 70,
    salePrice: 55,
    images: ["/images/women-dress.jpg", "/images/women-top.jpg"],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Lime", hex: "#b5f000" },
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Short, sharp, and full of attitude. The Statement Mini in our signature silhouette. Pair with a crop top or oversized hoodie for instant outfit.",
    details: [
      "Stretch fabric with lining",
      "Mini length",
      "Zip side closure",
      "Bodycon fit",
    ],
    tags: ["skirt", "mini", "sale"],
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    inStock: true,
    rating: 4.3,
    reviews: 54,
  },
];

// ─── Helper functions ──────────────────────────────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      p.subcategory.includes(q) ||
      p.category.includes(q)
  );
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(0)}`;
}

export function getDiscountPercent(price: number, salePrice: number): number {
  return Math.round(((price - salePrice) / price) * 100);
}
