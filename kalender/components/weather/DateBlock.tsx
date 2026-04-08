type DateBlockProps = {
  date: Date;
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

export default function DateBlock({ date }: DateBlockProps) {
  const dayName = weekdayNames[date.getDay()];
  const monthName = monthNames[date.getMonth()];
  const dayNumber = date.getDate();
  const year = date.getFullYear();

  return (
    <div className="flex flex-col gap-2 text-[#5A3E2B]">
      <span className="text-sm font-medium text-[#9C7F6A]">{dayName}</span>
      <div className="text-6xl font-semibold leading-none tracking-tight">
        {dayNumber}
      </div>
      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9C7F6A]">
        {monthName} {year}
      </div>
    </div>
  );
}
