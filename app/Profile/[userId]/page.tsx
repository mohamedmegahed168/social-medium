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

  return (
    <div className="bg-[#0f1110] text-[#e2e8f0] min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0f1110]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-10 py-5">
          {/* Left */}
          <div className="flex items-center gap-4 sm:gap-12">
            <Link href="/">
              <motion.div
                className="flex items-center gap-3 text-white cursor-pointer"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.div
                  variants={{
                    rest: { rotate: 0, scale: 1 },
                    hover: {
                      rotate: -12,
                      scale: 1.1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      },
                    },
                  }}
                  className="text-white flex items-center justify-center"
                >
                  <BookOpen size={30} />
                </motion.div>

                <motion.span
                  className="text-2xl font-bold tracking-tight text-primary"
                  variants={{
                    rest: { scale: 1, color: "inherit" },
                    hover: {
                      scale: 1.02,
                      color: "#116b2f",
                      transition: { duration: 0.2 },
                    },
                  }}
                >
                  Social Medium
                </motion.span>
              </motion.div>
            </Link>

            <div className="hidden sm:block">
              <Link
                href="/Dashboard"
                className="text-lg font-medium hover:text-[#4ade80] transition-colors text-white/70"
              >
                Dashboard
              </Link>
            </div>
            <div className="hidden sm:block">
              <Link
                href="/Write"
                className="text-lg font-medium hover:text-[#4ade80] transition-colors text-white/70"
              >
                Write
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center justify-between gap-0 sm:gap-8">
            <div className="hidden sm:flex items-center bg-white/5 rounded-full px-0 h-0 w-0 sm:px-5 sm:h-10 sm:w-80  border border-white/10 focus-within:border-[#4ade80]/40 transition-all">
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
                className="text-md font-medium transition-colors text-white/95 hover:text-white/50"
              >
                Dashboard
              </Link>
            </div>
            <Link href={`/Profile/${currentUser?.uid}`}>
              <div className="hidden sm:flex text-white  text-2xl font-bold  items-center justify-center size-10 rounded-full bg-cover bg-center border-2 border-white/50 cursor-pointer hover:bg-white/60 hover:text-main-dark">
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
      <main className="max-w-[1440px] mx-auto flex-1 w-full px-10 pt-5 sm:pt-10 relative">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Articles Section */}
          <div className="flex-1 order-2 lg:order-1 max-w-[900px]">
            <div className="mb-4">
              {profile && (
                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3">
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
      <footer className="bg-white/5 py-5 sm:py-8 pb-5 border-t border-white/5 mt-32">
        <div className="max-w-[1440px] mx-auto px-10">
          <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:justify-between gap-5 sm:gap-12">
            <Link href="/">
              <motion.div
                className="flex items-center gap-3 text-white cursor-pointer"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.div
                  variants={{
                    rest: { rotate: 0, scale: 1 },
                    hover: {
                      rotate: -12,
                      scale: 1.1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      },
                    },
                  }}
                  className="text-white flex items-center justify-center"
                >
                  <BookOpen size={30} />
                </motion.div>

                <motion.span
                  className="text-2xl font-bold tracking-tight text-primary"
                  variants={{
                    rest: { scale: 1, color: "inherit" },
                    hover: {
                      scale: 1.02,
                      color: "#116b2f",
                      transition: { duration: 0.2 },
                    },
                  }}
                >
                  Social Medium
                </motion.span>
              </motion.div>
            </Link>

            <div className="flex flex-wrap justify-center gap-10 text-sm  text-white/50">
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

            <p className="text-sm text-white/30 ">
              © 2025 Social Medium by Mohamed Megahed Designed for reading.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
