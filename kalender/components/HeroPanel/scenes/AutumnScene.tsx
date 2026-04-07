export function AutumnScene() {
  return (
    <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="autumn-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFC28B" />
          <stop offset="100%" stopColor="#FFE9C7" />
        </linearGradient>
      </defs>
      <rect width="400" height="280" fill="url(#autumn-sky)" />
      <ellipse cx="200" cy="310" rx="260" ry="110" fill="#D97706" />
      <ellipse cx="70" cy="295" rx="150" ry="85" fill="#B45309" />
      <rect x="260" y="180" width="12" height="40" fill="#7C2D12" />
      <circle cx="266" cy="165" r="18" fill="#F59E0B" />
      <circle cx="285" cy="155" r="14" fill="#F97316" />
      <circle cx="245" cy="158" r="12" fill="#FB923C" />
    </svg>
  );
}
