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
type ViewMode = "date" | "month" | "year";

export default function CalendarPage() {
  const {
    getEvents,
    addEvent,
    addEventRange,
    removeEvent,
    removeEventGroup,
    updateEvent,
    updateEventGroup,
    hasEvents,
  } = useEvents();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [viewMode, setViewMode] = useState<ViewMode>("date");
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
          onMonthClick={() => setViewMode("month")}
          onYearClick={() => setViewMode("year")}
        />
        {viewMode === "date" ? (
          <>
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
          </>
        ) : null}
        {viewMode === "month" ? (
          <div className="cal-view-animate grid grid-cols-3 gap-3 md:grid-cols-4">
            {monthNames.map((label, idx) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  setMonth(idx);
                  setViewMode("date");
                }}
                className={`rounded-[14px] border border-[#c5b8ab] px-3 py-2 text-[13px] uppercase tracking-[0.08em] text-[#5a4a3a] transition ${
                  idx === month ? "bg-[#3d2c1e] text-white" : "bg-[#f9f3ea]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        ) : null}
        {viewMode === "year" ? (
          <div className="cal-view-animate grid grid-cols-3 gap-3 md:grid-cols-4">
            {Array.from({ length: 141 }, (_, i) => year - 70 + i).map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => {
                  setYear(y);
                  setViewMode("month");
                }}
                className={`rounded-[14px] border border-[#c5b8ab] px-3 py-2 text-[13px] tracking-[0.05em] text-[#5a4a3a] transition ${
                  y === year ? "bg-[#3d2c1e] text-white" : "bg-[#f9f3ea]"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <EventPanel
        selectedDate={selectedDate}
        events={eventsForSelected}
        onAdd={addEvent}
        onRemove={removeEvent}
        onRemoveGroup={removeEventGroup}
        onUpdate={updateEvent}
        onUpdateGroup={updateEventGroup}
      />

      {rangeModal ? (
        <RangeEventModal
          range={rangeModal}
          onSave={(title, time, color) => {
            addEventRange(rangeModal.start, rangeModal.end, title, time, color);
            setRangeModal(null);
          }}
          onClose={() => setRangeModal(null)}
        />
      ) : null}
    </section>
  );
}
