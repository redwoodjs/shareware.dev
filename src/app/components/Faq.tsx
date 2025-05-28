"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { AnimatePresence, motion } from "motion/react";

const Faq = ({
  question,
  children,
  defaultOpen = false,
}: {
  question: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`faq ${isOpen ? "open" : ""}`}>
      {/* question */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group font-lg font-bold mb-3 flex justify-start items-start gap-x-4 hover:text-link hover:underline cursor-pointer text-left"
      >
        <div>
          <div className="bg-white size-6 border-2 border-black center group-hover:bg-black group-hover:text-white">
            <Icon id={isOpen ? "minus" : "plus"} size={10} />
          </div>
        </div>
        <span>{question}</span>
      </button>
      {/* answer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-10 text-base leading-relaxed"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Faq };
