import type { DateState } from "@/hooks/useRangeSelect";

export interface ReturnTypeUseRange {
  rangeStart: Date | null;
  rangeEnd: Date | null;
  hoverDate: Date | null;
  isDragging: boolean;
  handleDayMouseDown: (date: Date) => void;
  handleDayMouseEnter: (date: Date) => void;
  handleDayMouseUp: () => void;
  handleDayClick: (date: Date) => void;
  clearRange: () => void;
  getDateState: (date: Date, isDisabled: boolean) => DateState;
}
