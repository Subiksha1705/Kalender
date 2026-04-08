"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCountry } from "@/hooks/useCountry";
import { CountryModal } from "./CountryModal";

export function OnboardingGate({ children }: { children: React.ReactNode }) {
  const { hasOnboarded, ready, setCountry } = useCountry();
  const router = useRouter();

  useEffect(() => {
    if (ready && hasOnboarded) {
      router.replace("/weather");
    }
  }, [ready, hasOnboarded, router]);

  if (!ready) return null;

  if (!hasOnboarded) {
    return (
      <CountryModal
        onSelect={(country) => {
          setCountry(country);
          router.push("/weather");
        }}
      />
    );
  }

  return null;
}
