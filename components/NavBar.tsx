"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  function controlOpen() {
    setIsOpen((prev) => !prev);
  }
  return (
    <motion.nav className="fixed top-0 w-full h-16 ">
      <div className="text-[var(--text-primary)] w-full flex justify-between  px-6 border-b border-gray-200 h-full items-center">
        <div>
          <Link href="/" className="font-bold text-xl">
            Social Medium
          </Link>
        </div>
        <div className="hidden md:block md:flex md:gap-6">
          <Link href="/about"> About us </Link>
          <Link href="/contact"> Contact </Link>
          <Link href="/signIn"> Sign in </Link>
          <Link href="signUp"> Get started </Link>
        </div>
        {isOpen ? (
          <X className="block md:hidden cursor-pointer" onClick={controlOpen} />
        ) : (
          <Menu
            className="block md:hidden cursor-pointer"
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
