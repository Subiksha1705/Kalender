const weekdays = ["M", "T", "W", "T", "F", "S", "S"];

export default function WeekdayRow() {
  return (
    <div className="grid w-full grid-cols-7 justify-items-center gap-3 text-[12px] font-medium uppercase tracking-[0.1em] text-[#9a8a7a]">
      {weekdays.map((day, index) => (
        <div key={`${day}-${index}`} className="text-center">
          {day}
        </div>
      ))}
    </div>
  );
}
