import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const phrases = [
  "Sketching permanence.",
  "Architecture of intent.",
  "The anatomy of space.",
  "Blueprints with ambition."
]

export function GlitchText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute left-8 bottom-12 z-20 pointer-events-none max-w-[200px] text-left">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-[#1a1a18]/80 font-montserrat font-black text-sm md:text-base uppercase tracking-widest font-bold leading-relaxed"
        >
          {phrases[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
