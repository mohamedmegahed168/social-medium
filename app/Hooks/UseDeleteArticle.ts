import { articlesReference } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { setLazyProp } from "next/dist/server/api-utils";
import { useState } from "react";

export function useDeleteArticle() {
  const [loading, setLoading] = useState<boolean>(false);
  async function deleteArticle(articleId: string) {
    const docReference = doc(articlesReference, articleId);
    try {
      setLoading(true);
      await deleteDoc(docReference);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  }
  return { deleteArticle, loading };
}
