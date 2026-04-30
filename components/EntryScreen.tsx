"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, HeartCrack, MailOpen } from "lucide-react";

interface EntryScreenProps {
  onNext: () => void;
}

export default function EntryScreen({ onNext }: EntryScreenProps) {
  const [showSorry, setShowSorry] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative z-10">
      <AnimatePresence mode="wait">
        {!showSorry ? (
          <motion.div
            key="greeting"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass-panel p-8 md:p-12 text-center max-w-lg w-full shadow-2xl flex flex-col items-center gap-6"
            onClick={() => setShowSorry(true)}
          >
            <div className="animate-heartbeat text-pink-500">
              <Heart size={48} fill="currentColor" />
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-pink-900 tracking-tight">
              Hey Divya... I made something for you
            </h1>
            <p className="text-pink-700/80 animate-pulse text-sm mt-4 cursor-pointer">
              Tap anywhere to continue
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="sorry"
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="glass-panel p-8 md:p-12 text-center max-w-lg w-full shadow-2xl flex flex-col items-center gap-8"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="text-red-400"
            >
              <HeartCrack size={56} />
            </motion.div>
            
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-medium text-pink-900 leading-relaxed">
                I’m really sorry Divya...
              </h2>
              <p className="text-lg text-pink-800/80">
                I didn’t mean to hurt you 😔
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="mt-4 flex items-center gap-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-pink-400/50 transition-all duration-300"
            >
              <MailOpen size={20} />
              Open it 💌
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
