"use client";

import { useState } from "react";
import { COUNTRY_THEMES, type CountryCode } from "@/utils/theme";

export function CountryModal({ onSelect }: { onSelect: (country: CountryCode) => void }) {
  const [closing, setClosing] = useState(false);

  const handleSelect = (code: CountryCode) => {
    setClosing(true);
    setTimeout(() => {
      onSelect(code);
    }, 200);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Select your country">
      <div className={`modal-card ${closing ? "closing" : ""}`}>
        <h2 className="text-2xl font-semibold">🌍 Where are you based?</h2>
        <p className="text-sm text-slate-600 mt-2">
          We&apos;ll match your calendar to your seasons and local feel.
        </p>
        <div className="country-grid">
          {Object.entries(COUNTRY_THEMES).map(([code, theme]) => (
            <button
              key={code}
              className="country-card"
              onClick={() => handleSelect(code as CountryCode)}
            >
              <span className="text-lg">{theme.flag}</span>
              <span className="text-sm font-medium">{theme.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
