"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "./CartContext";

export interface OrderRecord {
  id: string;
  date: string;
  estimatedDelivery: string;
  status: "Processing" | "Packed" | "In Transit" | "Out for Delivery" | "Delivered";
  trackingNumber: string;
  carrier: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  shipping: number;
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zip: string;
    country: string;
  };
  paymentMethod: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  membership: "Standard" | "VIP Gold" | "Atelier Elite";
}

interface AuthContextType {
  user: UserProfile | null;
  orders: OrderRecord[];
  isAuthModalOpen: boolean;
  authModalTab: "login" | "signup";
  openAuthModal: (tab?: "login" | "signup") => void;
  closeAuthModal: () => void;
  login: (email: string, name?: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  addOrder: (order: OrderRecord) => void;
  getOrderById: (id: string) => OrderRecord | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial sample orders so tracking & order history work right out of the box!
const SAMPLE_ORDERS: OrderRecord[] = [
  {
    id: "KLB-984210",
    date: "Sep 06, 2026",
    estimatedDelivery: "Sep 09, 2026",
    status: "Out for Delivery",
    trackingNumber: "DHL-984210-EXP",
    carrier: "DHL Express Air",
    items: [
      {
        cartId: "sample-item-1",
        product: {
          id: "m002",
          slug: "cyber-punk-oversized-hoodie",
          name: "Cyber Punk Oversized Hoodie",
          category: "men",
          subcategory: "hoodies",
          price: 135,
          salePrice: 110,
          images: ["/images/men-hoodie.jpg"],
          colors: [{ name: "Black", hex: "#0a0a0a" }],
          sizes: ["M", "L", "XL"],
          description: "480 GSM custom French Terry oversized hoodie.",
          details: ["Heavyweight 480 GSM", "Reflective print", "Double-lined hood"],
          tags: ["bestseller", "hoodie"],
          inStock: true,
          rating: 4.9,
          reviews: 128,
        },
        size: "L",
        color: "Black",
        quantity: 1,
      },
      {
        cartId: "sample-item-2",
        product: {
          id: "m001",
          slug: "urban-legends-graphic-tee",
          name: "Urban Legends Graphic Tee",
          category: "men",
          subcategory: "t-shirts",
          price: 65,
          images: ["/images/men-tee.jpg"],
          colors: [{ name: "Black", hex: "#0a0a0a" }],
          sizes: ["L"],
          description: "Heavyweight cotton graphic tee.",
          details: ["100% Cotton"],
          tags: ["tee"],
          inStock: true,
          rating: 4.8,
          reviews: 84,
        },
        size: "L",
        color: "Black",
        quantity: 1,
      },
    ],
    subtotal: 175,
    discount: 17.5,
    discountCode: "KLUB10",
    shipping: 0,
    total: 157.5,
    shippingAddress: {
      firstName: "Kabir",
      lastName: "Khan",
      address: "420 Fashion Avenue, Loft 4B",
      city: "New York",
      zip: "10001",
      country: "United States",
    },
    paymentMethod: "Credit Card (•••• 4242)",
  },
  {
    id: "KLB-871923",
    date: "Aug 24, 2026",
    estimatedDelivery: "Aug 27, 2026",
    status: "Delivered",
    trackingNumber: "FEDEX-871923-PRI",
    carrier: "FedEx Priority",
    items: [
      {
        cartId: "sample-item-3",
        product: {
          id: "m003",
          slug: "tactical-cargo-track-pants",
          name: "Tactical Cargo Track Pants",
          category: "men",
          subcategory: "pants",
          price: 120,
          images: ["/images/men-cargo.jpg"],
          colors: [{ name: "Black", hex: "#0a0a0a" }],
          sizes: ["M"],
          description: "Tactical nylon cargos with utility straps.",
          details: ["Nylon taslan", "Water-resistant"],
          tags: ["pants"],
          inStock: true,
          rating: 4.7,
          reviews: 92,
        },
        size: "M",
        color: "Black",
        quantity: 1,
      },
    ],
    subtotal: 120,
    discount: 0,
    shipping: 9.99,
    total: 129.99,
    shippingAddress: {
      firstName: "Kabir",
      lastName: "Khan",
      address: "420 Fashion Avenue, Loft 4B",
      city: "New York",
      zip: "10001",
      country: "United States",
    },
    paymentMethod: "Apple Pay",
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>(SAMPLE_ORDERS);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("klub_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        // Auto-heal noisy or email-derived names (e.g. "KABIR.CTINFO" -> "Kabir Khan" / "Kabir")
        if (parsed?.name && (parsed.name.includes(".") || parsed.name.includes("@") || parsed.name === parsed.name.toUpperCase())) {
          const raw = parsed.name.split("@")[0].replace(/[._-]+/g, " ").trim();
          const words = raw.split(" ").filter(Boolean);
          if (words.length > 0) {
            parsed.name = words.map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
          }
          localStorage.setItem("klub_user", JSON.stringify(parsed));
        }
        setUser(parsed);
      } else {
        // Default demo user so testing order history/profile is effortless
        const defaultUser: UserProfile = {
          name: "Kabir Khan",
          email: "kabir@klubwear.com",
          membership: "VIP Gold",
        };
        setUser(defaultUser);
        localStorage.setItem("klub_user", JSON.stringify(defaultUser));
      }

      const savedOrders = localStorage.getItem("klub_orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        localStorage.setItem("klub_orders", JSON.stringify(SAMPLE_ORDERS));
      }
    } catch (_) {}
  }, []);

  const openAuthModal = (tab: "login" | "signup" = "login") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email: string, name?: string) => {
    let cleanName = name?.trim();
    if (!cleanName) {
      const handle = email.split("@")[0] || "Member";
      cleanName = handle
        .replace(/[._-]+/g, " ")
        .split(" ")
        .filter(Boolean)
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
        .join(" ");
    }
    const newUser: UserProfile = {
      name: cleanName || "Member",
      email,
      membership: "VIP Gold",
    };
    setUser(newUser);
    try {
      localStorage.setItem("klub_user", JSON.stringify(newUser));
    } catch (_) {}
    closeAuthModal();
  };

  const signup = (name: string, email: string) => {
    login(email, name);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("klub_user");
    } catch (_) {}
  };

  const addOrder = (order: OrderRecord) => {
    setOrders((prev) => {
      const updated = [order, ...prev];
      try {
        localStorage.setItem("klub_orders", JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });
  };

  const getOrderById = (id: string): OrderRecord | undefined => {
    const cleanId = id.trim().toUpperCase();
    return orders.find(
      (o) =>
        o.id.toUpperCase() === cleanId ||
        o.id.replace("-", "").toUpperCase() === cleanId.replace("-", "") ||
        o.trackingNumber.toUpperCase() === cleanId
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        logout,
        addOrder,
        getOrderById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
