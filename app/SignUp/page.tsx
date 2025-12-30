import FacebookIcon from "@/components/FacebookIcon";
import GoogleIcon from "@/components/GoogleIcon";
import Link from "next/link";
export default function SignUp() {
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
                className="w-full border border-[#dce5df] px-4 py-2 rounded-2xl flex items-center justify-center gap-3 hover:shadow-sm transition-shadow"
              >
                <GoogleIcon />
                <span className="text-sm sm:text-base">
                  Sign up with Google
                </span>
              </button>
              <button
                type="button"
                className="w-full border border-[#dce5df] px-4 py-2 rounded-2xl flex items-center justify-center gap-3 hover:shadow-sm transition-shadow"
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

              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-[var(--color-secondary)]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    required
                    id="email"
                    className="resize-none overflow-hidden text-base font-light outline-none border border-[#dce5df] rounded-xl px-4 py-2 focus:border-[var(--color-greenish)] focus:ring-1 focus:ring-[var(--color-greenish)] focus:ring-opacity-20"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="userName"
                    className="text-[var(--color-secondary)]"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="your username"
                    required
                    id="userName"
                    className="outline-none border border-[#dce5df] rounded-xl px-4 py-2 focus:border-[var(--color-greenish)] focus:ring-1 focus:ring-[var(--color-greenish)] focus:ring-opacity-20"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="password"
                    className="text-[var(--color-secondary)]"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="at least 8 characters"
                    id="password"
                    required
                    className="rounded-xl outline-none border border-[#dce5df] px-4 py-2 focus:border-[var(--color-greenish)] focus:ring-1 focus:ring-[var(--color-greenish)] focus:ring-opacity-20"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-[var(--color-greenish)] text-white text-lg rounded-xl font-semibold transition-colors hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[var(--color-greenish)] focus:ring-opacity-30"
                >
                  Create account
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
