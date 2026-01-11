import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore"; // Change getDoc to onSnapshot
import { usersReference } from "@/lib/firebase";
export interface UserProfile {
  uid: string;
  userName: string;
  photoURL?: string;
  bio?: string;
  role?: string;
}

export function useGetUserProfile(userId: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const docReference = doc(usersReference, userId);
    const unsubscribe = onSnapshot(
      docReference,
      (docSnap) => {
        setLoading(true);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          setProfile(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { profile, loadingProfile };
}
