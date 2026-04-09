type DateBlockProps = {
  date: Date;
  onPrev?: () => void;
  onNext?: () => void;
  onOpen?: () => void;
};

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

const weekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function DateBlock({ date, onPrev, onNext, onOpen }: DateBlockProps) {
  const dayName = weekdayNames[date.getDay()];
  const monthName = monthNames[date.getMonth()];
  const dayNumber = date.getDate();
  const year = date.getFullYear();

  return (
    <div className="flex flex-col gap-2 text-[#5A3E2B]">
      <span className="text-3xl font-semibold uppercase tracking-[0.18em] text-[#9C7F6A]">
        {dayName}
      </span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="rounded-full border border-[#E6D9CB] px-2 py-1 text-xs text-[#5A3E2B] transition hover:border-[#C9A98A]"
          aria-label="Previous day"
        >
          &#x2039;
        </button>
        <button
          type="button"
          onClick={onOpen}
          className="text-7xl font-semibold leading-none tracking-tight text-[#5A3E2B]"
          aria-label="Open calendar"
        >
          {dayNumber}
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-full border border-[#E6D9CB] px-2 py-1 text-xs text-[#5A3E2B] transition hover:border-[#C9A98A]"
          aria-label="Next day"
        >
          &#x203A;
        </button>
      </div>
      <div className="text-md font-semibold uppercase tracking-[0.3em] text-[#9C7F6A]">
        {monthName} {year}
      </div>
    </div>
  );
}
