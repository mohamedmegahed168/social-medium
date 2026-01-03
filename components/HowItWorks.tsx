"use client";

import Link from "next/link";
import {
  BookOpen,
  UserCheck,
  FileEdit,
  Rocket,
  Globe,
  ArrowRight,
  Code,
  Brain,
  Palette,
  FlaskConical,
  PenTool,
} from "lucide-react";

// Social Icons
function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      width="14"
      height="14"
    >
      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      width="14"
      height="14"
    >
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      width="14"
      height="14"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function LandingPage() {
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

  const categories = [
    { icon: <Code className="size-6 text-[#17cf54]" />, name: "Technology" },
    { icon: <Brain className="size-6 text-[#17cf54]" />, name: "Mindfulness" },
    { icon: <Palette className="size-6 text-[#17cf54]" />, name: "Design" },
    {
      icon: <FlaskConical className="size-6 text-[#17cf54]" />,
      name: "Science",
    },
  ];

  return (
    <div
      id="gettingStarted"
      className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] text-[#111813]"
    >
      {/* Header */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#f6f8f6] py-20 px-4 md:px-10">
          {/* Background Blurs */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[#17cf54] blur-[100px]" />
            <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] rounded-full bg-[#17cf54] blur-[120px]" />
          </div>

          <div className="mx-auto flex flex-col max-w-[960px] gap-10">
            <div className="flex flex-col gap-6 text-center items-center">
              {/* Badge */}
              <div className="inline-flex items-center rounded-full border border-[#dce5df] bg-white px-3 py-1 text-xs font-medium text-[#63886f] shadow-sm">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#17cf54] mr-2" />
                New Features Available
              </div>

              <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl text-[#111813] max-w-[800px]">
                Where good ideas find you.
              </h1>

              <p className="text-lg font-normal leading-relaxed text-[#63886f] max-w-[640px]">
                Read and share new perspectives on just about any topic.
                Everyone&apos;s welcome.
              </p>

              <div className="pt-4">
                <button className="flex h-12 items-center justify-center rounded-lg bg-[#17cf54] px-8 text-base font-bold text-white shadow-lg shadow-[#17cf54]/20 hover:bg-green-600 hover:shadow-[#17cf54]/40 transition-all">
                  Start Reading
                </button>
              </div>
            </div>

            {/* Topics Card */}
            <div className="mt-8 w-full rounded-3xl bg-gradient-to-br from-[#052e16] to-[#14532d] p-8 md:p-12 overflow-hidden relative shadow-2xl border border-[#1f3625]">
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

              <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                {/* Left Content */}
                <div className="flex flex-col gap-6 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 w-fit border border-white/10 backdrop-blur-md">
                    <Globe className="size-4 text-[#17cf54]" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Explore Content
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
                    Fuel your mind with fresh ideas.
                  </h3>

                  <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                    From coding to culture, discover stories that matter to you.
                    Curate your personal reading list today.
                  </p>

                  <button className="w-fit group flex items-center gap-2 text-white font-bold bg-[#17cf54] hover:bg-[#12a543] px-6 py-3 rounded-lg transition-all shadow-lg shadow-green-900/20">
                    Explore Trending Topics
                    <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Right - Categories Grid */}
                <div className="relative flex justify-center md:justify-end">
                  <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                    {categories.map((category) => (
                      <div
                        key={category.name}
                        className="bg-white/10 backdrop-blur-sm border border-white/5 p-4 rounded-xl hover:bg-white/20 transition-colors cursor-pointer group"
                      >
                        <div className="mb-2 group-hover:scale-110 transition-transform">
                          {category.icon}
                        </div>
                        <p className="text-white font-bold text-sm">
                          {category.name}
                        </p>
                      </div>
                    ))}

                    {/* View All Card */}
                    <div className="col-span-2 bg-[#17cf54] p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-[#12a543] transition-colors shadow-lg shadow-green-500/20 group">
                      <div>
                        <p className="text-[#052e16] font-extrabold text-sm">
                          Get Started
                        </p>
                        <p className="text-[#052e16]/70 text-xs">100+ Topics</p>
                      </div>
                      <ArrowRight className="size-5 text-[#052e16] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white py-24 px-4 md:px-10" id="how-it-works">
          <div className="mx-auto max-w-[1100px]">
            {/* Section Header */}
            <div className="mb-16 flex flex-col items-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[#111813] md:text-4xl">
                Publishing made simple.
              </h2>
              <p className="max-w-2xl text-lg text-[#63886f]">
                Start your journey in 3 easy steps. We focus on simplicity so
                you can focus on the words.
              </p>
            </div>

            {/* Steps Grid */}
            <div className="grid gap-8 md:grid-cols-3 relative">
              {/* Connecting Line for Desktop */}
              <div className="hidden md:block absolute top-[48px] left-[16%] right-[16%] h-[2px] border-t-2 border-dashed border-[#dce5df]" />

              {steps.map((step) => (
                <div
                  key={step.number}
                  className="group relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-[#e8f5e9] shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg border border-[#dce5df]">
                    {step.icon}
                    <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#17cf54] text-sm font-bold text-white shadow-md ring-4 ring-white">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-[#111813]">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-[#63886f]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-16 flex justify-center">
              <Link
                href="/signup"
                className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#17cf54] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-green-600 hover:shadow-lg hover:shadow-[#17cf54]/20 transition-all"
              >
                <span className="truncate">Get Started Free</span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#f6f8f6] py-20 px-4 md:px-10">
          <div className="mx-auto max-w-[960px]">
            <div className="relative overflow-hidden rounded-[2rem] bg-white border border-[#dce5df] shadow-2xl">
              {/* Glow Effects */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#17cf54] opacity-10 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#17cf54] opacity-10 blur-[80px] rounded-full pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-10 md:p-16 gap-10">
                {/* Left Content */}
                <div className="flex flex-col gap-6 max-w-lg text-center md:text-left">
                  <h2 className="text-3xl md:text-5xl font-black text-[#111813] leading-[1.1] tracking-tight">
                    Ready to share <br />
                    <span className="text-[#17cf54]">your story?</span>
                  </h2>
                  <p className="text-lg text-[#63886f] font-medium">
                    Join a community of thousands of writers and readers. Your
                    audience is waiting for your unique voice.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
                    <Link
                      href="/signup"
                      className="inline-flex items-center justify-center h-14 px-8 rounded-xl bg-[#17cf54] text-white text-base font-bold hover:bg-[#12a543] transition-colors shadow-lg shadow-green-500/20"
                    >
                      Start Writing Now
                    </Link>
                    <button className="inline-flex items-center justify-center h-14 px-8 rounded-xl bg-transparent border border-[#dce5df] text-[#111813] text-base font-bold hover:bg-gray-50 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>

                {/* Right - Icon Circle */}
                <div className="hidden md:flex relative shrink-0">
                  <div className="relative w-48 h-48 bg-[#f6f8f6] rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                    <PenTool className="size-16 text-[#17cf54]" />
                    <div className="absolute -bottom-4 -right-4 bg-white text-[#111813] px-4 py-2 rounded-lg font-bold text-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-2 border border-[#f0f4f2]">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Live Editor
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#f0f4f2] px-4 py-12 md:px-10">
        <div className="mx-auto flex max-w-[960px] flex-col gap-8">
          {/* Top Row */}
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <Link href="/" className="flex items-center gap-2 text-[#111813]">
              <BookOpen className="size-6 text-[#17cf54]" />
              <span className="text-lg font-bold">BlogPlatform</span>
            </Link>

            <nav className="flex flex-wrap items-center justify-center gap-8">
              <Link
                className="text-[#63886f] text-sm font-medium hover:text-[#17cf54] transition-colors"
                href="#"
              >
                About
              </Link>
              <Link
                className="text-[#63886f] text-sm font-medium hover:text-[#17cf54] transition-colors"
                href="#"
              >
                Help
              </Link>
              <Link
                className="text-[#63886f] text-sm font-medium hover:text-[#17cf54] transition-colors"
                href="#"
              >
                Terms
              </Link>
              <Link
                className="text-[#63886f] text-sm font-medium hover:text-[#17cf54] transition-colors"
                href="#"
              >
                Privacy
              </Link>
            </nav>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-[#f0f4f2]" />

          {/* Bottom Row */}
          <div className="flex flex-col-reverse items-center justify-between gap-6 md:flex-row">
            <p className="text-sm text-[#63886f]">
              © 2025 BlogPlatform Inc. All rights reserved.
            </p>

            <div className="flex gap-4">
              <Link
                className="text-[#63886f] hover:text-[#17cf54] transition-colors"
                href="#"
              >
                <div className="h-6 w-6 flex items-center justify-center rounded-full bg-[#f6f8f6]">
                  <TwitterIcon />
                </div>
              </Link>
              <Link
                className="text-[#63886f] hover:text-[#17cf54] transition-colors"
                href="#"
              >
                <div className="h-6 w-6 flex items-center justify-center rounded-full bg-[#f6f8f6]">
                  <FacebookIcon />
                </div>
              </Link>
              <Link
                className="text-[#63886f] hover:text-[#17cf54] transition-colors"
                href="#"
              >
                <div className="h-6 w-6 flex items-center justify-center rounded-full bg-[#f6f8f6]">
                  <InstagramIcon />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
