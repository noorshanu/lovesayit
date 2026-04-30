"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface Particle {
  id: number;
  x: number;
  endX: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "heart" | "bubble" | "sparkle";
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const count = 30;

      for (let i = 0; i < count; i++) {
        const typeRoll = Math.random();
        let type: Particle["type"] = "heart";
        if (typeRoll > 0.6 && typeRoll < 0.9) type = "bubble";
        else if (typeRoll >= 0.9) type = "sparkle";

        const startX = Math.random() * 100;

        newParticles.push({
          id: i,
          x: startX,
          endX: startX + (Math.random() * 10 - 5),
          y: Math.random() * 100, // starting percentage
          size: Math.random() * 20 + 10,
          duration: Math.random() * 10 + 10, // 10-20s
          delay: Math.random() * 5,
          type,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-pink-300/30"
          initial={{
            x: `${p.x}vw`,
            y: "110vh",
            scale: 0,
            rotate: 0,
          }}
          animate={{
            y: "-10vh",
            scale: [0, 1, 1, 0],
            rotate: [0, 90, 180, 270],
            x: [`${p.x}vw`, `${p.endX}vw`],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {p.type === "heart" && <Heart fill="currentColor" size={p.size} />}
          {p.type === "sparkle" && <Sparkles size={p.size} />}
          {p.type === "bubble" && (
            <div
              style={{ width: p.size, height: p.size }}
              className="rounded-full border border-pink-200/40 bg-pink-100/10"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
