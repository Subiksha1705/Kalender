export function SummerScene() {
  return (
    <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB347" />
          <stop offset="100%" stopColor="#FFCC80" />
        </linearGradient>
        <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE566" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFE566" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="url(#sky)" />
      <circle cx="220" cy="130" r="50" fill="url(#sun-glow)" />
      <circle cx="220" cy="130" r="28" fill="#FFD93D" />
      <ellipse cx="200" cy="320" rx="280" ry="120" fill="#E8A045" opacity="0.8" />
      <ellipse cx="80" cy="290" rx="160" ry="90" fill="#C47B1E" opacity="0.9" />
      <ellipse cx="340" cy="310" rx="180" ry="100" fill="#B8681A" />
      <rect x="78" y="215" width="6" height="30" fill="#6B3F0E" rx="2" />
      <ellipse cx="81" cy="205" rx="12" ry="18" fill="#4A6741" />
      <rect x="120" y="225" width="5" height="25" fill="#6B3F0E" rx="2" />
      <ellipse cx="122" cy="215" rx="10" ry="15" fill="#3D5C35" />
      <g className="cloud-drift">
        <ellipse cx="120" cy="80" rx="40" ry="18" fill="white" opacity="0.9" />
        <ellipse cx="100" cy="88" rx="28" ry="16" fill="white" opacity="0.9" />
        <ellipse cx="148" cy="88" rx="24" ry="14" fill="white" opacity="0.9" />
      </g>
    </svg>
  );
}
