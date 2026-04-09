"use client";

import { useState } from "react";
import EventDot from "./EventDot";
import { useEvents } from "@/hooks/useEvents";
import type { CalendarEvent } from "@/hooks/useEvents";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

const COLORS = ["#c87941", "#e8a838", "#4a9b6f", "#4a7fb5"];

type EventsListProps = {
  selectedDate: Date;
};

export default function EventsList({ selectedDate }: EventsListProps) {
  const { getEvents, addEvent, removeEvent, removeEventGroup, updateEvent, updateEventGroup } =
    useEvents();
  const [input, setInput] = useState("");
  const [time, setTime] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingTime, setEditingTime] = useState("");
  const [editingColor, setEditingColor] = useState(COLORS[0]);
  const [deleteTarget, setDeleteTarget] = useState<CalendarEvent | null>(null);

  const eventsForDay = getEvents(selectedDate);

  const handleAdd = () => {
    if (!input.trim()) return;
    addEvent(selectedDate, input.trim(), time.trim(), selectedColor);
    setInput("");
    setTime("");
    setShowInput(false);
  };

  const startEdit = (event: CalendarEvent) => {
    setEditingId(event.id);
    setEditingTitle(event.title);
    setEditingTime(event.time);
    setEditingColor(event.color);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
    setEditingTime("");
    setEditingColor(COLORS[0]);
  };

  const saveEditSingle = (event: CalendarEvent) => {
    if (!editingTitle.trim()) return;
    const patch = {
      title: editingTitle.trim(),
      time: editingTime.trim(),
      color: editingColor,
    };
    updateEvent(selectedDate, event.id, patch);
    cancelEdit();
  };

  const saveEditAll = (event: CalendarEvent) => {
    if (!event.groupId) return;
    if (!editingTitle.trim()) return;
    const patch = {
      title: editingTitle.trim(),
      time: editingTime.trim(),
      color: editingColor,
    };
    updateEventGroup(event.groupId, patch);
    cancelEdit();
  };

  return (
    <>
      <div className="flex flex-col gap-4">
      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9C7F6A]">
        Events
      </span>

      {eventsForDay.length === 0 && (
        <span className="text-sm text-[#9C7F6A]">No events for this day.</span>
      )}

      <ul className="flex max-h-[220px] flex-col gap-3 overflow-y-auto pr-1 text-sm text-[#5A3E2B]">
        {eventsForDay.map((event) => (
          <li key={event.id} className="flex items-start gap-3">
            <EventDot color={event.color} />
            <div className="flex-1">
              {editingId === event.id ? (
                <div className="flex flex-col gap-2">
                  <input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="w-full rounded-lg border border-[#E6D9CB] bg-white px-3 py-1.5 text-sm text-[#5A3E2B] outline-none focus:border-[#C9A98A]"
                  />
                  <input
                    type="time"
                    value={editingTime}
                    onChange={(e) => setEditingTime(e.target.value)}
                    className="w-full rounded-lg border border-[#E6D9CB] bg-white px-3 py-1.5 text-sm text-[#5A3E2B] outline-none focus:border-[#C9A98A]"
                  />
                  <div className="flex items-center gap-2">
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setEditingColor(c)}
                        className={`h-5 w-5 rounded-full transition ${
                          c === editingColor ? "scale-110 shadow-[0_3px_8px_rgba(0,0,0,0.25)]" : ""
                        }`}
                        style={{
                          background: c,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {event.groupId ? (
                      <>
                        <button
                          type="button"
                          onClick={() => saveEditSingle(event)}
                          className="rounded-full border border-[#C9A98A] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5A3E2B]"
                        >
                          Save this day
                        </button>
                        <button
                          type="button"
                          onClick={() => saveEditAll(event)}
                          className="rounded-full bg-[#3d2c1e] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
                        >
                          Save all days
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => saveEditSingle(event)}
                        className="rounded-full border border-[#C9A98A] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5A3E2B]"
                      >
                        Save
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9C7F6A]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>{event.title}</div>
                  {event.time ? (
                    <div className="text-xs text-[#9C7F6A]">{event.time}</div>
                  ) : null}
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="text-[14px] text-[#9C7F6A] transition hover:text-[#5A3E2B]"
                onClick={() => startEdit(event)}
                aria-label="Edit event"
              >
                ✎
              </button>
              <button
                type="button"
                className="text-base text-[#9C7F6A] transition hover:text-[#5A3E2B]"
                onClick={() => setDeleteTarget(event)}
                aria-label="Remove event"
              >
                ×
              </button>
            </div>
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
            placeholder="Event name..."
            className="w-full rounded-lg border border-[#E6D9CB] bg-white px-3 py-2 text-sm text-[#5A3E2B] outline-none focus:border-[#C9A98A]"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-lg border border-[#E6D9CB] bg-white px-3 py-2 text-sm text-[#5A3E2B] outline-none focus:border-[#C9A98A]"
          />
          <div className="flex items-center gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedColor(c)}
                className={`h-5 w-5 rounded-full transition ${
                  c === selectedColor ? "scale-110 shadow-[0_3px_8px_rgba(0,0,0,0.25)]" : ""
                }`}
                style={{
                  background: c,
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
      <ConfirmDeleteModal
        open={deleteTarget !== null}
        isRange={Boolean(deleteTarget?.groupId)}
        onClose={() => setDeleteTarget(null)}
        onDeleteSingle={() => {
          if (!deleteTarget) return;
          removeEvent(selectedDate, deleteTarget.id);
          setDeleteTarget(null);
        }}
        onDeleteAll={() => {
          if (!deleteTarget?.groupId) return;
          removeEventGroup(deleteTarget.groupId);
          setDeleteTarget(null);
        }}
      />
    </>
  );
}
