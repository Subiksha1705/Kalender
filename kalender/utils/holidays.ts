import holidays from "@/data/holidays.json";
import type { CountryCode } from "./theme";

const holidaysData = holidays as Record<string, Record<string, string>>;

export function getHoliday(country: CountryCode, dateKey: string): string | null {
  const byCountry = holidaysData[country] ?? holidaysData.DEFAULT;
  return byCountry?.[dateKey] ?? null;
}
