import CalendarPage from "@/components/calendar/CalendarPage";

export default function CalendarRoute() {
  return (
    <main className="min-h-screen bg-[#F3E8DE] px-6 py-10 md:px-12 md:py-12">
      <div className="anim-enter-right">
        <CalendarPage />
      </div>
    </main>
  );
}
