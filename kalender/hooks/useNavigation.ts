"use client";

import { useEffect, useState } from "react";

type ViewMode = "year" | "month" | "date";

export function useNavigation(currentYear: number) {
  const [viewMode, setViewMode] = useState<ViewMode>("date");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [decade, setDecade] = useState(Math.floor(currentYear / 10) * 10);

  useEffect(() => {
    setSelectedYear(currentYear);
    setDecade(Math.floor(currentYear / 10) * 10);
  }, [currentYear]);

  const goToYearView = () => setViewMode("year");
  const goToMonthView = () => setViewMode("month");
  const goToDateView = (year: number) => {
    setSelectedYear(year);
    setViewMode("date");
  };

  const goNextDecade = () => setDecade((d) => d + 10);
  const goPrevDecade = () => setDecade((d) => d - 10);

  return {
    viewMode,
    goToYearView,
    goToMonthView,
    goToDateView,
    selectedYear,
    setSelectedYear,
    decade,
    goNextDecade,
    goPrevDecade,
  };
}
