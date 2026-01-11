import {
  Timestamp,
  onSnapshot,
  orderBy,
  query,
  where,
  Query,
  DocumentData,
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
    let unsubscribe: (() => void) | undefined;

    const subscribeToArticles = () => {
      setArticles([]);
      setLoading(true);

      if (selectedTab === "My Articles" && !userId) {
        setArticles([]);
        setLoading(false);
        return;
      }

      let q: Query<DocumentData>;

      try {
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

        unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const articlesData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...(doc.data() as Omit<Article, "id">),
            }));
            setArticles(articlesData);
            setLoading(false);
          },
          (err) => {
            console.error("Snapshot Error:", err);
            setLoading(false);
          }
        );
      } catch (err) {
        console.error("Error constructing query:", err);
        setLoading(false);
      }
    };
    subscribeToArticles();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [selectedTab, userId]);

  return { articles, loading };
}
