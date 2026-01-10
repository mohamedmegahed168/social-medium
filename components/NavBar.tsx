"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { BookOpen, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Throttle scroll updates using requestAnimationFrame for better performance on mobile
    let ticking = false;
    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Lock body scroll when mobile menu is open
    if (typeof document !== "undefined") {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen]);

  function controlOpen() {
    setIsOpen((prev) => !prev);
  }
  return (
    <header
      className={`fixed h-16 top-0 right-0 left-0 z-50 w-full bg-[#1c2e22]/95 backdrop-blur-sm border-b border-gray-800 transition-all duration-200 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="flex items-center justify-between px-3 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/" className=" text-white group">
            <div className="flex items-center justify-center gap-2 text-white transition-transform group-hover:scale-110">
              <BookOpen size={30} />
              <h2 className="text-2xl font-bold tracking-tight">
                Social Medium
              </h2>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-6 md:gap-8">
          <nav className="hidden md:flex items-center gap-6">
            <Link
              className="text-sm font-medium text-gray-300 hover:text-[#17cf54] transition-colors font-sans"
              href="#"
            >
              Our Story
            </Link>
            <Link
              className="text-sm font-medium text-gray-300 hover:text-[#17cf54] transition-colors font-sans"
              href="#gettingStarted"
            >
              Getting started
            </Link>
            <Link
              className="text-sm font-medium text-gray-300 hover:text-[#17cf54] transition-colors font-sans"
              href="#discover"
            >
              Discover
            </Link>
            <Link
              href="/Dashboard"
              className="text-sm font-medium text-gray-300 hover:text-[#17cf54] transition-colors font-sans"
            >
              {" "}
              Dashboard
            </Link>
            <Link
              className="text-sm font-medium text-gray-300 hover:text-[#17cf54] transition-colors font-sans"
              href="/SignIn"
            >
              Sign In
            </Link>
          </nav>

          <div className="flex gap-3">
            <Link
              href="/SignUp"
              className="flex items-center justify-center rounded-full h-9 px-5 bg-[#17cf54] hover:bg-green-600 text-white text-sm font-bold font-sans tracking-wide transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sign up
            </Link>
            <button
              onClick={controlOpen}
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
              className="flex sm:hidden items-center justify-center size-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {isOpen ? (
                <X className="block md:hidden text-white-800 cursor-pointer" />
              ) : (
                <Menu className="block md:hidden text-white-800 cursor-pointer" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            className={`md:hidden fixed inset-x-0 top-16 z-40 bg-[#1c2e22]/95 backdrop-blur-sm border-b border-gray-800 ${
              isOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
            aria-hidden={!isOpen}
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              <Link
                href="#"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-gray-300 hover:text-[#17cf54]"
              >
                Our Story
              </Link>
              <Link
                href="#"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-gray-300 hover:text-[#17cf54]"
              >
                Membership
              </Link>
              <Link
                href="#"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-gray-300 hover:text-[#17cf54]"
              >
                Write
              </Link>
              <Link
                href="/signin"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-gray-300 hover:text-[#17cf54]"
              >
                Sign In
              </Link>

              <div className="pt-3 border-t border-white/5 flex gap-3">
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-full h-9 px-5 bg-[#17cf54] hover:bg-green-600 text-white text-sm font-bold  tracking-wide transition-colors flex items-center justify-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.nav>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
