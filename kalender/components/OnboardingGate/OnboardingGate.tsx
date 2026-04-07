"use client";

import { useCountry } from "@/hooks/useCountry";
import { CountryModal } from "./CountryModal";

export function OnboardingGate({ children }: { children: React.ReactNode }) {
  const { hasOnboarded, ready, setCountry } = useCountry();

  if (!ready) return null;

  if (!hasOnboarded) {
    return <CountryModal onSelect={setCountry} />;
  }

  return <>{children}</>;
}
