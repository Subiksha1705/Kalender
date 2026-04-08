type SkySunProps = {
  onClick: () => void;
  skyColor: string;
};

export default function SkySun({ onClick, skyColor }: SkySunProps) {
  return (
    <g
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      className="cursor-pointer"
      aria-label="Open calendar"
    >
      <circle cx="155" cy="210" r="52" fill={skyColor} opacity="0.35" />
      <circle cx="155" cy="210" r="42" fill={skyColor} />
    </g>
  );
}
