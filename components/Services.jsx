import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
export default function Services() {
  const items = [
    {
      title: "Find Doctors",
      desc: "Search by specialty, location, and availability.",
      img: "/doctors.png",
    },
    {
      title: "Pharmacies",
      desc: "Locate pharmacies with working hours and contacts.",
      img: "/pharmacy.jpg",
    },
    {
      title: "Verified Location Information",
      desc: "The platform provides verified clinic locations through Google Maps integration",
      img: "/gps.jpg",
    },
  ];

  const reduce = useReducedMotion();
  const container = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.12, delayChildren: 0.06 },
    },
  };
  const service = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 22,
      },
    },
  };

  return (
    <section id="services" className="bg-[#f6f9fb] py-20 mx-14 rounded-xl">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tight">
          Our Services
        </h2>
        <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
          Helpful tools to connect you with local healthcare professionals and
          pharmacies.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it) => (
            <motion.div
              key={it.title}
              className="bg-white rounded-xl p-6 shadow-sm focus:outline-none"
              whileHover={reduce ? {} : { scale: 1.02, y: -6 }}
              whileFocus={reduce ? {} : { scale: 1.02, y: -6 }}
              variants={service}
              tabIndex={0}
              role="article"
            >
              <div
                className="w-12 h-12 rounded-md flex items-center justify-center  mb-4"
                style={{
                  background:
                    "linear-gradient(135deg,var(--color-primary), var(--primary-dark))",
                }}
                aria-hidden="true"
              >
                {it.title === "Find Doctors" ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 20c0-4 4-6 8-6s8 2 8 6"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : it.title === "Pharmacies" ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="6"
                      rx="3"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7 11l10 6"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M12 2C8 2 5 5 5 9c0 6 7 13 7 13s7-7 7-13c0-4-3-7-7-7z"
                      stroke="white"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <circle
                      cx="12"
                      cy="9"
                      r="2"
                      stroke="white"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                )}
              </div>
              <div className="relative w-full h-36 md:h-44 rounded-xl overflow-hidden mb-4">
                <Image
                  src={it.img}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  alt={`${it.title} image`}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">{it.title}</h3>
              <p className="text-gray-600 mt-2">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
