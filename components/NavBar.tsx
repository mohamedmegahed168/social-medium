"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
  }, [isOpen]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.header
        layout
        initial="top"
        animate={scrolled ? "scrolled" : "top"}
        variants={{
          top: {
            y: 0,
            width: "100%",
            maxWidth: "100%",
            borderRadius: "0px",
            // Solid dark green (Darker than #1c2e22)
            backgroundColor: "#152219",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            borderLeft: "0px solid rgba(255,255,255,0)",
            borderRight: "0px solid rgba(255,255,255,0)",
            borderTop: "0px solid rgba(255,255,255,0)",
            padding: "1rem 1.5rem",
            boxShadow: "none",
          },
          scrolled: {
            y: 12,
            width: "92%",
            maxWidth: "1100px",
            borderRadius: "50px",
            // Same deep green but with opacity for glass effect
            backgroundColor: "rgba(21, 34, 25, 0.85)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            borderLeft: "1px solid rgba(255,255,255,0.1)",
            borderRight: "1px solid rgba(255,255,255,0.1)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: "0.75rem 1.5rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          },
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        // Added relative and z-50 to ensure header sits ABOVE the backdrop
        className="pointer-events-auto backdrop-blur-md relative z-50"
      >
        <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
          <Link href="/" className="shrink-0">
            <div className="flex items-center gap-3 text-white cursor-pointer">
              <motion.div
                whileHover={{ rotate: -12, scale: 1.1 }}
                className="flex items-center justify-center text-white"
              >
                <BookOpen size={28} />
              </motion.div>

              <h2 className="text-xl md:text-2xl font-bold tracking-tight whitespace-nowrap">
                Social Medium
              </h2>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { name: "Getting started", href: "#gettingStarted" },
              { name: "Methodology", href: "#methodology" },
              { name: "Explore", href: "#explore" },
              { name: "Our story", href: "#ourStory" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-[#17cf54] transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/SignIn"
              className="hidden md:block text-sm font-bold text-white hover:text-[#17cf54] transition-colors mr-2 whitespace-nowrap"
            >
              Sign In
            </Link>

            <Link
              href="/SignUp"
              className="hidden md:flex items-center justify-center rounded-full h-9 px-5 bg-[#17cf54] hover:bg-green-600 text-white text-sm font-bold tracking-wide transition-all hover:scale-105 shadow-lg shadow-green-900/20 whitespace-nowrap"
            >
              Sign up
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center size-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden pointer-events-auto"
            />

            {/* MENU CONTAINER */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              // Updated background to match deep green theme
              className="absolute top-24 left-4 right-4 z-40 bg-[#152219] border border-white/10 rounded-2xl p-4 shadow-2xl md:hidden pointer-events-auto"
            >
              <div className="flex flex-col gap-2">
                {[
                  { name: "Getting started", href: "#gettingStarted" },
                  { name: "Methodology", href: "#methodology" },
                  { name: "Explore", href: "#explore" },
                  { name: "Our story", href: "#ourStory" },
                  { name: "Write", href: "/Write" },
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="p-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="h-px bg-white/10 my-2" />
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/SignIn"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center h-10 rounded-lg border border-white/10 text-white font-bold hover:bg-white/5 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/SignUp"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center h-10 rounded-lg bg-[#17cf54] text-white font-bold hover:bg-green-600 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NavBar;
