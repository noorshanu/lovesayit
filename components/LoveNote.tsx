"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface LoveNoteProps {
  onNext: () => void;
}

const noteText = `Divya, I know words might not be enough right now, but I need you to know how much you mean to me. 
Every moment without your smile feels a little darker. I'm sorry for being foolish and letting you down. 
You are my safe place, my happiest thought, and the most beautiful part of my life. 
Please forgive me... I promise to do better, to be better, for you. 
I miss us. ❤️`;

export default function LoveNote({ onNext }: LoveNoteProps) {
  const characters = Array.from(noteText);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.5 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(4px)",
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
      <div className="max-w-2xl w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-3xl leading-relaxed text-pink-950 font-medium tracking-wide text-center drop-shadow-sm glass p-8 md:p-12 rounded-[2rem]"
        >
          {characters.map((char, index) => (
            <motion.span variants={child} key={index}>
              {char === "\n" ? <br /> : char}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 10, duration: 1 }} // Appears after typing mostly finishes
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="group flex items-center gap-3 text-pink-700 font-medium text-lg border-b-2 border-pink-300 pb-1 hover:text-pink-500 hover:border-pink-500 transition-colors"
          >
            There&apos;s more
            <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
