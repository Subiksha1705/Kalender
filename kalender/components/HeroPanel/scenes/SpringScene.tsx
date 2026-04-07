export function SpringScene() {
  return (
    <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="spring-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B5F5EC" />
          <stop offset="100%" stopColor="#F0FFF4" />
        </linearGradient>
      </defs>
      <rect width="400" height="280" fill="url(#spring-sky)" />
      <ellipse cx="200" cy="310" rx="260" ry="110" fill="#8DDFA3" />
      <ellipse cx="80" cy="295" rx="150" ry="85" fill="#6FCF97" />
      <circle cx="320" cy="80" r="28" fill="#FFE17D" />
      <g>
        <circle cx="90" cy="210" r="6" fill="#F472B6" />
        <circle cx="110" cy="220" r="6" fill="#F9A8D4" />
        <circle cx="130" cy="205" r="6" fill="#FDBA74" />
        <circle cx="150" cy="215" r="6" fill="#86EFAC" />
      </g>
    </svg>
  );
}
