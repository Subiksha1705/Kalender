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
      <div className="text-5xl font-semibold leading-none">
        {temp}
        <span className="align-top text-2xl">°C</span>
      </div>
      <div className="text-sm text-white/80">
        Day {day}° | Night {night}°
      </div>
      <div className="text-sm font-medium text-white/70">{condition}</div>
    </div>
  );
}
