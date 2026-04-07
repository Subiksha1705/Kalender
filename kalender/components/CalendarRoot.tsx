"use client";

import { useMemo, useState } from "react";
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

export function CalendarRoot() {
  const { country, setCountry } = useCountry();
  const { year, month, setYear, setMonth, monthGrid, goNext, goPrev, direction, animating } =
    useCalendar();
  const navigation = useNavigation(year);
  const notesStore = useNotes();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notesOpen, setNotesOpen] = useState(false);

  useTheme(month, country);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setNotesOpen(true);
  };

  const range = useRangeSelect(country, handleDateClick);

  const dateKey = selectedDate ? formatDateKey(selectedDate) : null;
  const notesForSelected = useMemo(
    () => (dateKey ? notesStore.getNotesForDate(dateKey) : []),
    [dateKey, notesStore]
  );

  const closeNotes = () => setNotesOpen(false);

  return (
    <div className="page">
      <div className="calendar-shell">
        <HeroPanel
          country={country}
          onCountryChange={setCountry}
          year={year}
          month={month}
          notes={notesStore.notes}
        />
        <div className={`panel calendar-panel ${notesOpen ? "with-notes" : ""}`}>
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
          />
          <button className="bottom-sheet-toggle" onClick={() => setNotesOpen(true)}>
            📝 Notes
          </button>
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
