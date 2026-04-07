"use client";

import { useEffect } from "react";
import { COUNTRY_THEMES, MONTH_THEMES, type CountryCode } from "@/utils/theme";

export function useTheme(month: number, country: CountryCode) {
  useEffect(() => {
    const m = MONTH_THEMES[month];
    const c = COUNTRY_THEMES[country];
    const root = document.documentElement;
    const hexToRgb = (hex: string) => {
      const normalized = hex.replace("#", "");
      const bigint = parseInt(normalized, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return { r, g, b };
    };
    const luminance = ({ r, g, b }: { r: number; g: number; b: number }) =>
      (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    const isLight = luminance(hexToRgb(m.surface)) > 0.7;
    const heroText = isLight ? "#5A3E2B" : "#F8FAFC";
    const heroMuted = isLight ? "#9C7F6A" : "rgba(248, 250, 252, 0.75)";
    const heroChipBg = isLight ? "rgba(255, 255, 255, 0.35)" : "rgba(15, 23, 42, 0.35)";
    const heroChipBorder = isLight ? "rgba(255, 255, 255, 0.55)" : "rgba(255, 255, 255, 0.25)";
    const heroDivider = isLight ? "rgba(90, 62, 43, 0.2)" : "rgba(248, 250, 252, 0.25)";

    root.style.setProperty("--cal-primary", m.primary);
    root.style.setProperty("--cal-surface", m.surface);
    root.style.setProperty("--cal-accent", m.accent);
    root.style.setProperty("--cal-flag-a", c.flagA);
    root.style.setProperty("--cal-flag-b", c.flagB);
    root.style.setProperty("--hero-text", heroText);
    root.style.setProperty("--hero-muted", heroMuted);
    root.style.setProperty("--hero-chip-bg", heroChipBg);
    root.style.setProperty("--hero-chip-border", heroChipBorder);
    root.style.setProperty("--hero-divider", heroDivider);
  }, [month, country]);
}
