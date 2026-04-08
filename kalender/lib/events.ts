export type CalendarEvent = {
  id: string;
  date: string;
  title: string;
  time: string;
  color: string;
};

const events: CalendarEvent[] = [
  {
    id: "1",
    date: "2020-01-10",
    title: "Meeting with Ron",
    time: "01:00 PM",
    color: "#E8604C",
  },
  {
    id: "2",
    date: "2020-01-10",
    title: "Roy's Birthday Party",
    time: "07:00 PM",
    color: "#F5A623",
  },
];

export default events;
