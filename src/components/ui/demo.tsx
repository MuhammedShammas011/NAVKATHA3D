import React, { useState } from "react"
import { useScreenSize } from "@/hooks/use-screen-size"
import { ArchitectureScene } from "@/components/ui/ArchitectureScene"
import { GlitchText } from "@/components/ui/glitch-text"
import { Compass, Sparkles, MoveRight, HelpCircle, Layers } from "lucide-react"

function GooeyDemo() {
  return (
    <div className="relative w-full h-screen min-h-[700px] flex flex-col justify-between bg-[#f5f2eb] text-center overflow-hidden">
      {/* 1. Delicate overlay grid for tech visual */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,26,24,0.02)_10%,transparent_100%)] pointer-events-none z-1" />

      {/* 1.5. 3D Architecture Background */}
      <ArchitectureScene />

      {/* Left aligned cycling glitch text */}
      <GlitchText />

      <header className="relative w-full z-20 flex justify-between items-center px-8 py-6">
        {/* Centred brand name */}
        <span className="absolute left-1/2 -translate-x-1/2 text-[11px] font-montserrat font-black tracking-[0.30em] uppercase text-[#c96b36]/100 font-montserrat select-none pointer-events-none">
          NAVKATHA
        </span>
        <div className="flex items-center gap-3 transition-all duration-300 hover:opacity-85 cursor-pointer">
          <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#c96b36] select-none">
            {/* Row 1 */}
            <rect x="6" y="6" width="24" height="24" rx="4" fill="currentColor" opacity="0.8" />
            <rect x="38" y="6" width="24" height="24" rx="4" fill="currentColor" opacity="0.85" />
            <circle cx="82" cy="18" r="12" fill="currentColor" opacity="1.0" />

            {/* Row 2 */}
            <rect x="6" y="38" width="24" height="24" rx="4" fill="currentColor" opacity="0.7" />
            <rect x="38" y="38" width="24" height="24" rx="4" fill="currentColor" opacity="0.75" />
            <rect x="70" y="38" width="24" height="24" rx="4" fill="currentColor" opacity="0.85" />

            {/* Row 3 */}
            <rect x="6" y="70" width="24" height="24" rx="4" fill="currentColor" opacity="0.55" />
            <rect x="38" y="70" width="24" height="24" rx="4" fill="currentColor" opacity="0.6" />
            <rect x="70" y="70" width="24" height="24" rx="4" fill="currentColor" opacity="0.7" />
          </svg>
        </div>

        {/* Right — Menu button */}
        <button className="
          text-[10px] font-montserrat font-black tracking-[0.25em] uppercase font-montserrat
          text-[#1a1a18]/70 border border-[#1a1a18]/15
          bg-[#c96b36]
          px-5 py-2 rounded-none
          transition-all duration-300
          hover:bg-[#1a1a18] hover:text-[#f5f2eb] hover:border-[#1a1a18]
          cursor-pointer
        ">
          Menu
        </button>
      </header>



      {/* 5. Center visual hero typography */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 max-w-4xl mx-auto gap-6 select-none pointer-events-none">
      </div>

    </div>
  )
}

export { GooeyDemo }
