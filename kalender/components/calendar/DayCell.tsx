type DayCellProps = {
  day: number;
  isSelected: boolean;
  isToday: boolean;
  hasEvents: boolean;
  isOverflow: boolean;
  onClick: () => void;
};

export default function DayCell({
  day,
  isSelected,
  isToday,
  hasEvents,
  isOverflow,
  onClick,
}: DayCellProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition " +
        (isOverflow ? "text-[#D9C9BA]" : "text-[#5A3E2B]")
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
