"use client";
import Link from "next/link";
import GoogleIcon from "@/components/GoogleIcon";
import FacebookIcon from "@/components/FacebookIcon";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useForm } from "react-hook-form";
export default function SignIn() {
  interface SignIn {
    email: string;
    password: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>();

  async function onSubmit(data: SignIn) {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
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
                placeholder="At least 6 characters"
                className="outline-none bg-white px-3 py-2 border border-[#dce5df] rounded-xl font-light"
              />
              {errors.password && (
                <p className="text-red-700"> {errors.password.message} </p>
              )}
            </div>
            <div className="flex flex-col">
              <button
                className="bg-greenish cursor-pointer text-white px-3 py-2 rounded-2xl"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
