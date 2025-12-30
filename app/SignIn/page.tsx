import Link from "next/link";
import GoogleIcon from "@/components/GoogleIcon";
import FacebookIcon from "@/components/FacebookIcon";
export default function SignIn() {
  return (
    <div className="bg-gray-50 min-h-screen h-full flex flex-col">
      <header className="bg-white border-b border-[#dce5df] flex justify-between items-center px-6 py-3 ">
        <div>
          <Link href="/" className="text-xl md:text-2xl font-bold">
            {" "}
            Social Medium{" "}
          </Link>
        </div>
        <div className="flex gap-2">
          <p> Don&apos;t have an account? </p>
          <Link href="/SignUp"> Sign up</Link>
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
            <button className="bg-white px-3 py-2 flex items-center justify-center rounded-2xl gap-2  ">
              <GoogleIcon /> Sign in with google
            </button>
            <button className="bg-white px-3 py-2 flex items-center justify-center rounded-2xl gap-2">
              <FacebookIcon />
              Sign in with facebook
            </button>
          </div>
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative bg-gray-50 px-4 text-sm text-gray-500">
              Or sign up with email
            </div>
          </div>
          <form className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-secondary">
                email:
              </label>
              <input
                id="email"
                placeholder="username@example.com"
                required
                className="bg-white outline-none border border-[#dce5df] px-3 py-2 font-light rounded-xl"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-secondary">
                password:
              </label>
              <input
                id="password"
                placeholder="At least 6 characters"
                required
                className="outline-none bg-white px-3 py-2 border border-[#dce5df] rounded-xl font-light"
              />
            </div>
          </form>
          <div className="flex flex-col">
            <button className="bg-greenish text-white px-3 py-2 rounded-2xl">
              Sign in
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
