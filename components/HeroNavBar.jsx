"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function HeroNavbar() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  function closeMenu() {
    setOpen(false);
  }

  return (
    <nav className="fixed top-0 z-50 w-full  bg-white shadow-sm rounded-b-lg">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
        <motion.div
          whileHover={reduce ? {} : { scale: 1.03 }}
          className="text-2xl md:text-3xl font-bold tracking-tight"
        >
          <Link href="/">Aswan-Med</Link>
        </motion.div>

        <div className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <motion.div
            whileHover={reduce ? {} : { y: -2 }}
            className="hover:text-[var(--color-primary)]"
          >
            <Link href="#home">Home</Link>
          </motion.div>
          <motion.div
            whileHover={reduce ? {} : { y: -2 }}
            className="hover:text-[var(--color-primary)]"
          >
            <Link href="/dashboard"> Dashboard </Link>
          </motion.div>
          <motion.div
            whileHover={reduce ? {} : { y: -2 }}
            className="hover:text-[var(--color-primary)]"
          >
            <Link href="#services">Services</Link>
          </motion.div>
          <motion.div
            whileHover={reduce ? {} : { y: -2 }}
            className="hover:text-[var(--color-primary)]"
          >
            <Link href="#about">About</Link>
          </motion.div>
          <motion.div
            whileHover={reduce ? {} : { y: -2 }}
            className="hover:text-[var(--color-primary)]"
          >
            <Link href="#contact">Contact</Link>
          </motion.div>
          <motion.div
            whileHover={reduce ? {} : { y: -2 }}
            className="hover:text-[var(--color-primary)]"
          >
            <Link href="#faq"> FAQ </Link>
          </motion.div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <motion.div
            whileHover={reduce ? {} : { scale: 1.03 }}
            style={{
              background:
                "linear-gradient(90deg,var(--color-primary), var(--primary-dark))",
            }}
            className="px-4 py-2 rounded-lg text-white font-semibold shadow-md cursor-pointer"
          >
            <Link href="/signup">Sign Up</Link>
          </motion.div>
          <motion.div
            whileHover={reduce ? {} : { scale: 1.02 }}
            className="px-3 py-2 rounded-lg font-semibold cursor-pointer"
          >
            <Link href="/signin">Sign In</Link>
          </motion.div>
        </div>

        <button
          className="md:hidden p-2 rounded-md"
          aria-label="Open menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="var(--color-foreground)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden bg-white/95 border-t"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
              <Link href="#home" onClick={closeMenu}>
                Home
              </Link>
              <Link href="#services" onClick={closeMenu}>
                Services
              </Link>
              <Link href="#about" onClick={closeMenu}>
                About
              </Link>
              <Link href="/dashboard" onClick={closeMenu}>
                Dashboard
              </Link>
              <Link href="#faq" onClick={closeMenu}>
                Faq
              </Link>
              <Link href="#contact" onClick={closeMenu}>
                Contact
              </Link>
              <div className="pt-2 flex gap-3">
                <Link
                  href="/signup"
                  className="flex-1 px-4 py-2 rounded-lg text-white text-center"
                  style={{ background: "var(--color-primary)" }}
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
                <Link
                  href="/signin"
                  className="flex-1 px-4 py-2 rounded-lg border text-center"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
