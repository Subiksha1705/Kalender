"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "kalender_events";

export type CalendarEvent = {
  id: string;
  title: string;
  time: string;
  color: string;
  groupId?: string;
};

type EventStore = Record<string, CalendarEvent[]>;

let cache: EventStore = {};
let listeners: Array<() => void> = [];
const serverSnapshot: EventStore = {};

function getSnapshot(): EventStore {
  return cache;
}

function subscribe(cb: () => void): () => void {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

function load(): EventStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as EventStore) : {};
  } catch {
    return {};
  }
}

function init() {
  cache = load();
}

if (typeof window !== "undefined") {
  init();
}

let writeTimer: ReturnType<typeof setTimeout> | null = null;

function persist(next: EventStore) {
  cache = next;
  listeners.forEach((l) => l());
  if (writeTimer) clearTimeout(writeTimer);
  writeTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      console.warn("localStorage quota exceeded");
    }
  }, 200);
}

function toKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function useEvents() {
  const store = useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);

  const getEvents = (date: Date) => store[toKey(date)] || [];

  const addEvent = (date: Date, title: string, time = "", color = "#c87941") => {
    const key = toKey(date);
    const nextEvents = [
      ...(cache[key] || []),
      { id: crypto.randomUUID(), title, time, color },
    ];
    persist({ ...cache, [key]: nextEvents });
  };

  const addEventRange = (
    startDate: Date,
    endDate: Date,
    title: string,
    time = "",
    color = "#c87941"
  ) => {
    const cursor = new Date(startDate);
    const updates: EventStore = {};
    const groupId = crypto.randomUUID();
    while (cursor <= endDate) {
      const key = toKey(cursor);
      const existing = updates[key] ?? cache[key] ?? [];
      updates[key] = [
        ...existing,
        { id: crypto.randomUUID(), title, time, color, groupId },
      ];
      cursor.setDate(cursor.getDate() + 1);
    }
    persist({ ...cache, ...updates });
  };

  const removeEvent = (date: Date, id: string) => {
    const key = toKey(date);
    const nextEvents = (cache[key] || []).filter((event) => event.id !== id);
    persist({ ...cache, [key]: nextEvents });
  };

  const updateEvent = (
    date: Date,
    id: string,
    patch: Partial<Pick<CalendarEvent, "title" | "time" | "color">>
  ) => {
    const key = toKey(date);
    const nextEvents = (cache[key] || []).map((event) =>
      event.id === id ? { ...event, ...patch } : event
    );
    persist({ ...cache, [key]: nextEvents });
  };

  const updateEventGroup = (
    groupId: string,
    patch: Partial<Pick<CalendarEvent, "title" | "time" | "color">>
  ) => {
    const nextStore: EventStore = {};
    Object.entries(cache).forEach(([key, events]) => {
      const nextEvents = events.map((event) =>
        event.groupId === groupId ? { ...event, ...patch } : event
      );
      if (nextEvents.length > 0) nextStore[key] = nextEvents;
    });
    persist(nextStore);
  };

  const removeEventGroup = (groupId: string) => {
    const nextStore: EventStore = {};
    Object.entries(cache).forEach(([key, events]) => {
      const nextEvents = events.filter((event) => event.groupId !== groupId);
      if (nextEvents.length > 0) nextStore[key] = nextEvents;
    });
    persist(nextStore);
  };

  const hasEvents = (date: Date) => (store[toKey(date)] || []).length > 0;

  return {
    getEvents,
    addEvent,
    addEventRange,
    removeEvent,
    updateEvent,
    updateEventGroup,
    removeEventGroup,
    hasEvents,
  };
}
