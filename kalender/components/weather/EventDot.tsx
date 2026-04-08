type EventDotProps = {
  color: string;
};

export default function EventDot({ color }: EventDotProps) {
  return (
    <span
      className="inline-block h-2.5 w-2.5 rounded-full"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  );
}
