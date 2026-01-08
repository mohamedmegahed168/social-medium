"use client";

import { useRef, useState, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useAuth } from "../Hooks/hooks";
import { usePublish } from "../Hooks/UsePublish";
import { useRouter } from "next/navigation";
import CheckListItem from "@/components/CheckListItem";
import WriteHeader from "@/components/WriteHeader";
import { Check } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
// 1. Define the Shape of your Form Data
interface PostFormData {
  title: string;
  subtitle: string;
  content: string;
  topics: string[];
  coverImage?: FileList;
}

// Default topics list
const topics = [
  "Technology",
  "Coding",
  "Science",
  "Art",
  "Design",
  "Business",
  "Psychology",
];

export default function NewPostEditor() {
  // 2. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: {
      title: "",
      content: "",
      topics: [], // Default selection
    },
    mode: "onChange",
  });

  // Refs for manual resizing logic
  const router = useRouter();
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const { user, userData } = useAuth();
  const { publishArticle, error: publishError } = usePublish();
  const [checkPublish, setCheckPublish] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedSuccess, setPublishedSuccess] = useState(false);
  const [titleFocused, setTitleFocused] = useState(false);
  const [contentFocused, setContentFocused] = useState(false);
  // 3. Watch values to update the UI Sidebar dynamically
  const watchedTitle = useWatch({ control, name: "title" });
  const watchedContent = useWatch({ control, name: "content" });
  const watchedTopics = useWatch({ control, name: "topics" });

  const hasEnoughContent = useMemo(() => {
    return (watchedContent?.length || 0) > 100;
  }, [watchedContent]);
  const topicChecker = useMemo(() => {
    return (watchedTopics?.length || 0) > 0;
  }, [watchedTopics]);
  const words = useMemo(() => {
    return watchedContent
      ? watchedContent.trim().split(/\s+/).filter(Boolean).length
      : 0;
  }, [watchedContent]);
  const readingMinutes = useMemo(() => {
    return Math.max(1, Math.ceil(words / 200));
  }, [words]);

  const calculateProgress = useMemo(() => {
    let progress = 0;
    if (watchedTitle?.length > 0) progress += 25;
    if (watchedContent?.length > 100) progress += 25;
    if (watchedTopics?.length > 0) progress += 25;
    return progress;
  }, [watchedContent, watchedTitle, watchedTopics]);
  const currentProgress = calculateProgress;
  const canPublish = !!watchedTitle && hasEnoughContent && topicChecker;

  // 4. Auto-resize function
  const handleResize = (
    e: React.FormEvent<HTMLTextAreaElement>,
    localRef: React.MutableRefObject<HTMLTextAreaElement | null>
  ) => {
    if (localRef.current) {
      localRef.current.style.height = "auto";
      localRef.current.style.height = localRef.current.scrollHeight + "px";
    }
  };
  // Toggle Topic Logic
  function toggleTopic(topic: string) {
    const current = watchedTopics || [];
    if (current.includes(topic)) {
      setValue(
        "topics",
        current.filter((t) => t !== topic)
      );
    } else {
      if (current.length < 3) {
        setValue("topics", [...current, topic]);
      }
    }
  }
  console.log("hello");
  function isTopicSelected(topic: string) {
    const selectedTopic = watchedTopics?.includes(topic);
    return selectedTopic;
  }
  async function onSubmit(data: PostFormData) {
    if (!user || !userData) return;
    setIsPublishing(true);
    try {
      const success = await publishArticle({
        title: data.title,
        content: data.content,
        uid: user.uid,
        topics: watchedTopics,
        userName: userData.userName,
      });
      if (!success) {
        setIsPublishing(false);
        return;
      } else {
        setCheckPublish(true);
        setPublishedSuccess(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        router.push("/Dashboard");
      }
    } catch (error) {
      setCheckPublish(false);
      setIsPublishing(false);
      console.error(error);
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-primary  min-h-screen flex flex-col transition-colors duration-200">
      {/* HEADER */}
      <WriteHeader
        userName={userData?.userName}
        isPublishing={isPublishing}
        canPublish={canPublish}
        publishedSuccess={publishedSuccess}
        onPublish={handleSubmit(onSubmit)}
      />

      {/* MAIN FORM */}
      <main className="flex-1 flex w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 px-4 lg:px-8 py-8 h-full"
        >
          {/* LEFT COLUMN: EDITOR */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-8 flex flex-col bg-white dark:bg-white/5  sm:rounded-2xl lg:shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-200 overflow-hidden relative"
          >
            <div className="flex-1 flex flex-col w-full">
              <div className="px-8 sm:px-12 pt-12 pb-2 max-w-4xl mx-auto w-full">
                {/* TITLE INPUT */}
                <div className="mb-6">
                  <motion.div
                    animate={
                      titleFocused
                        ? {
                            boxShadow: "0 10px 30px rgba(34,197,94,0.08)",
                            y: -1,
                          }
                        : { boxShadow: "none", y: 0 }
                    }
                    transition={{ duration: 0.18 }}
                    className="relative rounded-2xl "
                  >
                    <label
                      htmlFor="post-title"
                      className={`absolute left-4 top-4 text-sm text-secondary transition-all origin-left pointer-events-none ${
                        watchedTitle || titleFocused
                          ? "-translate-y-5 scale-90 text-greenish"
                          : "translate-y-0 scale-100"
                      }`}
                    >
                      Title
                    </label>

                    <textarea
                      id="post-title"
                      aria-label="Post title"
                      {...register("title", { required: true })}
                      ref={(e) => {
                        register("title").ref(e);
                        titleRef.current = e;
                      }}
                      onFocus={() => setTitleFocused(true)}
                      onBlur={() => setTitleFocused(false)}
                      onInput={(e) => {
                        handleResize(
                          e,
                          titleRef as React.MutableRefObject<HTMLTextAreaElement>
                        );
                      }}
                      className="w-full bg-transparent text-5xl sm:text-4xl font-semibold text-primary border-none focus:outline-none resize-none p-4 pt-10 pb-4 leading-[1.05] tracking-tight caret-green-600 placeholder-transparent transition-all"
                      rows={1}
                      style={{ minHeight: "4.5rem" }}
                    />
                  </motion.div>

                  {errors.title && (
                    <span className="text-red-400 text-sm">
                      Title is required
                    </span>
                  )}
                </div>
              </div>

              {/* TOOLBAR (Sticky) */}
              <div className=" bg-white/95 dark:bg-[#15231a]/95 backdrop-blur-md border-b border-gray-300 px-8 sm:px-12 py-3 transition-all w-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
                <div className="max-w-4xl mx-auto flex gap-1 items-center justify-between">
                  {/* Word Count */}
                  <span className="rounded-md text-sm text-secondary hidden sm:block bg-gray-50 dark:bg-white/5 px-3 py-2 rounded border-b border-gray-300">
                    {words} words • {readingMinutes} min read
                  </span>
                </div>
              </div>

              {/* MAIN CONTENT AREA */}
              <div className="px-8 sm:px-12 py-10 max-w-4xl mx-auto w-full flex-1 ">
                {publishError && <p> error: {publishError} </p>}
                <motion.div
                  animate={
                    contentFocused
                      ? {
                          boxShadow: "0 50px 50px rgba(34,197,94,0.06)",
                          y: -2,
                        }
                      : { boxShadow: "none", y: 0 }
                  }
                  transition={{ duration: 0.18 }}
                  className="relative h-full"
                >
                  <label
                    htmlFor="post-content"
                    className={`absolute left-6 top-4 text-sm text-secondary transition-all pointer-events-none ${
                      watchedContent || contentFocused
                        ? "-translate-y-5 scale-90 text-greenish"
                        : "translate-y-0 scale-100"
                    }`}
                  >
                    Write your story
                  </label>

                  <textarea
                    id="post-content"
                    aria-label="Post content"
                    {...register("content")}
                    ref={(e) => {
                      register("content").ref(e);
                      contentRef.current = e;
                    }}
                    onFocus={() => setContentFocused(true)}
                    onBlur={() => setContentFocused(false)}
                    onInput={(e) => {
                      handleResize(
                        e,
                        contentRef as React.MutableRefObject<HTMLTextAreaElement>
                      );
                    }}
                    className="w-full bg-transparent text-lg leading-8 text-primary placeholder-transparent focus:outline-none resize-none p-6 rounded-md min-h-[320px] caret-green-600 transition-all"
                    placeholder="Tell your story..."
                    style={{ minHeight: "320px" }}
                  />

                  {watchedContent && !hasEnoughContent && (
                    <p className="text-sm text-secondary mt-2">
                      Keep writing — aim for 100+ characters to improve reach.
                    </p>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
          {/* RIGHT COLUMN: SIDEBAR */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="lg:col-span-4 relative"
          >
            <div className=" flex flex-col gap-6">
              {/* PUBLISHING STATUS CARD */}
              <div className="p-6 rounded-xl border border-gray-200 bg-white dark:bg-white/5 shadow-sm">
                <h3 className="text-sm font-bold text-primary mb-4  tracking-wider flex items-center justify-between">
                  Publishing Status
                  <span className="text-sm bg-primary/10 text-primary px-2 py-1 font-normal rounded-full border border-gray-200">
                    Draft
                  </span>
                </h3>
                <div className="space-y-3.5">
                  {/* Checklist Item: Title */}
                  <CheckListItem
                    checked={!!watchedTitle}
                    label="Title provided"
                  />
                  {/* Checklist Item: Word Count */}
                  <CheckListItem
                    checked={hasEnoughContent}
                    label="At least 100 character"
                  />
                  {/* Checklist Item: Topics */}
                  <CheckListItem
                    checked={topicChecker}
                    label="Topic selected"
                  />
                  <CheckListItem checked={checkPublish} label="Click publish" />
                </div>
                {/* Progress Bar */}
                <div className="mt-6 pt-5 border-t border-gray-300">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-semibold text-text-main">
                      Progress
                    </span>
                    <span className="text-xs text-text-secondary">
                      {currentProgress}% Ready
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 dark:bg-gray-700 overflow-hidden">
                    <motion.div
                      className="bg-greenish h-1.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${currentProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* TOPICS CARD */}
              <div className="p-6 rounded-xl border border-gray-200 bg-white dark:bg-white/5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-text-main">
                    <span className="material-symbols-outlined text-[20px] text-primary">
                      Topics
                    </span>
                  </div>
                  <button
                    type="button"
                    className="text-xs font-medium text-primary hover:text-green-600 transition-colors bg-primary/5 hover:bg-primary/10 px-2 py-1 rounded"
                  >
                    Manage
                  </button>
                </div>
                <p className="text-sm text-secondary mb-5 leading-snug">
                  Select up to 3 topics to help readers find your story.
                </p>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => {
                    const isSelected = isTopicSelected(topic);
                    return (
                      <motion.button
                        key={topic}
                        type="button"
                        onClick={() => toggleTopic(topic)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        aria-pressed={isSelected}
                        className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer border ${
                          isSelected
                            ? "bg-greenish/10 hover:bg-greenish/20 border-primary/20"
                            : " dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border-gray-200"
                        }`}
                      >
                        <span
                          className={`text-sm flex items-center justify-center gap-2 font-medium ${
                            isSelected ? "text-greenish" : "text-secondary"
                          }`}
                        >
                          <Check
                            className={`${
                              isSelected ? "size-4" : "hidden"
                            } transition-all`}
                          />
                          {topic}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </form>
      </main>
    </div>
  );
}
