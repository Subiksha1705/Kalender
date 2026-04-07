"use client";

import { useMemo, useRef, useState } from "react";
import { useCalendar } from "@/hooks/useCalendar";
import { useCountry } from "@/hooks/useCountry";
import { useNavigation } from "@/hooks/useNavigation";
import { useNotes } from "@/hooks/useNotes";
import { useRangeSelect } from "@/hooks/useRangeSelect";
import { useTheme } from "@/hooks/useTheme";
import { formatDateKey } from "@/utils/calendar";
import { HeroPanel } from "@/components/HeroPanel/HeroPanel";
import { CalendarGrid } from "@/components/CalendarGrid/CalendarGrid";
import { NotesPanel } from "@/components/NotesPanel/NotesPanel";
import { TodayCard } from "./TodayPanel/TodayCard";

export function CalendarRoot() {
  const { country, setCountry } = useCountry();
  const { year, month, setYear, setMonth, monthGrid, goNext, goPrev, direction, animating } =
    useCalendar();
  const navigation = useNavigation(year);
  const notesStore = useNotes();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notesOpen, setNotesOpen] = useState(false);
  const [showTodayView, setShowTodayView] = useState(false);
  const singleClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useTheme(month, country);

  const handleDateClick = (date: Date) => {
    if (singleClickTimer.current) clearTimeout(singleClickTimer.current);
    singleClickTimer.current = setTimeout(() => {
      setSelectedDate(date);
      setNotesOpen(false);
      setShowTodayView(true);
    }, 220);
  };

  const handleDateDoubleClick = (date: Date) => {
    if (singleClickTimer.current) clearTimeout(singleClickTimer.current);
    setSelectedDate(date);
    setNotesOpen(true);
    setShowTodayView(true);
  };

  const range = useRangeSelect(country, handleDateClick);

  const dateKey = selectedDate ? formatDateKey(selectedDate) : null;
  const notesForSelected = useMemo(
    () => (dateKey ? notesStore.getNotesForDate(dateKey) : []),
    [dateKey, notesStore]
  );

  const closeNotes = () => setNotesOpen(false);

  return (
    <div className="page flex min-h-screen w-full items-stretch justify-center p-3 sm:p-5">
      <div className="calendar-shell flex w-full flex-col items-stretch gap-3 overflow-auto sm:gap-4 lg:flex-row lg:gap-4 lg:overflow-visible">
        <HeroPanel
          country={country}
          onCountryChange={setCountry}
          year={year}
          month={month}
          notes={notesStore.notes}
        />
        <div
          className={`panel calendar-panel ${notesOpen ? "with-notes" : ""} order-2 min-h-[520px] px-4 py-4 sm:min-h-[560px] sm:px-6 sm:py-6 lg:order-none lg:min-h-0 lg:px-9 lg:py-9`}
        >
          {showTodayView ? (
            <TodayCard
              date={selectedDate ?? new Date()}
              notes={notesStore.notes}
              onMonthClick={() => {
                setShowTodayView(false);
                navigation.goToDateView(year);
              }}
            />
          ) : (
            <>
              <CalendarGrid
                year={year}
                month={month}
                monthGrid={monthGrid}
                onYearChange={setYear}
                onMonthChange={setMonth}
                goNext={goNext}
                goPrev={goPrev}
                direction={direction}
                animating={animating}
                viewMode={navigation.viewMode}
                goToYearView={navigation.goToYearView}
                goToMonthView={navigation.goToMonthView}
                goToDateView={navigation.goToDateView}
                selectedYear={navigation.selectedYear}
                setSelectedYear={navigation.setSelectedYear}
                decade={navigation.decade}
                goNextDecade={navigation.goNextDecade}
                goPrevDecade={navigation.goPrevDecade}
                range={range}
                country={country}
                onDateDoubleClick={handleDateDoubleClick}
              />
              <button className="bottom-sheet-toggle lg:hidden" onClick={() => setNotesOpen(true)}>
                📝 Notes
              </button>
            </>
          )}
        </div>
        <NotesPanel
          open={notesOpen}
          onClose={closeNotes}
          selectedDate={selectedDate}
          notes={notesForSelected}
          onAddNote={notesStore.addNote}
          onDeleteNote={notesStore.deleteNote}
        />
      </div>
    </div>
  );
}
