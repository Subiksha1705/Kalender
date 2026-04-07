"use client";

import type { Note } from "@/hooks/useNotes";
import { NoteInput } from "./NoteInput";
import { NoteCard } from "./NoteCard";

export function NotesPanel({
  open,
  onClose,
  selectedDate,
  notes,
  onAddNote,
  onDeleteNote,
}: {
  open: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  notes: Note[];
  onAddNote: (dateKey: string, text: string, attachments: Note["attachments"]) => void;
  onDeleteNote: (id: string) => void;
}) {
  const formatted = selectedDate
    ? selectedDate.toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Select a date";

  return (
    <aside
      className={`panel notes-panel ${open ? "open translate-y-0" : "translate-y-full lg:translate-y-0"} fixed left-0 right-0 bottom-0 z-40 w-full max-h-[80vh] overflow-y-auto rounded-t-[20px] lg:static lg:z-auto lg:w-[var(--notes-width)] lg:max-h-none lg:rounded-[var(--panel-radius)]`}
    >
      <div className="notes-header">
        <span>📅 {formatted}</span>
        <button className="notes-close" onClick={onClose} aria-label="Close notes panel">
          ✕
        </button>
      </div>

      <NoteInput selectedDate={selectedDate} onAddNote={onAddNote} />

      <div className="note-list">
        {notes.length === 0 && <div className="text-sm opacity-80">No notes yet.</div>}
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={onDeleteNote} />
        ))}
      </div>
    </aside>
  );
}
