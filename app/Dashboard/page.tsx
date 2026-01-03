"use client";

import Link from "next/link";
import {
  Search,
  SquarePen,
  Bell,
  Bookmark,
  MinusCircle,
  MoreHorizontal,
  TrendingUp,
  Star,
} from "lucide-react";

export default function BlogDashboard() {
  const tabs = [
    { name: "For You", active: true },
    { name: "Following", active: false },
    { name: "Technology", active: false },
    { name: "Design", active: false },
    { name: "Culture", active: false },
    { name: "Productivity", active: false },
  ];

  const articles = [
    {
      author: {
        name: "Jane Doe",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuC07daGNTeR3hnw3NBYUyExboKiGwzFbKA84sOPUWo2peXXB971NCVz-dq1DBxuTfXgOHBpYb7fVByufqKgIEyCEf7Jpbz4Jaa0LKKlwyQM6crSeqfc4_N9TtqX6Fz4g4IzW74RxUeqYzPT-s9s2AAgcHuBQZi7gG2t84pcX5MJw507UIQ7NOgwBn4HutkpCoC0rm3UHZV9x7FlAx8SmOSyJfLAcRcXMVH_JSmvuZuMDsKIE6gLCUe20UYJjft3xdT9jjlp2XnRtX0",
      },
      publication: "UX Collective",
      date: "Oct 24",
      title: "Why Design Systems Matter for Scale",
      description:
        "A deep dive into the importance of consistency in UI design. When teams grow, fragmentation is inevitable unless a robust system is in place.",
      tag: "Design",
      readTime: "5 min read",
      memberOnly: false,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCsZP9uXphVlFgkUg3omo2olOhA6iS1d8g57mn7_QEF_-jKvMU29gPLRKxCqIcRQ2-1cXLgtPdrXz9BX-sMhT_ycYfEWzM6lE6EeYdHjLK1iB7xddKsevJdfLrPiaQcEECknRstwLSPkteU6Vb__yPaszPMdKOki8xK-9qqEIjHPZG81KYEtBRixExVB1RdcpRKMTbtSKMh22xwSqyGYGU7tLp5Guhe_11-zQLAb31PbbZIduMwzh0PlS7Lo13S3WDz1P7t-MkEDZg",
    },
    {
      author: {
        name: "John Smith",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDWkMPbO4vQVGBhw7gq08BzFsEINyRdCCZH7_UkhPjCxQ5a6l3csE6ulspz8BZh8jftlGcHG2CrEjk4EGFZuEaA7TgUzA0uOkGZo9zk4tPQ5sYqYzr_0QhUUFBWOUpNdF3Ipf7WpCQ9xcIsTmxngCM80zvRZs_28YnN0-Coj5MTqTkpyS5xEotTdRMUsJbQ9t64igP2YnM2VkR6tdmzPcaSfXRdvofKeanq7BsX7e_M7gAf8lMZmAqx8ASnR0458Z0-TnAcem0KTi4",
      },
      publication: null,
      date: "Oct 23",
      title: "The Future of AI in Creative Writing",
      description:
        "Exploring how artificial intelligence tools are changing the landscape for authors. Can robots feel? Can they write with soul?",
      tag: "Technology",
      readTime: "8 min read",
      memberOnly: true,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBe5qw34jF2ARxA9Jy03RUvDN_3SyGA2hYSQTpC9pyLTlfzPzgp6Ciam3jX2GtcWomKD8kvpwT-3I-f8qXdyqMKFC71zSeY6ZX3KDgB3nF8IQhT_xqQjbzhdPhXkpkyK-rd_YkPVS2cZVC3roL2sFJJvL9OskdNuDTBQ2-XGFTVipt8vBbbJxzMpJeTbeCF1rfTHDszY16fOjHIWi3Hly_7X3xcH3xu8TELqnqlp4X687CURk9QpXHcnK6gYmf14oAdPgKf_Ifl8II",
    },
    {
      author: {
        name: "Sarah Lee",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBoUnAeQQiLFlLedzr7ACLh3pezqWmJdC7dKL5k0OAmr0tGxIoK82iNYby8h1rwBg5vJfpqrKf861m0mDraQxVoasBk2a7mZ_qDYXWlfIOJn8a-YO8AG-zPAyMOSuFFoqlbHy3OZhLSXyvK5N1UJzH9A9O342yYu3-Vs32uCa_xy4P3YWRUpBe5Jkw8twsFTSvMEk9xZPyVbN6AeofL00_cmpkG5ZQfFXb5_mkFWjj1P-N2A6ZT9R3svDUGOiAZHMCi4KXFp26CbUk",
      },
      publication: null,
      date: "Oct 22",
      title: "My Journey to Digital Minimalism",
      description:
        "How decluttering my digital life improved my mental clarity and productivity. Less is truly more in a world of constant noise.",
      tag: "Self Improvement",
      readTime: "4 min read",
      memberOnly: false,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD4mSgeeN9FKdl-pplpQp5iV6ZEesDzCHkm0-RRLlRe41ol9n6iXwHc01BZ-YnJvGG4jcZKv1vTwOay7hMG8rCx_eIRG3Btn_H0lHXStOY-4IEf0xdE1ECrcSNbcyuBXv_HQz4ER82ZWVnuB22rrZnVfnqEIvZW6gRZZ2aeXO5BuhFqPUTzvAqivYJ7X5L7XR8_7i5ZWXkYn916GyL-1FZRmZB-OycrZxu9LEGdlkPOQBY655afTXLsL_xMmm63FFe-YDe08l09-Aw",
    },
    {
      author: {
        name: "Alex Chen",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD_cmkSVWiCP0kNNpN-xtFxWt0YvCthxHt3ELd_gQIZNaggbfkcTyQw6Y9LLMDFD3zX6sqGqgBSDTjnxqZVfCHr2_YVEcwSpqB-9LX1Y9yAUu8YtwA9CWNxxJh0ZCWrdSStLU-Q4amXG9qm5dEY1Op6pIArL5vcAghJaTMaTOZY6K1s4EQu9HhRJa161Gc8ae8_X1scIYy9zgNUrhcsnpx_TQccIHgl-ifjSg2jLvGFOSlRwoYpCE-35HZLQbb6hXPuFPjLyzpS-PY",
      },
      publication: "Better Programming",
      date: "Oct 20",
      title: "Refactoring Legacy Code: A Survival Guide",
      description:
        "Strategies for tackling technical debt without breaking production. Step 1: Tests. Step 2: More tests.",
      tag: "Programming",
      readTime: "12 min read",
      memberOnly: false,
      image: null,
    },
  ];

  const trending = [
    {
      author: {
        name: "Mark Zuckerberg",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDq3vxcXf6WTCnd0-uhQCJsz-FU-jGSchxlIOEwJYbsMW18mNFs3ASPC-zf-Ak3698GgT3cX_Gg4KN4nca3ttxXER2Syrna1UmeYmDSlz2BwlwxtbcvZ-iKzf7OfIXwBR_4PUNVyfUGU3HagBHOcm3g2I7KNAil5wE6zyLwDeGr5iF9xXntZak3kazXvNCEMjZiYYS7YFWOcSnhFs7X7szQ8_XDNIJWihKlZnit9x5co123sJCZwNjgsF2BNJHAnXeb2CheqW-ZVgA",
      },
      title: "Building the Metaverse",
      date: "Oct 24",
      readTime: "10 min read",
    },
    {
      author: {
        name: "Baratunde Thurston",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCMO4uKSPf_6rGEBIJQgFOU_jps2RXgQjUVpw1q8VZEFj_RCqt5UxHLu3dvLmXMPZeoHNWoTXN4OEFVryIe4q0vMNiHy53GEHxvi24QXtbIKRuVVt2mCU_6zima87QsFt4oyiWVvpuAWYUekGu01vQ84-rySG9t7qBFkRvJqacz1S8Gy3_ib4v3Fe_KBTk2m4LRoJFJOaspQhpOhegRV645oUzWRjPMqbyzUHwsoDstOIbNQzsBThAsg2bI9OBb11bZZCSXASlFChI",
      },
      title: "How to Be Black",
      date: "Oct 23",
      readTime: "6 min read",
    },
    {
      author: {
        name: "Microsoft Design",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBxPrK4vFLN8hHlWleJW5o5rWLT17-uG_8whnyuBmM3ZrJHdis5MSLZH3nIJ3xbZVn0maA-ZEC_hwo4k6JOi1jOopgo9JTcNKSwyyhfEOKq_EMfRe-Dkyen3rjJG8RwQOiMq4rQMjJMdM4QCpQISzy7dx_9ZgcRZdiFSkWp06zRLX66IWyGXtnvs5xXNsh-GG1aIfpdL9TqUg-WOxGgATdkJ20HECIlTHcac0A6wkILRpUIlS6GmGYwfOaMwlerx30gCf-EpD3c_AQ",
      },
      title: "Fluent Design System 2.0",
      date: "Oct 21",
      readTime: "5 min read",
    },
  ];

  const topics = ["Data Science", "Politics", "Cryptocurrency", "Psychology"];

  const footerLinks = [
    "Help",
    "Status",
    "Writers",
    "Blog",
    "Careers",
    "Privacy",
    "Terms",
    "About",
  ];

  return (
    <div className="bg-[#fdfbf7] text-[#222222] font-serif antialiased flex flex-col min-h-screen selection:bg-[#eef5f0] selection:text-[#2d5e40]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-[#fdfbf7]/95 backdrop-blur-md border-b border-[#e0e0e0]">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-10">
          {/* Left Side */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-3 text-[#222222] group hover:opacity-80 transition-opacity"
            >
              <div className="size-8 text-[#2d5e40]">
                <svg
                  className="w-full h-full"
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"
                    fill="currentColor"
                  />
                  <path
                    clipRule="evenodd"
                    d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#222222]">
                Writings
              </span>
            </Link>

            {/* Search */}
            <div className="hidden md:flex flex-1 items-center max-w-[280px]">
              <div className="flex w-full items-center rounded-full bg-[#f4f1ea] px-3 py-2 transition-colors focus-within:bg-white focus-within:ring-1 focus-within:ring-[#2d5e40]/20 border border-transparent focus-within:border-[#2d5e40]/20">
                <Search className="size-5 text-[#6b6b6b]" />
                <input
                  className="ml-2 w-full bg-transparent text-sm text-[#222222] placeholder-[#6b6b6b] focus:outline-none"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/write"
              className="flex items-center gap-2 text-[#6b6b6b] hover:text-[#222222] transition-colors"
            >
              <SquarePen className="size-6" strokeWidth={1.5} />
              <span className="hidden sm:inline text-sm font-medium">
                Write
              </span>
            </Link>
            <Link
              href="/notifications"
              className="text-[#6b6b6b] hover:text-[#222222] transition-colors"
            >
              <Bell className="size-6" strokeWidth={1.5} />
            </Link>
            <button className="bg-[#2d5e40] hover:bg-[#254f36] text-white text-sm font-bold px-5 py-2 rounded-full transition-colors shadow-sm hover:shadow-md">
              Sign up
            </button>
            <div className="relative cursor-pointer group">
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full size-9 border border-[#e0e0e0] group-hover:border-[#2d5e40] transition-colors"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBllitWrlrwleoybJw5BsOd6wirLONrHTTypFbPWbQ1hMVa9n8CQE84MMgPFdiZY6yV6A1v9DW_xJGchIY0Uydsx3xZsS7vaxwLFBClnuxWvfxnXb3--g4NzuIPIS9u70U9SntYLbvvvabXhcPbiC2-qsKOsY3p-VD1lXgnohOIGfxsmFXA2rg88kebVcJS9K566KY7VakPNC-SzlASQSX_R-hGaA8G-vf37g-wV9anx39kgIPEQXwTUD1qssRI_2JqJKAUhGgg5gI")',
                }}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 justify-center w-full max-w-[1400px] mx-auto">
        {/* Feed */}
        <main className="w-full max-w-[760px] flex-1 px-4 md:px-10 py-8 lg:border-r border-[#e0e0e0]">
          {/* Tabs */}
          <div className="sticky top-16 z-40 bg-[#fdfbf7]/95 backdrop-blur-sm -mx-4 px-4 md:-mx-10 md:px-10 pb-4 pt-2 border-b border-[#e0e0e0] mb-8">
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  className={`shrink-0 flex items-center justify-center rounded-full px-4 py-1.5 transition-all ${
                    tab.active
                      ? "bg-[#222222] text-white shadow-sm"
                      : "bg-[#f4f1ea] border border-transparent hover:border-gray-300 text-[#6b6b6b] hover:text-[#222222]"
                  }`}
                >
                  <span className="text-sm font-medium">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Articles */}
          <div className="flex flex-col gap-10">
            {articles.map((article, index) => (
              <article
                key={index}
                className={`group flex ${
                  article.image ? "flex-col sm:flex-row" : ""
                } gap-8 items-start justify-between pb-10 border-b border-[#e0e0e0] last:border-0 cursor-pointer`}
              >
                <div className="flex flex-1 flex-col gap-2.5">
                  {/* Author Info */}
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="bg-center bg-no-repeat bg-cover rounded-full size-6 ring-2 ring-white"
                      style={{
                        backgroundImage: `url("${article.author.avatar}")`,
                      }}
                    />
                    <span className="text-sm font-semibold text-[#222222]">
                      {article.author.name}
                    </span>
                    {article.publication && (
                      <>
                        <span className="text-sm text-[#6b6b6b]">in</span>
                        <span className="text-sm font-semibold text-[#222222]">
                          {article.publication}
                        </span>
                      </>
                    )}
                    <span className="text-sm text-[#6b6b6b]">
                      · {article.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold leading-tight tracking-tight group-hover:text-[#2d5e40] transition-colors text-[#222222] font-serif">
                    {article.title}
                  </h2>

                  {/* Description */}
                  <p className="text-[#6b6b6b] text-base font-sans line-clamp-2 leading-relaxed">
                    {article.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-[#f4f1ea] px-3 py-1 text-xs font-medium text-[#222222] font-sans">
                        {article.tag}
                      </span>
                      <span className="text-xs text-[#6b6b6b] font-sans">
                        {article.readTime}
                      </span>
                      {article.memberOnly && (
                        <Star className="size-3.5 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-[#6b6b6b]">
                      <button className="hover:text-[#2d5e40] transition-colors">
                        <Bookmark className="size-5" />
                      </button>
                      <button className="hover:text-red-500 transition-colors">
                        <MinusCircle className="size-5" />
                      </button>
                      <button className="hover:text-[#222222] transition-colors">
                        <MoreHorizontal className="size-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Image */}
                {article.image && (
                  <div className="w-full sm:w-[160px] aspect-[16/10] sm:aspect-square shrink-0 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                    <div
                      className="w-full h-full bg-center bg-no-repeat bg-cover transform transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url("${article.image}")` }}
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-[380px] pl-10 pt-10 pb-8 h-fit sticky top-16 border-l border-transparent">
          {/* Trending */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e0e0e0] mb-8">
            <h3 className="text-lg font-bold text-[#222222] mb-6 flex items-center gap-2">
              <TrendingUp className="size-5 text-[#2d5e40]" />
              Trending now
            </h3>
            <div className="flex flex-col gap-6">
              {trending.map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  className="group flex gap-4 items-start"
                >
                  <span className="text-2xl font-bold text-gray-200 group-hover:text-[#2d5e40]/50 transition-colors leading-none -mt-1 font-sans">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="bg-center bg-no-repeat bg-cover rounded-full size-5"
                        style={{
                          backgroundImage: `url("${item.author.avatar}")`,
                        }}
                      />
                      <span className="text-xs font-medium text-[#222222]">
                        {item.author.name}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#222222] leading-snug group-hover:text-[#2d5e40] transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-xs text-[#6b6b6b] font-sans">
                      {item.date} · {item.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Topics */}
          <div className="px-2">
            <h3 className="text-xs font-bold text-[#6b6b6b] mb-4 uppercase tracking-wide">
              Recommended Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <Link
                  key={topic}
                  href="#"
                  className="px-4 py-2 bg-white border border-[#e0e0e0] rounded-full text-sm text-[#222222] font-sans hover:bg-[#f4f1ea] hover:border-gray-300 transition-all"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-[#e0e0e0] px-2">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-[#6b6b6b] font-sans leading-relaxed">
              {footerLinks.map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="hover:text-[#222222] transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Custom Scrollbar Hiding */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
