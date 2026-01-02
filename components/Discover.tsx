"use client";

import { Share2, Lightbulb, Ear } from "lucide-react";

export default function ValueProposition() {
  const features = [
    {
      icon: <Share2 className="size-6" />,
      title: "Sharing ideas",
      description:
        "Publish your perspectives to a network of curious minds waiting to engage with deep, meaningful content.",
    },
    {
      icon: <Lightbulb className="size-6" />,
      title: "Thinking out loud",
      description:
        "Draft, edit, and refine your internal monologue in a distraction-free environment built for flow.",
    },
    {
      icon: <Ear className="size-6" />,
      title: "Hearing from others",
      description:
        "Discover stories that challenge, inspire, and move you forward, curated just for you.",
    },
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fcfbf9] text-[#292929] font-sans antialiased selection:bg-[#1a8917]/20 selection:text-[#136b12]">
      {/* Background Blurs */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-[#1a8917]/5 rounded-full blur-[100px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-[100px] opacity-70 pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-6 py-20 lg:px-12 xl:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-12 order-2 lg:order-1">
            {/* Header */}
            <div className="flex flex-col gap-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8f5e9]/50 border border-[#1a8917]/10 w-fit">
                <span className="w-2 h-2 rounded-full bg-[#1a8917] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#136b12]">
                  Our Philosophy
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-[#292929] leading-[1.1] tracking-tight">
                A sanctuary for your thoughts.
              </h2>

              <p className="text-lg lg:text-xl text-[#6b6b6b] font-serif leading-relaxed max-w-lg">
                We&apos;ve stripped away the noise to help you focus on what
                matters: the words you write and the connections you make.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="flex flex-col gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative p-6 rounded-2xl bg-white border border-[#e5e5e5] shadow-sm hover:shadow-xl hover:shadow-[#1a8917]/5 hover:border-[#1a8917]/20 transition-all duration-300 cursor-default"
                >
                  <div className="flex gap-6 items-start">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-[#fcfbf9] border border-[#e5e5e5] flex items-center justify-center text-[#1a8917] group-hover:scale-110 group-hover:bg-[#1a8917] group-hover:text-white transition-all duration-300">
                      {feature.icon}
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold font-serif text-[#292929] group-hover:text-[#1a8917] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-[#6b6b6b] leading-relaxed text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - SVG Illustration */}
          <div className="order-1 lg:order-2 flex items-center justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[500px] aspect-square">
              <svg
                className="w-full h-full drop-shadow-2xl animate-[float_8s_ease-in-out_infinite]"
                fill="none"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Circle */}
                <circle
                  cx="250"
                  cy="250"
                  fill="#1a8917"
                  fillOpacity="0.02"
                  r="220"
                />

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
                  <rect
                    fill="white"
                    height="280"
                    rx="16"
                    width="220"
                    x="120"
                    y="140"
                  />
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
                <rect
                  fill="#F3F4F6"
                  height="8"
                  rx="4"
                  width="160"
                  x="150"
                  y="210"
                />
                <rect
                  fill="#F3F4F6"
                  height="8"
                  rx="4"
                  width="160"
                  x="150"
                  y="230"
                />
                <rect
                  fill="#F3F4F6"
                  height="8"
                  rx="4"
                  width="140"
                  x="150"
                  y="250"
                />
                <rect
                  fill="#F3F4F6"
                  height="8"
                  rx="4"
                  width="150"
                  x="150"
                  y="270"
                />
                <rect
                  fill="#F3F4F6"
                  height="8"
                  rx="4"
                  width="100"
                  x="150"
                  y="290"
                />

                {/* Notification Card (Bouncing) */}
                <g
                  className="animate-bounce"
                  style={{ animationDuration: "3s" }}
                >
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
                  <circle
                    cx="305"
                    cy="125"
                    fill="#1a8917"
                    fillOpacity="0.2"
                    r="10"
                  />
                  <rect
                    fill="#E5E7EB"
                    height="6"
                    rx="3"
                    width="60"
                    x="325"
                    y="120"
                  />
                  <rect
                    fill="#E5E7EB"
                    height="6"
                    rx="3"
                    width="40"
                    x="325"
                    y="132"
                  />
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
                  <rect
                    fill="#E5E7EB"
                    height="12"
                    rx="6"
                    width="12"
                    x="340"
                    y="175"
                  />
                </g>

                {/* Comment Bubble (Pulsing) */}
                <g
                  className="animate-pulse"
                  style={{ animationDuration: "4s" }}
                >
                  <path
                    className="shadow-md"
                    d="M80 320 C 80 308.954 88.9543 300 100 300 H 200 C 211.046 300 220 308.954 220 320 V 360 C 220 371.046 211.046 380 200 380 H 120 L 80 400 V 320 Z"
                    fill="white"
                    stroke="#E5E7EB"
                    strokeWidth="1"
                  />
                  <circle
                    cx="110"
                    cy="340"
                    fill="#1a8917"
                    fillOpacity="0.4"
                    r="6"
                  />
                  <rect
                    fill="#F3F4F6"
                    height="8"
                    rx="4"
                    width="60"
                    x="130"
                    y="336"
                  />
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
            </div>
          </div>
        </div>
      </div>

      {/* Custom Float Animation Style */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </div>
  );
}
