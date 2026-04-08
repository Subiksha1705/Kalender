import WeatherCard from "@/components/weather/WeatherCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F3E8DE]">
      <WeatherCard season="summer" />
    </main>
  );
}
