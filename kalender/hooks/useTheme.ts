"use client";

import { useEffect } from "react";
import { COUNTRY_THEMES, MONTH_THEMES, type CountryCode } from "@/utils/theme";

export function useTheme(month: number, country: CountryCode) {
  useEffect(() => {
    const m = MONTH_THEMES[month];
    const c = COUNTRY_THEMES[country];
    const root = document.documentElement;
    root.style.setProperty("--cal-primary", m.primary);
    root.style.setProperty("--cal-surface", m.surface);
    root.style.setProperty("--cal-accent", m.accent);
    root.style.setProperty("--cal-flag-a", c.flagA);
    root.style.setProperty("--cal-flag-b", c.flagB);
  }, [month, country]);
}
