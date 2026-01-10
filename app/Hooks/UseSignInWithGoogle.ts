import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, usersReference } from "@/lib/firebase";
import { useState } from "react";
export function useSignInWithGoogle() {
  const [error, setError] = useState<string>("");
  async function loginInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docReference = doc(usersReference, user.uid);
      await setDoc(
        docReference,
        {
          userName: user.displayName,
          email: user.email,
        },
        { merge: true }
      );
      return true;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error("An unexpected error occurred", error);
        setError("An unexpected error occurred");
      }
      return false;
    }
  }
  return { loginInWithGoogle, error };
}
