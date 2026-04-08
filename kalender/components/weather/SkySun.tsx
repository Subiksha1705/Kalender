import type { CSSProperties } from "react";

type SkySunProps = {
  onClick: () => void;
  skyColor: string;
  isExiting: boolean;
};

const exitStyle: CSSProperties = {
  animation: "shrinkFade 0.4s cubic-bezier(0.4,0,1,1) 0.1s forwards",
  transformOrigin: "160px 175px",
};

export default function SkySun({ onClick, skyColor, isExiting }: SkySunProps) {
  return (
    <g
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      role="button"
      tabIndex={0}
      className="cursor-pointer"
      aria-label="Open calendar"
      style={isExiting ? exitStyle : undefined}
    >
      <circle cx="160" cy="175" r="60" fill={skyColor} opacity="0.30" />
      <circle cx="160" cy="175" r="50" fill={skyColor} opacity="0.45" />
      <circle cx="160" cy="175" r="40" fill={skyColor} />
    </g>
  );
}
