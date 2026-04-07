import holidays from "@/data/holidays.json";
import type { CountryCode } from "./theme";

export function getHoliday(country: CountryCode, dateKey: string): string | null {
  const byCountry = holidays[country] ?? holidays.DEFAULT;
  return byCountry?.[dateKey] ?? null;
}
