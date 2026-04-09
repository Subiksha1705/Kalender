"use client";

import { useState } from "react";
import type { CalendarEvent } from "@/hooks/useEvents";
import type { Note } from "@/hooks/useNotes";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

type EventPanelProps = {
  selectedDate: Date | null;
  onPrevDay?: () => void;
  onNextDay?: () => void;
  events: CalendarEvent[];
  notes: Note[];
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
  onAddNote: (date: Date, title: string, description: string) => void;
  onDeleteNote: (id: string) => void;
  onDeleteNoteGroup: (groupId: string) => void;
  onUpdateNote: (id: string, title: string, description: string) => void;
  onUpdateNoteGroup: (groupId: string, title: string, description: string) => void;
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
const weekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const COLORS = ["#c87941", "#e8a838", "#4a9b6f", "#4a7fb5"];

export default function EventPanel({
  selectedDate,
  onPrevDay,
  onNextDay,
  events,
  notes,
  onAdd,
  onRemove,
  onRemoveGroup,
  onUpdate,
  onUpdateGroup,
  onAddNote,
  onDeleteNote,
  onDeleteNoteGroup,
  onUpdateNote,
  onUpdateNoteGroup,
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
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteDeleteId, setNoteDeleteId] = useState<string | null>(null);
  const [noteEditingId, setNoteEditingId] = useState<string | null>(null);
  const [noteEditingTitle, setNoteEditingTitle] = useState("");
  const [noteEditingDescription, setNoteEditingDescription] = useState("");

  const handleAdd = () => {
    if (!selectedDate) return;
    if (!title.trim()) return;
    onAdd(selectedDate, title.trim(), time.trim(), color);
    setTitle("");
    setTime("");
    setColor(COLORS[0]);
    setShowForm(false);
  };

  const handleAddNote = () => {
    if (!selectedDate) return;
    if (!noteTitle.trim()) return;
    onAddNote(selectedDate, noteTitle.trim(), noteDescription.trim());
    setNoteTitle("");
    setNoteDescription("");
    setShowNoteForm(false);
  };

  const startNoteEdit = (note: Note) => {
    setNoteEditingId(note.id);
    setNoteEditingTitle(note.title ?? note.text ?? "");
    setNoteEditingDescription(note.description ?? "");
  };

  const cancelNoteEdit = () => {
    setNoteEditingId(null);
    setNoteEditingTitle("");
    setNoteEditingDescription("");
  };

  const saveNoteEditSingle = (note: Note) => {
    if (!noteEditingTitle.trim()) return;
    onUpdateNote(note.id, noteEditingTitle.trim(), noteEditingDescription.trim());
    cancelNoteEdit();
  };

  const saveNoteEditAll = (note: Note) => {
    if (!note.groupId) return;
    if (!noteEditingTitle.trim()) return;
    onUpdateNoteGroup(note.groupId, noteEditingTitle.trim(), noteEditingDescription.trim());
    cancelNoteEdit();
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
        <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#9a8a7a]">
          {weekdayNames[selectedDate.getDay()]}
        </div>
        <div className="mt-2 flex items-center gap-4">
          <button
            type="button"
            onClick={onPrevDay}
            className="rounded-full border border-[#E6D9CB] px-2 py-1 text-xs text-[#5A3E2B] transition hover:border-[#C9A98A]"
            aria-label="Previous day"
          >
            &#x2039;
          </button>
          <div className="text-[64px] font-bold leading-none text-[#1a1208]">
            {selectedDate.getDate()}
          </div>
          <button
            type="button"
            onClick={onNextDay}
            className="rounded-full border border-[#E6D9CB] px-2 py-1 text-xs text-[#5A3E2B] transition hover:border-[#C9A98A]"
            aria-label="Next day"
          >
            &#x203A;
          </button>
        </div>
        <div className="mt-1 text-[13px] uppercase tracking-[0.15em] text-[#9a8a7a]">
          {monthNames[selectedDate.getMonth()].toUpperCase()}
        </div>
      </div>

      {events.length === 0 ? (
        <div className="text-sm text-[#9a8a7a]">No events.</div>
      ) : (
        <ul className="flex max-h-[220px] flex-col gap-4 overflow-y-auto pr-1">
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
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9a8a7a]">
                      Event name
                    </span>
                    <input
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      className="w-full border-0 border-b border-[#ccc] bg-transparent px-0 py-1 text-[14px] text-[#1a1208] focus:outline-none"
                    />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9a8a7a]">
                      Event time
                    </span>
                    <input
                      type="text"
                      value={editingTime}
                      onChange={(e) => setEditingTime(e.target.value)}
                      className="w-full border-0 border-b border-[#ccc] bg-transparent px-0 py-1 text-[14px] text-[#1a1208] focus:outline-none"
                      placeholder="Event time"
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
                            className="rounded-full border border-[#c5b8ab] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5a4a3a]"
                          >
                            Save this day
                          </button>
                          <button
                            type="button"
                            onClick={() => saveEditAll(event)}
                            className="rounded-full bg-[#3d2c1e] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white"
                          >
                            Save all days
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => saveEditSingle(event)}
                          className="rounded-full bg-[#3d2c1e] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white"
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
                className="rounded-full bg-[#3d2c1e] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white"
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

      <div className="mt-8 border-t border-[#e5d9cc] pt-6">
        <div className="mb-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#9a8a7a]">
          Notes
        </div>
        {notes.length === 0 ? (
          <div className="text-sm text-[#9a8a7a]">No notes for this day.</div>
        ) : (
          <ul className="mb-4 flex max-h-[180px] flex-col gap-3 overflow-y-auto pr-1">
            {notes.map((note) => (
              <li
                key={note.id}
                className="rounded-[12px] border border-[#e5d9cc] bg-white/60 px-3 py-2"
              >
                {noteEditingId === note.id ? (
                  <div className="flex flex-col gap-2">
                    <input
                      value={noteEditingTitle}
                      onChange={(e) => setNoteEditingTitle(e.target.value)}
                      className="w-full rounded-lg border border-[#E6D9CB] bg-white px-3 py-1.5 text-sm text-[#5A3E2B] outline-none focus:border-[#C9A98A]"
                      placeholder="Note title..."
                    />
                    <textarea
                      value={noteEditingDescription}
                      onChange={(e) => setNoteEditingDescription(e.target.value)}
                      className="w-full rounded-lg border border-[#E6D9CB] bg-white px-3 py-1.5 text-sm text-[#5A3E2B] outline-none focus:border-[#C9A98A]"
                      rows={3}
                      placeholder="Note description..."
                    />
                    <div className="flex items-center gap-2">
                      {note.groupId ? (
                        <>
                          <button
                            type="button"
                            onClick={() => saveNoteEditSingle(note)}
                            className="rounded-full border border-[#c5b8ab] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5a4a3a]"
                          >
                            Save this day
                          </button>
                          <button
                            type="button"
                            onClick={() => saveNoteEditAll(note)}
                            className="rounded-full bg-[#3d2c1e] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white"
                          >
                            Save all days
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => saveNoteEditSingle(note)}
                          className="rounded-full bg-[#3d2c1e] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white"
                        >
                          Save
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={cancelNoteEdit}
                        className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a8a7a]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[14px] font-semibold text-[#1a1208]">
                        {note.title ?? note.text ?? "Untitled"}
                      </div>
                      {note.description ? (
                        <div className="text-[12px] text-[#9a8a7a]">{note.description}</div>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startNoteEdit(note)}
                        className="text-[14px] text-[#9a8a7a] hover:text-[#5a4a3a]"
                        aria-label="Edit note"
                      >
                        ✎
                      </button>
                      <button
                        type="button"
                        onClick={() => setNoteDeleteId(note.id)}
                        className="text-[14px] text-[#9a8a7a] hover:text-[#5a4a3a]"
                        aria-label="Delete note"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
                {noteDeleteId === note.id ? (
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-[#9a8a7a]">
                    <span>
                      {note.groupId ? "Delete this note for today or all days?" : "Delete note?"}
                    </span>
                    {note.groupId ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            onDeleteNote(note.id);
                            setNoteDeleteId(null);
                          }}
                          className="rounded-full border border-[#c5b8ab] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5a4a3a]"
                        >
                          This day
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!note.groupId) return;
                            onDeleteNoteGroup(note.groupId);
                            setNoteDeleteId(null);
                          }}
                          className="rounded-full bg-[#3d2c1e] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
                        >
                          All days
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          onDeleteNote(note.id);
                          setNoteDeleteId(null);
                        }}
                        className="rounded-full border border-[#c5b8ab] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5a4a3a]"
                      >
                        Yes
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setNoteDeleteId(null)}
                      className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a8a7a]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
        {showNoteForm ? (
          <div className="flex flex-col gap-3">
            <input
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Note title..."
              className="w-full rounded-[10px] border border-[#ddd] bg-transparent px-3 py-2 text-[14px] text-[#1a1208] placeholder:text-[#9a8a7a] focus:outline-none"
            />
            <textarea
              value={noteDescription}
              onChange={(e) => setNoteDescription(e.target.value)}
              placeholder="Note description..."
              className="w-full rounded-[12px] border border-[#ddd] bg-transparent px-3 py-2 text-[13px] text-[#1a1208] placeholder:text-[#9a8a7a] focus:outline-none"
              rows={3}
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAddNote}
                className="rounded-[8px] bg-[#3d2c1e] px-[18px] py-[7px] text-[13px] text-white"
              >
                Add Note
              </button>
              <button
                type="button"
                onClick={() => {
                  setNoteTitle("");
                  setNoteDescription("");
                  setShowNoteForm(false);
                }}
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
            onClick={() => setShowNoteForm(true)}
          >
            + Add Note
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
