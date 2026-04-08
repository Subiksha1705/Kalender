import WeatherCard from "@/components/weather/WeatherCard";
import { OnboardingGate } from "@/components/OnboardingGate/OnboardingGate";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F3E8DE]">
      <OnboardingGate>
        <WeatherCard season="summer" />
      </OnboardingGate>
    </main>
  );
}
