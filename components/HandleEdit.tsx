"use client";
import { Pencil, SquarePen } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ArticleData {
  articleId: string;
  userId: string;
  authorId: string;
}

interface ClientPortalProps {
  children: React.ReactNode;
}

function ClientPortal({ children }: ClientPortalProps) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

export default function HandleEdit({
  articleId,
  userId,
  authorId,
}: ArticleData) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const isAuthorized = authorId === userId;

  function confirmEdit() {
    if (!isAuthorized || !articleId) return;
    setIsLoading(true);
    timeoutRef.current = setTimeout(() => {
      router.push(`/Edit/${articleId}`);
      setShowModal(false);
      setIsLoading(false);
    }, 300);
  }

  const closeModal = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowModal(false);
  };

  const handleOpenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAuthorized) {
      setShowModal(true);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="rounded-full p-2 hover:bg-[#f4f1ea] transition-colors duration-200"
        disabled={!isAuthorized}
        onClick={handleOpenClick}
      >
        <Pencil size={20} />
      </motion.button>

      <AnimatePresence mode="wait">
        {showModal && (
          <ClientPortal>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header with icon */}
                <div className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 mb-4"
                  >
                    <SquarePen className="h-7 w-7 text-white" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900">
                      Edit Article?
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      You&apos;re about to make changes to this article. You can
                      update the content, title, and other details.
                    </p>
                  </motion.div>
                </div>

                {/* Action buttons */}
                <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-center border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={closeModal}
                    disabled={isLoading}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={confirmEdit}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Loading...
                      </>
                    ) : (
                      <>
                        <Pencil size={16} />
                        Edit Now
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </ClientPortal>
        )}
      </AnimatePresence>
    </>
  );
}
