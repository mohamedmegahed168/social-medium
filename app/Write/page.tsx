"use client";

import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../Hooks/hooks";
import { usePublish } from "../Hooks/UsePublish";
import { useRouter } from "next/navigation";
import { Check, PlusIcon } from "lucide-react";
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
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: {
      title: "",
      subtitle: "",
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
  // 3. Watch values to update the UI Sidebar dynamically
  const watchedTitle = watch("title");
  const watchedContent = watch("content");
  const watchedTopics = watch("topics");

  const hasEnoughContent = (watchedContent?.length || 0) > 100;
  const topicChecker = (watchedTopics?.length || 0) > 0;
  // Helper to calculate progress
  const calculateProgress = () => {
    let progress = 0;
    if (watchedTitle?.length > 0) progress += 25;
    if (watchedContent?.length > 100) progress += 25; // Roughly 100 chars
    if (watchedTopics?.length > 0) progress += 25;
    return progress;
  };

  const currentProgress = calculateProgress();

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
  console.log(watchedTopics);
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

  function isTopicSelected(topic: string) {
    const selectedTopic = watchedTopics?.includes(topic);
    return selectedTopic;
  }
  async function onSubmit(data: PostFormData) {
    if (!user || !userData) return;

    const success = await publishArticle({
      title: data.title,
      content: data.content,
      uid: user.uid,
      topics: watchedTopics,
      userName: userData.userName,
    });
    if (!success) return;
    else {
      router.push("/Dashboard");
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-primary  min-h-screen flex flex-col transition-colors duration-200">
      {/* HEADER */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-8 py-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 h-[69px]">
        <div className="flex items-center gap-6 text-text-main">
          <a className="flex items-center gap-2 group" href="#">
            <h2 className="text-xl font-bold tracking-tight group-hover:opacity-80 transition-opacity font-sans">
              Writer
            </h2>
          </a>
          <div className="hidden md:flex items-center text-sm text-text-secondary">
            <span className="w-px h-5 bg-border-color mx-4"></span>
            <span>Draft in user&apos;s workspace</span>
            <span className="mx-2">•</span>
            <span>Saved just now</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center rounded-full h-9 px-5 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-text-primary text-sm font-medium transition-colors border border-gray-400 shadow-sm outline-none">
            Preview
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="flex items-center justify-center rounded-full h-9 px-5 bg-[#2d5e40] hover:bg-green-600 text-white text-sm font-medium transition-colors shadow-sm"
          >
            Publish
          </button>
          <div className="ml-2 bg-greenish flex items-center justify-center size-9 rounded-full bg-gray-200 overflow-hidden border border-gray-100 dark:border-gray-700">
            {userData?.userName && (
              <p className="text-white">
                {" "}
                {userData.userName.charAt(0).toUpperCase()}{" "}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* MAIN FORM */}
      <main className="flex-1 flex w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 px-4 lg:px-8 py-8 h-full"
        >
          {/* LEFT COLUMN: EDITOR */}
          <div className="lg:col-span-8 flex flex-col bg-white dark:bg-white/5 lg:rounded-2xl lg:shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-200 overflow-hidden relative">
            <div className="flex-1 flex flex-col w-full">
              <div className="px-8 sm:px-12 pt-12 pb-2 max-w-4xl mx-auto w-full">
                {/* TITLE INPUT */}
                <div className="mb-6">
                  <textarea
                    {...register("title", { required: true })}
                    ref={(e) => {
                      register("title").ref(e);
                      titleRef.current = e;
                    }}
                    onInput={(e) =>
                      handleResize(
                        e,
                        titleRef as React.MutableRefObject<HTMLTextAreaElement>
                      )
                    }
                    className="w-full bg-transparent text-5xl sm:text-4xl font-bold placeholder:text-gray-300/50 text-text-primary border-none focus:ring-0 focus:outline-none resize-none overflow-hidden p-0 leading-[1.1] tracking-tight"
                    placeholder="Title"
                    rows={1}
                    style={{ minHeight: "4rem" }}
                  />
                  {errors.title && (
                    <span className="text-red-400 text-sm font-sans">
                      Title is required
                    </span>
                  )}
                </div>

                {/* AUTHOR & SUBTITLE */}
              </div>

              {/* TOOLBAR (Sticky) */}
              <div className=" bg-white/95 dark:bg-[#15231a]/95 backdrop-blur-md border-b border-gray-300 px-8 sm:px-12 py-3 transition-all w-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
                <div className="max-w-4xl mx-auto flex gap-1 items-center justify-between">
                  {/* Word Count */}
                  <span className="rounded-md text-sm text-secondary  hidden sm:block bg-gray-50 dark:bg-white/5 px-3 py-2 rounded border-b border-gray-300">
                    {watchedContent
                      ? watchedContent.trim().split(/\s+/).length
                      : 0}
                    words
                  </span>
                </div>
              </div>

              {/* MAIN CONTENT AREA */}
              <div className="px-8 sm:px-12 py-10 max-w-4xl mx-auto w-full flex-1 min-h-[500px]">
                {publishError && <p> error: {publishError} </p>}
                <div className="relative h-full">
                  {/* CONTENT TEXTAREA */}
                  <textarea
                    {...register("content")}
                    ref={(e) => {
                      register("content").ref(e);
                      contentRef.current = e;
                    }}
                    onInput={(e) =>
                      handleResize(
                        e,
                        contentRef as React.MutableRefObject<HTMLTextAreaElement>
                      )
                    }
                    className="w-full bg-transparent text-xl leading-8 text-primary placeholder:text-gray-300  focus:ring-0 focus:outline-none resize-none h-full font-normal"
                    placeholder="Tell your story..."
                    style={{ minHeight: "500px" }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT COLUMN: SIDEBAR */}
          <div className="lg:col-span-4 relative">
            <div className=" flex flex-col gap-6">
              {/* PUBLISHING STATUS CARD */}
              <div className="p-6 rounded-xl border border-gray-200 bg-white dark:bg-white/5 shadow-sm">
                <h3 className="text-sm font-bold text-primary mb-4 uppercase tracking-wider flex items-center justify-between">
                  Publishing Status
                  <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full border border-gray-200">
                    Draft
                  </span>
                </h3>
                <div className="space-y-3.5">
                  {/* Checklist Item: Title */}
                  <div className="flex items-center justify-between text-sm group ">
                    <label
                      className={`flex items-center gap-3 transition-colors  ${
                        watchedTitle ? "text-primary" : "text-secondary"
                      }`}
                    >
                      <input
                        type="checkbox"
                        readOnly
                        checked={!!watchedTitle}
                        className="peer sr-only"
                      />
                      <div
                        className={`w-5 h-5  rounded-full flex items-center justify-center ${
                          watchedTitle
                            ? "bg-greenish border-none"
                            : "bg-white border border-gray-300"
                        }`}
                      >
                        {watchedTitle && <Check className="text-white " />}
                      </div>
                      Title provided{" "}
                    </label>{" "}
                  </div>
                  {/* Checklist Item: Word Count */}
                  <div className="flex items-center justify-between text-sm group ">
                    <label
                      className={`flex items-center gap-3 transition-colors ${
                        hasEnoughContent ? "text-primary" : "text-secondary"
                      }`}
                    >
                      <input
                        className="peer sr-only"
                        type="checkbox"
                        readOnly
                        checked={hasEnoughContent}
                      />
                      <div
                        className={`w-5 h-5  rounded-full flex items-center justify-center ${
                          hasEnoughContent
                            ? "bg-greenish border-none"
                            : "bg-white border border-gray-300"
                        }`}
                      >
                        {hasEnoughContent && <Check className="text-white " />}
                      </div>
                      At least 100 chars
                    </label>
                  </div>
                  {/* Checklist Item: Topics */}
                  <div className="flex items-center justify-between text-sm group c">
                    <label
                      className={`flex items-center gap-3 transition-colors ${
                        topicChecker ? "text-primary" : "text-secondary"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={topicChecker}
                        readOnly
                      />
                      <div
                        className={`w-5 h-5  rounded-full flex items-center justify-center ${
                          topicChecker
                            ? "bg-greenish border-none"
                            : "bg-white border border-gray-300"
                        }`}
                      >
                        {topicChecker && <Check className="text-white " />}
                      </div>
                      Topic selected
                    </label>
                  </div>
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
                    <div
                      className="bg-greenish h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${currentProgress}%` }}
                    ></div>
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
                      <button
                        key={topic}
                        type="button"
                        onClick={() => toggleTopic(topic)}
                        className={`group flex items-center  gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer border ${
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
                            className={`${isSelected ? "size-4" : "hidden"}`}
                          />
                          {topic}
                        </span>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    className="group flex items-center gap-1 px-2 py-1.5 rounded-md text-secondary hover:text-primary transition-colors cursor-pointer border border-transparent hover:border-primary/20 "
                  >
                    <span className="flex justify-center items-center gap-2 ">
                      <PlusIcon className="size-5" />
                      add new
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
