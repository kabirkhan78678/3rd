"use client";
import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
  cartId: string; // unique per size+color combo
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { cartId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "HYDRATE"; payload: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.cartId === action.payload.cartId);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.cartId === action.payload.cartId
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
          isOpen: true,
        };
      }
      return { ...state, items: [...state.items, action.payload], isOpen: true };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.cartId !== action.payload) };
    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.cartId !== action.payload.cartId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartId === action.payload.cartId ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "HYDRATE":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

interface CartContextValue extends CartState {
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("klub-cart");
      if (stored) {
        const items = JSON.parse(stored) as CartItem[];
        dispatch({ type: "HYDRATE", payload: items });
      }
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("klub-cart", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: Product, size: string, color: string, quantity = 1) => {
    const cartId = `${product.id}-${size}-${color}`;
    dispatch({ type: "ADD_ITEM", payload: { product, size, color, quantity, cartId } });
  };

  const removeItem = (cartId: string) => dispatch({ type: "REMOVE_ITEM", payload: cartId });

  const updateQuantity = (cartId: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { cartId, quantity } });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const openCart = () => dispatch({ type: "OPEN_CART" });
  const closeCart = () => dispatch({ type: "CLOSE_CART" });
  const toggleCart = () => dispatch({ type: "TOGGLE_CART" });

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, i) => sum + (i.product.salePrice ?? i.product.price) * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ ...state, addItem, removeItem, updateQuantity, clearCart, openCart, closeCart, toggleCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
