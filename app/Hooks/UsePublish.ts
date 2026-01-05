import { useState } from "react";
import { articlesReferecne } from "@/lib/firebase";
import { addDoc, serverTimestamp } from "firebase/firestore";

export function usePublish() {
  const [error, setError] = useState<string | null>(null);
  async function publishArticle(
    title: string,
    content: string,
    uid: string,
    userName: string
  ) {
    try {
      await addDoc(articlesReferecne, {
        title: title,
        content: content,
        authorId: uid,
        authorName: userName,
        createdAt: serverTimestamp(),
        likesCount: 0,
      });
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to publish");
      return false;
    }
  }
  return { error, publishArticle };
}
