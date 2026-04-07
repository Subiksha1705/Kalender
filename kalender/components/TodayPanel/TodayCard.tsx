"use client";

import { formatDateKey } from "@/utils/calendar";
import type { Note } from "@/hooks/useNotes";

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

export function TodayCard({
  date,
  notes,
  onMonthClick,
}: {
  date: Date;
  notes: Note[];
  onMonthClick: () => void;
}) {
  const dateKey = formatDateKey(date);
  const todaysNotes = notes.filter((n) => n.dateKey === dateKey).slice(0, 3);

  return (
    <div className="today-card">
      <div className="today-left">
        <div className="today-day">{dayNames[date.getDay()]}</div>
        <div className="today-date">{date.getDate()}</div>
        <button className="today-month" onClick={onMonthClick} type="button">
          {monthNames[date.getMonth()]} {date.getFullYear()}
        </button>

        <div className="today-events">
          <div className="today-events-label">Events</div>
          <div className="today-events-list">
            {todaysNotes.length === 0 && <div className="today-events-empty">No notes yet.</div>}
            {todaysNotes.map((note) => (
              <div key={note.id} className="today-event-item">
                <span className="today-event-dot" />
                <span>{note.text.slice(0, 32)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="today-right">
        <div className="today-blob">
          <div className="blob-sun" />
          <div className="blob-cloud cloud-a" />
          <div className="blob-cloud cloud-b" />
          <div className="blob-hills back" />
          <div className="blob-hills front" />
          <div className="blob-water" />
          <div className="blob-temp">28°C</div>
        </div>
      </div>
    </div>
  );
}
