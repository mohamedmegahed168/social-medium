"use client";
import { UserCheck, FileEdit, Rocket } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "motion/react";

export default function GettingStarted() {
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const stepContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      },
    },
  };

  const stepCardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 12 },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeInOut", delay: 0.2 },
    },
  };

  const numberBadgeVariants: Variants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 10, delay: 0.1 },
    },
  };
  const steps = [
    {
      icon: <UserCheck className="size-10 text-[#17cf54]" />,
      number: 1,
      title: "Sign Up",
      description:
        "Join our community in seconds. No paywalls, just pure reading and writing access for everyone.",
    },
    {
      icon: <FileEdit className="size-10 text-[#17cf54]" />,
      number: 2,
      title: "Create your first post",
      description:
        "Use our distraction-free editor to write, format, and publish your ideas effortlessly.",
    },
    {
      icon: <Rocket className="size-10 text-[#17cf54]" />,
      number: 3,
      title: "Explore the dashboard",
      description:
        "Curate your feed and engage with authors that spark your curiosity and broaden your mind.",
    },
  ];

  return (
    <section className="bg-white py-24 px-4 md:px-10" id="gettingStarted">
      <div className="mx-auto max-w-[1100px]">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="mb-16 flex flex-col items-center gap-4 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-[#111813] md:text-4xl">
            Publishing made simple.
          </h2>
          <p className="max-w-2xl text-lg text-[#63886f]">
            Start your journey in 3 easy steps. We focus on simplicity so you
            can focus on the words.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={stepContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-3 relative"
        >
          {/* Connecting Line for Desktop */}
          <motion.div
            variants={lineVariants}
            className="hidden md:block absolute top-[48px] left-[16%] right-[16%] h-[2px] border-t-2 border-dashed border-[#dce5df]"
          />

          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={stepCardVariants}
              className="group relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-[#e8f5e9] shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg border border-[#dce5df]">
                {step.icon}
                <motion.div
                  variants={numberBadgeVariants}
                  className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#17cf54] text-sm font-bold text-white shadow-md ring-4 ring-white"
                >
                  {step.number}
                </motion.div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#111813]">
                {step.title}
              </h3>
              <p className="text-base leading-relaxed text-[#63886f]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/SignUp"
            className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#17cf54] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-green-600 hover:shadow-lg hover:shadow-[#17cf54]/20 transition-all"
          >
            <span className="truncate">Get Started Free</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
