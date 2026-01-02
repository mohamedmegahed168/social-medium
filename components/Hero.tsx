"use client";

import { ArrowRight, Sparkles } from "lucide-react";

export default function ChronicleLanding() {
  return (
    <div className="relative bg-[#1c2e22] w-full text-white mt-16 overflow-x-hidden flex flex-col min-h-screen">
      <main className="w-full px-6 sm:px-20  flex justify-center py-12  ">
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-20 items-center">
          {/* first div included within the grid*/}
          <div>
            <div className=" text-center sm:text-left flex flex-col gap-6 items-center sm:items-start relative z-10 order-1">
              {/* first component within this div*/}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="flex items-center justify-center size-5 rounded-full bg-[#17cf54]/20 text-[#17cf54]">
                  <Sparkles className="size-3" />
                </span>
                <span className="text-sm font-sans font-medium text-gray-200 tracking-wide">
                  Daily curated wisdom
                </span>
              </div>
              {/* second component*/}
              <div>
                <h1 className="text-5xl  sm:text-7xl font-bold tracking-tight leading-[1.1] text-white">
                  Insight without
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#17cf54] to-green-300  pr-2">
                    the noise.
                  </span>
                </h1>
              </div>
              {/* third component*/}
              <div>
                <p className="text-lg md:text-xl font-sans font-normal text-gray-400 leading-relaxed max-w-xl">
                  Escape the algorithm. Chronicle is your sanctuary for deep
                  thinking, bringing you substantial stories on culture,
                  innovation, and the future—free from distraction.
                </p>
              </div>
              {/* forth component */}
              <div className="flex flex-col sm:flex-row gap-4  sm:max-w-xl mt-4">
                <button className="rounded-full px-4 py-2 bg-white text-[#1c2e22] text-lg font-sans font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Start Reading Free
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="rounded-full px-4 py-3 bg-transparent border border-white/20 text-white text-lg font-sans font-medium hover:bg-white/5 transition-all flex items-center justify-center">
                  Explore Methodology
                </button>
              </div>

              {/* fifth component */}
            </div>
          </div>

          {/* Right - Animated Solar System */}
          <div>
            <div className="lg:col-span-5 relative flex justify-center items-center order-1 lg:order-2">
              {/* Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#17cf54]/15 blur-[60px] rounded-full pointer-events-none" />

              {/* SVG Animation */}
              <div className="w-full aspect-square max-w-[80vw] md:max-w-[500px] relative z-10">
                <svg
                  className="w-full h-full text-white"
                  fill="none"
                  viewBox="0 0 500 500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient cx="0.5" cy="0.5" id="sunGradient" r="0.5">
                      <stop offset="0%" stopColor="#17cf54" stopOpacity="1" />
                      <stop offset="100%" stopColor="#17cf54" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Twinkling Stars */}
                  <circle cx="120" cy="80" fill="white" opacity="0.3" r="1.5">
                    <animate
                      attributeName="opacity"
                      dur="4s"
                      repeatCount="indefinite"
                      values="0.3;0.8;0.3"
                    />
                  </circle>
                  <circle cx="400" cy="120" fill="white" opacity="0.2" r="1">
                    <animate
                      attributeName="opacity"
                      dur="5s"
                      repeatCount="indefinite"
                      values="0.2;0.6;0.2"
                    />
                  </circle>
                  <circle cx="80" cy="400" fill="white" opacity="0.25" r="1">
                    <animate
                      attributeName="opacity"
                      dur="6s"
                      repeatCount="indefinite"
                      values="0.25;0.7;0.25"
                    />
                  </circle>
                  <circle cx="420" cy="380" fill="white" opacity="0.2" r="1.5">
                    <animate
                      attributeName="opacity"
                      dur="3s"
                      repeatCount="indefinite"
                      values="0.2;0.5;0.2"
                    />
                  </circle>

                  {/* Orbit Rings */}
                  <circle
                    cx="250"
                    cy="250"
                    r="70"
                    stroke="currentColor"
                    strokeOpacity="0.1"
                    strokeWidth="1"
                  />
                  <circle
                    cx="250"
                    cy="250"
                    r="130"
                    stroke="currentColor"
                    strokeOpacity="0.1"
                    strokeWidth="1"
                  />
                  <circle
                    cx="250"
                    cy="250"
                    r="190"
                    stroke="currentColor"
                    strokeOpacity="0.05"
                    strokeWidth="1"
                  />

                  {/* Sun Glow */}
                  <circle
                    cx="250"
                    cy="250"
                    fill="url(#sunGradient)"
                    opacity="0.8"
                    r="25"
                  >
                    <animate
                      attributeName="r"
                      dur="4s"
                      repeatCount="indefinite"
                      values="25;28;25"
                    />
                    <animate
                      attributeName="opacity"
                      dur="4s"
                      repeatCount="indefinite"
                      values="0.8;0.9;0.8"
                    />
                  </circle>

                  {/* Sun Core */}
                  <circle cx="250" cy="250" fill="#17cf54" r="8" />

                  {/* Planet 1 - Inner Orbit */}
                  <g>
                    <animateTransform
                      attributeName="transform"
                      dur="20s"
                      from="0 250 250"
                      repeatCount="indefinite"
                      to="360 250 250"
                      type="rotate"
                    />
                    <circle cx="320" cy="250" fill="#ffffff" r="6" />
                  </g>

                  {/* Planet 2 - Middle Orbit */}
                  <g>
                    <animateTransform
                      attributeName="transform"
                      dur="35s"
                      from="180 250 250"
                      repeatCount="indefinite"
                      to="540 250 250"
                      type="rotate"
                    />
                    <circle cx="380" cy="250" fill="#17cf54" r="9" />
                    <circle
                      cx="380"
                      cy="250"
                      fill="#ffffff"
                      opacity="0.4"
                      r="3"
                    />
                  </g>

                  {/* Planet 3 - Outer Orbit */}
                  <g>
                    <animateTransform
                      attributeName="transform"
                      dur="50s"
                      from="90 250 250"
                      repeatCount="indefinite"
                      to="450 250 250"
                      type="rotate"
                    />
                    <circle
                      cx="440"
                      cy="250"
                      fill="#ffffff"
                      opacity="0.6"
                      r="5"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
