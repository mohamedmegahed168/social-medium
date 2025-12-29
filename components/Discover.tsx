"use client";
import { motion } from "motion/react";
import { PenLine, Compass, Bookmark, User } from "lucide-react";
export default function Discover() {
  return (
    <motion.section className="  bg-light  min-h-screen" id="discover">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-20 md:py-5">
        <div className=" grid grid-cols-1 gap-4 md:grid md:grid-cols-2 md:gap-10 items-center">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-semibold text-primary leading-tight tracking-tight ">
              Unlock the power of shared prespectives
            </h2>
            <p className="text-secondary text-base mx-auto lg:mx-0 leading-relaxed max-w-lg ">
              A digital sanctuary designed for the clarity of your thoughts.
              Whether you are drafting your next big idea
              <span className="md:block">
                or discovering a new voice, find your flow in a
              </span>
              space built for connection.
            </p>
          </div>
          <SvgContainer />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 rounded-xl px-4 py-2 gap-4">
          {[
            {
              icon: <PenLine className="size-6 text-greenish" />,
              title: "Write your story",
              desc: "A clean, distraction-free editor that lets your words flow naturally.",
            },
            {
              icon: <Compass className="size-6 text-greenish" />,
              title: "Explore ideas",
              desc: "Discover Fresh perspectives on topics that matters to you",
            },
            {
              icon: <User className="size-6 text-greenish" />,
              title: "Connect with minds",
              desc: "Follow thinkers and join conversations that inspire growth.",
            },
            {
              icon: <Bookmark className="size-6 text-greenish" />,
              title: "Build your library",
              desc: "Save stories that resonate and revisit them anytime.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group border border-gray-200 bg-white rounded-2xl p-6 flex flex-col gap-2"
            >
              <div className=" size-12 bg-greenish/20 group-hover:bg-greenish/40 transition-colors rounded-xl flex items-center justify-center">
                {feature.icon}
              </div>
              <h2 className="text-primary text-xl font-semibold">
                {feature.title}
              </h2>
              <p className="text-secondary text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function SvgContainer() {
  return (
    <div className="flex justify-center md:justify-end">
      <svg
        className="w-full max-w-[400px] h-auto drop-shadow-xl"
        fill="none"
        viewBox="0 0 400 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M348.5 186.2C364.2 232.8 310.5 284.5 258.8 302.2C207.1 319.9 157.4 303.6 118.2 278.5C79 253.4 50.3 219.5 42.1 176.8C33.9 134.1 46.2 82.6 83.5 49.8C120.8 17 183.1 2.9 235.5 15.8C287.9 28.7 332.8 139.6 348.5 186.2Z"
          fill="#17cf54"
          fillOpacity="0.1"
        />
        <circle cx="320" cy="60" fill="#17cf54" r="12" />
        <circle cx="60" cy="260" fill="#17cf54" fillOpacity="0.4" r="8" />
        <g
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <rect
            className="fill-white dark:fill-[#1a281f]"
            fill="white"
            height="140"
            rx="12"
            transform="rotate(-6 180 140)"
            width="180"
            x="100"
            y="80"
          />
          <rect
            className="fill-white dark:fill-[#1a281f]"
            fill="white"
            height="160"
            rx="12"
            width="220"
            x="90"
            y="80"
          />
          <path d="M120 120H280" stroke="#17cf54" strokeWidth="4" />
          <path d="M120 150H260" stroke="currentColor" />
          <path d="M120 170H240" stroke="currentColor" />
          <path d="M120 190H270" stroke="currentColor" />
          <path d="M310 80C310 80 340 50 360 60" stroke="currentColor" />
          <circle cx="360" cy="60" fill="white" r="4" />
          <path d="M90 240C90 240 60 270 40 260" stroke="currentColor" />
          <circle cx="40" cy="260" fill="white" r="4" />
          <circle
            className="fill-white dark:fill-[#1a281f]"
            fill="white"
            cx="320"
            cy="200"
            r="24"
          />
          <path
            d="M312 200L328 200M328 200L322 194M328 200L322 206"
            stroke="#17cf54"
          />
          <circle
            className="fill-white dark:fill-[#1a281f]"
            fill="white"
            cx="80"
            cy="100"
            r="24"
          />
          <path d="M80 92V88M80 112V108M90 100H94M66 100H70" stroke="#17cf54" />
        </g>
      </svg>
    </div>
  );
}
