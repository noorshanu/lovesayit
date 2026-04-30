"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PunchGame() {
  const [hasStarted, setHasStarted] = useState(false);
  const [punchCount, setPunchCount] = useState(0);
  const [punchAnimation, setPunchAnimation] = useState<{ x: number, y: number, id: number } | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/punchgame/punchsound.mp3");
  }, []);

  const handlePunch = (e: React.MouseEvent<HTMLDivElement>) => {
    if (punchCount >= 10) return;

    // Play punch sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }

    setPunchCount(prev => prev + 1);

    // Get click coordinates relative to the image container
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPunchAnimation({ x, y, id: Date.now() });

    // Clear animation after a short delay
    setTimeout(() => setPunchAnimation(null), 300);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      
      {!hasStarted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 md:p-12 text-center max-w-md w-full shadow-2xl flex flex-col items-center gap-6"
        >
          <h2 className="text-3xl font-bold text-pink-900 mb-4">Still Mad?</h2>
          <p className="text-pink-800 mb-6">Take it out on me! 🥊</p>
          <button
            onClick={() => setHasStarted(true)}
            className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold shadow-lg shadow-red-500/30 transition-all active:scale-95"
          >
            Start Boxing
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center w-full max-w-lg"
        >
          {punchCount < 10 ? (
            <>
              <h2 className="text-2xl font-bold text-pink-900 mb-4">Punches: {punchCount} / 10</h2>
              <p className="text-pink-700 mb-8">Click the image to punch!</p>
              
              <div 
                className="relative w-64 h-64 md:w-80 md:h-80 cursor-crosshair rounded-full overflow-hidden shadow-2xl bg-white border-4 border-red-200"
                onClick={handlePunch}
              >
                <img 
                  src="/punchgame/punchme.png" 
                  alt="Punch Me Guy" 
                  className="w-full h-full object-cover pointer-events-none"
                />

                <AnimatePresence>
                  {punchAnimation && (
                    <motion.div
                      key={punchAnimation.id}
                      initial={{ scale: 0, opacity: 1, x: "-50%", y: "-50%" }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute z-20 pointer-events-none"
                      style={{ left: punchAnimation.x, top: punchAnimation.y }}
                    >
                      <img src="/punchgame/gloves.png" alt="Punch" className="w-16 h-16 object-contain" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hit effect shake */}
                <motion.div
                  key={punchCount}
                  initial={{ x: 0 }}
                  animate={{ x: [-10, 10, -10, 10, 0] }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-red-500 mix-blend-overlay pointer-events-none opacity-0"
                  style={{ opacity: punchAnimation ? 0.3 : 0 }}
                />
              </div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl bg-white border-4 border-pink-300 mb-8">
                <img 
                  src="/punchgame/finalpunch.png" 
                  alt="Beaten Up Guy" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="glass-panel p-8 text-center shadow-xl">
                <h3 className="text-2xl font-bold text-red-600 mb-4">K.O.!</h3>
                <p className="text-xl text-pink-900 font-medium leading-relaxed">
                  you win divya i love uh and i am soory absai galti nhi kru ga if i did u can come back and punch more
                </p>
                <button
                  onClick={() => { setPunchCount(0); setHasStarted(false); }}
                  className="mt-6 px-6 py-2 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-full font-medium transition-colors border border-pink-200 text-sm"
                >
                  Reset Game
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
