"use client";

import { useRouter } from "next/navigation";
import DateBlock from "./DateBlock";
import DayNav from "./DayNav";
import DesertScene from "./DesertScene";
import EventsList from "./EventsList";
import MonthNav from "./MonthNav";
import TemperatureBlock from "./TemperatureBlock";
import events from "@/lib/events";
import type { Season } from "@/lib/seasons";

type WeatherCardProps = {
  season: Season;
};

const displayDate = new Date(2020, 0, 10);

export default function WeatherCard({ season }: WeatherCardProps) {
  const router = useRouter();

  return (
    <section className="flex min-h-screen w-full flex-col bg-[#F5EFE6] px-6 py-10 md:px-12 md:py-12">
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex items-center justify-between">
          <DayNav />
          <MonthNav month="January" />
        </div>

        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[1.05fr_1.4fr]">
          <div className="flex flex-col justify-between gap-10">
            <DateBlock date={displayDate} />
            <EventsList events={events} />
          </div>

          <div className="relative flex min-h-[360px] flex-col md:min-h-[460px] lg:min-h-[540px]">
            <div className="absolute right-6 top-6 z-10">
              <TemperatureBlock
                temp={28}
                day={28}
                night={14}
                condition="Partly Cloudy"
              />
            </div>
            <div className="flex-1 overflow-hidden rounded-[28px]">
              <DesertScene
                season={season}
                onSunClick={() => router.push("/calendar")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
