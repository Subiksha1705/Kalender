"use client";

import { useEffect, useRef } from "react";
import DayCell from "./DayCell";

type MonthGridProps = {
  month: number;
  year: number;
  selectedDate: Date | null;
  today: Date;
  hasEvents: (date: Date) => boolean;
  dragStart: Date | null;
  dragEnd: Date | null;
  isDragging: boolean;
  onRangeStart: (date: Date) => void;
  onRangeMove: (date: Date) => void;
  onRangeEnd: (date: Date) => void;
  onGridLeave: () => void;
  onTouchStart: (event: TouchEvent) => void;
  onTouchMove: (event: TouchEvent) => void;
  onTouchEnd: (event: TouchEvent) => void;
};

const isSameDate = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const getRangeBounds = (start: Date | null, end: Date | null) => {
  if (!start || !end) return null;
  return start <= end ? { lo: start, hi: end } : { lo: end, hi: start };
};

const isInRange = (date: Date, start: Date | null, end: Date | null) => {
  const bounds = getRangeBounds(start, end);
  if (!bounds) return false;
  return date >= bounds.lo && date <= bounds.hi;
};

export default function MonthGrid({
  month,
  year,
  selectedDate,
  today,
  hasEvents,
  dragStart,
  dragEnd,
  isDragging,
  onRangeStart,
  onRangeMove,
  onRangeEnd,
  onGridLeave,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: MonthGridProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const opts = { passive: false } as AddEventListenerOptions;
    el.addEventListener("touchstart", onTouchStart, opts);
    el.addEventListener("touchmove", onTouchMove, opts);
    el.addEventListener("touchend", onTouchEnd, opts);

    return () => {
      el.removeEventListener("touchstart", onTouchStart, opts);
      el.removeEventListener("touchmove", onTouchMove, opts);
      el.removeEventListener("touchend", onTouchEnd, opts);
    };
  }, [onTouchStart, onTouchMove, onTouchEnd, isDragging, dragStart, dragEnd]);

  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const mondayIndex = (firstOfMonth.getDay() + 6) % 7;
  const totalCells = Math.ceil((mondayIndex + daysInMonth) / 7) * 7;

  const dayEntries = Array.from({ length: totalCells }, (_, index) => {
    if (index < mondayIndex) {
      const day = daysInPrevMonth - mondayIndex + index + 1;
      return {
        date: new Date(year, month - 1, day),
        day,
        isOverflow: true,
      };
    }

    if (index >= mondayIndex + daysInMonth) {
      const day = index - (mondayIndex + daysInMonth) + 1;
      return {
        date: new Date(year, month + 1, day),
        day,
        isOverflow: true,
      };
    }

    const day = index - mondayIndex + 1;
    return {
      date: new Date(year, month, day),
      day,
      isOverflow: false,
    };
  });

  const bounds = getRangeBounds(dragStart, dragEnd);

  return (
    <div
      ref={gridRef}
      className="grid select-none touch-none grid-cols-7 gap-3"
      onMouseLeave={onGridLeave}
    >
      {dayEntries.map(({ date, day, isOverflow }) => {
        const isSelected = selectedDate !== null && isSameDate(selectedDate, date);
        const isToday = isSameDate(today, date);
        const hasEvent = !isOverflow && hasEvents(date);
        const inRange = isInRange(date, dragStart, dragEnd);
        const isRangeStart = bounds ? isSameDate(bounds.lo, date) : false;
        const isRangeEnd = bounds ? isSameDate(bounds.hi, date) : false;
        const dataDate = date.toISOString().slice(0, 10);

        return (
          <DayCell
            key={`${date.toISOString()}-${day}`}
            day={day}
            dataDate={dataDate}
            isSelected={isSelected}
            isToday={isToday}
            hasEvents={hasEvent}
            isOverflow={isOverflow}
            isInRange={inRange}
            isRangeStart={isRangeStart}
            isRangeEnd={isRangeEnd}
            onMouseDown={() => onRangeStart(date)}
            onMouseEnter={() => {
              if (isDragging) onRangeMove(date);
            }}
            onMouseUp={() => onRangeEnd(date)}
            onTouchStart={(e) => onTouchStart(e.nativeEvent)}
            onTouchMove={(e) => onTouchMove(e.nativeEvent)}
            onTouchEnd={(e) => onTouchEnd(e.nativeEvent)}
          />
        );
      })}
    </div>
  );
}
