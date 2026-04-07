"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "cal_notes_v1";

export interface Note {
  id: string;
  dateKey: string;
  text: string;
  attachments: Array<{ name: string; type: string; data: string }>;
  createdAt: number;
}

type NoteStore = Note[];

let cache: NoteStore = [];
let listeners: Array<() => void> = [];

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
    cache = raw ? (JSON.parse(raw) as NoteStore) : [];
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
  const notes = useSyncExternalStore(subscribe, getSnapshot, () => [] as NoteStore);

  const getNotesForDate = (dateKey: string) =>
    notes.filter((n) => n.dateKey === dateKey).sort((a, b) => a.createdAt - b.createdAt);

  const addNote = (dateKey: string, text: string, attachments: Note["attachments"] = []) => {
    const note: Note = {
      id: crypto.randomUUID(),
      dateKey,
      text,
      attachments,
      createdAt: Date.now(),
    };
    persist([...cache, note]);
  };

  const deleteNote = (id: string) => persist(cache.filter((n) => n.id !== id));

  const updateNote = (id: string, text: string) =>
    persist(cache.map((n) => (n.id === id ? { ...n, text } : n)));

  return { notes, getNotesForDate, addNote, deleteNote, updateNote };
}
