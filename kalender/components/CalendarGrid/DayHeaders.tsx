export function DayHeaders() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="day-headers text-[10px] sm:text-xs md:text-sm gap-2 sm:gap-3 md:gap-4">
      {days.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );
}
