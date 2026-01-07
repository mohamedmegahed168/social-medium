"use client";
import { ThumbsUp } from "lucide-react";
import { useToggleLike } from "@/app/Hooks/UseToggleLike";
interface LikeProps {
  articleId: string;
  likes: string[];
  userId: string;
}
export default function HandleLikes({ articleId, likes, userId }: LikeProps) {
  const isLiked = userId ? likes.includes(userId) : false;
  const toggleLike = useToggleLike();
  async function handleClick() {
    if (!userId) return;
    await toggleLike({ articleId, isLiked, userId });
  }
  return (
    <button
      className={`flex hover:text-blue-500 transition-colors ${
        isLiked ? "bg-blue" : "bg-gray-300"
      }`}
      onClick={handleClick}
    >
      <span> {likes?.length} likes </span>
      <ThumbsUp className="size-5" />
    </button>
  );
}
