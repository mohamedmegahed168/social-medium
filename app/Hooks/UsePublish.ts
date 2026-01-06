import { useState } from "react";
import { articlesReferecne } from "@/lib/firebase";
import { addDoc, serverTimestamp } from "firebase/firestore";

export function usePublish() {
  const [error, setError] = useState<string | null>(null);
  interface postData {
    title: string;
    content: string;
    uid: string;
    topics: string[];
    userName: string;
  }
  async function publishArticle({
    title,
    content,
    uid,
    topics,
    userName,
  }: postData) {
    try {
      await addDoc(articlesReferecne, {
        title: title,
        content: content,
        authorId: uid,
        authorName: userName,
        topics: topics,
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
