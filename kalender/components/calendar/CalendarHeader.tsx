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
  onSelectMonth: (month: number) => void;
  onSelectYear: (year: number) => void;
};

export default function CalendarHeader({
  monthIndex,
  year,
  onPrev,
  onNext,
  onSelectMonth,
  onSelectYear,
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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-[15px] font-medium uppercase tracking-[0.12em] text-[#1a1208]">
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
    </div>
  );
}
