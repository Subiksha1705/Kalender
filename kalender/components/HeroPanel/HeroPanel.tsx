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
    <div className="panel hero-panel">
      <div className="hero-bg" />
      <div className="hero-content">
        <div className="hero-top">
          <CountryDropdown value={country} onChange={onCountryChange} />
        </div>

        <div className="hero-scene">
          <SeasonalScene month={month} country={country} />
        </div>

        <div className="hero-divider" />

        <div className="hero-date">
          <div className="hero-day">{dayNames[today.getDay()]}</div>
          <div className="hero-day-number">{today.getDate()}</div>
          <div className="hero-month-year">
            {monthNames[month].toUpperCase()} {year}
          </div>
        </div>

        <div className="hero-divider" />

        <div>
          <div className="events-label">Events</div>
          <div className="events-list">
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
