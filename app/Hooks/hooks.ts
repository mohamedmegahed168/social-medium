import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, usersReference } from "@/lib/firebase";
import { doc, getDoc, DocumentData } from "firebase/firestore";
interface userInterface {
  user: User | null;
  loading: boolean;
  userData: DocumentData | null;
  error: string | null;
}
interface userInfo {
  userName: string;
}
export function useAuth(): userInterface {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<userInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setUser(user);
          const docReference = doc(usersReference, user.uid);
          const docData = await getDoc(docReference);
          if (docData.exists()) {
            setUserData(docData.data() as userInfo);
          } else {
            setUserData(null);
          }
        } else {
          setUser(null);
          setUserData(null);
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Unknown error occored"
        );
      } finally {
        setLoading(false);
      }
    });
    return () => unSubscribe();
  }, []);
  return { user, loading, userData, error };
}
