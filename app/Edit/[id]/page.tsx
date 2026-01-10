"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { doc, getDoc } from "firebase/firestore";
import { articlesReference } from "@/lib/firebase";
import { useAuth } from "@/app/Hooks/UseAuth";
import { useEdit } from "@/app/Hooks/UseEdit";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Article } from "@/app/Hooks/UseGetArticles";

// 1. Define Types Outside
interface PostFormData {
  title: string;
  content: string;
  topics: string[];
}

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { updateArticle, loading } = useEdit();

  // 2. UX States
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // 3. React Hook Form Setup (Single Source of Truth)
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<PostFormData>({
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      topics: [],
    },
  });

  // Watch values for UI updates (Character counts, Auto-resize, Topic styles)
  const currentContent = useWatch({ control, name: "content" });
  const currentTopics = useWatch({ control, name: "topics" });

  const allTopics = [
    "Literature",
    "Technology",
    "Productivity",
    "Religion",
    "Art",
    "Science",
    "Business",
    "Culture",
    "Data Science",
    "Politics",
    "Cryptocurrency",
    "Psychology",
  ];

  useEffect(() => {
    async function fetchArticle() {
      if (!id) return;
      try {
        const snap = await getDoc(doc(articlesReference, id as string));

        if (!snap.exists()) {
          setFetchError("Article not found.");
          setFetching(false);
          return;
        }

        const data = snap.data() as Article;

        if (user && data.authorId !== user.uid) {
          setFetchError("Permission denied.");
          setTimeout(() => router.push("/Dashboard"), 2000);
          return;
        }

        reset({
          title: data.title || "",
          content: data.content || "",
          topics: data.topics || [],
        });
      } catch (err) {
        console.error(err);
        setFetchError("Could not load article.");
      } finally {
        setFetching(false);
      }
    }

    if (user) fetchArticle();
  }, [id, user, router, reset]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [currentContent]);

  // 6. Handle Logic
  function toggleTopic(topic: string) {
    const current = currentTopics || [];
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

  const onSubmit = async (data: PostFormData) => {
    if (loading) return;

    const success = await updateArticle(
      id as string,
      data.title,
      data.content,
      data.topics
    );

    if (success) {
      setSaveSuccess(true);
      reset(data);
      setTimeout(() => router.push("/Dashboard"), 1000);
    } else {
      setFetchError("Failed to save changes.");
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#2d5e40]" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center text-red-600">
        {fetchError}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#222222]">
      {/* HEADER */}
      <nav className="sticky top-0 z-50 bg-[#fdfbf7]/95 backdrop-blur-sm border-b border-[#e0e0e0] px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm text-gray-500 hidden md:block">
            Editing draft as{" "}
            <span className="text-[#222222] font-medium">
              {user?.displayName}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess ? (
            <span className="flex items-center gap-1 text-[#2d5e40] text-sm font-medium">
              <CheckCircle2 size={16} /> Saved
            </span>
          ) : (
            <span className="text-xs text-gray-400 mr-2">
              {isDirty ? "Unsaved changes" : "All changes saved"}
            </span>
          )}

          <button
            onClick={handleSubmit(onSubmit)}
            disabled={loading || saveSuccess}
            className={`
    px-4 py-1.5 rounded-full text-sm font-medium transition-all
    ${
      !loading && !saveSuccess
        ? "bg-[#2d5e40] text-white hover:bg-[#1a3625] shadow-sm"
        : "bg-gray-200 text-gray-400 cursor-not-allowed"
    }
  `}
          >
            {loading ? "Publishing..." : "Save and Publish"}
          </button>
        </div>
      </nav>

      {/* EDITOR */}
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto px-4 py-12 md:py-16"
      >
        {/* Title Input */}
        <div className="flex flex-col justify-center mb-5">
          <input
            type="text"
            placeholder="Title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 5,
                message: "Title must be at least 5 chars",
              },
            })}
            className="w-full px-3 py-3 text-4xl md:text-3xl font-normal bg-transparent border border-gray-200 rounded-2xl  outline-none focus:ring-0  text-primary mb-2  leading-tight"
          />
          {errors.title && (
            <p className="text-sm text-red-500 pl-3">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {allTopics.map((topic) => {
            const isSelected = currentTopics?.includes(topic);
            return (
              <button
                key={topic}
                type="button"
                onClick={() => toggleTopic(topic)}
                className={`
                  px-3 py-1 rounded-full text-xs font-medium border transition-colors
                  ${
                    isSelected
                      ? "bg-[#eef5f0] text-[#2d5e40] border-[#2d5e40]"
                      : "bg-transparent text-gray-500 border-gray-200 hover:border-gray-400"
                  }
                `}
              >
                {topic}
              </button>
            );
          })}
        </div>

        <div>
          <textarea
            placeholder="Tell your story..."
            {...register("content", {
              required: "Content is required",
              minLength: { value: 100, message: "Content is too short" },
            })}
            ref={(e) => {
              register("content").ref(e);
              textareaRef.current = e;
            }}
            className="w-full px-3 py-3 min-h-[60vh] text-lg md:text-xl text-primary font-light leading-relaxed bg-transparent border border-gray-200 outline-none rounded-2xl focus:ring-0 resize-none"
          />
          {errors.content && (
            <p className="text-sm text-red-500 mt-2">
              {errors.content.message}
            </p>
          )}
        </div>
      </motion.main>
    </div>
  );
}
