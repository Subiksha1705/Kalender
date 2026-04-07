"use client";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function CalendarHeader({
  month,
  year,
  onMonthClick,
  onYearClick,
  onPrev,
  onNext,
  disabled,
}: {
  month: number;
  year: number;
  onMonthClick: () => void;
  onYearClick: () => void;
  onPrev: () => void;
  onNext: () => void;
  disabled: boolean;
}) {
  return (
    <div className="calendar-header">
      <button className="nav-button" aria-label="Go to previous month" onClick={onPrev} disabled={disabled}>
        ←
      </button>
      <div className="calendar-title">
        <button onClick={onMonthClick}>{monthNames[month]}</button>
        <span>·</span>
        <button onClick={onYearClick}>{year}</button>
      </div>
      <button className="nav-button" aria-label="Go to next month" onClick={onNext} disabled={disabled}>
        →
      </button>
    </div>
  );
}
