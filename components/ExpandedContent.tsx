import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ContentData {
  content: string;
}

function ExpandableContent({ content }: ContentData) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpand, setNeedsExpand] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    function checkOverflow() {
      const element = contentRef.current;
      if (element) {
        const isOverflowing = element.scrollHeight > element.clientHeight;
        setNeedsExpand(isOverflowing);
      }
    }

    checkOverflow();

    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [content]);

  return (
    <div className="flex flex-col items-start">
      <motion.div
        initial={false}
        animate={{ height: "auto" }}
        className="relative"
      >
        <p
          ref={contentRef}
          className={`text-inherit text-md leading-relaxed transition-all duration-300 ${
            isExpanded ? "" : "line-clamp-2"
          }`}
        >
          {content}
        </p>
      </motion.div>

      {(needsExpand || isExpanded) && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-1 text-sm font-bold text-[#17cf54] hover:text-[#12a543] hover:underline decoration-2 underline-offset-4 transition-all cursor-pointer flex items-center gap-1 outline-none"
        >
          {isExpanded ? "Show Less" : "Read more..."}
        </button>
      )}
    </div>
  );
}

export default ExpandableContent;
