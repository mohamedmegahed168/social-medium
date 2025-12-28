"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const router = useRouter();
  const reduce = useReducedMotion();
  return (
    <motion.section
      id="home"
      className="relative mt-20"
      initial="hidden"
      animate="show"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 py-16">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--color-foreground)] leading-tight tracking-tight">
            Welcome to
            <span className="text-[var(--color-primary)] block">Aswan-Med</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-xl">
            Find doctors and pharmacies in Aswan easily with a simple click —
            fast, accurate, and free.
          </p>

          <div className="mt-8 flex flex-col items-start  gap-4">
            <motion.button
              onClick={() => router.push("/signup")}
              whileHover={reduce ? {} : { scale: 1.03 }}
              whileTap={reduce ? {} : { scale: 0.98 }}
              style={{
                background:
                  "linear-gradient(90deg,var(--color-primary), var(--primary-dark))",
              }}
              className=" inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white shadow-lg cursor-pointer"
            >
              Get Started
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M4 12h16M14 6l6 6-6 6"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </motion.button>
            <h2 className="px-3 text-sm text-gray-600">
              {" "}
              No credit card is required{" "}
            </h2>
          </div>

          <div className="mt-8 flex gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                />
              </svg>
              <span>+250 doctors</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="6"
                  width="18"
                  height="12"
                  rx="2"
                  stroke="var(--color-foreground)"
                  strokeWidth="1.5"
                />
              </svg>
              <span>100% Free</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="md:order-last flex justify-center"
        >
          <motion.div
            whileHover={reduce ? {} : { scale: 1.02 }}
            whileTap={reduce ? {} : { scale: 0.99 }}
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-md rounded-xl overflow-hidden shadow-xl h-56 md:h-72"
          >
            <Image
              src="/hero.png"
              alt="Illustration showing doctor search in Aswan"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      <svg
        className="absolute right-0 top-0 translate-x-32 -translate-y-12 opacity-20"
        width="340"
        height="340"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="var(--color-primary)"
          d="M43.8,-64.3C58.9,-55.7,73.9,-46,79.4,-33.1C84.8,-20.2,80.7,-4.1,74.3,9.1C67.9,22.3,59.2,33.6,48,42.6C36.8,51.6,23.9,58.2,9.2,66.4C-5.6,74.7,-22.4,84.7,-36.6,82.8C-50.8,80.9,-62.3,67.1,-66.7,51.6C-71.1,36.1,-68.2,18.1,-70.4,0.1C-72.6,-17.8,-80,-35.6,-76.6,-49.4C-73.2,-63.2,-58.9,-73,-44.6,-76.5C-30.3,-80,-15.1,-77.2,-0.3,-76.7C14.5,-76.3,29,-78.9,43.8,-64.3Z"
          transform="translate(100 100)"
        />
      </svg>
    </motion.section>
  );
}
