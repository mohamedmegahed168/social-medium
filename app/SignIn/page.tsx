"use client";
import Link from "next/link";
import GoogleIcon from "@/components/GoogleIcon";
import FacebookIcon from "@/components/FacebookIcon";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
export default function SignIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const [generalErrors, setGeneralErrors] = useState<string>("");
  const router = useRouter();
  interface SignIn {
    email: string;
    password: string;
    confirmPassword: string;
  }
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignIn>();
  const password = watch("password");
  async function onSubmit(data: SignIn) {
    setLoading(true);
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/Dashboard");
    } catch (error) {
      fireBaseErrors(error);
      setLoading(false);
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
    <div className="bg-gray-50 min-h-screen h-full flex flex-col">
      <header className="bg-white border-b border-[#dce5df] flex justify-between items-center px-2 py-3 sm:px-5">
        <div>
          <Link href="/" className="text-xl md:text-2xl font-bold">
            {" "}
            Social Medium{" "}
          </Link>
        </div>
        <div className="flex sm:gap-2">
          <p className="hidden sm:block text-md px-3 py-2 text-secondary">
            Don&apos;t have an account?
          </p>
          <Link
            href="/SignUp"
            className="text-sm border border-greenish text-greenish rounded-2xl px-3 py-2"
          >
            Sign up
          </Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center px-6">
        <div className="max-w-lg w-full flex flex-col gap-5 py-5 ">
          <div className="text-center flex flex-col gap-3">
            <h1 className="text-4xl leading-tight tracking-tight font-semibold">
              {" "}
              Welcome Back
            </h1>
            <p className="text-secondary">
              Sign in to access your personalized stories, bookmarks, and more.{" "}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button className="bg-white cursor-pointer px-3 py-2 flex items-center justify-center rounded-2xl gap-2  ">
              <GoogleIcon /> Sign in with google
            </button>
            <button className="bg-white cursor-pointer px-3 py-2 flex items-center justify-center rounded-2xl gap-2">
              <FacebookIcon />
              Sign in with facebook
            </button>
          </div>
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative bg-gray-50 px-4 text-sm text-gray-500">
              Or sign in with email
            </div>
          </div>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            {generalErrors && <p className="text-red-700"> {generalErrors} </p>}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-secondary">
                email:
              </label>
              <input
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email",
                  },
                })}
                id="email"
                placeholder="username@example.com"
                className="bg-white outline-none border border-[#dce5df] px-3 py-2 font-light rounded-xl"
              />
              {errors.email && (
                <p className="text-red-700"> {errors.email.message} </p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-secondary">
                password:
              </label>
              <input
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message: "password is required",
                  },
                })}
                id="password"
                type="password"
                placeholder="At least 6 characters"
                className="outline-none bg-white px-3 py-2 border border-[#dce5df] rounded-xl font-light"
              />
              {errors.password && (
                <p className="text-red-700"> {errors.password.message} </p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="text-secondary">
                confirm password:
              </label>
              <input
                {...register("confirmPassword", {
                  required: "you have to confirm your password",
                  validate: (value) =>
                    value === password || "password do not match",
                })}
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="outline-none bg-white px-3 py-2 border border-[#dce5df] rounded-xl font-light"
              />
              {errors.confirmPassword && (
                <p className="text-red-700">
                  {" "}
                  {errors.confirmPassword.message}{" "}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <button
                disabled={loading}
                className={`flex items-center justify-center  text-white px-3 py-2 rounded-2xl ${
                  loading
                    ? "bg-[#1c2e22] cursor-not-allowed"
                    : "bg-greenish cursor-pointer hover:bg-[#1c2e22] transition-colors"
                }`}
                type="submit"
              >
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing you in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
