"use client";

import { NOTES } from './notes-data';

export default function Piano() {
  const whiteKeys = NOTES.filter((note) => note.type === 'white');
  const blackKeys = NOTES.filter((note) => note.type === 'black');
  const totalWhiteKeys = whiteKeys.length;

  const whiteKeyWidthPercent = 100 / totalWhiteKeys;

  return (
    <div className="flex flex-col h-screen">
      {/* Top section */}
      <div className="bg-black w-screen h-4/5" />

      {/* Bottom section */}
      <div className="relative w-screen h-1/5 bg-white">
        {/* White keys */}
        <div className="flex w-full h-full relative z-0">
          {whiteKeys.map((note) => (
            <div
              key={note.id}
              className="flex-1 h-full border border-black border-r border-b bg-white hover:bg-gray-200 flex flex-col justify-end items-center text-xs pb-1 cursor-pointer"
              style={{ width: `${whiteKeyWidthPercent}%` }}
            >
              {note.value}
            </div>
          ))}
        </div>

        {/* Black keys */}
        <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
          {blackKeys.map((note) => {
            let whiteKeyIndex = -1;
            if (note.name.startsWith('Db')) whiteKeyIndex = whiteKeys.findIndex(n => n.name.startsWith('C') && n.name.slice(-1) === note.name.slice(-1));
            if (note.name.startsWith('Eb')) whiteKeyIndex = whiteKeys.findIndex(n => n.name.startsWith('D') && n.name.slice(-1) === note.name.slice(-1));
            if (note.name.startsWith('Gb')) whiteKeyIndex = whiteKeys.findIndex(n => n.name.startsWith('F') && n.name.slice(-1) === note.name.slice(-1));
            if (note.name.startsWith('Ab')) whiteKeyIndex = whiteKeys.findIndex(n => n.name.startsWith('G') && n.name.slice(-1) === note.name.slice(-1));
            if (note.name.startsWith('Bb')) whiteKeyIndex = whiteKeys.findIndex(n => n.name.startsWith('A') && n.name.slice(-1) === note.name.slice(-1));

            if (whiteKeyIndex === -1) return null;

            const blackKeyWidth = whiteKeyWidthPercent / 2;
            const centerPosition = (whiteKeyIndex + 1) * whiteKeyWidthPercent;

            return (
              <div
                key={note.id}
                className="absolute top-0 z-20 bg-black text-white h-[60%] min-h-0 flex flex-col justify-center items-center text-xs rounded-sm shadow-lg pointer-events-auto hover:bg-gray-800 overflow-hidden"
                style={{
                  width: `${blackKeyWidth}%`,
                  left: `${centerPosition}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                {/* Vertical label */}
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
