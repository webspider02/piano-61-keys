"use client";

import { useEffect, useState } from "react";
import { NOTES } from "./notes-data";

export default function Piano() {
  const whiteKeys = NOTES.filter((n) => n.type === "white");
  const blackKeys = NOTES.filter((n) => n.type === "black");
  const totalWhiteKeys = whiteKeys.length;
  const whiteKeyWidthPercent = 100 / totalWhiteKeys;

  const [activeKeys, setActiveKeys] = useState<Set<number>>(new Set());

  function playNoteHandler(note: { id: number; file: string }) {
    setActiveKeys((prev) => new Set(prev).add(note.id));
    const audio = new Audio(note.file);
    audio.currentTime = 0;
    audio.play();
    audio.addEventListener("ended", () => {
      setActiveKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(note.id);
        return newSet;
      });
    });
  }

  useEffect(() => {
    const keyToNoteMap: Record<string, { id: number; file: string }> = {};
    NOTES.forEach((note) => {
      if (note.key) keyToNoteMap[note.key] = { id: note.id, file: note.file };
    });

    function handleKeyDown(e: KeyboardEvent) {
      const note = keyToNoteMap[e.key];
      if (note) playNoteHandler(note);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-black w-screen h-4/5" />
      <div className="relative w-screen h-1/5 bg-white">
        {/* White keys */}
        <div className="flex w-full h-full relative z-0">
          {whiteKeys.map((note) => {
            const isActive = activeKeys.has(note.id);
            return (
              <div
                key={note.id}
                className={`flex-1 h-full border border-black border-r border-b ${
                  isActive ? "bg-gray-200" : "bg-white"
                } hover:bg-gray-200 flex flex-col justify-end items-center text-xs pb-1 cursor-pointer`}
                style={{ width: `${whiteKeyWidthPercent}%` }}
                onClick={() => playNoteHandler(note)}
              >
                {note.value}
              </div>
            );
          })}
        </div>

        {/* Black keys */}
        <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
          {blackKeys.map((note) => {
            let whiteKeyIndex = -1;
            if (note.name.startsWith("Db"))
              whiteKeyIndex = whiteKeys.findIndex(
                (n) => n.name.startsWith("C") && n.name.slice(-1) === note.name.slice(-1)
              );
            if (note.name.startsWith("Eb"))
              whiteKeyIndex = whiteKeys.findIndex(
                (n) => n.name.startsWith("D") && n.name.slice(-1) === note.name.slice(-1)
              );
            if (note.name.startsWith("Gb"))
              whiteKeyIndex = whiteKeys.findIndex(
                (n) => n.name.startsWith("F") && n.name.slice(-1) === note.name.slice(-1)
              );
            if (note.name.startsWith("Ab"))
              whiteKeyIndex = whiteKeys.findIndex(
                (n) => n.name.startsWith("G") && n.name.slice(-1) === note.name.slice(-1)
              );
            if (note.name.startsWith("Bb"))
              whiteKeyIndex = whiteKeys.findIndex(
                (n) => n.name.startsWith("A") && n.name.slice(-1) === note.name.slice(-1)
              );

            if (whiteKeyIndex === -1) return null;

            const blackKeyWidth = whiteKeyWidthPercent / 2;
            const centerPosition = (whiteKeyIndex + 1) * whiteKeyWidthPercent;
            const isActive = activeKeys.has(note.id);

            return (
              <div
                key={note.id}
                className={`absolute top-0 z-20 h-[60%] min-h-0 flex flex-col justify-center items-center text-xs rounded-sm shadow-lg pointer-events-auto overflow-hidden ${
                  isActive ? "bg-gray-800" : "bg-black"
                } hover:bg-gray-800 text-white`}
                style={{
                  width: `${blackKeyWidth}%`,
                  left: `${centerPosition}%`,
                  transform: "translateX(-50%)",
                }}
                onClick={() => playNoteHandler(note)}
              >
                <span className="select-none pointer-events-none text-center writing-vertical-rl">
                  {note.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}