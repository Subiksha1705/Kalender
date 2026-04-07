"use client";

import type { CountryCode } from "@/utils/theme";
import { CalendarHeader } from "./CalendarHeader";
import { DateGrid } from "./DateGrid";
import { MonthView } from "./MonthView";
import { YearView } from "./YearView";
import type { ReturnTypeUseRange } from "./types";

export function CalendarGrid({
  year,
  month,
  monthGrid,
  onYearChange,
  onMonthChange,
  goNext,
  goPrev,
  direction,
  animating,
  viewMode,
  goToYearView,
  goToMonthView,
  goToDateView,
  selectedYear,
  setSelectedYear,
  decade,
  goNextDecade,
  goPrevDecade,
  range,
  country,
}: {
  year: number;
  month: number;
  monthGrid: (number | null)[][];
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  goNext: () => void;
  goPrev: () => void;
  direction: "left" | "right" | null;
  animating: boolean;
  viewMode: "year" | "month" | "date";
  goToYearView: () => void;
  goToMonthView: () => void;
  goToDateView: (year: number) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  decade: number;
  goNextDecade: () => void;
  goPrevDecade: () => void;
  range: ReturnTypeUseRange;
  country: CountryCode;
}) {
  if (viewMode === "year") {
    return (
      <YearView
        decade={decade}
        selectedYear={selectedYear}
        onSelect={(y) => {
          setSelectedYear(y);
          onYearChange(y);
          goToMonthView();
        }}
        onPrevDecade={goPrevDecade}
        onNextDecade={goNextDecade}
      />
    );
  }

  if (viewMode === "month") {
    return (
      <MonthView
        year={selectedYear}
        currentMonth={month}
        onSelectMonth={(m) => {
          onMonthChange(m);
          goToDateView(selectedYear);
        }}
        onPrevYear={() => {
          const y = selectedYear - 1;
          setSelectedYear(y);
          onYearChange(y);
        }}
        onNextYear={() => {
          const y = selectedYear + 1;
          setSelectedYear(y);
          onYearChange(y);
        }}
      />
    );
  }

  return (
    <div>
      <CalendarHeader
        month={month}
        year={year}
        onMonthClick={goToMonthView}
        onYearClick={goToYearView}
        onPrev={goPrev}
        onNext={goNext}
        disabled={animating}
      />
      <DateGrid
        year={year}
        month={month}
        monthGrid={monthGrid}
        direction={direction}
        animating={animating}
        range={range}
        country={country}
      />
    </div>
  );
}
