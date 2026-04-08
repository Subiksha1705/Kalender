"use client";

import { useMemo, useState } from "react";
import { useEvents } from "@/hooks/useEvents";
import CalendarHeader from "./CalendarHeader";
import EventPanel from "./EventPanel";
import MonthGrid from "./MonthGrid";
import WeekdayRow from "./WeekdayRow";
import { RangeEventModal } from "@/components/RangeEventModal";

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

const today = new Date();

type Range = { start: Date; end: Date };

export default function CalendarPage() {
  const { getEvents, addEvent, addEventRange, removeEvent, hasEvents } = useEvents();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [dragStart, setDragStart] = useState<Date | null>(null);
  const [dragEnd, setDragEnd] = useState<Date | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rangeModal, setRangeModal] = useState<Range | null>(null);

  const handlePrev = () => {
    setMonth((prev) => {
      if (prev === 0) {
        setYear((current) => current - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setMonth((prev) => {
      if (prev === 11) {
        setYear((current) => current + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const handleRangeStart = (date: Date) => {
    setDragStart(date);
    setDragEnd(date);
    setIsDragging(true);
  };

  const handleRangeMove = (date: Date) => {
    if (isDragging) setDragEnd(date);
  };

  const handleRangeEnd = (date: Date) => {
    if (!isDragging) return;
    setIsDragging(false);
    const start = dragStart ?? date;
    const end = dragEnd ?? date;
    const lo = start <= end ? start : end;
    const hi = start <= end ? end : start;
    if (lo.toDateString() !== hi.toDateString()) {
      setRangeModal({ start: lo, end: hi });
    } else {
      setSelectedDate(lo);
    }
    setDragStart(null);
    setDragEnd(null);
  };

  const getCellDateFromTouch = (touch: Touch) => {
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const cell = el?.closest("[data-date]") as HTMLElement | null;
    if (!cell) return null;
    if (cell.getAttribute("data-overflow") === "true") return null;
    const iso = cell.getAttribute("data-date");
    if (!iso) return null;
    const d = new Date(iso);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const date = getCellDateFromTouch(touch);
    if (!date) return;
    setDragStart(date);
    setDragEnd(date);
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (!isDragging) return;
    const touch = e.touches[0];
    const date = getCellDateFromTouch(touch);
    if (date) setDragEnd(date);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    if (!isDragging || !dragStart || !dragEnd) {
      setIsDragging(false);
      return;
    }
    setIsDragging(false);
    const lo = dragStart <= dragEnd ? dragStart : dragEnd;
    const hi = dragStart <= dragEnd ? dragEnd : dragStart;
    if (lo.toDateString() !== hi.toDateString()) {
      setRangeModal({ start: lo, end: hi });
    } else {
      setSelectedDate(lo);
    }
    setDragStart(null);
    setDragEnd(null);
  };

  const eventsForSelected = useMemo(() => {
    if (!selectedDate) return [];
    return getEvents(selectedDate);
  }, [getEvents, selectedDate]);

  return (
    <section className="grid min-h-[70vh] gap-8 lg:min-h-[calc(100vh-180px)] lg:grid-cols-[1.4fr_0.85fr] lg:items-stretch">
      <div className="flex h-full flex-col gap-6 rounded-[20px] bg-[#F5EFE6] p-6 md:p-8">
        <CalendarHeader
          month={monthNames[month].toUpperCase()}
          year={year}
          onPrev={handlePrev}
          onNext={handleNext}
        />
        <WeekdayRow />
        <MonthGrid
          month={month}
          year={year}
          selectedDate={selectedDate}
          today={today}
          hasEvents={hasEvents}
          dragStart={dragStart}
          dragEnd={dragEnd}
          isDragging={isDragging}
          onRangeStart={handleRangeStart}
          onRangeMove={handleRangeMove}
          onRangeEnd={handleRangeEnd}
          onGridLeave={() => setIsDragging(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>
      <EventPanel
        selectedDate={selectedDate}
        events={eventsForSelected}
        onAdd={addEvent}
        onRemove={removeEvent}
      />

      {rangeModal ? (
        <RangeEventModal
          range={rangeModal}
          onSave={(title, color) => {
            addEventRange(rangeModal.start, rangeModal.end, title, color);
            setRangeModal(null);
          }}
          onClose={() => setRangeModal(null)}
        />
      ) : null}
    </section>
  );
}
