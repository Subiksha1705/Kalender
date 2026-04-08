"use client";

import { useMemo, useRef, useState } from "react";
import { useEvents } from "@/hooks/useEvents";
import { useNotes } from "@/hooks/useNotes";
import { formatDateKey } from "@/utils/calendar";
import CalendarHeader from "./CalendarHeader";
import EventPanel from "./EventPanel";
import MonthGrid from "./MonthGrid";
import WeekdayRow from "./WeekdayRow";
import { RangeEventModal } from "@/components/RangeEventModal";

const today = new Date();

type Range = { start: Date; end: Date };
type PanelState = "hidden" | "open" | "closing";

const isSameDate = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

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
    <section
      className={`grid h-full min-h-full gap-8 bg-[#EDE8DC] transition-all duration-300 lg:items-stretch ${
        showPanel ? "lg:grid-cols-[1.4fr_0.85fr]" : "lg:grid-cols-1"
      }`}
    >
      <div className="flex h-full flex-col gap-6 rounded-[20px] bg-[#F5EFE6] p-6 md:p-8">
        <CalendarHeader
          monthIndex={month}
          year={year}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelectMonth={setMonth}
          onSelectYear={setYear}
        />
        <div className="flex flex-1 flex-col gap-4">
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
  );
}
