"use client";

import { formatDateKey } from "@/utils/calendar";
import type { Note } from "@/hooks/useNotes";
import type { CountryCode } from "@/utils/theme";
import { CountryDropdown } from "./CountryDropdown";
import { SeasonalScene } from "./SeasonalScene";

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

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function HeroPanel({
  country,
  onCountryChange,
  year,
  month,
  notes,
}: {
  country: CountryCode;
  onCountryChange: (c: CountryCode) => void;
  year: number;
  month: number;
  notes: Note[];
}) {
  const today = new Date();
  const todayKey = formatDateKey(today);
  const todaysNotes = notes.filter((n) => n.dateKey === todayKey).slice(0, 3);

  return (
    <div className="panel hero-panel flex w-full flex-col lg:flex-[0_0_var(--hero-width)] max-h-[360px] sm:max-h-[420px] lg:max-h-none">
      <div className="hero-bg" />
      <div className="hero-content flex h-full flex-col gap-3 sm:gap-4 lg:gap-5 px-3 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-5">
        <div className="hero-top flex justify-end">
          <CountryDropdown value={country} onChange={onCountryChange} />
        </div>

        <div className="hero-scene h-40 xs:h-44 sm:h-52 md:h-56 lg:h-60">
          <SeasonalScene month={month} country={country} />
        </div>

        <div className="hero-divider" />

        <div className="hero-date flex flex-col gap-1.5 sm:gap-2">
          <div className="hero-day text-xs sm:text-sm md:text-base">{dayNames[today.getDay()]}</div>
          <div className="hero-day-number text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            {today.getDate()}
          </div>
          <div className="hero-month-year text-[10px] sm:text-[11px] md:text-xs">
            {monthNames[month].toUpperCase()} {year}
          </div>
        </div>

        <div className="hero-divider" />

        <div className="mt-auto">
          <div className="events-label text-[10px] sm:text-[11px] md:text-xs">Events</div>
          <div className="events-list gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-sm">
            {todaysNotes.length === 0 && <div className="text-sm opacity-80">No notes yet.</div>}
            {todaysNotes.map((note) => (
              <div key={note.id} className="event-item">
                <span className="event-dot" />
                <span>{note.text.slice(0, 32)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
