import { Trash2, AlertTriangle } from "lucide-react";
import { useDeleteArticle } from "@/app/Hooks/UseDeleteArticle";
import { useState } from "react";
interface DeleteInfo {
  articleId: string;
  authorId: string;
  userId: string;
}
export default function HandleDeletes({
  articleId,
  authorId,
  userId,
}: DeleteInfo) {
  console.log(articleId, authorId, userId);
  const { deleteArticle, loading } = useDeleteArticle();
  const [showModal, setShowModal] = useState<boolean>(false);
  async function deleteHandler() {
    if (authorId !== userId) {
      console.log("deleting");
      return;
    }

    try {
      const success = await deleteArticle(articleId);
      console.log(success);
      if (!success) return;
      else if (success) {
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <button className="cursor-pointer" onClick={() => setShowModal(true)}>
        <Trash2 />
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>

              <h3 className="text-lg font-bold text-gray-900">
                Delete Article?
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Are you sure you want to delete this? This action cannot be
                undone.
              </p>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-center">
              <button
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 font-medium text-sm transition-colors"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
                onClick={deleteHandler}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    deleting....
                  </>
                ) : (
                  "yes, delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
