export default function Svg() {
  return (
    <svg
      className="w-full h-auto max-h-[520px] drop-shadow-2xl animate-[float_8s_ease-in-out_infinite]"
      fill="none"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle cx="250" cy="250" fill="#1a8917" fillOpacity="0.02" r="220" />

      {/* Dashed Orbit */}
      <circle
        cx="250"
        cy="250"
        r="180"
        stroke="#1a8917"
        strokeDasharray="6 6"
        strokeOpacity="0.08"
        strokeWidth="1"
      />

      {/* Main Card Shadow */}
      <g filter="url(#shadow)">
        <rect fill="white" height="280" rx="16" width="220" x="120" y="140" />
      </g>

      {/* Card Content Lines */}
      <rect
        fill="#1a8917"
        fillOpacity="0.1"
        height="12"
        rx="6"
        width="120"
        x="150"
        y="180"
      />
      <rect fill="#F3F4F6" height="8" rx="4" width="160" x="150" y="210" />
      <rect fill="#F3F4F6" height="8" rx="4" width="160" x="150" y="230" />
      <rect fill="#F3F4F6" height="8" rx="4" width="140" x="150" y="250" />
      <rect fill="#F3F4F6" height="8" rx="4" width="150" x="150" y="270" />
      <rect fill="#F3F4F6" height="8" rx="4" width="100" x="150" y="290" />

      {/* Notification Card (Bouncing) */}
      <g className="animate-bounce" style={{ animationDuration: "3s" }}>
        <rect
          className="shadow-lg"
          fill="white"
          height="100"
          rx="12"
          stroke="#E5E7EB"
          strokeWidth="1"
          width="140"
          x="280"
          y="100"
        />
        <circle cx="305" cy="125" fill="#1a8917" fillOpacity="0.2" r="10" />
        <rect fill="#E5E7EB" height="6" rx="3" width="60" x="325" y="120" />
        <rect fill="#E5E7EB" height="6" rx="3" width="40" x="325" y="132" />
        <path d="M280 165 h140" stroke="#f0f0f0" strokeWidth="1" />
        <rect
          fill="#1a8917"
          fillOpacity="0.9"
          height="12"
          rx="6"
          width="40"
          x="295"
          y="175"
        />
        <rect fill="#E5E7EB" height="12" rx="6" width="12" x="340" y="175" />
      </g>

      {/* Comment Bubble (Pulsing) */}
      <g className="animate-pulse" style={{ animationDuration: "4s" }}>
        <path
          className="shadow-md"
          d="M80 320 C 80 308.954 88.9543 300 100 300 H 200 C 211.046 300 220 308.954 220 320 V 360 C 220 371.046 211.046 380 200 380 H 120 L 80 400 V 320 Z"
          fill="white"
          stroke="#E5E7EB"
          strokeWidth="1"
        />
        <circle cx="110" cy="340" fill="#1a8917" fillOpacity="0.4" r="6" />
        <rect fill="#F3F4F6" height="8" rx="4" width="60" x="130" y="336" />
      </g>

      {/* Connecting Dashed Lines */}
      <path
        d="M220 340 L 260 340"
        stroke="#1a8917"
        strokeDasharray="4 4"
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      <path
        d="M280 200 L 250 220"
        stroke="#1a8917"
        strokeDasharray="4 4"
        strokeOpacity="0.3"
        strokeWidth="2"
      />

      {/* Shadow Filter Definition */}
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="320"
          id="shadow"
          width="260"
          x="100"
          y="130"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="10" />
          <feGaussianBlur stdDeviation="10" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            in2="BackgroundImageFix"
            mode="normal"
            result="effect1_dropShadow"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow"
            mode="normal"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
