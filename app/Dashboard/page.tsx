"use client";

import Link from "next/link";
import DashboardNav from "@/components/DashboardNav";
import {
  Bookmark,
  MinusCircle,
  MoreHorizontal,
  TrendingUp,
  Star,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../Hooks/hooks";

interface userProfile {
  userName: string;
}
export default function BlogDashboard() {
  const router = useRouter();
  interface Article {
    author: {
      name: string;
    };
    title: string;
    content: string;
    readTime: string;
    tag: string;
    publication: string;
    membersOnly: boolean;
    createdAt: Date;
  }
  const tabs = [
    { name: "For You", active: true },
    { name: "Following", active: false },
    { name: "Technology", active: false },
    { name: "Design", active: false },
    { name: "Culture", active: false },
    { name: "Productivity", active: false },
  ];
  const [articles, setArticles] = useState<Article[]>([]);
  const { user, loading, data, error } = useAuth<userProfile>();
  useEffect(() => {
    if (!user && !loading) {
      router.push("/SignIn");
    }
  });
  /* const articles = [
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
  ];*/

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
  if (loading) {
    return <p> loading your profile</p>;
  }
  if (!user) {
    return;
  }

  return (
    <div className="bg-[#fdfbf7] text-[#222222] flex flex-col min-h-screen selection:bg-[#eef5f0] selection:text-[#2d5e40]">
      {/* Navbar */}
      <DashboardNav />
      {/* Main Content */}
      <p> {`Hello, ${data?.userName}`}</p>
      <div className="flex flex-1 justify-center w-full max-w-[1400px] mx-auto">
        {/* Feed */}
        <main className="w-full max-w-[760px] flex-1 px-4 md:px-10 py-8 lg:border-r border-[#e0e0e0]">
          {/* Tabs */}
          <div className="sticky top-16 z-40 bg-[#fdfbf7]/95 backdrop-blur-sm -mx-4 px-4 md:-mx-10 md:px-10 pb-4 pt-2 border-b border-[#e0e0e0] mb-8">
            <div className="flex gap-3 overflow-x-hidden no-scrollbar pb-1">
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
            {articles.length === 0 ? (
              <article> No articles where found </article>
            ) : (
              articles.map((article, index) => (
                <article
                  key={index}
                  className={`group flex ${
                    article.author ? "flex-col sm:flex-row" : ""
                  } gap-8 items-start justify-between pb-10 border-b border-[#e0e0e0] last:border-0 cursor-pointer`}
                >
                  <div className="flex flex-1 flex-col gap-2.5">
                    {/* Author Info */}
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="bg-center bg-no-repeat bg-cover rounded-full size-6 ring-2 ring-white"
                        style={{
                          backgroundImage: `url("${article.author}")`,
                        }}
                      />
                      <span className="text-sm font-semibold text-[#222222]">
                        {article.author.name}
                      </span>
                      {article.createdAt && (
                        <>
                          <span className="text-sm text-[#6b6b6b]">in</span>
                          <span className="text-sm font-semibold text-[#222222]">
                            {}
                          </span>
                        </>
                      )}
                      <span className="text-sm text-[#6b6b6b]">· {}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold leading-tight tracking-tight group-hover:text-[#2d5e40] transition-colors text-[#222222] font-serif">
                      {article.title}
                    </h2>

                    {/* Description */}
                    <p className="text-[#6b6b6b] text-base font-sans line-clamp-2 leading-relaxed">
                      {article.content}
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
                        {article.membersOnly && (
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
                  {article.author && (
                    <div className="w-full sm:w-[160px] aspect-[16/10] sm:aspect-square shrink-0 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                      <div
                        className="w-full h-full bg-center bg-no-repeat bg-cover transform transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url("${article.author}")` }}
                      />
                    </div>
                  )}
                </article>
              ))
            )}
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
