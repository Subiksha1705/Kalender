"use client";

import type { Note } from "@/hooks/useNotes";

export function NoteCard({ note, onDelete }: { note: Note; onDelete: (id: string) => void }) {
  const time = new Date(note.createdAt).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="note-card">
      <div className="note-meta">
        <span>{time}</span>
        <button className="note-delete" onClick={() => onDelete(note.id)} aria-label="Delete note">
          🗑
        </button>
      </div>
      <div className="text-sm font-semibold">
        {note.title ?? note.text ?? "Untitled"}
      </div>
      {note.description || note.text ? (
        <div className="text-sm opacity-90">{note.description ?? note.text}</div>
      ) : null}
      {note.attachments.length > 0 && (
        <div className="attachment-row">
          {note.attachments.map((att) => (
            <span key={att.name} className="attachment-chip">
              📄 {att.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
