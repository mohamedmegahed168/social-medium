"use client";
import { ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="flex rounded-full p-2 hover:bg-[#f4f1ea] transition-colors"
      onClick={handleClick}
    >
      <ThumbsUp
        size={20}
        color={isLiked ? "#254f36" : "currentColor"}
        fill={isLiked ? "#2d5e4090" : "none"}
        className="transition-colors duration-300"
      />
      {likesCount !== 0 && likesCount && <span> {likesCount}</span>}
    </motion.button>
  );
}
