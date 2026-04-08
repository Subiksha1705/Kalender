import CalendarPage from "@/components/calendar/CalendarPage";

export default function CalendarRoute() {
  return (
    <main className="min-h-screen bg-[#EDE8DC] px-6 py-10 md:px-12 md:py-12 flex flex-col">
      <div className="anim-enter-right flex-1 min-h-0">
        <CalendarPage />
      </div>
    </main>
  );
}
