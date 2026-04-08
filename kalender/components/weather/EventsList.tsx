"use client";

import { useState } from "react";
import EventDot from "./EventDot";
import { useEvents } from "@/hooks/useEvents";
import { formatDateKey } from "@/utils/calendar";

type EventsListProps = {
  selectedDate: Date;
};

const COLORS = ["#D94F3D", "#E8A838", "#4A9B6F", "#4A7FB5"];

export default function EventsList({ selectedDate }: EventsListProps) {
  const { getEventsForDate, addEvent, removeEvent } = useEvents();
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const dateKey = formatDateKey(selectedDate);
  const eventsForDay = getEventsForDate(dateKey);

  const handleAdd = () => {
    if (!input.trim()) return;
    addEvent(dateKey, input.trim(), selectedColor);
    setInput("");
    setShowInput(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9C7F6A]">
        Events
      </span>

      {eventsForDay.length === 0 && (
        <span className="text-sm text-[#9C7F6A]">No events for this day.</span>
      )}

      <ul className="flex flex-col gap-3 text-sm text-[#5A3E2B]">
        {eventsForDay.map((event) => (
          <li key={event.id} className="flex items-center gap-3">
            <EventDot color={event.color} />
            <span className="flex-1">{event.title}</span>
            <button
              type="button"
              className="text-base text-[#9C7F6A] transition hover:text-[#5A3E2B]"
              onClick={() => removeEvent(event.id)}
              aria-label="Remove event"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {showInput ? (
        <div className="mt-2 flex flex-col gap-3">
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Event name…"
            className="w-full rounded-lg border border-[#E6D9CB] bg-white px-3 py-2 text-sm text-[#5A3E2B] outline-none focus:border-[#C9A98A]"
          />
          <div className="flex items-center gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedColor(c)}
                className="h-5 w-5 rounded-full"
                style={{
                  background: c,
                  outline: c === selectedColor ? "2px solid #5A3E2B" : "none",
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-full border border-[#C9A98A] px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#5A3E2B]"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowInput(false)}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9C7F6A]"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="mt-1 w-fit rounded-full border border-dashed border-[#C9A98A] px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#9C7F6A]"
          onClick={() => setShowInput(true)}
        >
          + Add Event
        </button>
      )}
    </div>
  );
}
