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
    <section className="flex min-h-screen w-full flex-col bg-[#F5EFE6] px-6 py-10 md:px-12 lg:pr-0">
      <div className="mx-auto flex w-full max-w-none flex-1 flex-col gap-8">
        <div className="grid w-full grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[minmax(240px,1fr)_minmax(0,3fr)]">
          <div className="flex items-center justify-start">
            <DayNav />
          </div>
          <div className="flex items-center justify-end lg:justify-start">
            <MonthNav month="January" />
          </div>
        </div>

        <div className="grid flex-1 items-start gap-6 lg:grid-cols-[minmax(240px,1fr)_minmax(0,3fr)] lg:items-stretch lg:min-h-[70vh]">
          <div className="flex flex-col gap-10">
            <DateBlock date={displayDate} />
            <EventsList events={events} />
          </div>

          <div className="relative">
            <div className="relative ml-auto aspect-[13/9] w-full overflow-hidden rounded-[28px] lg:aspect-auto lg:h-full lg:w-full lg:rounded-l-[40px] lg:rounded-r-none">
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
