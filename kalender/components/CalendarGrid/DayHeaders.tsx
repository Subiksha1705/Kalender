export function DayHeaders() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="day-headers">
      {days.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );
}
