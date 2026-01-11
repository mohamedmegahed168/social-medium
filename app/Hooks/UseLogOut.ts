import { useState } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export const UseLogOut = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      router.replace("/SignIn");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
};
