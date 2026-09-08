import type { Metadata } from "next";
import { Space_Grotesk, Bebas_Neue, DM_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { UIProvider } from "@/context/UIContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchOverlay from "@/components/search/SearchOverlay";
import CustomCursor from "@/components/layout/CustomCursor";
import AuthModal from "@/components/auth/AuthModal";
import { getCssThemeVariables, environment } from "@/environment";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${environment.brand.name} — ${environment.brand.tagline}`,
    template: `%s | ${environment.brand.name}`,
  },
  description:
    `${environment.brand.name} is a premium streetwear brand built for those who refuse to blend in. Explore our latest collections of bold, youthful, fashion-forward clothing.`,
  keywords: ["streetwear", "fashion", "clothing", "premium", "KLUB", "urban", "style"],
  openGraph: {
    title: `${environment.brand.name} — ${environment.brand.tagline}`,
    description: "Premium streetwear for those who refuse to blend in.",
    url: "https://klubwear.com",
    siteName: environment.brand.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${environment.brand.name} — ${environment.brand.tagline}`,
    description: "Premium streetwear for those who refuse to blend in.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${bebasNeue.variable} ${dmMono.variable}`}
    >
      <head>
        <style
          id="theme-environment-vars"
          dangerouslySetInnerHTML={{ __html: getCssThemeVariables() }}
        />
      </head>
      <body>
        <UIProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <CustomCursor />
                <Navbar />
                <main>{children}</main>
                <Footer />
                <CartDrawer />
                <SearchOverlay />
                <AuthModal />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </UIProvider>
      </body>
    </html>
  );
}
