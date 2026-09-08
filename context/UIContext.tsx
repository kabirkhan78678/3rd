"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface UIState {
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  activeModal: string | null;
}

interface UIContextValue extends UIState {
  openSearch: () => void;
  closeSearch: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UIState>({
    searchOpen: false,
    mobileMenuOpen: false,
    activeModal: null,
  });

  const openSearch = () => setState((s) => ({ ...s, searchOpen: true }));
  const closeSearch = () => setState((s) => ({ ...s, searchOpen: false }));
  const toggleMobileMenu = () => setState((s) => ({ ...s, mobileMenuOpen: !s.mobileMenuOpen }));
  const closeMobileMenu = () => setState((s) => ({ ...s, mobileMenuOpen: false }));
  const openModal = (id: string) => setState((s) => ({ ...s, activeModal: id }));
  const closeModal = () => setState((s) => ({ ...s, activeModal: null }));

  return (
    <UIContext.Provider value={{ ...state, openSearch, closeSearch, toggleMobileMenu, closeMobileMenu, openModal, closeModal }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
