"use client";

import { useSyncExternalStore } from "react";
import { formatDateKey } from "@/utils/calendar";

const STORAGE_KEY = "kalender_events_v1";

export interface CalendarEvent {
  id: string;
  dateKey: string;
  title: string;
  color: string;
  createdAt: number;
}

type EventStore = CalendarEvent[];

let cache: EventStore = [];
let listeners: Array<() => void> = [];

function getSnapshot(): EventStore {
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
    cache = raw ? (JSON.parse(raw) as EventStore) : [];
  } catch {
    cache = [];
  }
}

if (typeof window !== "undefined") {
  init();
}

let writeTimer: ReturnType<typeof setTimeout> | null = null;

function persist(events: EventStore) {
  cache = events;
  listeners.forEach((l) => l());
  if (writeTimer) clearTimeout(writeTimer);
  writeTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      console.warn("localStorage quota exceeded");
    }
  }, 300);
}

export function useEvents() {
  const events = useSyncExternalStore(subscribe, getSnapshot, () => [] as EventStore);

  const getEventsForDate = (dateKey: string) =>
    events.filter((e) => e.dateKey === dateKey).sort((a, b) => a.createdAt - b.createdAt);

  const addEvent = (dateKey: string, title: string, color: string) => {
    const event: CalendarEvent = {
      id: crypto.randomUUID(),
      dateKey,
      title,
      color,
      createdAt: Date.now(),
    };
    persist([...cache, event]);
  };

  const addEventOnDate = (date: Date, title: string, color: string) => {
    addEvent(formatDateKey(date), title, color);
  };

  const removeEvent = (id: string) => {
    persist(cache.filter((e) => e.id !== id));
  };

  return {
    events,
    getEventsForDate,
    addEvent,
    addEventOnDate,
    removeEvent,
  };
}
