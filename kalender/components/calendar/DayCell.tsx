import type { MouseEvent, TouchEvent } from "react";

type DayCellProps = {
  day: number;
  dataDate: string;
  isSelected: boolean;
  isToday: boolean;
  hasEvents: boolean;
  isOverflow: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  onMouseDown: () => void;
  onMouseEnter: () => void;
  onMouseUp: () => void;
  onTouchStart: (event: TouchEvent<HTMLButtonElement>) => void;
  onTouchMove: (event: TouchEvent<HTMLButtonElement>) => void;
  onTouchEnd: (event: TouchEvent<HTMLButtonElement>) => void;
};

export default function DayCell({
  day,
  dataDate,
  isSelected,
  isToday,
  hasEvents,
  isOverflow,
  isInRange,
  isRangeStart,
  isRangeEnd,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: DayCellProps) {
  const isDisabled = isOverflow;
  const baseText = isOverflow ? "text-[#c5b8ab]" : "text-[#2a1f14]";
  const rangeFill = isRangeStart || isRangeEnd ? "bg-[rgba(200,121,65,0.28)]" : isInRange ? "bg-[rgba(200,121,65,0.18)]" : "";
  const rangeRadius = isRangeStart && isRangeEnd
    ? "rounded-full"
    : isRangeStart
      ? "rounded-l-full"
      : isRangeEnd
        ? "rounded-r-full"
        : isInRange
          ? "rounded-none"
          : "rounded-full";
  const hoverBg = !isDisabled && !isSelected && !isInRange && !isRangeStart && !isRangeEnd
    ? "hover:bg-[rgba(90,74,58,0.08)]"
    : "";

  const numberBase = "flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-medium";
  const todayRing = isToday && !isSelected ? "border-[1.5px] border-[#8B6340]" : "";
  const selectedStyle = isSelected ? "bg-[#3d2c1e] text-white" : "";

  return (
    <button
      type="button"
      data-date={dataDate}
      data-overflow={isOverflow ? "true" : undefined}
      disabled={isDisabled}
      onMouseDown={(e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!isDisabled) onMouseDown();
      }}
      onMouseEnter={() => {
        if (!isDisabled) onMouseEnter();
      }}
      onMouseUp={() => {
        if (!isDisabled) onMouseUp();
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={
        "relative flex h-10 w-10 flex-col items-center justify-center transition " +
        baseText +
        " " +
        rangeFill +
        " " +
        rangeRadius +
        " " +
        hoverBg +
        " " +
        (isDisabled ? "cursor-default" : "cursor-pointer") +
        " touch-none [-webkit-tap-highlight-color:transparent]"
      }
    >
      <span className={`${numberBase} ${todayRing} ${selectedStyle}`}>
        {day}
      </span>
      {hasEvents ? (
        <span className="mt-[3px] h-[5px] w-[5px] rounded-full bg-[#c87941]" />
      ) : null}
    </button>
  );
}
