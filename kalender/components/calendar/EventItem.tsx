type EventItemProps = {
  title: string;
  time?: string | null;
  color: string;
};

export default function EventItem({ title, time, color }: EventItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#EFE3D5] bg-white/80 p-4">
      <span
        className="mt-1 h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <div className="space-y-1">
        <div className="text-sm font-semibold text-[#5A3E2B]">{title}</div>
        {time ? <div className="text-xs text-[#9C7F6A]">{time}</div> : null}
      </div>
    </div>
  );
}
