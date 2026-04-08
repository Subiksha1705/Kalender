import type { CSSProperties } from "react";

type TreeSetProps = {
  isExiting: boolean;
};

const exitStyle: CSSProperties = {
  animation: "slideOutDown 0.5s cubic-bezier(0.4,0,1,1) 0.2s forwards",
};

export default function TreeSet({ isExiting }: TreeSetProps) {
  function Cypress({
    x,
    y,
    height = 70,
    width = 16,
  }: {
    x: number;
    y: number;
    height?: number;
    width?: number;
  }) {
    const hw = width / 2;
    const trunkH = height * 0.18;
    const trunkW = width * 0.22;
    return (
      <g fill="#3B2009">
        <rect
          x={x - trunkW / 2}
          y={y - trunkH}
          width={trunkW}
          height={trunkH}
          rx={trunkW / 2}
        />
        <path
          d={`
            M ${x} ${y - height}
            C ${x + hw * 0.6} ${y - height + height * 0.25},
              ${x + hw} ${y - height * 0.6},
              ${x + hw * 0.7} ${y - trunkH}
            C ${x + hw * 0.3} ${y},
              ${x - hw * 0.3} ${y},
              ${x - hw * 0.7} ${y - trunkH}
            C ${x - hw} ${y - height * 0.6},
              ${x - hw * 0.6} ${y - height + height * 0.25},
              ${x} ${y - height}
            Z
          `}
        />
      </g>
    );
  }

  return (
    <g style={isExiting ? exitStyle : undefined}>
      <Cypress x={128} y={282} height={78} width={18} />
      <Cypress x={152} y={290} height={68} width={16} />
      <Cypress x={418} y={308} height={62} width={16} />
    </g>
  );
}
