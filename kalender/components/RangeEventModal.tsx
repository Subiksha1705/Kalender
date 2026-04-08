"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const COLORS = ["#c87941", "#e8a838", "#4a9b6f", "#4a7fb5"];

type Range = {
  start: Date;
  end: Date;
};

type RangeEventModalProps = {
  range: Range;
  onSave: (title: string, time: string, color: string) => void;
  onClose: () => void;
};

export function RangeEventModal({ range, onSave, onClose }: RangeEventModalProps) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { day: "numeric", month: "short" });

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(title.trim(), time.trim(), color);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]"
      onClick={onClose}
    >
      <div
        className="w-[min(90vw,360px)] rounded-[16px] border-[1.5px] border-[#1a1208] bg-[#f5efe6] p-7 shadow-[0_24px_64px_rgba(0,0,0,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-2 text-[13px] tracking-[0.05em] text-[#9a8a7a]">
          {fmt(range.start)} {"->"} {fmt(range.end)}
        </p>
        <h3 className="mb-4 text-[17px] text-[#1a1208]">Add event for all days</h3>
        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          placeholder="Event name..."
          className="mb-4 w-full border-0 border-b border-[#ccc] bg-transparent px-0 py-1.5 text-[15px] text-[#1a1208] placeholder:text-[#9a8a7a] focus:outline-none"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mb-4 w-full border-0 border-b border-[#ccc] bg-transparent px-0 py-1.5 text-[15px] text-[#1a1208] focus:outline-none"
        />
        <div className="mb-5 flex items-center gap-2">
          {COLORS.map((c) => {
            const isActive = c === color;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`h-[18px] w-[18px] rounded-full transition ${
                  isActive ? "scale-110 shadow-[0_3px_8px_rgba(0,0,0,0.25)]" : ""
                }`}
                style={{
                  background: c,
                }}
                aria-label={`Pick color ${c}`}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[8px] border border-[#ccc] px-4 py-2 text-[14px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-[8px] bg-[#3d2c1e] px-5 py-2 text-[14px] text-white"
          >
            Save for all days
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
