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
  const scale = 1.32;
  const translateX = -60;
  const translateY = -30;

  return (
    <svg
      viewBox="0 0 520 360"
      className="h-full w-full"
      role="img"
      aria-label="Desert landscape"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="55%" stopColor={skyMid} />
          <stop offset="100%" stopColor={skyBottom} />
        </linearGradient>
        <clipPath id={clipId}>
          <path d="M20 24 C140 -6 300 -8 420 12 C500 28 540 92 540 170 C540 276 440 342 300 360 C160 378 60 340 20 270 Z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <g transform={`translate(${translateX} ${translateY}) scale(${scale})`}>
          <rect width="520" height="360" fill={`url(#${gradientId})`} />
          <CloudGroup />
          <SkySun onClick={onSunClick} skyColor={sunGlow} />
          <HillLayer season={season} />
          <TreeSet />
          <path
            d="M215 280 C260 268 320 265 370 275 C410 282 450 298 475 316 C430 316 380 320 330 324 C280 328 245 322 215 312 Z"
            fill="#F7C371"
            opacity="0.6"
          />
          <path
            d="M110 302 C170 286 240 284 300 296 C340 304 380 318 420 336 C360 336 310 340 250 344 C190 348 140 342 110 330 Z"
            fill="#F5B356"
            opacity="0.55"
          />
          <path
            d="M250 300 C290 292 330 290 360 296 C380 300 400 308 420 318 C390 318 350 320 310 324 C280 327 260 322 250 316 Z"
            fill="#FDE7B1"
            opacity="0.7"
          />
          <path
            d="M300 320 C330 314 360 314 390 320 C410 324 430 332 450 342 C420 342 380 344 340 346 C320 348 305 344 300 338 Z"
            fill="#FDE7B1"
            opacity="0.6"
          />
        </g>
      </g>
    </svg>
  );
}
