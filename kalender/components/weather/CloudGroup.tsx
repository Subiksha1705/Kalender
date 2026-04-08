import type { CSSProperties } from "react";

type CloudGroupProps = {
  isExiting: boolean;
  isEntering: boolean;
};

function getStyle(isExiting: boolean, isEntering: boolean): CSSProperties | undefined {
  if (isExiting) {
    return { animation: "slideOutRight 0.4s cubic-bezier(0.4,0,1,1) forwards" };
  }
  if (isEntering) {
    return { animation: "arriveFromRight 0.45s cubic-bezier(0,0,0.2,1) both" };
  }
  return undefined;
}

export default function CloudGroup({ isExiting, isEntering }: CloudGroupProps) {
  return (
    <g fill="white" style={getStyle(isExiting, isEntering)}>
      <g transform="translate(0,-10)">
        <ellipse cx="108" cy="90" rx="38" ry="22" />
        <ellipse cx="140" cy="78" rx="30" ry="20" />
        <ellipse cx="170" cy="88" rx="34" ry="20" />
        <ellipse cx="196" cy="96" rx="26" ry="16" />
      </g>
      <g transform="translate(90,-25)">
        <ellipse cx="210" cy="130" rx="24" ry="14" />
        <ellipse cx="234" cy="120" rx="20" ry="13" />
        <ellipse cx="256" cy="128" rx="22" ry="13" />
      </g>
    </g>
  );
}
