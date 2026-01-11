"use client";

import { motion, Variants } from "framer-motion";
import { Mail, Phone } from "lucide-react";

// --- Icons ---
function FacebookIcon({ className = "w-8 h-8" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12.06C22 6.505 17.523 2 12 2C6.477 2 2 6.505 2 12.06C2 17.083 5.657 21.245 10.438 22V14.969H7.898V12.06H10.438V9.845C10.438 7.348 11.928 5.96 14.204 5.96C15.295 5.96 16.435 6.156 16.435 6.156V8.608H15.178C13.941 8.608 13.555 9.376 13.555 10.162V12.063H16.326L15.883 14.972H13.555V22C18.337 21.248 22 17.085 22 12.06Z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-8 h-8" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M12 2.163C17.388 2.163 17.986 2.182 19.96 2.27C22.253 2.376 23.36 3.65 23.498 6.046C23.586 8.016 23.605 8.614 23.605 14C23.605 19.386 23.586 19.984 23.498 21.954C23.36 24.354 22.253 25.624 19.96 25.73C17.986 25.818 17.388 25.837 12 25.837C6.612 25.837 6.014 25.818 4.04 25.73C1.742 25.624 0.639 24.35 0.502 21.954C0.414 19.984 0.395 19.386 0.395 14C0.395 8.614 0.414 8.016 0.502 6.046C0.639 3.65 1.742 2.376 4.04 2.27C6.014 2.182 6.612 2.163 12 2.163ZM12 0C-0.106 0 0 0.106 0 14C0 27.894 -0.106 28 12 28C24.106 28 24 27.894 24 14C24 0.106 23.894 0 12 0ZM12 7C8.134 7 5 10.134 5 14C5 17.866 8.134 21 12 21C15.866 21 19 17.866 19 14C19 10.134 15.866 7 12 7ZM12 18.8C9.35 18.8 7.2 16.65 7.2 14C7.2 11.35 9.35 9.2 12 9.2C14.65 9.2 16.8 11.35 16.8 14C16.8 16.65 14.65 18.8 12 18.8ZM19.5 6.5C19.5 7.328 18.828 8 18 8C17.172 8 16.5 7.328 16.5 6.5C16.5 5.672 17.172 5 18 5C18.828 5 19.5 5.672 19.5 6.5Z"
        transform="scale(0.85) translate(2,2)"
      />
    </svg>
  );
}

function TwitterIcon({ className = "w-8 h-8" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AboutPage() {
  return (
    <div
      id="ourStory"
      className="w-full bg-white min-h-screen p-4 md:p-6 lg:p-8"
    >
      <div className="mx-auto max-w-7xl bg-[#0f1110] rounded-2xl md:rounded-3xl overflow-hidden flex flex-col min-h-[85vh] shadow-2xl shadow-green-900/10">
        <motion.main
          className="flex flex-col flex-1 px-6 md:px-12 lg:px-20 py-12 md:py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[0.95] tracking-tight mb-4">
              Our Story
            </h1>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline h-px w-12 bg-[#17cf54]"></span>
              <p className="text-[#17cf54] text-base md:text-lg font-medium uppercase tracking-widest">
                The mission behind the words
              </p>
            </div>
          </motion.div>

          {/* Narrative Content */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-6 max-w-3xl"
          >
            <p className="text-[#e0e0e0] text-lg md:text-xl leading-relaxed font-light">
              In an era defined by algorithmic noise and infinite scrolling,{" "}
              <strong className="text-white font-semibold">
                Social Medium
              </strong>{" "}
              is a deliberate return to clarity. This isn’t a corporate product
              optimized for engagement metrics; it is a handcrafted sanctuary
              built entirely by a single developer who believes that words still
              matter.
            </p>
            <p className="text-[#a0a0a0] text-base md:text-lg leading-relaxed">
              Every pixel, animation, and line of code was forged with one goal:
              to create a distraction-free environment where deep thought and
              meaningful connection can thrive. This is a space designed not to
              sell your attention, but to honor your intellect.
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="w-full h-px bg-white/10 my-16"
          />

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Connect with Us
            </h2>
            <p className="text-[#9db8a6] text-sm md:text-base">
              Whether you have a question, feedback, or just want to say hi.
            </p>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-12"
          >
            {[
              {
                href: "https://www.facebook.com/megomgahed550/",
                icon: FacebookIcon,
              },
              {
                href: "https://www.instagram.com/m.mgahed168/",
                icon: InstagramIcon,
              },
              { href: "https://x.com/Mohamed4382437", icon: TwitterIcon },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-full text-white hover:bg-[#17cf54] hover:text-[#0f1110] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(23,207,84,0.4)] transition-all duration-300"
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </motion.div>

          {/* Direct Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 max-w-4xl">
            {/* Email */}
            <motion.a
              variants={itemVariants}
              whileHover={{ y: -8, backgroundColor: "rgba(23, 207, 84, 0.08)" }}
              href="mailto:m.megahed168@gmail.com"
              className="group flex flex-col gap-3 p-6 md:p-8 rounded-2xl bg-[#17cf54]/5 border border-[#17cf54]/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 text-[#17cf54] mb-1 group-hover:scale-105 transition-transform origin-left">
                <Mail className="w-5 h-5" />
                <span className="font-bold uppercase tracking-wider text-xs">
                  Email
                </span>
              </div>
              <p className="text-white text-lg md:text-2xl font-bold tracking-tight">
                m.megahed168@gmail.com
              </p>
              <p className="text-[#9db8a6] text-sm">
                Response: within 24 hours
              </p>
            </motion.a>

            {/* Phone */}
            <motion.a
              variants={itemVariants}
              whileHover={{ y: -8, backgroundColor: "rgba(23, 207, 84, 0.08)" }}
              href="tel:+201153039862"
              className="group flex flex-col gap-3 p-6 md:p-8 rounded-2xl bg-[#17cf54]/5 border border-[#17cf54]/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 text-[#17cf54] mb-1 group-hover:scale-105 transition-transform origin-left">
                <Phone className="w-5 h-5" />
                <span className="font-bold uppercase tracking-wider text-xs">
                  Phone
                </span>
              </div>
              <p className="text-white text-lg md:text-2xl font-bold tracking-tight">
                011 530 39862
              </p>
              <p className="text-[#9db8a6] text-sm">Mon-Fri, 9am - 5pm EET</p>
            </motion.a>
          </div>
        </motion.main>
      </div>
    </div>
  );
}
