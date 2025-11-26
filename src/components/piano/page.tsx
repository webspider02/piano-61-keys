"use client";

import { NOTES } from './notes-data';

export default function Piano() {
    // Notes Created
    const notes = NOTES.map(note => 
        <div key={note.id}>
            
        </div>
    )

    // Rendering UI
    return (
        <div className="flex flex-col h-screen">
            <div className="
                bg-stone-950 
                w-screen
                h-4/5
            "></div>
            <div className="
                bg-stone-50
                w-screen
                h-1/5
            "> 

            </div>
        </div>
    );
}