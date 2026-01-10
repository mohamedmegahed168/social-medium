"use client";

import Link from "next/link";
import { useAuth } from "@/app/Hooks/UseAuth";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetArticles } from "@/app/Hooks/UseGetArticles";
import { useGetUserProfile } from "@/app/Hooks/UseGetUserProfile";
import HandleLikes from "@/components/HandleLikes";
import HandleDeletes from "@/components/HandleDeletes";
import HandleEdit from "@/components/HandleEdit";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, ChevronDown, BookOpen } from "lucide-react";

const footerLinks = ["About", "Help", "Terms", "Privacy", "Careers"];

export default function UserProfile() {
  const { user: currentUser, loading: authLoading, userData } = useAuth();
  const params = useParams();
  const profileId = params.userId as string;
  const { profile, loadingProfile } = useGetUserProfile(profileId);
  const { articles, loading } = useGetArticles("My Articles", profileId);
  const router = useRouter();
  const isOwnProfile = currentUser?.uid === profileId;

  useEffect(() => {
    if (!authLoading && !currentUser && !userData) {
      router.push("/SignIn");
    }
  }, [currentUser, authLoading, router, userData]);

  // Note: article loading is handled inline with skeletons instead of a full-page return so the header and profile stay visible while fetching.
  return (
    <div className="bg-[#0f1110] text-[#e2e8f0] min-h-screen font-serif">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0f1110]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-10 py-5">
          {/* Left */}
          <div className="flex items-center gap-4 sm:gap-12">
            <Link href="/" className="flex items-center gap-3">
              <div className=" text-main-light flex items-center justify-center gap-3">
                <BookOpen />

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Social Medium{" "}
                </h2>
              </div>
            </Link>

            <div className="hidden sm:block">
              <Link
                href="/Dashboard"
                className="text-sm font-medium hover:text-[#4ade80] transition-colors text-white/70"
              >
                Dashboard
              </Link>
            </div>
            <div className="hidden sm:block">
              <Link
                href="/Write"
                className="text-sm font-medium hover:text-[#4ade80] transition-colors text-white/70"
              >
                Write
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-8">
            <div className="hidden sm:flex items-center bg-white/5 rounded-full px-5 h-10 w-80 lg:w-[400px] border border-white/10 focus-within:border-[#4ade80]/40 transition-all">
              <Search className="size-5 text-white/40" />
              <input
                className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-full placeholder:text-white/40 ml-2"
                placeholder="Search articles, topics, or people"
                type="text"
              />
            </div>
            <div className="block sm:hidden">
              <Link
                href="/Dashboard"
                className="text-sm font-medium hover:text-[#4ade80] transition-colors text-white/70"
              >
                Dashboard
              </Link>
            </div>
            <Link href={`/Profile/${currentUser?.uid}`}>
              <div className="text-white border-2 border-[#4ade80]/50 text-2xl font-bold  flex items-center justify-center size-10 rounded-full bg-cover bg-center border border-white/10 cursor-pointer">
                {userData && userData.userName.charAt(0).toUpperCase()}
              </div>
            </Link>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {loadingProfile && (
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
      <main className="max-w-[1440px] mx-auto px-10 pt-16 pb-32">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Articles Section */}
          <div className="flex-1 order-2 lg:order-1 max-w-[900px]">
            <div className="mb-4">
              {profile && (
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3">
                  {profile.userName}
                </h1>
              )}

              <div className="lg:hidden bg-white/3 border border-white/6 rounded-xl p-3">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-[#1c2e22] text-white text-2xl md:text-3xl font-bold border-2 border-[#4ade80]/30">
                      {profile ? profile.userName.charAt(0).toUpperCase() : "U"}
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-white/60 mt-1 line-clamp-2">
                      {profile?.bio ||
                        "No bio yet. This user hasn't added a bio."}
                    </p>

                    <div className="mt-3 flex items-center gap-4 text-sm text-white/60">
                      <div className="flex items-baseline gap-2">
                        <div className="text-base font-bold text-white">
                          {articles.length}
                        </div>
                        <div className="text-xs">Articles</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Articles */}
            <div className="space-y-12">
              <div className="flex flex-col gap-8">
                {loading ? (
                  [1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-6 bg-white/5 rounded-xl animate-pulse h-36"
                    />
                  ))
                ) : articles.length === 0 ? (
                  <div className="py-16 text-center text-sm text-white/40">
                    No articles yet —{" "}
                    <Link href="/Write" className="text-[#4ade80] underline">
                      write the first one
                    </Link>
                    .
                  </div>
                ) : (
                  articles.map((article, idx) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18, delay: idx * 0.03 }}
                      whileHover={{ y: -6 }}
                      className="group bg-white/2 p-6 rounded-xl"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#4ade80]">
                          <span>{article.topics?.join(", ")}</span>
                          <span className="text-white/20">•</span>
                          <span className="text-white/50">
                            {article.createdAt
                              ?.toDate()
                              .toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                          </span>
                        </div>

                        <h3 className="text-3xl lg:text-4xl font-bold group-hover:text-[#4ade80] transition-colors leading-tight">
                          {article.title}
                        </h3>

                        <p className="text-white/60 line-clamp-3">
                          {article.content}
                        </p>

                        <div className="flex items-center justify-between pt-6">
                          <div className="flex items-center  text-sm text-white/40 ">
                            <span className="flex items-center gap-2">
                              <Clock className="size-5" />
                              {article.createdAt?.toDate().toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="flex items-center ">
                              <HandleLikes
                                articleId={article.id}
                                likes={article.likes || []}
                                userId={currentUser?.uid}
                                likesCount={article.likesCount || 0}
                              />
                            </div>
                            {isOwnProfile && (
                              <div>
                                <HandleDeletes
                                  articleId={article.id}
                                  authorId={article.authorId}
                                  userId={currentUser.uid}
                                  userData={userData}
                                />

                                <HandleEdit
                                  articleId={article.id}
                                  userId={currentUser.uid}
                                  authorId={article.authorId}
                                  userData={userData}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="border-b border-white/5 mt-6" />
                    </motion.article>
                  ))
                )}
              </div>

              {/* Show More Button */}
              <div className="pt-4 flex justify-start">
                <button className="text-lg font-bold text-[#4ade80] hover:brightness-125 transition-all flex items-center gap-3 group">
                  Show more articles
                  <ChevronDown className="size-6 transition-transform group-hover:translate-y-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-[400px] order-2 sticky top-16 h-fit pl-6 lg:pl-10">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/3 rounded-xl p-6 border border-white/10 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0.98 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  role="img"
                  aria-label={profile ? `${profile.userName} avatar` : "avatar"}
                  className="w-36 h-36 rounded-full flex items-center justify-center bg-[#1c2e22] text-white text-6xl font-bold border-2 border-[#4ade80]/30 p-1.5"
                >
                  {profile ? profile.userName.charAt(0).toUpperCase() : "U"}
                </motion.div>

                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white">
                    {profile?.userName}
                  </h4>
                  <p className="text-sm text-white/60 mt-1 line-clamp-3">
                    {profile?.bio ||
                      "No bio yet. This user hasn't added a bio."}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-start gap-6">
                <div className="text-center">
                  <div className="text-lg font-bold">{articles.length}</div>
                  <div className="text-xs text-white/50">Articles</div>
                </div>
              </div>
            </motion.div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/5 py-20 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className=" text-main-light flex items-center justify-center gap-3">
                <BookOpen />

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Social Medium{" "}
                </h2>
              </div>
            </Link>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-10 text-sm font-medium text-white/50">
              {footerLinks.map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="hover:text-[#4ade80] transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-sm text-white/30 font-medium">
              © 2023 BlogSpace Inc. Designed for reading.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
