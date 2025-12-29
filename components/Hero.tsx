"use client";
import { motion } from "motion/react";
function Hero() {
  return (
    <motion.section className="mt-16 relative  bg-light" id="home">
      <motion.div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className=" px-6 md:px-10 py-12 md:py-16 font-normal">
          <h1 className="text-4xl md:text-7xl font-bold leading-tight text-primary">
            &quot;Reading is
            <span className="block">
              dreaming with <span className="block"> open eyes&quot;</span>
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-secondary max-w-lg">
            Discover stories thinking and experties.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="mt-5 bg-primary text-white hover:bg-black inline-flex items-center gap-2 border border-black   px-4 py-2 rounded-2xl cursor-pointer transition-colors"
          >
            Start reading
          </motion.button>
        </div>
        <div className="px-6 md:px-0 flex justify-center">
          <div className="w-full max-w-md">
            <svg
              className="w-full h-auto text-primary"
              fill="none"
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 200 C 100 200, 180 260, 250 230 C 320 260, 400 200, 400 200 L 400 350 C 400 350, 320 410, 250 380 C 180 410, 100 350, 100 350 Z"
                stroke="currentColor"
                opacity="0.9"
                strokeLinejoin="round"
                strokeWidth="4"
              />
              <path d="M250 230 L 250 380" stroke="black" strokeWidth="3" />
              <path
                d="M130 250 C 160 270, 210 260, 230 250"
                opacity="0.3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <path
                d="M130 280 C 160 300, 210 290, 230 280"
                opacity="0.3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <path
                d="M130 310 C 160 330, 210 320, 230 310"
                opacity="0.3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <path
                d="M270 250 C 290 260, 340 270, 370 250"
                opacity="0.3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <path
                d="M270 280 C 290 290, 340 300, 370 280"
                opacity="0.3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <path
                d="M270 310 C 290 320, 340 330, 370 310"
                opacity="0.3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />

              <circle
                className="text-primary"
                cx="350"
                cy="120"
                r="15"
                stroke="currentColor"
                strokeWidth="3"
              />
              <circle
                className="text-primary"
                cx="390"
                cy="90"
                opacity="0.7"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <circle
                className="text-primary"
                cx="320"
                cy="100"
                opacity="0.5"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M150 150 L 170 130 M 130 130 L 150 110"
                opacity="0.4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
export default Hero;
