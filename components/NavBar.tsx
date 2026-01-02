"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
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
          <Link href="/" className="flex items-center gap-3 text-white group">
            <div className="size-8 text-white transition-transform group-hover:scale-110">
              <svg
                className="w-full h-full"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
                <path
                  clipRule="evenodd"
                  d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Social Medium</h2>
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
              href="#"
            >
              Membership
            </Link>
            <Link
              className="text-sm font-medium text-gray-300 hover:text-[#17cf54] transition-colors font-sans"
              href="#"
            >
              Write
            </Link>
            <Link
              className="text-sm font-medium text-gray-300 hover:text-[#17cf54] transition-colors font-sans"
              href="/signin"
            >
              Sign In
            </Link>
          </nav>

          <div className="flex gap-3">
            <Link
              href="/signup"
              className="flex items-center justify-center rounded-full h-9 px-5 bg-[#17cf54] hover:bg-green-600 text-white text-sm font-bold font-sans tracking-wide transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
            <button
              onClick={controlOpen}
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
              className="flex items-center justify-center size-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
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
                  className="flex-1 rounded-full h-9 px-5 bg-[#17cf54] hover:bg-green-600 text-white text-sm font-bold font-sans tracking-wide transition-colors text-center"
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
