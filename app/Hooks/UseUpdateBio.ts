import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { usersReference } from "@/lib/firebase";
export const useUpdateProfile = () => {
  const [updating, setUpdating] = useState(false);

  const updateBio = async (userId: string, newBio: string) => {
    setUpdating(true);
    try {
      const userRef = doc(usersReference, userId);
      await updateDoc(userRef, {
        bio: newBio,
      });
      return true;
    } catch (error) {
      console.error("Error updating bio:", error);
      return false;
    } finally {
      setUpdating(false);
    }
  };

  return { updateBio, updating };
};
