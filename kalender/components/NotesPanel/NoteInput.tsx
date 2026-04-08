"use client";

import { useEffect, useRef, useState } from "react";
import type { Note } from "@/hooks/useNotes";
import { formatDateKey } from "@/utils/calendar";

export function NoteInput({
  selectedDate,
  onAddNote,
}: {
  selectedDate: Date | null;
  onAddNote: (
    dateKey: string,
    title: string,
    description: string,
    attachments: Note["attachments"]
  ) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<Note["attachments"]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [description]);

  const remaining = 200 - description.length;

  const handleAdd = () => {
    if (!selectedDate || !title.trim()) return;
    onAddNote(formatDateKey(selectedDate), title.trim(), description.trim(), attachments);
    setTitle("");
    setDescription("");
    setAttachments([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      handleAdd();
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const data = reader.result as string;
        setAttachments((prev) => [...prev, { name: file.name, type: file.type, data }]);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="note-input">
      <input
        placeholder="Title"
        value={title}
        maxLength={60}
        onChange={(e) => setTitle(e.target.value)}
        disabled={!selectedDate}
        className="note-title"
      />
      <textarea
        ref={textareaRef}
        placeholder="Add description..."
        value={description}
        maxLength={200}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={!selectedDate}
      />
      <div className={`note-counter ${remaining <= 20 ? "warn" : ""}`}>{remaining}</div>

      <div className="attachment-row">
        <button
          type="button"
          className="attachment-button"
          onClick={() => fileInputRef.current?.click()}
          disabled={!selectedDate}
        >
          📎 Attach file
        </button>
        {attachments.map((att) => (
          <span key={att.name} className="attachment-chip">
            {att.name}
          </span>
        ))}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf,.doc,.docx"
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <button type="button" className="add-note-button" onClick={handleAdd} disabled={!selectedDate}>
        + Add Note
      </button>
    </div>
  );
}
