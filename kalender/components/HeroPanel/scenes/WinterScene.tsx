export function WinterScene() {
  return (
    <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="winter-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BDE6FF" />
          <stop offset="100%" stopColor="#E6F4FF" />
        </linearGradient>
      </defs>
      <rect width="400" height="280" fill="url(#winter-sky)" />
      <ellipse cx="200" cy="310" rx="260" ry="110" fill="#E2E8F0" />
      <ellipse cx="60" cy="290" rx="160" ry="80" fill="#CBD5F5" />
      <rect x="280" y="170" width="10" height="40" fill="#475569" />
      <circle cx="285" cy="160" r="18" fill="#94A3B8" />
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={i} cx={30 + i * 30} cy={40 + (i % 4) * 18} r={2} fill="#FFFFFF" />
      ))}
    </svg>
  );
}
