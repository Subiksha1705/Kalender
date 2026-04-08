"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "cal_notes_v1";

export interface Note {
  id: string;
  dateKey: string;
  title: string;
  description: string;
  text?: string;
  groupId?: string;
  attachments: Array<{ name: string; type: string; data: string }>;
  createdAt: number;
}

type NoteStore = Note[];

let cache: NoteStore = [];
let listeners: Array<() => void> = [];
const SERVER_SNAPSHOT: NoteStore = [];

function getServerSnapshot(): NoteStore {
  return SERVER_SNAPSHOT;
}

function getSnapshot(): NoteStore {
  return cache;
}

function subscribe(cb: () => void): () => void {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

function init() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as NoteStore) : [];
    cache = parsed.map((note) => ({
      ...note,
      title: note.title ?? note.text ?? "Untitled",
      description: note.description ?? "",
      attachments: note.attachments ?? [],
      createdAt: note.createdAt ?? Date.now(),
    }));
  } catch {
    cache = [];
  }
}

if (typeof window !== "undefined") {
  init();
}

let writeTimer: ReturnType<typeof setTimeout> | null = null;

function persist(notes: NoteStore) {
  cache = notes;
  listeners.forEach((l) => l());
  if (writeTimer) clearTimeout(writeTimer);
  writeTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      console.warn("localStorage quota exceeded");
    }
  }, 400);
}

export function useNotes() {
  const notes = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const getNotesForDate = (dateKey: string) =>
    notes.filter((n) => n.dateKey === dateKey).sort((a, b) => a.createdAt - b.createdAt);

  const addNote = (
    dateKey: string,
    title: string,
    description: string,
    attachments: Note["attachments"] = []
  ) => {
    const note: Note = {
      id: crypto.randomUUID(),
      dateKey,
      title,
      description,
      attachments,
      createdAt: Date.now(),
    };
    persist([...cache, note]);
  };

  const deleteNote = (id: string) => persist(cache.filter((n) => n.id !== id));

  const updateNote = (id: string, title: string, description: string) =>
    persist(cache.map((n) => (n.id === id ? { ...n, title, description } : n)));

  const updateNoteGroup = (groupId: string, title: string, description: string) =>
    persist(cache.map((n) => (n.groupId === groupId ? { ...n, title, description } : n)));

  const addNoteRange = (
    start: Date,
    end: Date,
    title: string,
    description: string,
    attachments: Note["attachments"] = []
  ) => {
    const groupId = crypto.randomUUID();
    const days: Note[] = [];
    const cursor = new Date(start);
    cursor.setHours(0, 0, 0, 0);
    const last = new Date(end);
    last.setHours(0, 0, 0, 0);
    while (cursor <= last) {
      const dateKey = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(
        cursor.getDate()
      ).padStart(2, "0")}`;
      days.push({
        id: crypto.randomUUID(),
        dateKey,
        title,
        description,
        groupId,
        attachments,
        createdAt: Date.now(),
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    if (days.length > 0) {
      persist([...cache, ...days]);
    }
  };

  const deleteNoteGroup = (groupId: string) =>
    persist(cache.filter((n) => n.groupId !== groupId));

  return {
    notes,
    getNotesForDate,
    addNote,
    addNoteRange,
    deleteNote,
    deleteNoteGroup,
    updateNote,
    updateNoteGroup,
  };
}
