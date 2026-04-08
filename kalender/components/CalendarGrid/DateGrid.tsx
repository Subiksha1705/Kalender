"use client";

import { getMonthGrid } from "@/utils/calendar";
import type { CountryCode } from "@/utils/theme";
import { DayHeaders } from "./DayHeaders";
import { DateCell } from "./DateCell";
import type { ReturnTypeUseRange } from "./types";

export function DateGrid({
  year,
  month,
  monthGrid,
  direction,
  animating,
  range,
  country,
  onDateDoubleClick,
}: {
  year: number;
  month: number;
  monthGrid: (number | null)[][];
  direction: "left" | "right" | null;
  animating: boolean;
  range: ReturnTypeUseRange;
  country: CountryCode;
  onDateDoubleClick: (date: Date) => void;
}) {
  const next = direction
    ? direction === "right"
      ? month === 11
        ? { year: year + 1, month: 0 }
        : { year, month: month + 1 }
      : month === 0
        ? { year: year - 1, month: 11 }
        : { year, month: month - 1 }
    : { year, month };

  const incomingGrid = direction ? getMonthGrid(next.year, next.month) : monthGrid;

  const renderGrid = (grid: (number | null)[][], targetYear: number, targetMonth: number) => (
    <div className="date-grid gap-2 sm:gap-3 md:gap-4">
      {grid.flat().map((day, idx) => {
        const row = Math.floor(idx / 7);
        const col = idx % 7;
        const date = day ? new Date(targetYear, targetMonth, day) : null;
        const state = date ? range.getDateState(date, day === null) : "disabled";
        return (
          <DateCell
            key={`${row}-${col}-${day ?? "x"}`}
            day={day}
            date={date}
            state={state}
            onMouseDown={range.handleDayMouseDown}
            onMouseEnter={range.handleDayMouseEnter}
            onMouseUp={range.handleDayMouseUp}
            onClick={range.handleDayClick}
            onDoubleClick={onDateDoubleClick}
            country={country}
          />
        );
      })}
    </div>
  );

  return (
    <div>
      <DayHeaders />
      <div
        className="grid-container"
        onMouseLeave={() => {
          if (range.isDragging) range.handleDayMouseUp();
        }}
      >
        {animating && direction ? (
          <>
            <div
              className={`grid-layer ${direction === "right" ? "grid-exit-left" : "grid-exit-right"}`}
            >
              {renderGrid(monthGrid, year, month)}
            </div>
            <div
              className={`grid-layer ${direction === "right" ? "grid-enter-left" : "grid-enter-right"}`}
            >
              {renderGrid(incomingGrid, next.year, next.month)}
            </div>
          </>
        ) : (
          <div className="grid-layer">{renderGrid(monthGrid, year, month)}</div>
        )}
      </div>
    </div>
  );
}
