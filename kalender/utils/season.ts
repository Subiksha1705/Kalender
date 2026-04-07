import { BRAZIL_SEASON_MAP, SEASON_MAP, type CountryCode } from "./theme";

export type Season = "summer" | "winter" | "spring" | "autumn";

export function getSeason(month: number, country: CountryCode): Season {
  const map = country === "BR" ? BRAZIL_SEASON_MAP : SEASON_MAP;
  return map[month] as Season;
}
