"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { LogOut, AlertOctagon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UseLogOut } from "@/app/Hooks/UseLogOut";
const SafePortal = ({ children }: { children: React.ReactNode }) => {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
};

const Loader = () => (
  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
);

export default function HandleLogOut() {
  const [showModal, setShowModal] = useState(false);
  const { logout, loading } = UseLogOut();

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-3 py-2 text-md rounded-xl font-medium text-gray-500 hover:text-red-600 hover:bg-red-100 cursor-pointer rounded-lg transition-colors group w-full md:w-auto"
        title="Sign Out"
      >
        <LogOut size={18} className="group-hover:stroke-red-600" />
        <span className="hidden md:block">Sign Out</span>
      </button>

      <AnimatePresence>
        {showModal && (
          <SafePortal>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden z-10"
              >
                <div className="bg-red-50 p-6 flex justify-center">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <AlertOctagon size={32} className="text-red-500" />
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 py-4 text-center">
                  <h3 className="text-xl font-bold text-gray-900">
                    Signing out?
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    You will be returned to the landing page.
                  </p>
                </div>

                <div className="p-6 flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    disabled={loading}
                    className="flex-1 cursor-pointer px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={logout}
                    disabled={loading}
                    className="flex-1 cursor-pointer px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 shadow-md shadow-red-200 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? <Loader /> : "Sign Out"}
                  </button>
                </div>
              </motion.div>
            </div>
          </SafePortal>
        )}
      </AnimatePresence>
    </>
  );
}
