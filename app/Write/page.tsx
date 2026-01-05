"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Hooks/hooks";
import { usePublish } from "../Hooks/UsePublish";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FileEdit,
  ImagePlus,
  Plus,
  MoreHorizontal,
  CheckCircle,
  FolderOpen,
} from "lucide-react";

interface postData {
  title: string;
  content: string;
}

const categories = [
  "Technology",
  "Coding",
  "Science",
  "Art",
  "Design",
  "Politics",
];

export default function WritePage() {
  const router = useRouter();
  const { user, loading, userData } = useAuth();
  const { publishArticle, error: publishError } = usePublish();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(true);

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<postData>();

  // Watch content for word count
  const content = watch("content", "");
  useEffect(() => {
    if (!user && !loading) {
      router.push("/SignIn");
    }
  });

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [content]);

  // Auto-resize textarea
  function handleTextareaResize(textarea: HTMLTextAreaElement) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  // Handle cover image upload
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle publish
  async function onSubmit(data: postData) {
    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }
    if (!user || !userData) return;

    const success = await publishArticle(
      data.title,
      data.content,
      user?.uid,
      userData?.userName
    );
    if (success) {
      router.push("/Dashboard");
    }

    // TODO: Submit to Firebase
  }
  if (loading) {
    return <p> Loading </p>;
  }
  if (!user) {
    return null;
  }
  return (
    <div className="bg-[#f6f8f6] text-[#111813] font-serif antialiased min-h-screen flex flex-col transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-[#f6f8f6]/95 backdrop-blur-sm border-b border-[#dce5df]">
        {/* Left Side */}
        <div className="flex items-center gap-4 text-[#111813]">
          <Link href="/Dashboard" className="flex items-center gap-2 group">
            <div className="size-8 rounded-full bg-black text-white flex items-center justify-center">
              <FileEdit className="size-5" />
            </div>
            <h2 className="text-xl font-medium tracking-tight group-hover:opacity-80 transition-opacity">
              Writer
            </h2>
          </Link>
          <span className="text-xs text-[#63886f] px-2 border-l border-[#dce5df] h-4 flex items-center">
            Draft in user&apos;s workspace
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#63886f] hidden sm:block mr-2">
            {isSaved ? "Saved" : "Saving..."}
          </span>

          <button
            type="button"
            className="flex items-center justify-center rounded-full h-8 px-4 bg-[#f6f8f6] hover:bg-[#dce5df] text-[#111813] text-sm font-medium transition-colors border border-[#dce5df]"
          >
            Preview
          </button>

          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="flex items-center justify-center rounded-full h-8 px-4 bg-[#17cf54] hover:bg-green-600 text-white text-sm font-medium transition-colors shadow-sm"
          >
            Publish
          </button>

          <button
            type="button"
            className="ml-2 size-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          >
            <MoreHorizontal className="size-5 text-[#63886f]" />
          </button>

          {/* User Avatar */}
          <div className="ml-2 size-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYJdyfnBl4jbMFvebGM6RJOfc4SzMA9PW1fVn5Qp7hRJCYZWqihfXyeOxOmqdFPxQJWK6cG13ZBdREOXinu5bLlf3ZIfwMIMjgkbiW8CyptwQd1VX6lwJ_O9UmeBAOiz4BHwU6ATo3l_OLTxpAHjJLEDx7ZPk1IVTD_dn7lbh1NoO-BPyJ1m_NJ-MBYhoyTU9rkRsvWavdVwuRMMX_BSPFZtNQeP4vPwUFBUsv6YiQNkSbNeXdA29-_J8L77R0PPNIlJrcwNXtGew"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center w-full px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-[740px] flex flex-col gap-8">
          {/* Cover Image Upload */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group relative flex flex-col items-center justify-center w-full min-h-[160px] rounded-xl border-2 border-dashed border-[#dce5df] hover:border-[#63886f]/50 hover:bg-black/5 transition-all cursor-pointer overflow-hidden"
          >
            {coverImage ? (
              <div className="relative w-full h-[300px]">
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-medium">Change Image</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 p-8 text-center">
                <ImagePlus className="size-10 text-[#63886f]" />
                <div className="flex flex-col gap-1">
                  <p className="text-[#111813] text-base font-medium">
                    Add a cover image
                  </p>
                  <p className="text-[#63886f] text-sm">
                    High-quality images make your story inviting.
                  </p>
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Title */}
          {userData?.userName && <p> {userData.userName} </p>}
          <div className="relative group">
            <textarea
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 5,
                  message: "Title must be at least 5 characters",
                },
              })}
              ref={(e) => {
                register("title").ref(e);
                if (e) titleRef.current = e;
              }}
              placeholder="Title"
              rows={1}
              onInput={(e) =>
                handleTextareaResize(e.target as HTMLTextAreaElement)
              }
              className="w-full bg-transparent text-4xl sm:text-5xl font-bold placeholder:text-[#63886f]/40 text-[#111813] border-none focus:ring-0 focus:outline-none resize-none overflow-hidden p-0 leading-tight font-serif tracking-tight"
              style={{ minHeight: "3.5rem" }}
            />
            {errors.title && (
              <span className="text-red-500 text-sm mt-2 block">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="relative min-h-[30vh]">
            {/* Add Button (Desktop) */}
            <div className="absolute -left-12 top-2 opacity-0 hover:opacity-100 transition-opacity hidden lg:block">
              <button
                type="button"
                className="size-8 flex items-center justify-center rounded-full border border-[#dce5df] bg-[#f6f8f6] text-[#111813] hover:bg-white shadow-sm transition-all transform hover:scale-105"
              >
                <Plus className="size-5" />
              </button>
            </div>

            <textarea
              {...register("content", {
                required: "Content is required",
                minLength: {
                  value: 100,
                  message: "Content must be at least 100 characters",
                },
              })}
              ref={(e) => {
                register("content").ref(e);
                if (e) contentRef.current = e;
              }}
              placeholder="Tell your story..."
              onInput={(e) =>
                handleTextareaResize(e.target as HTMLTextAreaElement)
              }
              className="w-full bg-transparent text-xl leading-relaxed text-[#111813] placeholder:text-[#63886f]/40 border-none focus:ring-0 focus:outline-none resize-none h-full font-serif font-light"
              style={{ minHeight: "400px" }}
            />
            {errors.content && (
              <span className="text-red-500 text-sm mt-2 block">
                {errors.content.message}
              </span>
            )}
          </div>

          {/* Categories Section */}
          <section className="mt-12 pt-8 border-t border-[#dce5df]">
            <div className="flex flex-col gap-4">
              {/* Section Header */}
              <div className="flex items-center gap-2 text-[#63886f] mb-2">
                <FolderOpen className="size-4" />
                <span className="text-sm font-sans uppercase tracking-wider font-semibold">
                  Categorize your story
                </span>
              </div>

              {/* Category Buttons */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`group relative flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer ${
                      selectedCategory === category
                        ? "pl-3 pr-4 bg-[#17cf54]/10 hover:bg-[#17cf54]/20 border border-[#17cf54]/20"
                        : "bg-white hover:bg-gray-100 border border-[#dce5df]"
                    }`}
                  >
                    {selectedCategory === category && (
                      <CheckCircle className="size-4 text-[#17cf54]" />
                    )}
                    <span
                      className={`text-sm font-medium font-sans ${
                        selectedCategory === category
                          ? "text-[#17cf54]"
                          : "text-[#111813]"
                      }`}
                    >
                      {category}
                    </span>
                  </button>
                ))}

                {/* Add New Topic Button */}
                <button
                  type="button"
                  className="group flex items-center gap-1 px-3 py-2 rounded-full text-[#63886f] hover:text-[#17cf54] transition-colors cursor-pointer border border-transparent hover:border-[#17cf54]/20 border-dashed"
                >
                  <Plus className="size-4" />
                  <span className="text-sm font-medium font-sans">
                    New Topic
                  </span>
                </button>
              </div>

              <p className="text-xs text-[#63886f] mt-2">
                Selecting a category helps readers find your article.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Word Count (Desktop) */}
      <div className="fixed bottom-4 right-6 hidden lg:flex flex-col items-end gap-2 text-[#63886f] pointer-events-none">
        <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#dce5df] shadow-sm">
          <span className="text-xs font-sans">{wordCount} words</span>
        </div>
      </div>
    </div>
  );
}
