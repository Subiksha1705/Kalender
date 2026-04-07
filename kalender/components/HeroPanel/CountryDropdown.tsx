"use client";

import { COUNTRY_THEMES, type CountryCode } from "@/utils/theme";

export function CountryDropdown({
  value,
  onChange,
}: {
  value: CountryCode;
  onChange: (c: CountryCode) => void;
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as CountryCode)} className="country-dropdown">
      {Object.entries(COUNTRY_THEMES).map(([code, theme]) => (
        <option key={code} value={code}>
          {theme.flag} {theme.label}
        </option>
      ))}
    </select>
  );
}
