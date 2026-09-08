/**
 * ─────────────────────────────────────────────────────────────────────────────
 * KLUB BRAND & ENVIRONMENT CONFIGURATION (environment.ts)
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * 👉 YAHAN AAP JONSA COLOR DALENGE, WO AUTOMATICALLY POORI WEBSITE MEIN APPLY HOJAYEGA!
 * 
 * Examples:
 * - Electric Lime:   "#b5f000" (Default)
 * - Cyber Cyan:      "#00f0ff"
 * - Neon Pink:       "#ff007f"
 * - Fire Orange:     "#ff5500"
 * - Royal Purple:    "#8b5cf6"
 * - Golden Yellow:   "#facc15"
 * - Emerald Green:   "#10b981"
 * - Pure White/Red:  "#ef4444"
 * 
 * Simply edit `environment.colors.accent` below and save!
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface ThemeColors {
  /**
   * Main Brand Accent Color
   * Used for: Buttons, badges, glowing dots, hover states, active links,
   * cart counter, custom cursor, price tags, and 3D highlights.
   */
  accent: string;

  /**
   * Accent Hover Color (Button hover / focus states)
   * Optional: If left blank, it will automatically adjust.
   */
  accentHover?: string;

  /**
   * Secondary Accent Color (Sale badges, alerts, special drops)
   */
  accentSecondary?: string;

  /**
   * Primary Dark / Brand Base (Navbar dark hero, black buttons, footers)
   */
  primary?: string;

  /**
   * Secondary Charcoal Tone
   */
  secondary?: string;

  /**
   * Website Main Background
   * Default: "#ffffff" (Light mode) | For Dark Mode set to "#0a0a0a"
   */
  background?: string;

  /**
   * Card & Surface Background
   * Default: "#f5f5f5" | For Dark Mode set to "#141414"
   */
  surface?: string;

  /**
   * Elevated Surface 2 (Nested dropdowns, inner panels)
   */
  surface2?: string;

  /**
   * Main Text Color
   * Default: "#0a0a0a" | For Dark Mode set to "#ffffff"
   */
  text?: string;

  /**
   * Muted / Subtitle Text Color
   */
  muted?: string;

  /**
   * Border & Divider Color
   */
  border?: string;

  /**
   * Success Status Color
   */
  success?: string;

  /**
   * Sale / Discount Tag Color
   */
  sale?: string;
}

export interface BrandInfo {
  name: string;
  tagline: string;
  currencySymbol: string;
  freeShippingThreshold: number;
}

export interface EnvironmentConfig {
  brand: BrandInfo;
  colors: ThemeColors;
}

// ─── ACTIVE CONFIGURATION ────────────────────────────────────────────────────
// 👇 Yahan colors change karein:
export const environment: EnvironmentConfig = {
  brand: {
    name: "KLUB",
    tagline: "Wear Your Attitude",
    currencySymbol: "$",
    freeShippingThreshold: 150,
  },

  // 🎨 COLOR PALETTE:
  // 🎨 OPTION 1: AQUA BLUE
  colors: {
    accent: "#00c2cb",             // Vibrant Oceanic Aqua Blue
    accentHover: "#00a3ab",        // Deep Aqua Teal (Hover)
    accentSecondary: "#ff4d6d",    // Coral Punch (Sale / Badges)

    // Base Layout (Light Mode)
    primary: "#0a1315",            // Deep Marine Black
    secondary: "#142226",          // Dark Sea Charcoal
    background: "#ffffff",         // Pure Crisp White
    surface: "#f2f8f9",            // Subtle Pale Aqua Mist
    surface2: "#e4f0f2",           // Soft Aqua Border Surface
    text: "#0a1315",               // Deep Charcoal Text
    muted: "#5a7075",              // Muted Marine Slate
    border: "#dce8ea",             // Clean Soft Hairline Border
    success: "#00c988",            // Fresh Mint
    sale: "#ff4d6d",               // Vibrant Coral Sale
  },




};

