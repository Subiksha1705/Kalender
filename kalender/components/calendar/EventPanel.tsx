import type { CalendarEvent } from "@/lib/events";
import EventItem from "./EventItem";

type EventPanelProps = {
  selectedDate: Date | null;
  events: CalendarEvent[];
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

const formatKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

export default function EventPanel({ selectedDate, events }: EventPanelProps) {
  if (!selectedDate) {
    return (
      <aside className="flex h-full flex-col justify-center rounded-[28px] border border-[#EADFD2] bg-white/70 p-8">
        <div className="text-center text-sm text-[#9C7F6A]">
          Select a date to see events.
        </div>
      </aside>
    );
  }

  const key = formatKey(selectedDate);
  const dayEvents = events.filter((event) => event.date === key);

  return (
    <aside className="flex h-full flex-col gap-6 rounded-[28px] border border-[#EADFD2] bg-white/70 p-8">
      <div>
        <div className="text-5xl font-semibold text-[#5A3E2B]">
          {selectedDate.getDate()}
        </div>
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9C7F6A]">
          {monthNames[selectedDate.getMonth()]}
        </div>
      </div>

      {dayEvents.length === 0 ? (
        <div className="text-sm text-[#9C7F6A]">No events for this day.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {dayEvents.map((event) => (
            <EventItem
              key={event.id}
              title={event.title}
              time={event.time}
              color={event.color}
            />
          ))}
        </div>
      )}
    </aside>
  );
}
