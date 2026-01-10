import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { usersReference } from "@/lib/firebase";
export interface UserProfile {
  uid: string;
  userName: string;
  photoURL?: string;
  bio?: string;
  joinedAt?: number;
}

export function useGetUserProfile(userId: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function fetchUser() {
      setLoading(true);
      try {
        const docReference = doc(usersReference, userId);
        const userDoc = await getDoc(docReference);
        if (userDoc.exists()) {
          setProfile(userDoc.data() as UserProfile);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  return { profile, loadingProfile };
}
