"use client";
import { useEffect, useState } from "react";
import { articlesReference } from "@/lib/firebase";
import { query, orderBy, onSnapshot, limit, doc } from "firebase/firestore";
import { Article } from "./UseGetArticles";
export function useTrendingArticles() {
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  useEffect(() => {
    const q = query(articlesReference, orderBy("likesCount", "desc"), limit(3));
    const unSubscribe = onSnapshot(q, (snapshot) => {
      const currentTrending = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Article[];
      setTrendingArticles(currentTrending);
    });
    return () => unSubscribe();
  }, []);
  return trendingArticles;
}
