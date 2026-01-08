import { articlesReference } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export function useDeleteArticle() {
  async function deleteArticle(articleId: string) {
    const docReference = doc(articlesReference, articleId);
    try {
      await deleteDoc(docReference);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  return deleteArticle;
}
