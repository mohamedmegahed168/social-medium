"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  function controlOpen() {
    setIsOpen((prev) => !prev);
  }
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e8e5de]"
          : "bg-white/80 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-16 flex justify-between items-center px-4">
        <div>
          <Link href="#home" className="font-bold text-2xl text-gray-900">
            Social Medium
          </Link>
        </div>
        <div className="hidden md:flex md:gap-6 items-center">
          <Link
            href="/#discover"
            className="text-gray-800 hover:text-[#17cf54] transition-colors"
          >
            Discover
          </Link>
          <Link
            href="/contact"
            className="text-gray-800 hover:text-[#17cf54] transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/SignIn"
            className="text-gray-800 hover:text-[#17cf54] transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/SignUp"
            className="text-gray-800 hover:text-[#17cf54] transition-colors"
          >
            Get started
          </Link>
        </div>
        {isOpen ? (
          <X
            className="block md:hidden text-gray-800 cursor-pointer"
            onClick={controlOpen}
          />
        ) : (
          <Menu
            className="block md:hidden text-gray-800 cursor-pointer"
            onClick={controlOpen}
          />
        )}
      </div>
      {isOpen && (
        <motion.div className="flex flex-col bg-white text-xl shadow-sm rounded-md px-6 py-3 gap-4">
          <Link href="/"> Home </Link>
          <Link href="/about"> About </Link>
          <Link href="/contact"> Contact </Link>
          <Link href="/signIn"> Sign in </Link>
          <Link href="signUp"> Get Started </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
export default NavBar;