/**
 * Generates the CSS `:root` variables string from the active environment.
 * Injected automatically into the layout `<head>` to override default tokens.
 */
export function getCssThemeVariables(colors: ThemeColors = environment.colors): string {
  const accent = colors.accent;
  const accentHover = colors.accentHover || accent;
  const accentSecondary = colors.accentSecondary || "#ff3b5c";
  const primary = colors.primary || "#0a0a0a";
  const secondary = colors.secondary || "#1a1a1a";
  const background = colors.background || "#ffffff";
  const surface = colors.surface || "#f5f5f5";
  const surface2 = colors.surface2 || "#ebebeb";
  const text = colors.text || "#0a0a0a";
  const muted = colors.muted || "#6e6e6e";
  const border = colors.border || "#e0e0e0";
  const success = colors.success || "#00c96e";
  const sale = colors.sale || "#ff3b5c";

  return `
    :root {
      --color-accent: ${accent} !important;
      --color-accent-hover: ${accentHover} !important;
      --color-accent-2: ${accentSecondary} !important;
      --color-primary: ${primary} !important;
      --color-secondary: ${secondary} !important;
      --color-background: ${background} !important;
      --color-surface: ${surface} !important;
      --color-surface-2: ${surface2} !important;
      --color-text: ${text} !important;
      --color-muted: ${muted} !important;
      --color-border: ${border} !important;
      --color-success: ${success} !important;
      --color-sale: ${sale} !important;
    }
  `;
}

// ─── OPTIONAL PRESET PALETTES (Copy-paste any into colors above) ───────────────
export const COLOR_PRESETS = {
  AQUA_BLUE: {
    accent: "#00c2cb",
    accentHover: "#00a3ab",
    accentSecondary: "#ff4d6d",
    primary: "#0a1315",
    secondary: "#142226",
    background: "#ffffff",
    surface: "#f2f8f9",
    surface2: "#e4f0f2",
    text: "#0a1315",
    muted: "#5a7075",
    border: "#dce8ea",
    success: "#00c988",
    sale: "#ff4d6d",
  },
  ELECTRIC_CYAN: {
    accent: "#00e5ff",
    accentHover: "#00b4cc",
    accentSecondary: "#ff007f",
    primary: "#05090d",
    secondary: "#0f1720",
    background: "#f8fafc",
    surface: "#f0f4f8",
    surface2: "#e2e9f0",
    text: "#05090d",
    muted: "#64748b",
    border: "#e2e8f0",
    success: "#00e676",
    sale: "#ff007f",
  },
  ELECTRIC_LIME: {
    accent: "#b5f000",
    accentHover: "#9fd800",
    accentSecondary: "#ff3b5c",
  },
  CYBER_CYAN: {
    accent: "#00f0ff",
    accentHover: "#00d0e0",
    accentSecondary: "#ff007f",
  },
  NEON_PINK: {
    accent: "#ff007f",
    accentHover: "#e00070",
    accentSecondary: "#00f0ff",
  },
  SOLAR_ORANGE: {
    accent: "#ff5500",
    accentHover: "#e04b00",
    accentSecondary: "#ffd000",
  },
  ULTRAVIOLET: {
    accent: "#8b5cf6",
    accentHover: "#7c3aed",
    accentSecondary: "#f43f5e",
  },
  VIP_GOLD: {
    accent: "#facc15",
    accentHover: "#eab308",
    accentSecondary: "#ef4444",
  },
  DARK_MODE_CYBER: {
    accent: "#b5f000",
    accentHover: "#9fd800",
    accentSecondary: "#00f0ff",
    background: "#0a0a0a",
    surface: "#141414",
    surface2: "#1f1f1f",
    text: "#ffffff",
    muted: "#a0a0a0",
    border: "#262626",
    primary: "#ffffff",
  },
};
