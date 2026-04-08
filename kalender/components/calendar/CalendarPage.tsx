"use client";

import { useMemo, useState } from "react";
import { useEvents } from "@/hooks/useEvents";
import { formatDateKey } from "@/utils/calendar";
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

export default function CalendarPage() {
  const { events, getEventsForDate, addEventOnDate } = useEvents();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showRangeModal, setShowRangeModal] = useState(false);
  const [confirmedRange, setConfirmedRange] = useState<{ start: Date; end: Date } | null>(null);

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
    setRangeStart(date);
    setRangeEnd(date);
    setIsDragging(true);
  };

  const handleRangeMove = (date: Date) => {
    if (isDragging) setRangeEnd(date);
  };

  const handleRangeEnd = () => {
    if (!isDragging || !rangeStart || !rangeEnd) {
      setIsDragging(false);
      return;
    }
    setIsDragging(false);
    const start = rangeStart < rangeEnd ? rangeStart : rangeEnd;
    const end = rangeStart < rangeEnd ? rangeEnd : rangeStart;
    const sameDay =
      start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth() &&
      start.getDate() === end.getDate();
    if (!sameDay) {
      setConfirmedRange({ start, end });
      setShowRangeModal(true);
    }
    setRangeStart(null);
    setRangeEnd(null);
  };

  const handleRangeSave = (data: { title: string; color: string; start: Date; end: Date }) => {
    const cursor = new Date(data.start);
    while (cursor <= data.end) {
      addEventOnDate(new Date(cursor), data.title, data.color);
      cursor.setDate(cursor.getDate() + 1);
    }
    setShowRangeModal(false);
    setConfirmedRange(null);
  };

  const handleRangeClose = () => {
    setShowRangeModal(false);
    setConfirmedRange(null);
  };

  const eventsForSelected = useMemo(() => {
    if (!selectedDate) return [];
    return getEventsForDate(formatDateKey(selectedDate));
  }, [getEventsForDate, selectedDate]);

  return (
    <section className="grid min-h-[70vh] gap-6 lg:min-h-[calc(100vh-180px)] lg:grid-cols-[1.4fr_0.85fr] lg:items-stretch">
      <div className="flex h-full flex-col gap-6 rounded-[28px] border border-[#EADFD2] bg-white/70 p-6 md:p-8">
        <CalendarHeader
          month={monthNames[month]}
          year={year}
          onPrev={handlePrev}
          onNext={handleNext}
        />
        <WeekdayRow />
        <MonthGrid
          month={month}
          year={year}
          selectedDate={selectedDate}
          events={events}
          onSelect={setSelectedDate}
          today={today}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          isDragging={isDragging}
          onRangeStart={handleRangeStart}
          onRangeMove={handleRangeMove}
          onRangeEnd={handleRangeEnd}
          onGridLeave={() => setIsDragging(false)}
        />
      </div>
      <EventPanel selectedDate={selectedDate} events={eventsForSelected} />

      {showRangeModal && confirmedRange ? (
        <RangeEventModal range={confirmedRange} onSave={handleRangeSave} onClose={handleRangeClose} />
      ) : null}
    </section>
  );
}
