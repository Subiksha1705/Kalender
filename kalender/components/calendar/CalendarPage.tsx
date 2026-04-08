"use client";

import { useState } from "react";
import events from "@/lib/events";
import CalendarHeader from "./CalendarHeader";
import EventPanel from "./EventPanel";
import MonthGrid from "./MonthGrid";
import WeekdayRow from "./WeekdayRow";

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

const today = new Date(2020, 0, 10);

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(2020);

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

  return (
    <section className="grid gap-6 lg:grid-cols-[1.4fr_0.85fr]">
      <div className="flex flex-col gap-6 rounded-[28px] border border-[#EADFD2] bg-white/70 p-6 md:p-8">
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
        />
      </div>
      <EventPanel selectedDate={selectedDate} events={events} />
    </section>
  );
}
