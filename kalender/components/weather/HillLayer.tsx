import { seasonTokens, type Season } from "@/lib/seasons";

type HillLayerProps = {
  season: Season;
};

export default function HillLayer({ season }: HillLayerProps) {
  const { hillBack, hillMid, hillFront } = seasonTokens[season];

  return (
    <g>
      <path
        d="M0 230 C120 190 240 190 360 220 C430 240 480 260 520 300 L520 360 L0 360 Z"
        fill={hillBack}
      />
      <path
        d="M260 235 C320 215 390 215 460 235 C505 250 530 275 540 295 L540 360 L250 360 Z"
        fill={hillMid}
      />
      <path
        d="M220 260 C300 235 380 235 450 255 C495 268 525 295 540 320 L540 360 L210 360 Z"
        fill={hillFront}
      />
      <path
        d="M0 285 C120 260 220 265 300 285 C350 298 390 318 420 340 C360 340 300 345 230 348 C150 352 80 345 0 335 Z"
        fill={hillFront}
      />
      <path
        d="M-10 305 C80 285 160 288 230 305 C270 314 300 330 320 350 C260 350 190 352 120 354 C40 356 0 350 -20 344 Z"
        fill={hillMid}
        opacity="0.8"
      />
    </g>
  );
}
