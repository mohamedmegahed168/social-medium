"use client";
import { motion } from "motion/react";
function Discover() {
  return (
    <motion.section className="  bg-light mt-20 min-h-screen" id="discover">
      <div className="px-20 py-20 max-w-7xl mx-auto">
        <div>
          <h2 className="md:text-6xl leading-tight">
            Unlock the power <span className="block"> of shared </span>{" "}
            prespectives
          </h2>
          <p>
            A digital sanctuary designed for the clarity of your thoughts.
            Whether you are drafting your next big idea or discovering a new
            voice, find your flow in a space built for connection.
          </p>
        </div>
        <div>
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
              <path
                d="M80 92V88M80 112V108M90 100H94M66 100H70"
                stroke="#17cf54"
              />
            </g>
          </svg>
        </div>
      </div>
    </motion.section>
  );
}
export default Discover;
