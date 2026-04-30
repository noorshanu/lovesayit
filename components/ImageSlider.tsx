"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageSliderProps {
  onNext: () => void;
}

const images = [
  "/slider/img1.jpeg",
  "/slider/img2.jpeg",
  "/slider/img3.jpeg",
  "/slider/img4.jpeg",
  "/slider/img5.jpeg",
  "/slider/img6.jpeg",
  "/slider/img7.jpeg",
  "/slider/img8.jpeg",
  "/slider/img9.jpeg"
];

export default function ImageSlider({ onNext }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasCompletedLoop, setHasCompletedLoop] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % images.length;
        if (nextIndex === 0) {
          setHasCompletedLoop(true);
        }
        return nextIndex;
      });
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 gap-12">
      
      <div className="relative w-72 h-72 md:w-96 md:h-96 drop-shadow-2xl">
        {/* Glowing aura */}
        <div className="absolute inset-0 bg-pink-400 rounded-full blur-[60px] opacity-30 animate-pulse" />
        
        {/* SVG heart mask definition */}
        <svg width="0" height="0">
          <defs>
            <clipPath id="heart-mask" clipPathUnits="objectBoundingBox">
              <path d="M0.5,0.2 C0.5,0.2 0.4,-0.1 0.2,-0.1 C-0.1,-0.1 -0.1,0.3 0.2,0.6 L0.5,0.9 L0.8,0.6 C1.1,0.3 1.1,-0.1 0.8,-0.1 C0.6,-0.1 0.5,0.2 0.5,0.2 Z" />
            </clipPath>
          </defs>
        </svg>

        <div className="relative w-full h-full" style={{ clipPath: "url(#heart-mask)" }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt="Romantic memory"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        whileHover={hasCompletedLoop ? { scale: 1.05 } : {}}
        whileTap={hasCompletedLoop ? { scale: 0.95 } : {}}
        onClick={hasCompletedLoop ? onNext : undefined}
        disabled={!hasCompletedLoop}
        className={`px-8 py-4 bg-white/40 backdrop-blur-md rounded-full font-semibold shadow-xl transition-all duration-300 border border-white/50 ${
          hasCompletedLoop
            ? "hover:bg-white/60 text-pink-800"
            : "text-pink-800/50 opacity-70 cursor-wait"
        }`}
      >
        {hasCompletedLoop ? "One more thing ❤️" : "Please wait..."}
      </motion.button>
      
    </div>
  );
}
