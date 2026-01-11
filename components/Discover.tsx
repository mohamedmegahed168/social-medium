"use client";

import { Feather, Globe, Sparkles } from "lucide-react";
import { motion, Variants } from "motion/react";
import Svg from "./DiscoverSvg";
export default function Discover() {
  const features = [
    {
      icon: <Feather className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Distraction-free Writing",
      description:
        "A minimal editor designed to let you focus on what matters most: your words. No clutter, just flow.",
    },
    {
      icon: <Globe className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Amplify Your Voice",
      description:
        "Publish your perspectives to a global network of curious minds waiting to engage with deep, meaningful content.",
    },
    {
      icon: <Sparkles className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Curated Perspectives",
      description:
        "Explore ideas that challenge and inspire you, hand-picked by algorithms that value depth over clicks.",
    },
  ];
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <section
      id="methodology"
      className="rounded-2xl shadow-xl relative w-full min-h-screen flex flex-col items-center justify-center  scroll-smooth bg-[#fcfbf9] text-[#292929] selection:bg-[#1a8917]/20 selection:text-[#136b12] py-16 md:py-24"
    >
      {/* Background Blurs */}

      <div className="absolute top-0 right-0 -mr-24 -mt-24 bg-[#1a8917]/5 w-[420px] h-[420px] md:w-[600px] md:h-[600px] rounded-full blur-[100px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-[360px] h-[360px] md:w-[500px] md:h-[500px] bg-orange-100/40 rounded-full blur-[100px] opacity-70 pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-20 relative z-10 text-center md:text-left max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-8 order-2 "
          >
            {/* Header */}
            <div className="flex flex-col items-center md:items-start justify-center gap-6">
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8f5e9]/50 border border-[#1a8917]/10 w-fit"
              >
                <span className="w-2 h-2 rounded-full bg-[#1a8917] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#136b12]">
                  Our Philosophy
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#292929] leading-[1.05] tracking-tight"
              >
                A sanctuary for your thoughts.
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg text-[#6b6b6b] leading-relaxed max-w-xl mx-auto md:mx-0"
              >
                We&apos;ve stripped away the noise to help you focus on what
                matters: the words you write and the connections you make.
              </motion.p>
            </div>

            {/* Feature Cards */}
            <div className="flex flex-col gap-4 md:gap-6 ">
              {features.map((feature) => (
                <motion.div
                  variants={itemVariants}
                  key={feature.title}
                  className="group relative p-4 md:p-5 rounded-2xl bg-white border border-[#e5e5e5] shadow-sm hover:shadow-xl hover:shadow-[#1a8917]/5 hover:border-[#1a8917]/20 transition-all duration-300 cursor-default"
                >
                  <div className="flex gap-6 items-start">
                    <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#fcfbf9] border border-[#e5e5e5] flex items-center justify-center text-[#1a8917] group-hover:scale-110 group-hover:bg-[#1a8917] group-hover:text-white transition-all duration-300">
                      {feature.icon}
                    </div>
                    <div className="flex flex-col gap-2 ">
                      <h3 className="text-xl font-bold  text-[#292929] group-hover:text-[#1a8917] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-[#6b6b6b] leading-relaxed text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - SVG Illustration */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-1 lg:order-2 flex items-center justify-center lg:justify-end relative"
          >
            <div className="relative w-full max-w-[460px] sm:max-w-[520px] h-auto max-h-[520px]">
              <Svg />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom Float Animation Style */}
    </section>
  );
}
