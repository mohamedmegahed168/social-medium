import {
  Timestamp,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { articlesReference } from "@/lib/firebase";
import { useEffect, useState } from "react";
export interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  topics: string[];
  uid: string;
  likes: string[];
  likesCount: number;
  createdAt: Timestamp | null;
}

export function useGetArticles(
  selectedTab?: string | null,
  userId?: string | null
) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q;

    if (!selectedTab || selectedTab === "All") {
      q = query(articlesReference, orderBy("createdAt", "desc"));
    } else if (selectedTab === "My Articles") {
      q = query(
        articlesReference,
        where("authorId", "==", userId),
        orderBy("createdAt", "desc")
      );
    } else {
      q = query(
        articlesReference,
        where("topics", "array-contains", selectedTab),
        orderBy("createdAt", "desc")
      );
    }
    const unSubscribe = onSnapshot(q, (snapshot) => {
      const articlesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Article, "id">),
      }));
      setArticles(articlesData);
      setLoading(false);
    });
    return () => unSubscribe();
  }, [selectedTab, userId]);
  return { articles, loading };
}
