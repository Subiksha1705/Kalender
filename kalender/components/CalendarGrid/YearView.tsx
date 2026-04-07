"use client";

export function YearView({
  decade,
  selectedYear,
  onSelect,
  onPrevDecade,
  onNextDecade,
}: {
  decade: number;
  selectedYear: number;
  onSelect: (year: number) => void;
  onPrevDecade: () => void;
  onNextDecade: () => void;
}) {
  const years = Array.from({ length: 10 }, (_, i) => decade + i);

  return (
    <div>
      <div className="calendar-header">
        <button className="nav-button" onClick={onPrevDecade} aria-label="Previous decade">
          ←
        </button>
        <div className="calendar-title">{decade}–{decade + 9}</div>
        <button className="nav-button" onClick={onNextDecade} aria-label="Next decade">
          →
        </button>
      </div>
      <div className="year-view">
        {years.map((year) => (
          <button
            key={year}
            className={`year-pill ${year === selectedYear ? "active" : ""}`}
            onClick={() => onSelect(year)}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}
