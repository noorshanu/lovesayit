"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EntryScreen from "./EntryScreen";
import LoveNote from "./LoveNote";
import ImageSlider from "./ImageSlider";
import FinalScene from "./FinalScene";
import PunchGame from "./PunchGame";

type Scene = "entry" | "note" | "slider" | "final" | "punchGame";

export function SceneManager() {
  const [scene, setScene] = useState<Scene>("entry");

  const renderScene = () => {
    switch (scene) {
      case "entry":
        return <EntryScreen key="entry" onNext={() => setScene("note")} />;
      case "note":
        return <LoveNote key="note" onNext={() => setScene("slider")} />;
      case "slider":
        return <ImageSlider key="slider" onNext={() => setScene("final")} />;
      case "final":
        return <FinalScene key="final" onNext={() => setScene("punchGame")} />;
      case "punchGame":
        return <PunchGame key="punchGame" />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scene}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="min-h-screen w-full relative z-10"
      >
        {renderScene()}
      </motion.div>
    </AnimatePresence>
  );
}
