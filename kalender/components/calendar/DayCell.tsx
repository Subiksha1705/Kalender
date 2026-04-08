type DayCellProps = {
  day: number;
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
  onClick: () => void;
};

export default function DayCell({
  day,
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
  onClick,
}: DayCellProps) {
  const baseText = isOverflow ? "text-[#D9C9BA]" : "text-[#5A3E2B]";
  const rangeBg = isInRange || isRangeStart || isRangeEnd ? "bg-[rgba(232,168,56,0.25)]" : "";
  const rangeRadius = isRangeStart
    ? "rounded-l-full"
    : isRangeEnd
      ? "rounded-r-full"
      : isInRange
        ? "rounded-none"
        : "rounded-full";

  return (
    <button
      type="button"
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
      onClick={onClick}
      className={
        "relative flex h-10 w-10 items-center justify-center transition " +
        baseText +
        " " +
        rangeBg +
        " " +
        rangeRadius
      }
    >
      <span
        className={
          "flex h-10 w-10 items-center justify-center rounded-full " +
          (isSelected ? "bg-[#6B3F2A] text-white" : "") +
          (isToday ? " ring-2 ring-[#C69B7B]" : "")
        }
      >
        {day}
      </span>
      {hasEvents && !isSelected && (
        <span className="absolute -bottom-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#C69B7B]" />
      )}
    </button>
  );
}
