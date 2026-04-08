type TemperatureBlockProps = {
  temp: number;
  day: number;
  night: number;
  condition: string;
};

export default function TemperatureBlock({
  temp,
  day,
  night,
  condition,
}: TemperatureBlockProps) {
  return (
    <div className="flex flex-col gap-2 text-white">
      <div className="text-[clamp(28px,4.6vw,52px)] font-semibold leading-none">
        {temp}
        <span className="align-top text-[clamp(14px,2.2vw,24px)]">°C</span>
      </div>
      <div className="text-[clamp(12px,1.6vw,14px)] text-white/80">
        Day {day}° | Night {night}°
      </div>
      <div className="text-[clamp(12px,1.6vw,14px)] font-medium text-white/70">
        {condition}
      </div>
    </div>
  );
}
