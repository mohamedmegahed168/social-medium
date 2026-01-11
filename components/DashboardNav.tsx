import Link from "next/link";
import { Search, SquarePen, BookOpen } from "lucide-react";
import { motion } from "motion/react";
interface userData {
  userName: string;
  userId: string;
}
export default function DashboardNav({ userName, userId }: userData) {
  return (
    <nav className=" sticky top-0 z-50 w-full w-full bg-[#fdfbf7]/95 backdrop-blur-md border-b border-[#e0e0e0]">
      <div className=" px-4 md:px-0 h-16 mx-auto max-w-7xl flex  items-center justify-between ">
        <div className="flex items-center gap-6">
          <Link href="/">
            <motion.div
              className="flex items-center gap-3 text-primary cursor-pointer"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.div
                variants={{
                  rest: { rotate: 0, scale: 1 },
                  hover: {
                    rotate: -12,
                    scale: 1.1,
                    transition: { type: "spring", stiffness: 300, damping: 10 },
                  },
                }}
                className="text-[#2d5e40] flex items-center justify-center"
              >
                <BookOpen size={30} />
              </motion.div>

              <motion.span
                className="text-2xl font-bold tracking-tight text-primary"
                variants={{
                  rest: { scale: 1, color: "inherit" },
                  hover: {
                    scale: 1.02,
                    color: "#17cf54",
                    transition: { duration: 0.2 },
                  },
                }}
              >
                Social Medium
              </motion.span>
            </motion.div>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 items-center max-w-[280px]">
            <div className="flex w-full items-center rounded-full bg-[#f4f1ea] px-3 py-2 transition-colors focus-within:bg-white focus-within:ring-1 focus-within:ring-[#2d5e40]/20 border border-transparent focus-within:border-[#2d5e40]/20">
              <Search className="size-5 text-[#6b6b6b]" />
              <input
                className="ml-2 text-sm text-[#222222] placeholder-[#6b6b6b] focus:outline-none"
                placeholder="Search"
                type="text"
              />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/Write"
            className="flex items-center gap-2 text-[#6b6b6b] hover:text-[#222222] transition-colors"
          >
            <SquarePen className="size-6" strokeWidth={1.5} />
            <span className="hidden sm:inline text-sm font-medium">Write</span>
          </Link>
          <button className="bg-[#2d5e40] hover:bg-[#254f36] text-white text-sm font-bold px-5 py-2 rounded-full transition-colors shadow-sm hover:shadow-md">
            Sign out
          </button>
          <Link href={`/Profile/${userId}`}>
            <div className="relative cursor-pointer group">
              <div className="text-white flex items-center justify-center bg-center bg-[#1c2e22] bg-no-repeat bg-cover rounded-full size-9 border border-[#e0e0e0] group-hover:border-[#2d5e40] transition-colors">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
