"use client";

import Link from "next/link";
import DashboardNav from "@/components/DashboardNav";
import HandleLikes from "@/components/HandleLikes";
import HandleDeletes from "@/components/HandleDeletes";
import HandleEdit from "@/components/HandleEdit";
import ExpandableContent from "@/components/ExpandedContent";
import { TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../Hooks/UseAuth";
import { useGetArticles } from "../Hooks/UseGetArticles";
import { useTrendingArticles } from "../Hooks/UseTrendingArticles";

export default function BlogDashboard() {
  const router = useRouter();
  const tabs = [
    "All",
    "My Articles",
    "Literature",
    "Technology",
    "Productivity",
    "Religion",
    "Art",
    "Science",
    "Business",
    "Culture",
  ];
  const [selectedTab, setSelectedTab] = useState<string | null>("All");
  const { user, loading, userData } = useAuth();
  const { articles, loading: articlesLoading } = useGetArticles(
    selectedTab,
    user?.uid
  );
  const trendingArticles = useTrendingArticles();
  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  };

  const [showLoader, setShowLoader] = useState(false);
  const loaderTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (articlesLoading) {
      const startTimer = setTimeout(() => setShowLoader(true), 0);
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
      }
      loaderTimeoutRef.current = window.setTimeout(() => {
        console.warn("Dashboard: loader safety timeout expired");
        setShowLoader(false);
        loaderTimeoutRef.current = null;
      }, 10000);

      return () => {
        clearTimeout(startTimer);
        if (loaderTimeoutRef.current) {
          clearTimeout(loaderTimeoutRef.current);
          loaderTimeoutRef.current = null;
        }
      };
    }

    const t = setTimeout(() => setShowLoader(false), 350);
    if (loaderTimeoutRef.current) {
      clearTimeout(loaderTimeoutRef.current);
      loaderTimeoutRef.current = null;
    }
    return () => clearTimeout(t);
  }, [articlesLoading]);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/");
    }
  }, [user, loading, router]);

  const topics = ["Data Science", "Politics", "Cryptocurrency", "Psychology"];

  const footerLinks = [
    "Help",
    "Status",
    "Writers",
    "Blog",
    "Careers",
    "Privacy",
    "Terms",
    "About",
  ];
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 flex-col"
        >
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.9,
                ease: "easeInOut",
              }}
              className="w-3 h-3 bg-[#2d5e40] rounded-full"
            />
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.9,
                ease: "easeInOut",
                delay: 0.08,
              }}
              className="w-3 h-3 bg-[#2d5e40] rounded-full"
            />
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.9,
                ease: "easeInOut",
                delay: 0.16,
              }}
              className="w-3 h-3 bg-[#2d5e40] rounded-full"
            />
          </div>
          <div className="mt-4 text-sm text-[#6b6b6b]">Loading profile…</div>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return null;
  }
  if (!userData) return null;
  return (
    <div className="bg-[#fdfbf7] text-[#222222] flex flex-col min-h-screen selection:bg-[#eef5f0] selection:text-[#2d5e40]">
      {/* Navbar */}
      <DashboardNav userName={userData.userName} userId={user.uid} />
      {/* Main Content */}
      <div className="flex flex-1 justify-center w-full max-w-7xl mx-auto">
        <motion.main
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative w-full max-w-7xl flex-1 px-4 md:px-10 py-4 lg:border-r border-[#e0e0e0]"
        >
          {/* Tabs */}
          <div className="relative sm:sticky sm:top-16 sm:z-40 bg-[#fdfbf7]/95 backdrop-blur-sm -mx-4 px-4 md:-mx-10 md:px-10 pb-4  border-b border-[#e0e0e0] mb-4">
            <div
              role="tablist"
              aria-label="Article filters"
              className="flex items-center justify-start gap-3 overflow-x-auto md:overflow-visible md:flex-wrap md:whitespace-normal no-scrollbar"
            >
              {tabs.map((tab) => {
                const activeTab = selectedTab === tab;
                return (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab}
                    tabIndex={0}
                    onClick={() => {
                      setSelectedTab(tab);
                    }}
                    className={`shrink-0 flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 transition-all focus:outline-none  ${
                      activeTab
                        ? "bg-[#222222] text-white shadow-sm"
                        : "bg-[#f4f1ea] border border-transparent hover:border-gray-300 text-[#6b6b6b] hover:text-[#222222]"
                    }`}
                  >
                    <span className="text-sm font-medium">{tab}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence>
            {showLoader && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-50 bg-gradient-to-b from-white/80 to-white/60 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.98 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-3 flex-col"
                >
                  <div className="flex items-center gap-2">
                    <motion.span
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.9,
                        ease: "easeInOut",
                        delay: 0,
                      }}
                      className="w-3 h-3 bg-[#2d5e40] rounded-full"
                    />
                    <motion.span
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.9,
                        ease: "easeInOut",
                        delay: 0.1,
                      }}
                      className="w-3 h-3 bg-[#2d5e40] rounded-full"
                    />
                    <motion.span
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.9,
                        ease: "easeInOut",
                        delay: 0.2,
                      }}
                      className="w-3 h-3 bg-[#2d5e40] rounded-full"
                    />
                  </div>
                  <div className="mt-4 text-sm text-[#6b6b6b]">
                    Loading articles…
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Articles */}
          <motion.div
            variants={listVariants}
            key={selectedTab}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 relative"
          >
            {articlesLoading && !showLoader && (
              <div className="py-6 flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-24 bg-white rounded-lg border border-gray-200 p-4 animate-pulse"
                  />
                ))}
              </div>
            )}
            {!articlesLoading && articles.length === 0 ? (
              <div className="py-16 text-center text-sm text-[#6b6b6b]">
                No articles found —{" "}
                <Link href="/Write" className="text-[#2d5e40] underline">
                  write your first one
                </Link>
                .
              </div>
            ) : (
              articles.map((article) => (
                <motion.article
                  id={article.id}
                  key={article.id}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  className={`border-b border-gray-200 group bg-white/50  p-3 sm:p-3 ${
                    article.authorName
                      ? "flex flex-col sm:flex-row"
                      : "flex flex-col"
                  } gap-6 items-start justify-between`}
                >
                  <div className="flex flex-1 flex-col gap-2.5">
                    {/* Author Info */}
                    <div className="flex items-center gap-3 mb-1">
                      <Link href={`/Profile/${article.authorId}`}>
                        <div className="bg-center text-center bg-no-repeat bg-cover bg-[#1c2e22] text-white rounded-full size-8 ring-2 ring-white flex items-center justify-center text-sm font-bold">
                          {article.authorName
                            ? article.authorName.charAt(0).toUpperCase()
                            : "U"}
                        </div>
                      </Link>
                      {article.createdAt && (
                        <div>
                          <div className="text-sm text-[#6b6b6b]">
                            Written by{" "}
                            <Link href={`/Profile/${article.authorId}`}>
                              <span className="font-semibold text-[#222222]">
                                {article.authorName}
                              </span>
                            </Link>
                          </div>
                          <div className="text-xs text-[#6b6b6b] mt-0.5">
                            {article.createdAt
                              .toDate()
                              .toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                          </div>
                        </div>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold leading-tight tracking-tight group-hover:text-[#2d5e40] transition-colors text-[#222222] ">
                      {article.title}
                    </h2>

                    <ExpandableContent content={article.content} />

                    {/* Footer */}
                    <div className="flex items-center justify-between ">
                      <div className="flex items-center gap-3">
                        <div className="text-xs text-[#6b6b6b] flex gap-2">
                          {article.topics &&
                            article.topics.map((topic, i) => (
                              <span
                                className="border border-gray-300 py-1 px-2 rounded-full text-xs"
                                key={i}
                              >
                                {topic}
                              </span>
                            ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-[#6b6b6b]">
                        <div className="flex items-center gap-2">
                          <HandleLikes
                            articleId={article.id}
                            likes={article.likes || []}
                            userId={user?.uid}
                            likesCount={article.likesCount || 0}
                          />
                          {article.authorId === user.uid && (
                            <div>
                              <HandleDeletes
                                articleId={article.id}
                                authorId={article.authorId}
                                userId={user.uid}
                                userData={userData}
                              />

                              <HandleEdit
                                articleId={article.id}
                                userId={user.uid}
                                authorId={article.authorId}
                                userData={userData}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </motion.div>
        </motion.main>

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-[380px] pl-10 pt-10 pb-8 h-fit sticky top-16 border-l border-transparent">
          {/* Trending */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e0e0e0] mb-8">
            <h3 className="text-lg font-bold text-[#222222] mb-6 flex items-center gap-2">
              <TrendingUp className="size-5 text-[#2d5e40]" />
              Trending now
            </h3>
            <div className="flex flex-col gap-6">
              {trendingArticles?.map((article, index) => (
                <Link
                  key={index}
                  href={`#${article.id}`}
                  className="group flex gap-4 items-start"
                >
                  <span className="text-2xl font-bold text-gray-200 group-hover:text-[#2d5e40]/50 transition-colors leading-none -mt-1 font-sans">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-[#222222]">
                        {article.authorName}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#222222] leading-snug group-hover:text-[#2d5e40] transition-colors">
                      {article.title}
                    </h4>
                    <span className="text-xs text-[#6b6b6b] font-sans">
                      {article.createdAt?.toDate().toLocaleDateString()} ·{" "}
                      {/*item.readTime*/}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Topics */}
          <div className="px-2">
            <h3 className="text-xs font-bold text-[#6b6b6b] mb-4 uppercase tracking-wide">
              Recommended Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <Link
                  key={topic}
                  href="#"
                  className="px-4 py-2 bg-white border border-[#e0e0e0] rounded-full text-sm text-[#222222] font-sans hover:bg-[#f4f1ea] hover:border-gray-300 transition-all"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-[#e0e0e0] px-2">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-[#6b6b6b] font-sans leading-relaxed">
              {footerLinks.map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="hover:text-[#222222] transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Custom Scrollbar Hiding */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
