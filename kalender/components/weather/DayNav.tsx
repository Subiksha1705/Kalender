type DayNavProps = {
  onPrev?: () => void;
  onNext?: () => void;
};

export default function DayNav({ onPrev, onNext }: DayNavProps) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#9C7F6A]">
      <button
        type="button"
        onClick={onPrev}
        className="rounded-full border border-[#E6D9CB] px-2 py-1 text-[#5A3E2B] transition hover:border-[#C9A98A]"
        aria-label="Previous day"
      >
        &#x2039;
      </button>
      <span>Today</span>
      <button
        type="button"
        onClick={onNext}
        className="rounded-full border border-[#E6D9CB] px-2 py-1 text-[#5A3E2B] transition hover:border-[#C9A98A]"
        aria-label="Next day"
      >
        &#x203A;
      </button>
    </div>
  );
}
