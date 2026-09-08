"use client";
import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";

interface WishlistState {
  ids: string[];
}

type WishlistAction =
  | { type: "TOGGLE"; payload: string }
  | { type: "HYDRATE"; payload: string[] };

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "TOGGLE":
      return {
        ids: state.ids.includes(action.payload)
          ? state.ids.filter((id) => id !== action.payload)
          : [...state.ids, action.payload],
      };
    case "HYDRATE":
      return { ids: action.payload };
    default:
      return state;
  }
}

interface WishlistContextValue extends WishlistState {
  toggle: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { ids: [] });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("klub-wishlist");
      if (stored) dispatch({ type: "HYDRATE", payload: JSON.parse(stored) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("klub-wishlist", JSON.stringify(state.ids));
  }, [state.ids]);

  const toggle = (productId: string) => dispatch({ type: "TOGGLE", payload: productId });
  const isWishlisted = (productId: string) => state.ids.includes(productId);

  return (
    <WishlistContext.Provider value={{ ...state, toggle, isWishlisted, count: state.ids.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
