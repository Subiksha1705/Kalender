type SkySunProps = {
  onClick: () => void;
  skyColor: string;
};

export default function SkySun({ onClick, skyColor }: SkySunProps) {
  return (
    <g
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      role="button"
      tabIndex={0}
      className="cursor-pointer"
      aria-label="Open calendar"
    >
      <circle cx="160" cy="175" r="60" fill={skyColor} opacity="0.30" />
      <circle cx="160" cy="175" r="50" fill={skyColor} opacity="0.45" />
      <circle cx="160" cy="175" r="40" fill={skyColor} />
    </g>
  );
}
