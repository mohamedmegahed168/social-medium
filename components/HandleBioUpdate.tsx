"use client";
import { useState } from "react";
import { Pencil, X, Check } from "lucide-react";
import { useAuth } from "@/app/Hooks/UseAuth";
import { useUpdateProfile } from "@/app/Hooks/UseUpdateBio";
import { motion, AnimatePresence } from "framer-motion";

interface EditBioProps {
  profileId: string;
  currentBio: string;
}

export default function HandleBioUpdate({
  profileId,
  currentBio,
}: EditBioProps) {
  const { user, userData } = useAuth();
  const { updateBio, updating } = useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [bioText, setBioText] = useState(currentBio || "");

  if (!user || !userData) return null;

  const isOwner = user.uid === profileId;
  const isAdmin = userData.role === "admin";

  if (!isOwner && !isAdmin) return null;

  const handleSave = async () => {
    const success = await updateBio(profileId, bioText);
    if (success) {
      setIsEditing(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsEditing(true)}
        className="ml-2 p-1 text-gray-700 border border-gray-400 px-2 py-2 cursor-pointer hover:text-[#2d5e40] hover:bg-gray-50 transition-colors rounded-full bg-gray-300 "
        title="Edit Bio"
      >
        <Pencil size={24} />
      </button>

      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#fdfbf7]">
                <h3 className="font-bold text-[#222222]">Update Bio</h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <textarea
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  placeholder="Tell the world about yourself..."
                  className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2d5e40] focus:border-transparent outline-none resize-none text-[#222222]"
                  maxLength={160}
                />
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>{bioText.length}/160</span>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-700 hover:border hover:border-gray-300 rounded-lg text-sm font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={updating}
                  className="px-4 py-2 bg-[#2d5e40] cursor-pointer text-white rounded-lg text-sm font-medium hover:bg-[#1f422d] flex items-center gap-2 disabled:opacity-50"
                >
                  {updating ? (
                    "Saving..."
                  ) : (
                    <>
                      <Check size={16} /> Save Bio
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
