import type { CSSProperties } from "react";

type SkySunProps = {
  onClick?: () => void;
  skyColor: string;
  isExiting: boolean;
  isEntering: boolean;
};

function getStyle(isExiting: boolean, isEntering: boolean): CSSProperties | undefined {
  if (isExiting) {
    return {
      animation: "shrinkFade 0.4s cubic-bezier(0.4,0,1,1) 0.1s forwards",
      transformOrigin: "160px 175px",
    };
  }
  if (isEntering) {
    return {
      animation: "growFadeIn 0.45s cubic-bezier(0,0,0.2,1) 0.15s both",
      transformOrigin: "160px 175px",
    };
  }
  return undefined;
}

export default function SkySun({ onClick, skyColor, isExiting, isEntering }: SkySunProps) {
  const interactive = typeof onClick === "function";

  return (
    <g
      onClick={interactive ? onClick : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={interactive ? "cursor-pointer" : undefined}
      aria-label={interactive ? "Open calendar" : undefined}
      style={getStyle(isExiting, isEntering)}
    >
      <circle cx="160" cy="175" r="60" fill={skyColor} opacity="0.30" />
      <circle cx="160" cy="175" r="50" fill={skyColor} opacity="0.45" />
      <circle cx="160" cy="175" r="40" fill={skyColor} />
    </g>
  );
}
