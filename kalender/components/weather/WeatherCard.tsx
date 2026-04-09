"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import DateBlock from "./DateBlock";
import DesertScene from "./DesertScene";
import EventsList from "./EventsList";
import NotesList from "./NotesList";
import MonthNav from "./MonthNav";
import type { Season } from "@/lib/seasons";

type WeatherCardProps = {
  season: Season;
};

export default function WeatherCard({ season }: WeatherCardProps) {
  const router = useRouter();
  const [isEntering, setIsEntering] = useState(true);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [selectedMonth, setSelectedMonth] = useState(() => new Date());

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 950);
    return () => clearTimeout(timer);
  }, []);

  const monthLabel = useMemo(
    () =>
      selectedMonth
        .toLocaleDateString("en-US", { month: "long" })
        .toUpperCase(),
    [selectedMonth]
  );

  const clampDateToMonth = (base: Date, target: Date) => {
    const day = base.getDate();
    const year = target.getFullYear();
    const month = target.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();
    return new Date(year, month, Math.min(day, lastDay));
  };

  const handleNavigate = () => {
    router.push("/calendar");
  };

  const goToPrevDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() - 1);
    setSelectedDate(next);
    setSelectedMonth(next);
  };

  const goToNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
    setSelectedMonth(next);
  };

  const goToPrevMonth = () => {
    const next = new Date(selectedMonth);
    next.setMonth(next.getMonth() - 1);
    setSelectedMonth(next);
    setSelectedDate((current) => clampDateToMonth(current, next));
  };

  const goToNextMonth = () => {
    const next = new Date(selectedMonth);
    next.setMonth(next.getMonth() + 1);
    setSelectedMonth(next);
    setSelectedDate((current) => clampDateToMonth(current, next));
  };

  return (
    <section className="flex min-h-screen w-full flex-col bg-[#F5EFE6] px-6 py-10 md:px-12 lg:pr-0">
      <div className="mx-auto flex w-full max-w-none flex-1 flex-col gap-8">
        <div className="flex w-full items-center justify-start">
        </div>

        <div className="grid flex-1 items-start gap-6 lg:grid-cols-[minmax(240px,1fr)_minmax(0,3fr)] lg:items-stretch lg:min-h-[70vh]">
          <div className="flex flex-col gap-10">
            <div className={isEntering ? "anim-in-date" : ""}>
              <DateBlock
                date={selectedDate}
                onPrev={goToPrevDay}
                onNext={goToNextDay}
                onOpen={handleNavigate}
              />
            </div>
            <div className={isEntering ? "anim-in-events" : ""}>
              <EventsList selectedDate={selectedDate} />
            </div>
            <div className={isEntering ? "anim-in-events" : ""}>
              <NotesList selectedDate={selectedDate} />
            </div>
          </div>

          <div className="relative">
            
            <div className="relative ml-auto aspect-[13/9] w-[96%] overflow-hidden rounded-[28px] md:w-[94%] lg:aspect-auto lg:h-[92%] lg:w-[92%] lg:self-center lg:rounded-l-[40px] lg:rounded-r-none">
            <MonthNav
            month={monthLabel}
            onPrev={goToPrevMonth}
            onNext={goToNextMonth}
            onLabelClick={handleNavigate}
          />
              <DesertScene season={season} isExiting={false} isEntering={isEntering} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
