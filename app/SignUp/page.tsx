"use client";
import FacebookIcon from "@/components/FacebookIcon";
import GoogleIcon from "@/components/GoogleIcon";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, usersReference } from "@/lib/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
export default function SignUp() {
  interface SignUp {
    email: string;
    userName: string;
    password: string;
    confirmPassword: string;
  }

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignUp>();
  const password = watch("password");
  const router = useRouter();
  const [generalErrors, setGeneralErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  async function onSubmit(data: SignUp) {
    setGeneralErrors(null);
    const { email, userName, password } = data;
    try {
      setLoading(true);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const docId = userCredentials.user.uid;
      await setDoc(doc(usersReference, docId), {
        userName: userName,
        email: email,
      });
      router.push("/Dashboard");
    } catch (error) {
      setLoading(false);
      fireBaseErrors(error);
    } finally {
      setLoading(false);
    }
  }
  function fireBaseErrors(error: unknown) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("email", {
            type: "manual",
            message: "This email is already registered",
          });
          break;
        case "auth/invalid-email":
          setError("email", {
            type: "manual",
            message: "Invalied email address",
          });
          break;
        case "auth/network-request-failed":
          setGeneralErrors("Network error. Please check your connection");
          break;
        case "auth/too-many-requests":
          setGeneralErrors("Too many attempts. Please try again later");
          break;
        default:
          setGeneralErrors("Something went wrong. Please try again");
      }
    } else {
      setGeneralErrors("An unexpected error occured");
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen h-full flex flex-col gap-2">
      <header className="bg-white border-b border-solid border-[#dce5df] rounded-lg px-4 py-2 flex justify-between ">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-light)] text-[var(--color-primary)] font-bold">
            S
          </span>
          <Link
            href="/"
            className="text-xl sm:text-2xl font-semibold leading-none"
          >
            Social Medium
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/SignIn"
            className="text-sm sm:text-base font-medium text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
          >
            Sign In
          </Link>
        </div>
      </header>
      <main className="flex flex-col items-center flex-1 px-3 py-1">
        <div className="w-full max-w-lg">
          <div className="flex flex-col text-center">
            <h1 className="text-3xl  font-bold leading-tight tracking-tight text-[var(--color-primary)]">
              Join our community of thinkers
            </h1>
            <p className="text-[var(--color-secondary)] mt-2 text-sm sm:text-base">
              Read, write, and deepen your understanding
            </p>
          </div>
          <div className="  py-2">
            <div className="flex flex-col gap-4">
              <button
                type="button"
                className="w-full cursor-pointer bg-white border border-[#dce5df] px-4 py-2 rounded-2xl flex items-center justify-center gap-3 hover:shadow-sm transition-shadow"
              >
                <GoogleIcon />
                <span className="text-sm sm:text-base">
                  Sign up with Google
                </span>
              </button>
              <button
                type="button"
                className="w-full cursor-pointer bg-white border border-[#dce5df] px-4 py-2 rounded-2xl flex items-center justify-center gap-3 hover:shadow-sm transition-shadow"
              >
                <FacebookIcon />
                <span className="text-sm sm:text-base">
                  Sign up with Facebook
                </span>
              </button>

              <div className="relative flex items-center justify-center pt-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative bg-gray-50 px-4 text-sm text-gray-500">
                  Or sign up with email
                </div>
              </div>

              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                {generalErrors && (
                  <p className="text-red-700"> {generalErrors} </p>
                )}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-[var(--color-secondary)]"
                  >
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: "email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email",
                      },
                    })}
                    autoComplete="email"
                    placeholder="name@example.com"
                    id="email"
                    className="resize-none bg-white overflow-hidden text-base font-light outline-none border border-[#dce5df] rounded-xl px-4 py-2 focus:border-[var(--color-greenish)] focus:ring-1 focus:ring-[var(--color-greenish)] focus:ring-opacity-20"
                  />
                  {errors.email && (
                    <p className="text-red-700">{errors.email.message}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="userName"
                    className="text-[var(--color-secondary)]"
                  >
                    Username
                  </label>
                  <input
                    {...register("userName", {
                      required: "username is required",
                      minLength: {
                        value: 3,
                        message: "username must be at least 3 characters",
                      },
                    })}
                    type="text"
                    placeholder="your username"
                    id="userName"
                    className="outline-none bg-white font-light border border-[#dce5df] rounded-xl px-4 py-2 focus:border-[var(--color-greenish)] focus:ring-1 focus:ring-[var(--color-greenish)] focus:ring-opacity-20"
                  />
                  {errors.userName && (
                    <p className="text-red-700"> {errors.userName.message} </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="password"
                    className="text-[var(--color-secondary)]"
                  >
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: "password is required",
                      minLength: {
                        value: 6,
                        message: "password must be at least 6 characters",
                      },
                    })}
                    type="password"
                    placeholder="at least 6characters"
                    id="password"
                    className="font-light rounded-xl bg-white outline-none border border-[#dce5df] px-4 py-2 focus:border-[var(--color-greenish)] focus:ring-1 focus:ring-[var(--color-greenish)] focus:ring-opacity-20"
                  />
                  {errors.password && (
                    <p className="text-red-700"> {errors.password.message} </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-[var(--color-secondary)]"
                  >
                    confirm your password
                  </label>
                  <input
                    {...register("confirmPassword", {
                      required: "please confirm your password",
                      validate: (value) =>
                        value === password || "password do not match",
                    })}
                    type="password"
                    placeholder="confirm your password"
                    id="confirmPassword"
                    className="font-light rounded-xl bg-white outline-none border border-[#dce5df] px-4 py-2 focus:border-[var(--color-greenish)] focus:ring-1 focus:ring-[var(--color-greenish)] focus:ring-opacity-20"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-700">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={` flex items-center justify-center cursor-pointer  px-4 py-2  text-white rounded-2xl transition-colors ${
                    loading ? "bg-[#1c2e22]" : "bg-greenish"
                  } hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[var(--color-greenish)] focus:ring-opacity-30`}
                >
                  {loading ? (
                    <>
                      <span className="inline-block w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Setting up your account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
