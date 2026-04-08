import EventDot from "./EventDot";
import type { CalendarEvent } from "@/lib/events";

type EventsListProps = {
  events: CalendarEvent[];
};

export default function EventsList({ events }: EventsListProps) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9C7F6A]">
        Events
      </span>
      <ul className="flex flex-col gap-3 text-sm text-[#5A3E2B]">
        {events.map((event) => (
          <li key={event.id} className="flex items-center gap-3">
            <EventDot color={event.color} />
            <span>{event.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
