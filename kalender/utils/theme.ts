export type CountryCode = "IN" | "JP" | "SE" | "BR" | "DEFAULT";

export const MONTH_THEMES: Record<number, {
  primary: string;
  surface: string;
  accent: string;
  name: string;
}> = {
  0: { primary: "#C4B5FD", surface: "#F5F3FF", accent: "#7C3AED", name: "Icy Lavender" },
  1: { primary: "#FDA4AF", surface: "#FFF1F2", accent: "#BE123C", name: "Rose Blush" },
  2: { primary: "#86EFAC", surface: "#F0FDF4", accent: "#15803D", name: "Mint Sage" },
  3: { primary: "#93C5FD", surface: "#EFF6FF", accent: "#1D4ED8", name: "Sky Periwinkle" },
  4: { primary: "#FCA5A5", surface: "#FFF7ED", accent: "#C2410C", name: "Peach Blossom" },
  5: { primary: "#FDE68A", surface: "#FFFBEB", accent: "#B45309", name: "Lemon Butter" },
  6: { primary: "#FCA5A5", surface: "#FFF1F2", accent: "#9F1239", name: "Coral Flamingo" },
  7: { primary: "#67E8F9", surface: "#ECFEFF", accent: "#0E7490", name: "Sea Foam" },
  8: { primary: "#D8B4FE", surface: "#FAF5FF", accent: "#7E22CE", name: "Dusty Mauve" },
  9: { primary: "#FCD34D", surface: "#FFFBEB", accent: "#92400E", name: "Warm Amber" },
  10: { primary: "#94A3B8", surface: "#F8FAFC", accent: "#334155", name: "Slate Mist" },
  11: { primary: "#A7F3D0", surface: "#ECFDF5", accent: "#065F46", name: "Frost Sage" },
};

export const COUNTRY_THEMES: Record<CountryCode, {
  flagA: string;
  flagB: string;
  label: string;
  flag: string;
}> = {
  IN: { flagA: "#FF9933", flagB: "#138808", label: "India", flag: "🇮🇳" },
  JP: { flagA: "#FFB7C5", flagB: "#BC002D", label: "Japan", flag: "🇯🇵" },
  SE: { flagA: "#A8DAFF", flagB: "#003F87", label: "Nordic", flag: "🇸🇪" },
  BR: { flagA: "#6DC12E", flagB: "#FFDF00", label: "Brazil", flag: "🇧🇷" },
  DEFAULT: { flagA: "#E5E7EB", flagB: "#6B7280", label: "Other", flag: "🌐" },
};

export const SEASON_MAP: Record<number, string> = {
  11: "winter",
  0: "winter",
  1: "winter",
  2: "spring",
  3: "spring",
  4: "spring",
  5: "summer",
  6: "summer",
  7: "summer",
  8: "autumn",
  9: "autumn",
  10: "autumn",
};

export const BRAZIL_SEASON_MAP: Record<number, string> = {
  11: "summer",
  0: "summer",
  1: "summer",
  2: "autumn",
  3: "autumn",
  4: "autumn",
  5: "winter",
  6: "winter",
  7: "winter",
  8: "spring",
  9: "spring",
  10: "spring",
};
