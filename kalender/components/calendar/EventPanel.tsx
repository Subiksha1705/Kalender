"use client";

import { useState } from "react";
import type { CalendarEvent } from "@/hooks/useEvents";

type EventPanelProps = {
  selectedDate: Date | null;
  events: CalendarEvent[];
  onAdd: (date: Date, title: string, time: string, color?: string) => void;
  onRemove: (date: Date, id: string) => void;
};

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

const COLORS = ["#c87941", "#e8a838", "#4a9b6f", "#4a7fb5"];

export default function EventPanel({ selectedDate, events, onAdd, onRemove }: EventPanelProps) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [color, setColor] = useState(COLORS[0]);

  const handleAdd = () => {
    if (!selectedDate) return;
    if (!title.trim()) return;
    onAdd(selectedDate, title.trim(), time.trim(), color);
    setTitle("");
    setTime("");
    setColor(COLORS[0]);
    setShowForm(false);
  };

  if (!selectedDate) {
    return (
      <aside className="flex h-full flex-col justify-center rounded-[20px] bg-[#F5EFE6] p-8">
        <div className="text-center text-[14px] text-[#9a8a7a]">Select a date to see events.</div>
      </aside>
    );
  }

  return (
    <aside className="flex h-full flex-col gap-6 rounded-[20px] bg-[#F5EFE6] p-8">
      <div>
        <div className="text-[64px] font-bold leading-none text-[#1a1208]">
          {selectedDate.getDate()}
        </div>
        <div className="mt-1 text-[13px] uppercase tracking-[0.15em] text-[#9a8a7a]">
          {monthNames[selectedDate.getMonth()].toUpperCase()}
        </div>
      </div>

      {events.length === 0 ? (
        <div className="text-sm text-[#9a8a7a]">No events.</div>
      ) : (
        <ul className="flex flex-col gap-4">
          {events.map((event) => (
            <li key={event.id} className="flex items-start gap-3">
              <span
                className="mt-1 h-2 w-2 rounded-full"
                style={{ backgroundColor: event.color }}
                aria-hidden="true"
              />
              <div className="flex-1">
                <div className="text-[15px] font-semibold text-[#1a1208]">{event.title}</div>
                {event.time ? (
                  <div className="text-[12px] text-[#9a8a7a]">{event.time}</div>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => onRemove(selectedDate, event.id)}
                className="text-lg text-[#9a8a7a] transition hover:text-[#1a1208]"
                aria-label="Remove event"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto">
        {showForm ? (
          <div className="flex flex-col gap-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="Event name..."
              className="w-full border-0 border-b border-[#ccc] bg-transparent px-0 py-1.5 text-[14px] text-[#1a1208] placeholder:text-[#9a8a7a] focus:outline-none"
            />
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Time (e.g. 01:00 PM)"
              className="w-full border-0 border-b border-[#ccc] bg-transparent px-0 py-1.5 text-[14px] text-[#1a1208] placeholder:text-[#9a8a7a] focus:outline-none"
            />
            <div className="flex items-center gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className="h-4 w-4 rounded-full"
                  style={{
                    background: c,
                    outline: c === color ? "2px solid #333" : "none",
                    outlineOffset: 2,
                  }}
                  aria-label={`Pick color ${c}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className="rounded-[8px] bg-[#3d2c1e] px-[18px] py-[7px] text-[13px] text-white"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-[13px] text-[#9a8a7a]"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="w-fit rounded-[20px] border border-dashed border-[#c5b8ab] px-4 py-1.5 text-[13px] text-[#9a8a7a]"
            onClick={() => setShowForm(true)}
          >
            + Add Event
          </button>
        )}
      </div>
    </aside>
  );
}
