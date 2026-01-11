import Link from "next/link";
import { SquarePen } from "lucide-react";
export default function CallToAction() {
  return (
    <section className="w-full bg-[#f6f8f6] py-20 px-4 md:px-10">
      <div className="mx-auto max-w-[960px]">
        <div className="relative overflow-hidden rounded-[2rem] bg-white border border-[#dce5df] shadow-2xl">
          {/* Glow Effects */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#17cf54] opacity-10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#17cf54] opacity-10 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-10 md:p-16 gap-10">
            {/* Left Content */}
            <div className="flex flex-col gap-6 md:flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-[#111813] leading-[1.1] tracking-tight">
                Ready to share <br />
                <span className="text-[#17cf54]">your story?</span>
              </h2>
              <p className="text-lg text-[#63886f] font-medium">
                Join a community of thousands of writers and readers. Your
                audience is waiting for your unique voice.
              </p>
              <div className="block  sm:hidden w-full py-4">
                <div className="relative flex items-center justify-center w-32 h-32 mx-auto bg-[#f6f8f6] rounded-full border-4 border-white shadow-xl">
                  <SquarePen className="size-16 text-[#17cf54]" />
                  <div className="absolute -bottom-4 -right-4 bg-white text-[#111813] px-2 py-1 rounded-lg font-bold text-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-2 border border-[#f0f4f2]">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Live Editor
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/SignUp"
                  className="inline-flex items-center justify-center h-14 px-8 rounded-xl bg-[#17cf54] text-white text-base font-bold hover:bg-[#12a543] transition-colors shadow-lg shadow-green-500/20"
                >
                  Start Writing Now
                </Link>
                <Link
                  href="#ourStory"
                  className="inline-flex items-center justify-center h-14 px-8 rounded-xl bg-transparent border border-[#dce5df] text-[#111813] text-base font-bold hover:bg-gray-50 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right - Icon Circle */}
            <div className="hidden sm:flex relative shrink-0">
              <div className="relative w-48 h-48 bg-[#f6f8f6] rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                <SquarePen className="size-16 text-[#17cf54]" />
                <div className="absolute -bottom-4 -right-4 bg-white text-[#111813] px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-bold text-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-2 border border-[#f0f4f2]">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Live Editor
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
