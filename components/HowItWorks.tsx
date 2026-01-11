"use client";

import Link from "next/link";
import { motion, Variants } from "motion/react";
import {
  Globe,
  ArrowRight,
  Code,
  Brain,
  Palette,
  FlaskConical,
} from "lucide-react";

export default function LandingPage() {
  const categories = [
    { icon: <Code className="size-6 text-[#17cf54]" />, name: "Technology" },
    { icon: <Brain className="size-6 text-[#17cf54]" />, name: "Mindfulness" },
    { icon: <Palette className="size-6 text-[#17cf54]" />, name: "Design" },
    {
      icon: <FlaskConical className="size-6 text-[#17cf54]" />,
      name: "Science",
    },
  ];
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: "circOut" },
    },
  };

  const gridItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const cardInternalTextVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
    },
  };
  return (
    <div
      id="explore"
      className=" rounded-2xl relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] text-[#111813]"
    >
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#f6f8f6] py-20 px-4 md:px-10">
          {/* Background Blurs */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[#17cf54] blur-[100px]"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] rounded-full bg-[#17cf54] blur-[120px]"
            />
          </div>

          <div className="mx-auto flex flex-col max-w-[960px] gap-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-6 text-center items-center"
            >
              {/* Badge */}
              <motion.div
                variants={textVariants}
                className="inline-flex items-center rounded-full border border-[#dce5df] bg-white px-3 py-1 text-xs font-medium text-[#63886f] shadow-sm"
              >
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#17cf54] mr-2" />
                New Features Available
              </motion.div>

              <motion.h1
                variants={textVariants}
                className="text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl text-[#111813] max-w-[800px]"
              >
                Where good ideas find you.
              </motion.h1>

              <motion.p
                variants={textVariants}
                className="text-lg font-normal leading-relaxed text-[#63886f] max-w-[640px]"
              >
                Read and share new perspectives on just about any topic.
                Everyone&apos;s welcome.
              </motion.p>
            </motion.div>

            {/* Topics Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-8 w-full rounded-3xl bg-gradient-to-br from-[#052e16] to-[#14532d] p-8 md:p-12 overflow-hidden relative shadow-2xl border border-[#1f3625]"
            >
              {/* Dot pattern */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "radial-gradient(#ffffff 1.5px, transparent 1.5px)",
                  backgroundSize: "24px 24px",
                }}
              />
              {/* Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#17cf54] opacity-20 blur-[80px] rounded-full pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
                {/* Left Content */}
                <div className="flex flex-col gap-6 items-center sm:items-start justify-center">
                  <motion.div
                    variants={cardInternalTextVariants}
                    className="inline-flex text-center items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 w-fit border border-white/10 backdrop-blur-md"
                  >
                    <Globe className="size-4 text-[#17cf54]" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Explore Content
                    </span>
                  </motion.div>
                  <motion.div
                    variants={cardInternalTextVariants}
                    className="text-center sm:text-left"
                  >
                    <h3 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
                      Fuel your mind with fresh ideas.
                    </h3>

                    <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                      From coding to culture, discover stories that matter to
                      you. Curate your personal reading list today.
                    </p>
                  </motion.div>
                  <motion.div variants={cardInternalTextVariants}>
                    <Link
                      href="/SignUp"
                      className="w-fit group flex items-center gap-2 text-white font-bold bg-[#17cf54] hover:bg-[#12a543] px-6 py-3 rounded-lg transition-all shadow-lg shadow-green-900/20"
                    >
                      Explore Trending Topics
                      <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>

                {/* Right - Categories Grid */}
                <div className="relative flex justify-center md:justify-end">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 gap-3 w-full max-w-sm"
                  >
                    {categories.map((category) => (
                      <motion.div
                        variants={gridItemVariants}
                        key={category.name}
                        className="bg-white/10 backdrop-blur-sm border border-white/5 p-4 rounded-xl hover:bg-white/20 transition-colors cursor-pointer group"
                      >
                        <div className="mb-2 group-hover:scale-110 transition-transform">
                          {category.icon}
                        </div>
                        <p className="text-white font-bold text-sm">
                          {category.name}
                        </p>
                      </motion.div>
                    ))}
                    <Link href="/SignUp" className="col-span-2">
                      <motion.div
                        variants={gridItemVariants}
                        className="bg-[#17cf54] p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-[#12a543] transition-colors shadow-lg shadow-green-500/20 group"
                      >
                        <div>
                          <p className="text-[#052e16] font-extrabold text-sm">
                            Get Started
                          </p>

                          <p className="text-[#052e16]/70 text-xs">
                            Discover more topics
                          </p>
                        </div>
                        <ArrowRight className="size-5 text-[#052e16] group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
