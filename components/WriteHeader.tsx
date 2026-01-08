import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
interface publishData {
  userName: string;
  publishedSuccess: boolean;
  isPublishing: boolean;
  canPublish: boolean;
  onPublish: () => void;
}
export default function WriteHeader({
  userName,
  publishedSuccess,
  isPublishing,
  canPublish,
  onPublish,
}: publishData) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-8 py-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 h-[69px]">
      <div className="flex items-center gap-6 text-text-main">
        <Link className="flex items-center gap-2 group" href="/">
          <h2 className="text-xl font-bold tracking-tight group-hover:opacity-80 transition-opacity font-sans">
            Writer
          </h2>
        </Link>
        <div className="hidden md:flex items-center text-sm text-text-secondary">
          <span className="w-px h-5 bg-border-color mx-4"></span>
          <span>Draft in user&apos;s workspace</span>
          <span className="mx-2">•</span>
          <span>Saved just now</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/Dashboard"
          className="flex items-center justify-center rounded-full h-9 px-5 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-primary text-sm font-medium transition-colors border border-gray-400 shadow-sm outline-none"
        >
          Dashboard
        </Link>
        <AnimatePresence>
          {publishedSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="ml-2 px-3 py-1 rounded-full bg-greenish/90 text-white text-sm flex items-center gap-2"
            >
              <Check className="size-4" />
              Saved
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={onPublish}
          whileTap={{ scale: 0.98 }}
          disabled={isPublishing || !canPublish}
          aria-disabled={isPublishing || !canPublish}
          className={`flex items-center justify-center rounded-full h-9 px-5 text-sm font-medium transition-colors shadow-sm ${
            isPublishing || !canPublish
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-[#2d5e40] hover:bg-green-600 text-white"
          }`}
        >
          {isPublishing ? (
            <>
              <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Publishing...
            </>
          ) : publishedSuccess ? (
            <span className="flex items-center gap-2">
              <Check className="text-white" />
              Published
            </span>
          ) : (
            "Publish"
          )}
        </motion.button>
        <div className="ml-2 bg-greenish flex items-center justify-center size-9 rounded-full bg-gray-200 overflow-hidden border border-gray-100 dark:border-gray-700">
          {userName && (
            <p className="text-white">{userName.charAt(0).toUpperCase()}</p>
          )}
        </div>
      </div>
    </header>
  );
}
