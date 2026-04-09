"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type CalendarHeaderProps = {
  monthIndex: number;
  year: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  isCurrentMonth: boolean;
  onSelectMonth: (month: number) => void;
  onSelectYear: (year: number) => void;
  showBanner: boolean;
  onToggleBanner: () => void;
};

export default function CalendarHeader({
  monthIndex,
  year,
  onPrev,
  onNext,
  onToday,
  isCurrentMonth,
  onSelectMonth,
  onSelectYear,
  showBanner,
  onToggleBanner,
}: CalendarHeaderProps) {
  const [openMonth, setOpenMonth] = useState(false);
  const [openYear, setOpenYear] = useState(false);
  const monthRef = useRef<HTMLDivElement | null>(null);
  const yearRef = useRef<HTMLDivElement | null>(null);
  const monthItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const yearItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!openMonth && !openYear) return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (openMonth && monthRef.current && !monthRef.current.contains(target)) {
        setOpenMonth(false);
      }
      if (openYear && yearRef.current && !yearRef.current.contains(target)) {
        setOpenYear(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openMonth, openYear]);

  const years = useMemo(
    () => Array.from({ length: 141 }, (_, i) => year - 70 + i),
    [year]
  );

  const monthLabel = monthNames[monthIndex].toUpperCase();

  useEffect(() => {
    if (!openMonth) return;
    const el = monthItemRefs.current[monthIndex];
    if (el) {
      el.scrollIntoView({ block: "center" });
    }
  }, [openMonth, monthIndex]);

  useEffect(() => {
    if (!openYear) return;
    const yearIndex = years.indexOf(year);
    const el = yearItemRefs.current[yearIndex];
    if (el) {
      el.scrollIntoView({ block: "center" });
    }
  }, [openYear, years, year]);

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-[#1a1208] sm:text-[15px]">
        <button
          type="button"
          onClick={onPrev}
          className="px-2 text-base text-[#1a1208]"
          aria-label="Previous month"
        >
          &#x2039;
        </button>
        <div className="relative" ref={monthRef}>
          <button
            type="button"
            onClick={() => {
              setOpenYear(false);
              setOpenMonth((value) => !value);
            }}
            className="inline-flex items-center gap-2 cursor-pointer"
            aria-label="Select month"
          >
            {monthLabel}
            <span className={`text-[12px] transition ${openMonth ? "rotate-180" : ""}`}>▾</span>
          </button>
          {openMonth ? (
            <div className="absolute left-0 top-full z-40 mt-2 w-[200px] max-h-[280px] overflow-y-auto rounded-[16px] border border-[#c5b8ab] bg-[#f9f3ea] p-2 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
              <div className="flex flex-col gap-1">
                {monthNames.map((label, idx) => (
                  <button
                    key={label}
                    ref={(el) => {
                      monthItemRefs.current[idx] = el;
                    }}
                    type="button"
                    onClick={() => {
                      onSelectMonth(idx);
                      setOpenMonth(false);
                    }}
                    className={`rounded-[10px] px-3 py-2 text-left text-[12px] uppercase tracking-[0.12em] ${
                      idx === monthIndex ? "bg-[#3d2c1e] text-white" : "text-[#5a4a3a] hover:bg-[#efe6db]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onNext}
          className="px-2 text-base text-[#1a1208]"
          aria-label="Next month"
        >
          &#x203A;
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <button
          type="button"
          onClick={onToday}
          disabled={isCurrentMonth}
          className={`rounded-full border border-[#c5b8ab] px-3 py-1 text-[10px] uppercase tracking-[0.18em] transition ${
            isCurrentMonth
              ? "cursor-default opacity-50"
              : "cursor-pointer opacity-70 hover:bg-[#efe6db] hover:opacity-100"
          }`}
          aria-label="Jump to current month"
        >
          Today
        </button>
        <div className="relative" ref={yearRef}>
          <button
            type="button"
            onClick={() => {
              setOpenMonth(false);
              setOpenYear((value) => !value);
            }}
            className="inline-flex items-center gap-2 cursor-pointer text-[15px] tracking-[0.08em] text-[#5a4a3a]"
            aria-label="Select year"
          >
            {year}
            <span className={`text-[12px] transition ${openYear ? "rotate-180" : ""}`}>▾</span>
          </button>
          {openYear ? (
            <div className="absolute right-0 top-full z-40 mt-2 w-[160px] max-h-[280px] overflow-y-auto rounded-[16px] border border-[#c5b8ab] bg-[#f9f3ea] p-2 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
              <div className="flex flex-col gap-1">
                {years.map((y) => (
                  <button
                    key={y}
                    ref={(el) => {
                      yearItemRefs.current[years.indexOf(y)] = el;
                    }}
                    type="button"
                    onClick={() => {
                      onSelectYear(y);
                      setOpenYear(false);
                    }}
                    className={`rounded-[10px] px-3 py-2 text-left text-[12px] tracking-[0.1em] ${
                      y === year ? "bg-[#3d2c1e] text-white" : "text-[#5a4a3a] hover:bg-[#efe6db]"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onToggleBanner}
          title={showBanner ? "Hide banner" : "Show banner"}
          className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-[#5a4a3a] opacity-60 transition-opacity hover:opacity-100"
          aria-label="Toggle month image banner"
        >
          {showBanner ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="2" y1="2" x2="22" y2="22" />
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
