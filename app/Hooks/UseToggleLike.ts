"use client";
import { articlesReference } from "@/lib/firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
interface likeData {
  articleId: string;
  isLiked: boolean;
  userId: string;
}

export function useToggleLike() {
  async function toggleLike({ articleId, isLiked, userId }: likeData) {
    try {
      const docReference = doc(articlesReference, articleId);
      if (isLiked) {
        await updateDoc(docReference, {
          likes: arrayRemove(userId),
          likesCount: increment(-1),
        });
      } else {
        await updateDoc(docReference, {
          likes: arrayUnion(userId),
          likesCount: increment(1),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return toggleLike;
}
