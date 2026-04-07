"use client";

import { formatDateKey } from "@/utils/calendar";
import { getHoliday } from "@/utils/holidays";
import type { CountryCode } from "@/utils/theme";
import type { DateState } from "@/hooks/useRangeSelect";

export function DateCell({
  day,
  date,
  state,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  onClick,
  onDoubleClick,
  country,
}: {
  day: number | null;
  date: Date | null;
  state: DateState;
  onMouseDown: (date: Date) => void;
  onMouseEnter: (date: Date) => void;
  onMouseUp: () => void;
  onClick: (date: Date) => void;
  onDoubleClick: (date: Date) => void;
  country: CountryCode;
}) {
  if (!day || !date) {
    return <div className="date-cell disabled" aria-disabled="true" />;
  }

  const holiday = getHoliday(country, formatDateKey(date));
  const className = `date-cell ${
    state === "today"
      ? "today"
      : state === "selected-start"
        ? "selected-start"
        : state === "selected-end"
          ? "selected-end"
          : state === "in-range"
            ? "in-range"
            : state === "holiday"
              ? "holiday"
              : state === "hover"
                ? "hover"
              : ""
  }`;

  return (
    <div
      role="gridcell"
      aria-label={date.toDateString()}
      aria-selected={state === "selected-start" || state === "selected-end" || state === "in-range"}
      tabIndex={0}
      title={holiday ?? undefined}
      className={className}
      onMouseDown={() => onMouseDown(date)}
      onMouseEnter={() => onMouseEnter(date)}
      onMouseUp={onMouseUp}
      onClick={() => onClick(date)}
      onDoubleClick={() => onDoubleClick(date)}
    >
      {day}
    </div>
  );
}
