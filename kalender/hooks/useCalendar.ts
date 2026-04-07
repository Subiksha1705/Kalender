"use client";

import { useMemo, useState } from "react";
import { getMonthGrid } from "@/utils/calendar";

export function useCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [animating, setAnimating] = useState(false);
  const monthGrid = useMemo(() => getMonthGrid(year, month), [year, month]);

  const navigate = (dir: "left" | "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      if (dir === "right") {
        setMonth((m) => {
          if (m === 11) {
            setYear((y) => y + 1);
            return 0;
          }
          return m + 1;
        });
      } else {
        setMonth((m) => {
          if (m === 0) {
            setYear((y) => y - 1);
            return 11;
          }
          return m - 1;
        });
      }
      setAnimating(false);
      setDirection(null);
    }, 280);
  };

  return {
    year,
    month,
    setYear,
    setMonth,
    monthGrid,
    goNext: () => navigate("right"),
    goPrev: () => navigate("left"),
    direction,
    animating,
  };
}
