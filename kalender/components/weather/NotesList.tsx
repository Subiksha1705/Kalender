"use client";

import { useMemo, useState } from "react";
import { useNotes } from "@/hooks/useNotes";
import { formatDateKey } from "@/utils/calendar";

type NotesListProps = {
  selectedDate: Date;
};

export default function NotesList({ selectedDate }: NotesListProps) {
  const { getNotesForDate, addNote, updateNote, updateNoteGroup, deleteNote, deleteNoteGroup } =
    useNotes();
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  const notesForDay = useMemo(() => {
    const key = formatDateKey(selectedDate);
    return getNotesForDate(key);
  }, [getNotesForDate, selectedDate]);

  const handleAdd = () => {
    if (!title.trim()) return;
    addNote(formatDateKey(selectedDate), title.trim(), description.trim(), []);
    setTitle("");
    setDescription("");
    setShowInput(false);
  };

  const startEdit = (id: string, currentTitle: string, currentDescription: string) => {
    setEditingId(id);
    setEditingTitle(currentTitle);
    setEditingDescription(currentDescription);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
    setEditingDescription("");
  };

  const saveEdit = (noteId: string) => {
    if (!editingTitle.trim()) return;
    updateNote(noteId, editingTitle.trim(), editingDescription.trim());
    cancelEdit();
  };

  const saveEditAll = (groupId: string) => {
    if (!editingTitle.trim()) return;
    updateNoteGroup(groupId, editingTitle.trim(), editingDescription.trim());
    cancelEdit();
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9C7F6A]">
        Notes
      </span>

      {notesForDay.length === 0 && (
        <span className="text-sm text-[#9C7F6A]">No notes for this day.</span>
      )}

      {notesForDay.length > 0 ? (
        <ul className="flex max-h-[200px] flex-col gap-3 overflow-y-auto pr-1 text-sm text-[#5A3E2B]">
          {notesForDay.map((note) => (
            <li
              key={note.id}
              className="rounded-[12px] border border-[#E6D9CB] bg-white/60 px-3 py-2"
            >
              {editingId === note.id ? (
                <div className="flex flex-col gap-2">
                  <input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="w-full rounded-lg border border-[#E6D9CB] bg-white px-3 py-1.5 text-sm text-[#5A3E2B] outline-none focus:border-[#C9A98A]"
                    placeholder="Note title..."
                  />
                  <textarea
                    value={editingDescription}
                    onChange={(e) => setEditingDescription(e.target.value)}
                    className="w-full rounded-lg border border-[#E6D9CB] bg-white px-3 py-1.5 text-sm text-[#5A3E2B] outline-none focus:border-[#C9A98A]"
                    rows={3}
                    placeholder="Note description..."
                  />
                  <div className="flex items-center gap-2">
                    {note.groupId ? (
                      <>
                        <button
                          type="button"
                          onClick={() => saveEdit(note.id)}
                          className="rounded-full border border-[#C9A98A] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5A3E2B]"
                        >
                          Save this day
                        </button>
                        <button
                          type="button"
                          onClick={() => saveEditAll(note.groupId)}
                          className="rounded-full bg-[#3d2c1e] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white"
                        >
                          Save all days
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => saveEdit(note.id)}
                        className="rounded-full border border-[#C9A98A] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5A3E2B]"
                      >
                        Save
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9C7F6A]"
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
                      <div className="text-[12px] text-[#9C7F6A]">{note.description}</div>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="text-[14px] text-[#9C7F6A] transition hover:text-[#5A3E2B]"
                      onClick={() =>
                        startEdit(note.id, note.title ?? note.text ?? "", note.description ?? "")
                      }
                      aria-label="Edit note"
                    >
                      ✎
                    </button>
                    <button
                      type="button"
                      className="text-base text-[#9C7F6A] transition hover:text-[#5A3E2B]"
                      onClick={() => setDeleteId(note.id)}
                      aria-label="Remove note"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
              {deleteId === note.id ? (
                <div className="mt-2 flex items-center gap-2 text-[11px] text-[#9C7F6A]">
                  <span>
                    {note.groupId ? "Delete this note for today or all days?" : "Delete note?"}
                  </span>
                  {note.groupId ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          deleteNote(note.id);
                          setDeleteId(null);
                        }}
                        className="rounded-full border border-[#C9A98A] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5A3E2B]"
                      >
                        This day
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteNoteGroup(note.groupId);
                          setDeleteId(null);
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
                        deleteNote(note.id);
                        setDeleteId(null);
                      }}
                      className="rounded-full border border-[#C9A98A] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5A3E2B]"
                    >
                      Yes
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setDeleteId(null)}
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9C7F6A]"
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {showInput ? (
        <div className="mt-2 flex flex-col gap-3">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Note title..."
            className="w-full rounded-lg border border-[#E6D9CB] bg-white px-3 py-2 text-sm text-[#5A3E2B] outline-none focus:border-[#C9A98A]"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note description..."
            className="w-full rounded-lg border border-[#E6D9CB] bg-white px-3 py-2 text-sm text-[#5A3E2B] outline-none focus:border-[#C9A98A]"
            rows={3}
          />
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
          + Add Note
        </button>
      )}
    </div>
  );
}
