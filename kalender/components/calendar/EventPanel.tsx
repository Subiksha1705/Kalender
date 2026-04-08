"use client";

import { useState } from "react";
import type { CalendarEvent } from "@/hooks/useEvents";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

type EventPanelProps = {
  selectedDate: Date | null;
  events: CalendarEvent[];
  onAdd: (date: Date, title: string, time: string, color?: string) => void;
  onRemove: (date: Date, id: string) => void;
  onRemoveGroup: (groupId: string) => void;
  onUpdate: (
    date: Date,
    id: string,
    patch: Partial<Pick<CalendarEvent, "title" | "time" | "color">>
  ) => void;
  onUpdateGroup: (
    groupId: string,
    patch: Partial<Pick<CalendarEvent, "title" | "time" | "color">>
  ) => void;
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

export default function EventPanel({
  selectedDate,
  events,
  onAdd,
  onRemove,
  onRemoveGroup,
  onUpdate,
  onUpdateGroup,
}: EventPanelProps) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingTime, setEditingTime] = useState("");
  const [editingColor, setEditingColor] = useState(COLORS[0]);
  const [deleteTarget, setDeleteTarget] = useState<CalendarEvent | null>(null);

  const handleAdd = () => {
    if (!selectedDate) return;
    if (!title.trim()) return;
    onAdd(selectedDate, title.trim(), time.trim(), color);
    setTitle("");
    setTime("");
    setColor(COLORS[0]);
    setShowForm(false);
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
    if (!selectedDate) return;
    if (!editingTitle.trim()) return;
    const patch = {
      title: editingTitle.trim(),
      time: editingTime.trim(),
      color: editingColor,
    };
    onUpdate(selectedDate, event.id, patch);
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
    onUpdateGroup(event.groupId, patch);
    cancelEdit();
  };

  if (!selectedDate) {
    return (
      <aside className="flex h-full flex-col justify-center rounded-[20px] bg-[#F5EFE6] p-8">
        <div className="text-center text-[14px] text-[#9a8a7a]">Select a date to see events.</div>
      </aside>
    );
  }

  return (
    <>
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
                {editingId === event.id ? (
                  <div className="flex flex-col gap-2">
                    <input
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      className="w-full border-0 border-b border-[#ccc] bg-transparent px-0 py-1 text-[14px] text-[#1a1208] focus:outline-none"
                    />
                    <input
                      type="time"
                      value={editingTime}
                      onChange={(e) => setEditingTime(e.target.value)}
                      className="w-full border-0 border-b border-[#ccc] bg-transparent px-0 py-1 text-[14px] text-[#1a1208] focus:outline-none"
                    />
                    <div className="flex items-center gap-2">
                      {COLORS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setEditingColor(c)}
                          className={`h-4 w-4 rounded-full transition ${
                            c === editingColor ? "scale-110 shadow-[0_3px_8px_rgba(0,0,0,0.25)]" : ""
                          }`}
                          style={{
                            background: c,
                          }}
                          aria-label={`Pick color ${c}`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      {event.groupId ? (
                        <>
                          <button
                            type="button"
                            onClick={() => saveEditSingle(event)}
                            className="rounded-[8px] border border-[#c5b8ab] px-3 py-1 text-[12px] text-[#5a4a3a]"
                          >
                            Save this day
                          </button>
                          <button
                            type="button"
                            onClick={() => saveEditAll(event)}
                            className="rounded-[8px] bg-[#3d2c1e] px-3 py-1 text-[12px] text-white"
                          >
                            Save all days
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => saveEditSingle(event)}
                          className="rounded-[8px] bg-[#3d2c1e] px-3 py-1 text-[12px] text-white"
                        >
                          Save
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="text-[12px] text-[#9a8a7a]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-[15px] font-semibold text-[#1a1208]">{event.title}</div>
                    {event.time ? (
                      <div className="text-[12px] text-[#9a8a7a]">{event.time}</div>
                    ) : null}
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(event)}
                  className="text-[16px] text-[#9a8a7a] hover:text-[#1a1208]"
                  aria-label="Edit event"
                >
                  ✎
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(event)}
                  className="text-lg text-[#9a8a7a] transition hover:text-[#1a1208]"
                  aria-label="Remove event"
                >
                  ×
                </button>
              </div>
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
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border-0 border-b border-[#ccc] bg-transparent px-0 py-1.5 text-[14px] text-[#1a1208] focus:outline-none"
            />
            <div className="flex items-center gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`h-4 w-4 rounded-full transition ${
                    c === color ? "scale-110 shadow-[0_3px_8px_rgba(0,0,0,0.25)]" : ""
                  }`}
                  style={{
                    background: c,
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
      <ConfirmDeleteModal
        open={deleteTarget !== null}
        isRange={Boolean(deleteTarget?.groupId)}
        onClose={() => setDeleteTarget(null)}
        onDeleteSingle={() => {
          if (!selectedDate || !deleteTarget) return;
          onRemove(selectedDate, deleteTarget.id);
          setDeleteTarget(null);
        }}
        onDeleteAll={() => {
          if (!deleteTarget?.groupId) return;
          onRemoveGroup(deleteTarget.groupId);
          setDeleteTarget(null);
        }}
      />
    </>
  );
}
