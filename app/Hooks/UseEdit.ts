import { articlesReference } from "@/lib/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useState } from "react";

export function useEdit() {
  const [loading, setLoading] = useState<boolean>(false);
  async function updateArticle(
    id: string,
    title: string,
    content: string,
    selectedTopics: string[]
  ) {
    const docReference = doc(articlesReference, id);
    try {
      setLoading(true);
      await updateDoc(docReference, {
        title: title,
        content: content,
        topics: selectedTopics,
      });
      return true;
    } catch (error) {
      console.error(error);
      setLoading(false);
      return false;
    } finally {
      setLoading(false);
    }
  }
  return { updateArticle, loading };
}
