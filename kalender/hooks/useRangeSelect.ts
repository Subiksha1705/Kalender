"use client";

import { useCallback, useState } from "react";
import { formatDateKey, isInRange, isToday } from "@/utils/calendar";
import { getHoliday } from "@/utils/holidays";
import type { CountryCode } from "@/utils/theme";

export type DateState =
  | "default"
  | "today"
  | "selected-start"
  | "selected-end"
  | "in-range"
  | "hover"
  | "holiday"
  | "disabled";

export function useRangeSelect(country: CountryCode, onDateClick: (date: Date) => void) {
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDayMouseDown = useCallback((date: Date) => {
    setRangeStart(date);
    setRangeEnd(null);
    setIsDragging(true);
  }, []);

  const handleDayMouseEnter = useCallback(
    (date: Date) => {
      setHoverDate(date);
      if (isDragging) {
        setRangeEnd(date);
      }
    },
    [isDragging]
  );

  const handleDayMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDayClick = useCallback(
    (date: Date) => {
      setRangeStart(date);
      setRangeEnd(date);
      onDateClick(date);
    },
    [onDateClick]
  );

  const clearRange = useCallback(() => {
    setRangeStart(null);
    setRangeEnd(null);
    setHoverDate(null);
    setIsDragging(false);
  }, []);

  const getDateState = useCallback(
    (date: Date, isDisabled: boolean): DateState => {
      if (isDisabled) return "disabled";
      const sameDay = (a: Date | null, b: Date) =>
        a && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

      if (sameDay(rangeStart, date)) return "selected-start";
      if (sameDay(rangeEnd, date)) return "selected-end";
      if (isInRange(date, rangeStart, rangeEnd)) return "in-range";
      if (isToday(date.getFullYear(), date.getMonth(), date.getDate())) return "today";

      const holiday = getHoliday(country, formatDateKey(date));
      if (holiday) return "holiday";

      if (hoverDate && sameDay(hoverDate, date)) return "hover";
      return "default";
    },
    [country, hoverDate, rangeEnd, rangeStart]
  );

  return {
    rangeStart,
    rangeEnd,
    hoverDate,
    isDragging,
    handleDayMouseDown,
    handleDayMouseEnter,
    handleDayMouseUp,
    handleDayClick,
    clearRange,
    getDateState,
  };
}
