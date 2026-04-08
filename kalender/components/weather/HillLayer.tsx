import { seasonTokens, type Season } from "@/lib/seasons";
import type { CSSProperties } from "react";

type HillLayerProps = {
  season: Season;
  isExiting: boolean;
};

const exitStyle: CSSProperties = {
  animation: "slideOutDown 0.5s cubic-bezier(0.4,0,1,1) 0.1s forwards",
};

export default function HillLayer({ season, isExiting }: HillLayerProps) {
  const { hillBack, hillMid, hillFront } = seasonTokens[season];

  return (
    <g style={isExiting ? exitStyle : undefined}>
      <path
        d="M0 200 C80 155 180 160 280 195 C370 225 450 255 520 290 L520 360 L0 360 Z"
        fill={hillBack}
      />
      <path
        d="M240 225 C310 205 390 208 465 228 C505 242 530 265 540 288 L540 360 L230 360 Z"
        fill={hillMid}
      />
      <path
        d="M0 268 C100 248 210 252 310 270 C375 282 430 305 480 328 L480 360 L0 360 Z"
        fill={hillFront}
      />
      <path
        d="M300 290 C370 272 430 272 490 290 C515 300 535 318 545 338 L545 360 L290 360 Z"
        fill={hillMid}
        opacity="0.85"
      />
    </g>
  );
}
