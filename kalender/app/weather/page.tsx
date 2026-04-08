import WeatherCard from "@/components/weather/WeatherCard";

export default function WeatherPage() {
  return (
    <main className="min-h-screen bg-[#F3E8DE]">
      <WeatherCard season="summer" />
    </main>
  );
}
