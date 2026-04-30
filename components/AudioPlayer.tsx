"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const interactedRef = useRef(false);

  useEffect(() => {
    // Create audio element only once
    const audio = new Audio("/song.mp3");
    audio.loop = true;
    audio.volume = 0.3; // Low volume
    audioRef.current = audio;

    const handleInteraction = () => {
      if (!interactedRef.current) {
        interactedRef.current = true;
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.error("Audio playback failed:", err);
        });
      }
    };

    // Listen to first click anywhere on the document to start music
    document.addEventListener("click", handleInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []); // Empty dependency array prevents re-running when state changes

  const toggleMute = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleMute();
      }}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full glass-panel text-pink-700 hover:text-pink-500 transition-colors hover:scale-110 active:scale-95 cursor-pointer"
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </button>
  );
}
