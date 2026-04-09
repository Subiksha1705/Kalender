"use client";

import { MONTH_IMAGES } from "@/constants/monthImages";

interface CalendarBannerProps {
  monthIndex: number;
  monthName: string;
  year: number;
}

export default function CalendarBanner({
  monthIndex,
  monthName,
  year,
}: CalendarBannerProps) {
  const image = MONTH_IMAGES[monthIndex];

  return (
    <div className="relative w-full h-28 sm:h-36 lg:h-50 rounded-xl overflow-hidden mb-4">
      <img
        src={image.smallUrl}
        alt={image.alt}
        className="block h-full w-full object-cover lg:hidden"
      />
      <img
        src={image.largeUrl}
        alt={image.alt}
        className="hidden h-full w-full object-cover lg:block"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-3 left-4 text-white">
        <p className="text-xs uppercase tracking-widest opacity-80">{year}</p>
        <p className="text-2xl font-semibold leading-tight">{monthName}</p>
      </div>
    </div>
  );
}
