"use client";

import Link from "next/link";
import { Share2, Github, Globe, Mail, Phone, Copyright } from "lucide-react";

const navLinks = [
  { name: "Stories", href: "/", active: false },
  { name: "Write", href: "/Write", active: false },
  { name: "About", href: "/About", active: true },
  { name: "Contact", href: "/Contact", active: false },
];

const socialLinks = [
  { name: "Twitter", icon: Share2, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
  { name: "Facebook", icon: Globe, href: "#" },
];

const footerLinks = ["Privacy Policy", "Terms of Service", "Cookies"];

export default function AboutPage() {
  return (
    <div className="w-full bg-white min-h-screen p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl bg-main-dark rounded-2xl md:rounded-3xl overflow-hidden flex flex-col min-h-screen">
        {/* Main Content */}
        <main className="flex flex-col flex-1 px-6 md:px-10 lg:px-12 py-12 md:py-16 lg:py-20">
          <div className="mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-3">
              Our Story
            </h1>
            <p className="text-[#17cf54] text-base md:text-lg font-medium">
              The mission behind the words.
            </p>
          </div>

          {/* Narrative Content */}
          <div className="flex flex-col gap-6 md:gap-8 mb-12 md:mb-16">
            <p className="text-[#e0e0e0] text-base md:text-lg leading-relaxed">
              At BlogSpace, we believe that every voice deserves a canvas. Our
              platform was born out of a desire for simplicity—a place where the
              noise of the digital world fades away, leaving only the author and
              their thoughts. We focus on minimalism and user comfort, ensuring
              that long-form reading is as easy on the eyes as it is enriching
              for the mind.
            </p>
            <p className="text-[#e0e0e0] text-base md:text-lg leading-relaxed">
              Founded by a team of writers and designers, we strive to build a
              community where quality triumphs over quantity. Whether you are
              sharing a personal journey or a technical deep-dive, we provide
              the tools to make your narrative shine.
            </p>
            <p className="text-[#e0e0e0] text-base md:text-lg leading-relaxed">
              We&apos;ve stripped away the invasive ads, the cluttered sidebars,
              and the infinite scroll of distractions. What&apos;s left is a
              pure editorial experience designed for thinkers, dreamers, and
              storytellers.
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#17cf54]/10 my-12 md:my-16" />

          {/* Contact Section Header */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Connect with Us
            </h2>
            <p className="text-[#9db8a6] text-sm md:text-base">
              Whether you have a question, feedback, or just want to say hi,
              we&apos;re here.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-12">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className="flex items-center gap-2 bg-[#17cf54]/5 hover:bg-[#17cf54]/20 transition-all px-3 md:px-5 py-2 md:py-3 rounded-lg border border-[#17cf54]/10 group text-xs md:text-sm"
                >
                  <IconComponent className="w-5 h-5 text-[#17cf54] group-hover:scale-110 transition-transform" />
                  <span className="text-white font-medium hidden sm:inline">
                    {social.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Direct Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-12 md:mb-16">
            {/* Email */}
            <div className="flex flex-col gap-3 p-6 md:p-7 rounded-xl md:rounded-2xl bg-[#17cf54]/5 border border-[#17cf54]/10 hover:bg-[#17cf54]/10 transition-colors">
              <div className="flex items-center gap-2 text-[#17cf54] mb-2">
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-bold uppercase tracking-wider text-xs">
                  Email
                </span>
              </div>
              <p className="text-white text-lg md:text-xl font-medium">
                hello@blogspace.io
              </p>
              <p className="text-[#9db8a6] text-xs md:text-sm">
                Response: within 24 hours
              </p>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-3 p-6 md:p-7 rounded-xl md:rounded-2xl bg-[#17cf54]/5 border border-[#17cf54]/10 hover:bg-[#17cf54]/10 transition-colors">
              <div className="flex items-center gap-2 text-[#17cf54] mb-2">
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-bold uppercase tracking-wider text-xs">
                  Phone
                </span>
              </div>
              <p className="text-white text-lg md:text-xl font-medium">
                +1 (555) 000-1234
              </p>
              <p className="text-[#9db8a6] text-xs md:text-sm">
                Mon-Fri, 9am - 5pm EST
              </p>
            </div>
          </div>

          {/* Decorative Image */}
          <div className="w-full rounded-2xl md:rounded-3xl overflow-hidden relative mb-12 -mx-6 md:-mx-10 lg:-mx-12">
            <div className="absolute inset-0 bg-gradient-to-t from-[#112116] to-transparent z-10" />
            <div
              className="w-full h-48 md:h-64 bg-cover bg-center opacity-60"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC6z2Ik33_3OtQYy3pkhSWuF4bjfgnfY5UWzOGtyVLs1PTo6_jjNS1sIRmfOo9vtE5I3XYPqu_pkt0tcJ6XNQlRJlpTuOmIxqNlZ4y4vZxEbTid1VJ3LrhmcqXLHEVGTXwzaQICvXOS27Z3QTe_J3nbhKFeaL26uCJ36dEJSufB2q0bgX2oweCmVamAbzIcbwfMpkaK_-ioMEZ6Gl5cAgpVz1XXfPqhTCsXJ2mo3bVlWG8PpSrH47eUdVq2oS0xcIdaiatWAO8DqvU')",
              }}
            />
            <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 z-20">
              <p className="text-xl md:text-2xl font-bold text-white">
                Write your own path.
              </p>
              <p className="text-[#17cf54] text-xs md:text-sm font-medium mt-1">
                Start your journey today.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
