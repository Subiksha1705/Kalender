type MonthNavProps = {
  month: string;
  onPrev?: () => void;
  onNext?: () => void;
  onLabelClick?: () => void;
};

export default function MonthNav({ month, onPrev, onNext, onLabelClick }: MonthNavProps) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#9C7F6A]">
      <button
        type="button"
        onClick={onPrev}
        className="rounded-full border border-[#E6D9CB] px-2 py-1 text-[#5A3E2B] transition hover:border-[#C9A98A]"
        aria-label="Previous month"
      >
        &#x2039;
      </button>
      <span
        onClick={onLabelClick}
        className={onLabelClick ? "cursor-pointer" : undefined}
      >
        {month}
      </span>
      <button
        type="button"
        onClick={onNext}
        className="rounded-full border border-[#E6D9CB] px-2 py-1 text-[#5A3E2B] transition hover:border-[#C9A98A]"
        aria-label="Next month"
      >
        &#x203A;
      </button>
    </div>
  );
}
