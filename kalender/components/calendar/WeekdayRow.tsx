const weekdays = ["M", "T", "W", "T", "F", "S", "S"];

export default function WeekdayRow() {
  return (
    <div className="grid grid-cols-7 gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#B6A79A]">
      {weekdays.map((day) => (
        <div key={day} className="text-center">
          {day}
        </div>
      ))}
    </div>
  );
}
