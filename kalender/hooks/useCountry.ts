"use client";

import { useEffect, useState } from "react";
import type { CountryCode } from "@/utils/theme";

const STORAGE_KEY = "cal_country";

export function useCountry() {
  const [country, setCountryState] = useState<CountryCode>("DEFAULT");
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as CountryCode | null;
      if (stored) {
        setCountryState(stored);
        setHasOnboarded(true);
      } else {
        setHasOnboarded(false);
      }
    } catch {
      setHasOnboarded(false);
    } finally {
      setReady(true);
    }
  }, []);

  const setCountry = (next: CountryCode) => {
    setCountryState(next);
    setHasOnboarded(true);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  return { country, setCountry, hasOnboarded, ready };
}
