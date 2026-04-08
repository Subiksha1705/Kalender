import type { CalendarEvent } from "@/hooks/useEvents";
import DayCell from "./DayCell";

type MonthGridProps = {
  month: number;
  year: number;
  selectedDate: Date | null;
  events: CalendarEvent[];
  onSelect: (date: Date) => void;
  today: Date;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  isDragging: boolean;
  onRangeStart: (date: Date) => void;
  onRangeMove: (date: Date) => void;
  onRangeEnd: () => void;
  onGridLeave: () => void;
};

const formatKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

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
  events,
  onSelect,
  today,
  rangeStart,
  rangeEnd,
  isDragging,
  onRangeStart,
  onRangeMove,
  onRangeEnd,
  onGridLeave,
}: MonthGridProps) {
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

  const eventKeys = new Set(events.map((event) => event.dateKey));
  const bounds = getRangeBounds(rangeStart, rangeEnd);

  return (
    <div className="grid grid-cols-7 gap-3" onMouseLeave={onGridLeave}>
      {dayEntries.map(({ date, day, isOverflow }) => {
        const isSelected = selectedDate !== null && isSameDate(selectedDate, date);
        const isToday = isSameDate(today, date);
        const hasEvents = eventKeys.has(formatKey(date));
        const inRange = isInRange(date, rangeStart, rangeEnd);
        const isRangeStart = bounds ? isSameDate(bounds.lo, date) : false;
        const isRangeEnd = bounds ? isSameDate(bounds.hi, date) : false;

        return (
          <DayCell
            key={`${date.toISOString()}-${day}`}
            day={day}
            isSelected={isSelected}
            isToday={isToday}
            hasEvents={hasEvents}
            isOverflow={isOverflow}
            isInRange={inRange}
            isRangeStart={isRangeStart}
            isRangeEnd={isRangeEnd}
            onMouseDown={() => onRangeStart(date)}
            onMouseEnter={() => {
              if (isDragging) onRangeMove(date);
            }}
            onMouseUp={onRangeEnd}
            onClick={() => onSelect(date)}
          />
        );
      })}
    </div>
  );
}
