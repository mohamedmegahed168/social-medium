"use client";
import { ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToggleLike } from "@/app/Hooks/UseToggleLike";

interface LikeProps {
  articleId: string;
  likes: string[];
  userId?: string;
  likesCount: number;
}

export default function HandleLikes({
  articleId,
  likes,
  userId,
  likesCount,
}: LikeProps) {
  const isLiked = userId ? likes.includes(userId) : false;
  const toggleLike = useToggleLike();

  async function handleClick() {
    if (!userId) return;
    await toggleLike({ articleId, isLiked, userId });
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className={`
        relative rounded-full flex items-center gap-2 p-2 cursor-pointer transition-colors duration-300
        ${
          isLiked
            ? "text-[#17cf54] bg-[#17cf54]/20"
            : "text-inherit hover:text-[#17cf54] hover:bg-[#17cf54]/10"
        }
      `}
    >
      <motion.div
        animate={isLiked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ThumbsUp
          size={20}
          className={isLiked ? "fill-white" : "fill-transparent"}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {likesCount > 0 && (
          <motion.span
            key={likesCount}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className="text-sm font-bold"
          >
            {likesCount}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
