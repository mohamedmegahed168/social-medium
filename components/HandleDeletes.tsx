import { Trash2, AlertTriangle } from "lucide-react";
import { useDeleteArticle } from "@/app/Hooks/UseDeleteArticle";
import { createPortal } from "react-dom";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DocumentData } from "firebase/firestore";
interface DeleteInfo {
  articleId: string;
  authorId: string;
  userId: string;
  userData: DocumentData | null | undefined;
}
interface ClientPortalProps {
  children: React.ReactNode;
}
function ClientPortal({ children }: ClientPortalProps) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

export default function HandleDeletes({
  articleId,
  authorId,
  userId,
  userData,
}: DeleteInfo) {
  const { deleteArticle, loading } = useDeleteArticle();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  if (!userData || !userId) return null;
  const isOwner = userId === authorId;
  const isAdmin = userData.role === "admin";
  async function deleteHandler() {
    if (!isOwner && !isAdmin) {
      return;
    }
    try {
      const success = await deleteArticle(articleId);
      if (success) {
        setIsProcessing(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        timeoutRef.current = setTimeout(() => {
          setIsProcessing(false);
          setShowModal(false);
        }, 600);
      }
    } catch (error) {
      console.error("Delete article error:", error);
    }
  }

  const closeModal = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowModal(false);
  };

  return (
    <>
      {(isAdmin || isOwner) && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-full cursor-pointer p-2 text-inherit hover:bg-[#17cf54]/20 hover:text-[#17cf54] transition-colors duration-200"
          onClick={() => setShowModal(true)}
        >
          <Trash2 size={20} />
        </motion.button>
      )}
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
                initial={{ opacity: 0, scale: 0.96, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                transition={{ duration: 0.22 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 text-center bg-gradient-to-br from-red-50 to-red-100">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.08, type: "spring", stiffness: 220 }}
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-600 mb-4"
                  >
                    <AlertTriangle className="h-7 w-7 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900">
                    Delete Article?
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    This action cannot be undone. Are you sure you want to
                    remove this article?
                  </p>
                </div>

                <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-center border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium text-sm transition-colors disabled:opacity-50 "
                    onClick={closeModal}
                    disabled={loading || isProcessing}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-red-600 cursor-pointer text-white rounded-lg hover:bg-red-700 font-medium text-sm flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={deleteHandler}
                    disabled={loading || isProcessing}
                  >
                    {loading || isProcessing ? (
                      <>
                        <span className="w-4 cursor-auto h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Yes, Delete"
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
