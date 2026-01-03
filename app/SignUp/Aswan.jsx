"use client";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/storage/firebase";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    general: "",
  });
  const router = useRouter();
  const usersCollection = collection(db, "users");
  function validateForm() {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      general: "",
    };

    if (!name || !name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      isValid = false;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }
  async function handleSignUp(event) {
    event.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setErrors({ name: "", email: "", password: "", general: "" });
    try {
      const trimmedEmail = email.trim();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        trimmedEmail,
        password
      );
      const user = userCredentials.user;
      await setDoc(doc(usersCollection, user.uid), {
        name: name.trim(),
        email: trimmedEmail,
        createdAt: serverTimestamp(),
      });
      router.push("/dashboard");
    } catch (error) {
      handleFirebaseErrors(error?.code || error?.message || "unknown");
    } finally {
      setIsSubmitting(false);
    }
  }
  function handleFirebaseErrors(errorCode) {
    switch (errorCode) {
      case "auth/email-already-in-use":
        setErrors((prev) => ({
          ...prev,
          email: "This email is already registered",
        }));
        break;
      case "auth/network-request-failed":
        setErrors((prev) => ({
          ...prev,
          general: "Network error. Check your connection.",
        }));
        break;
      case "auth/too-many-requests":
        setErrors((prev) => ({
          ...prev,
          password: "Too many attempts. Try again later.",
        }));
        break;
      case "auth/weak-password":
        setErrors((prev) => ({
          ...prev,
          password: "Password is too weak. Use at least 6 characters.",
        }));
        break;
      default:
        setErrors((prev) => ({
          ...prev,
          general: "Something went wrong. Please try again",
        }));
    }
  }
  const reduce = useReducedMotion();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md">
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 8 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: [0.2, 0.9, 0.2, 1] }}
            className="bg-white shadow-xl rounded-xl p-8 min-h-96 space-y-4"
          >
            <h1 className="text-3xl font-bold animate-fade-in">Sign Up</h1>
            {errors.general && (
              <p
                role="alert"
                aria-live="assertive"
                className="text-sm font-normal text-red-500"
              >
                {errors.general}
              </p>
            )}
            <form className=" text-gray-600 space-y-3" onSubmit={handleSignUp}>
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium ">
                  Name:
                </label>
                <input
                  autoFocus
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="full name"
                  id="name"
                  aria-invalid={!!errors.name}
                  className="w-full font-normal  px-4 py-3 border border-gray-300 focus:outline-[var(--color-primary)] rounded-xl"
                />
                {errors.name && (
                  <p className="text-sm font-normal pl-2 text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium ">
                  Email:
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  required
                  placeholder="email"
                  id="email"
                  aria-invalid={!!errors.email}
                  className="w-full font-normal  px-4 py-3 border border-gray-300 rounded-xl focus:outline-[var(--color-primary)]"
                />
                {errors.email && (
                  <p className="text-sm font-medium text-red-500 pl-2">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium "
                >
                  Password:
                </label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    name="password"
                    placeholder="password"
                    id="password"
                    aria-invalid={!!errors.password}
                    className="w-full font-normal px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-[var(--color-primary)]"
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 pl-2">{errors.password}</p>
                )}
              </div>
              <div className="text-md font-normal">
                <p>
                  Do you have an account already?
                  <Link
                    href="/signin"
                    className="pl-1 text-[var(--color-primary)] hover:text-[var(--primary-dark)]"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
              <motion.button
                type="submit"
                whileHover={reduce ? {} : { scale: 1.02 }}
                whileTap={reduce ? {} : { scale: 0.98 }}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className={`w-full text-white text-lg py-3 rounded-xl cursor-pointer font-semibold transition-all ${isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-[var(--color-primary)] hover:bg-[var(--primary-dark)]"}`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    <span>Signing up...</span>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
