type CalendarHeaderProps = {
  month: string;
  year: number;
  onPrev: () => void;
  onNext: () => void;
  onMonthClick?: () => void;
  onYearClick?: () => void;
};

export default function CalendarHeader({
  month,
  year,
  onPrev,
  onNext,
  onMonthClick,
  onYearClick,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-[15px] font-medium uppercase tracking-[0.12em] text-[#1a1208]">
        <button
          type="button"
          onClick={onPrev}
          className="px-2 text-base text-[#1a1208]"
          aria-label="Previous month"
        >
          &#x2039;
        </button>
        <button
          type="button"
          onClick={onMonthClick}
          className={onMonthClick ? "cursor-pointer" : undefined}
          aria-label="Select month"
        >
          {month}
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-2 text-base text-[#1a1208]"
          aria-label="Next month"
        >
          &#x203A;
        </button>
      </div>
      <button
        type="button"
        onClick={onYearClick}
        className={`text-[15px] tracking-[0.08em] text-[#5a4a3a]${
          onYearClick ? " cursor-pointer" : ""
        }`}
        aria-label="Select year"
      >
        {year}
      </button>
    </div>
  );
}
