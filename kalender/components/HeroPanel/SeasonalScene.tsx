"use client";

import type { CountryCode } from "@/utils/theme";
import { getSeason } from "@/utils/season";
import { SummerScene } from "./scenes/SummerScene";
import { WinterScene } from "./scenes/WinterScene";
import { SpringScene } from "./scenes/SpringScene";
import { AutumnScene } from "./scenes/AutumnScene";

export function SeasonalScene({ month, country }: { month: number; country: CountryCode }) {
  const season = getSeason(month, country);
  switch (season) {
    case "winter":
      return <WinterScene />;
    case "spring":
      return <SpringScene />;
    case "autumn":
      return <AutumnScene />;
    default:
      return <SummerScene />;
  }
}
