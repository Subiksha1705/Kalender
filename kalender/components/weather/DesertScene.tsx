import { useId } from "react";
import { seasonTokens, type Season } from "@/lib/seasons";
import CloudGroup from "./CloudGroup";
import HillLayer from "./HillLayer";
import SkySun from "./SkySun";
import TreeSet from "./TreeSet";

type DesertSceneProps = {
  season: Season;
  onSunClick: () => void;
};

export default function DesertScene({ season, onSunClick }: DesertSceneProps) {
  const gradientId = useId();
  const clipId = useId();
  const { skyTop, skyMid, skyBottom, sunGlow } = seasonTokens[season];

  return (
    <svg
      viewBox="0 0 520 360"
      preserveAspectRatio="xMidYMid slice"
      className="block h-full w-full"
      role="img"
      aria-label="Desert landscape"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="50%" stopColor={skyMid} />
          <stop offset="100%" stopColor={skyBottom} />
        </linearGradient>
        <clipPath id={clipId}>
          <path d="M80 20 H520 V340 H80 C45 340 20 315 20 280 V80 C20 45 45 20 80 20 Z" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <rect width="520" height="360" fill={`url(#${gradientId})`} />
        <CloudGroup />
        <SkySun onClick={onSunClick} skyColor={sunGlow} />
        <HillLayer season={season} />
        <TreeSet />
        
      </g>
    </svg>
  );
}
