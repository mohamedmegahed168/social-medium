"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { articlesReference } from "@/lib/firebase";
import { useAuth } from "@/app/Hooks/UseAuth";
import { useEdit } from "@/app/Hooks/UseEdit";

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { updateArticle, loading } = useEdit();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  useEffect(() => {
    async function getArticle() {
      if (!id) return;
      const docReference = doc(articlesReference, id as string);
      const docSnap = await getDoc(docReference);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        if (user && docData.authorId !== user.uid) {
          alert("You're not authorized to edit this");
          router.push("/Dashboard");
          return;
        }
        setTitle(docData.title);
        setContent(docData.content);
        setSelectedTopics(docData.topics);
      } else {
        alert("Article not found");
      }
    }
    if (user) getArticle();
  }, [id, router, user]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    try {
      console.log("we're on the function");
      const success = await updateArticle(
        id as string,
        title,
        content,
        selectedTopics
      );
      console.log(success);
      if (!success) {
        alert("it's not success");
      } else {
        router.push("/Dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Article</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-2 rounded h-40"
          />
        </div>

        {/* ... Add your Topic Selector here ... */}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()} // Go back button
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
