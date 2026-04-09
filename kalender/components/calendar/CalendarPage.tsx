"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useEvents } from "@/hooks/useEvents";
import { useNotes } from "@/hooks/useNotes";
import { formatDateKey } from "@/utils/calendar";
import CalendarBanner from "@/components/CalendarBanner";
import CalendarHeader from "./CalendarHeader";
import EventPanel from "./EventPanel";
import MonthGrid from "./MonthGrid";
import WeekdayRow from "./WeekdayRow";
import { RangeEventModal } from "@/components/RangeEventModal";

const today = new Date();
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

type Range = { start: Date; end: Date };
type PanelState = "hidden" | "open" | "closing";

const isSameDate = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export default function CalendarPage() {
  const router = useRouter();
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
  const notesStore = useNotes();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [dragStart, setDragStart] = useState<Date | null>(null);
  const [dragEnd, setDragEnd] = useState<Date | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rangeModal, setRangeModal] = useState<Range | null>(null);
  const [panelState, setPanelState] = useState<PanelState>("hidden");
  const closeTimerRef = useRef<number | null>(null);
  const [showBanner, setShowBanner] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("kalender-show-banner");
    return saved === null ? true : saved === "true";
  });
  const isCurrentMonth =
    month === today.getMonth() && year === today.getFullYear();

  useEffect(() => {
    localStorage.setItem("kalender-show-banner", String(showBanner));
  }, [showBanner]);

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

  const handleToday = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    setMonth(now.getMonth());
    setYear(now.getFullYear());
    if (selectedDate && !isSameDate(selectedDate, now)) {
      setSelectedDate(null);
      setPanelState("hidden");
      return;
    }
    if (selectedDate) {
      setSelectedDate(now);
      setPanelState("open");
    }
  };

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext]);

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
      handleSelectDate(lo);
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
    const [y, m, d] = iso.split("-").map((v) => Number(v));
    if (!y || !m || !d) return null;
    const date = new Date(y, m - 1, d);
    date.setHours(0, 0, 0, 0);
    return date;
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
      handleSelectDate(lo);
    }
    setDragStart(null);
    setDragEnd(null);
  };

  const handleSelectDate = (date: Date) => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (selectedDate && isSameDate(selectedDate, date)) {
      setPanelState("closing");
      closeTimerRef.current = window.setTimeout(() => {
        setPanelState("hidden");
        setSelectedDate(null);
        closeTimerRef.current = null;
      }, 320);
      return;
    }
    setSelectedDate(date);
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setPanelState("open");
  };

  const handlePrevDay = () => {
    if (!selectedDate) return;
    const next = new Date(selectedDate);
    next.setDate(next.getDate() - 1);
    setSelectedDate(next);
    setMonth(next.getMonth());
    setYear(next.getFullYear());
    setPanelState("open");
  };

  const handleNextDay = () => {
    if (!selectedDate) return;
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
    setMonth(next.getMonth());
    setYear(next.getFullYear());
    setPanelState("open");
  };

  const eventsForSelected = useMemo(() => {
    if (!selectedDate) return [];
    return getEvents(selectedDate);
  }, [getEvents, selectedDate]);

  const hasNotes = (date: Date) =>
    notesStore.getNotesForDate(formatDateKey(date)).length > 0;

  const dateKey = selectedDate ? formatDateKey(selectedDate) : null;
  const notesForSelected = useMemo(
    () => (dateKey ? notesStore.getNotesForDate(dateKey) : []),
    [dateKey, notesStore]
  );

  const showPanel = panelState !== "hidden";

  return (
    <>
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous month"
        className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 h-32 w-10 items-center justify-center rounded-r-xl text-neutral-400 transition-all duration-150 hover:bg-neutral-100/60 hover:text-neutral-700 z-10"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next month"
        className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 h-32 w-10 items-center justify-center rounded-l-xl text-neutral-400 transition-all duration-150 hover:bg-neutral-100/60 hover:text-neutral-700 z-10"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      <section
        className={`grid h-full min-h-full gap-8 bg-[#EDE8DC] transition-all duration-300 lg:items-stretch ${
          showPanel ? "lg:grid-cols-[1.4fr_0.85fr]" : "lg:grid-cols-1"
        }`}
      >
        <div className="flex h-full flex-col gap-6 rounded-[20px] bg-[#F5EFE6] p-6 md:p-8">
          <button
            type="button"
            onClick={() => router.push("/weather")}
            className="md:hidden inline-flex w-fit items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[#5a4a3a] opacity-80 transition-opacity hover:opacity-100"
            aria-label="Back to weather"
          >
            <span className="text-base leading-none">&#x2039;</span>
            Weather
          </button>
          <CalendarHeader
            monthIndex={month}
            year={year}
            onPrev={handlePrev}
            onNext={handleNext}
            onToday={handleToday}
            isCurrentMonth={isCurrentMonth}
            onSelectMonth={setMonth}
            onSelectYear={setYear}
            showBanner={showBanner}
            onToggleBanner={() => setShowBanner((prev) => !prev)}
          />
          <div className="flex flex-1 flex-col gap-4">
            {showBanner ? (
              <CalendarBanner
                monthIndex={month}
                monthName={monthNames[month]}
                year={year}
              />
            ) : null}
            <WeekdayRow />
            <MonthGrid
              month={month}
              year={year}
              selectedDate={selectedDate}
              today={today}
              hasEvents={hasEvents}
              hasNotes={hasNotes}
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
        </div>
        {showPanel ? (
          <div className={panelState === "closing" ? "event-panel-exit" : "event-panel-enter"}>
            <EventPanel
              selectedDate={selectedDate}
              onPrevDay={handlePrevDay}
              onNextDay={handleNextDay}
              events={eventsForSelected}
              notes={notesForSelected}
              onAdd={addEvent}
              onRemove={removeEvent}
              onRemoveGroup={removeEventGroup}
              onUpdate={updateEvent}
              onUpdateGroup={updateEventGroup}
              onAddNote={(date, title, description) => {
                notesStore.addNote(formatDateKey(date), title, description, []);
              }}
              onDeleteNote={notesStore.deleteNote}
              onDeleteNoteGroup={notesStore.deleteNoteGroup}
              onUpdateNote={notesStore.updateNote}
              onUpdateNoteGroup={notesStore.updateNoteGroup}
            />
          </div>
        ) : null}

        {rangeModal ? (
          <RangeEventModal
            range={rangeModal}
            onSaveEvent={(title, time, color) => {
              addEventRange(rangeModal.start, rangeModal.end, title, time, color);
              setRangeModal(null);
            }}
            onSaveNote={(title, description) => {
              notesStore.addNoteRange(rangeModal.start, rangeModal.end, title, description, []);
              setRangeModal(null);
            }}
            onClose={() => setRangeModal(null)}
          />
        ) : null}
      </section>
    </>
  );
}
