"use client";

import { useState } from "react";

const COLORS = ["#D94F3D", "#E8A838", "#4A9B6F", "#4A7FB5"];

type Range = {
  start: Date;
  end: Date;
};

type RangeEventModalProps = {
  range: Range;
  onSave: (data: { title: string; color: string; start: Date; end: Date }) => void;
  onClose: () => void;
};

export function RangeEventModal({ range, onSave, onClose }: RangeEventModalProps) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(COLORS[0]);

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { day: "numeric", month: "short" });

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title: title.trim(), color, start: range.start, end: range.end });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card text-left" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-[#3D2C1E]">Add event</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#9C7F6A]">
          {fmt(range.start)} → {fmt(range.end)}
        </p>
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          placeholder="Event name…"
          className="mt-4 w-full rounded-lg border border-[#E6D9CB] bg-white px-3 py-2 text-sm text-[#5A3E2B] outline-none focus:border-[#C9A98A]"
        />
        <div className="mt-3 flex items-center gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className="h-5 w-5 rounded-full"
              style={{
                background: c,
                outline: c === color ? "2px solid #3D2C1E" : "none",
              }}
            />
          ))}
        </div>
        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            type="button"
            className="rounded-full border border-[#C9A98A] px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#5A3E2B]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-full bg-[#3D2C1E] px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
