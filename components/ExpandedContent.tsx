import { useState } from "react";
import { motion } from "framer-motion";
interface contentData {
  content: string;
}
function ExpandableContent({ content }: contentData) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongContent = content.length > 140;

  if (!isLongContent) {
    return <p className="text-[#6b6b6b] text-md leading-relaxed">{content}</p>;
  }

  return (
    <div className="flex flex-col items-start">
      <motion.div
        initial={false}
        animate={{ height: "auto" }}
        className="relative"
      >
        <p
          className={`text-[#6b6b6b] text-md leading-relaxed transition-all duration-300 ${
            isExpanded ? "" : "line-clamp-2"
          }`}
        >
          {content}
        </p>
      </motion.div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-1 text-sm font-bold text-[#17cf54] hover:text-[#12a543] hover:underline decoration-2 underline-offset-4 transition-all cursor-pointer flex items-center gap-1 outline-none"
      >
        {isExpanded ? <>Show Less</> : <>Read more...</>}
      </button>
    </div>
  );
}

export default ExpandableContent;
