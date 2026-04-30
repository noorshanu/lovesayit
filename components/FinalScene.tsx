"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

interface FinalSceneProps {
  onNext: () => void;
}

export default function FinalScene({ onNext }: FinalSceneProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 text-center gap-8">
      
      {/* Background glow specific to final scene */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-radial from-pink-400/20 to-transparent pointer-events-none"
      />

      <motion.div
        initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ 
          type: "spring", 
          stiffness: 50, 
          damping: 20,
          duration: 2
        }}
        className="relative mt-12"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 drop-shadow-xl tracking-tighter">
            I Love You Divya
          </h1>
        </motion.div>
        
        {/* Decorative elements around text */}
        <motion.div 
          className="absolute -top-8 -left-8 text-pink-400"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          <Sparkles size={32} />
        </motion.div>
        <motion.div 
          className="absolute -bottom-8 -right-8 text-red-400"
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <Heart size={40} fill="currentColor" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="max-w-lg glass p-6 rounded-2xl"
      >
        <p className="text-xl md:text-2xl text-pink-900 font-medium italic leading-relaxed">
          &quot;In all the world, there is no heart for me like yours. <br/>
          In all the world, there is no love for you like mine.&quot;
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="mt-8 px-6 py-3 bg-red-100 hover:bg-red-200 text-red-800 rounded-full font-semibold shadow-md transition-all border border-red-200 text-sm"
      >
        click here if u still mad
      </motion.button>
      
    </div>
  );
}
