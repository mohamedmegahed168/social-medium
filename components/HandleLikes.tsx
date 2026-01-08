"use client";
import { ThumbsUp } from "lucide-react";
import { useToggleLike } from "@/app/Hooks/UseToggleLike";
interface LikeProps {
  articleId: string;
  likes: string[];
  userId: string;
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
    <button
      className="flex hover:text-blue-500 transition-colors"
      onClick={handleClick}
    >
      {typeof likesCount === "number" && <span> {likesCount}</span>}
      <ThumbsUp
        size={24}
        fill={`${isLiked ? "#3b82f6" : "transparent"}`}
        color={`${isLiked ? "#3b82f6" : "#64748b"}`}
        strokeWidth={`${isLiked ? 0 : 2}`}
      />
    </button>
  );
}
