import React, { useState } from "react"
import { ArchitectureScene } from "@/components/ui/ArchitectureScene"
import { GlitchText } from "@/components/ui/glitch-text"
import { AnimatePresence, motion } from "framer-motion"

function GooeyDemo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Sensory Architecture", href: "#sensory-architecture" },
    { label: "Selected Clients", href: "#selected-clients" },
    { label: "Built Projects", href: "#built-projects" },
    { label: "Contact", href: "#contact" }
  ]

  return (
    <div id="home" className="relative w-full h-screen min-h-[700px] flex flex-col justify-between bg-[#f5f2eb] text-center overflow-hidden">
      {/* 1. Delicate overlay grid for tech visual */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,26,24,0.02)_10%,transparent_100%)] pointer-events-none z-1" />

      {/* 1.5. 3D Architecture Background */}
      <ArchitectureScene />

      {/* Left aligned cycling glitch text */}
      <GlitchText />

      {/* Fixed Header that stays on screen */}
      <header className="fixed top-0 left-0 w-full z-[60] flex justify-between items-center px-8 py-6 pointer-events-auto">
        {/* Centred brand name */}
        <span className="absolute left-1/2 -translate-x-1/2 text-[11px] font-montserrat font-black tracking-[0.30em] uppercase text-[#c96b36] font-montserrat select-none pointer-events-none">
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
        <button
          onClick={() => setIsMenuOpen(true)}
          className="
            text-[10px] font-montserrat font-black tracking-[0.25em] uppercase font-montserrat
            text-[#f5f2eb] border border-[#1a1a18]/15
            bg-[#c96b36] shadow-[4px_4px_0_0_#1a1a18]
            px-5 py-2 rounded-none
            transition-all duration-300
            hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#1a1a18]
            cursor-pointer
          "
        >
          Menu
        </button>
      </header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[70] bg-[#f5f2eb] flex flex-col justify-center items-center pointer-events-auto border-b-[16px] border-[#1a1a18]"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-8 text-[10px] font-montserrat font-black tracking-[0.25em] uppercase text-[#f5f2eb] bg-[#c96b36] border-2 border-[#1a1a18] shadow-[4px_4px_0_0_#1a1a18] px-5 py-2 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#1a1a18] transition-all"
            >
              Close
            </button>

            <div className="flex flex-col gap-6 md:gap-8 text-center px-6">
              {menuItems.map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                  className="text-4xl md:text-7xl font-black font-montserrat tracking-tighter uppercase text-[#1a1a18] hover:text-[#c96b36] transition-colors relative group w-max mx-auto"
                >
                  {item.label}
                  {/* Harsh underline hover effect */}
                  <span className="absolute -bottom-2 left-0 w-0 h-2 bg-[#c96b36] transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>

            {/* Massive decorative background text */}
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[15vw] font-black font-montserrat tracking-tighter uppercase text-[#1a1a18] opacity-5 pointer-events-none select-none w-full text-center">
              NAVKATHA
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Center visual hero typography */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 max-w-4xl mx-auto gap-6 select-none pointer-events-none">
      </div>

    </div>
  )
}

export { GooeyDemo }
