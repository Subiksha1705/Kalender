"use client";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function MonthView({
  year,
  currentMonth,
  onSelectMonth,
  onPrevYear,
  onNextYear,
}: {
  year: number;
  currentMonth: number;
  onSelectMonth: (month: number) => void;
  onPrevYear: () => void;
  onNextYear: () => void;
}) {
  return (
    <div>
      <div className="calendar-header">
        <button className="nav-button" onClick={onPrevYear} aria-label="Previous year">
          ←
        </button>
        <div className="calendar-title">{year}</div>
        <button className="nav-button" onClick={onNextYear} aria-label="Next year">
          →
        </button>
      </div>
      <div className="month-view">
        {months.map((label, idx) => (
          <button
            key={label}
            className={`month-pill ${idx === currentMonth ? "active" : ""}`}
            onClick={() => onSelectMonth(idx)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
