import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    index: "01",
    author: "Elena Rostova",
    role: "City Planning Director, Neo-Reykjavik",
    keyword: "ECOSYSTEMS",
    text: "Navkatha doesn't just build structures; they engineer ecosystems. The Sensory Physics pavilion integrated seamlessly into our coastal grid, responding to wind sheer data in real-time.",
    year: "2025",
    bg: "#1a1a18",
    fg: "#f5f2eb",
    accent: "#c96b36",
  },
  {
    index: "02",
    author: "Marcus Vance",
    role: "Lead Architect, Vance & Co.",
    keyword: "UNCOMPROMISING",
    text: "Brutal, uncompromising, yet incredibly fluid. Their use of organic double-curved hulls challenged everything we knew about high-tensile concrete forms.",
    year: "2026",
    bg: "#f5f2eb",
    fg: "#1a1a18",
    accent: "#c96b36",
  },
  {
    index: "03",
    author: "Dr. Shammas",
    role: "Head of Kinetic Structures, MIT",
    keyword: "MASTERCLASS",
    text: "A masterclass in autonomous architecture. The tactile lighting grids they developed are now standard curriculum in our advanced environmental design courses.",
    year: "2025",
    bg: "#c96b36",
    fg: "#1a1a18",
    accent: "#1a1a18",
  },
  {
    index: "04",
    author: "Jameson Holt",
    role: "CEO, Holt Luxury Developments",
    keyword: "TERRIFYING",
    text: "We commissioned Navkatha for a floating resort. What they delivered was a living entity that breathes with the tide. Utterly terrifying in its brilliance.",
    year: "2026",
    bg: "#1a1a18",
    fg: "#f5f2eb",
    accent: "#c96b36",
  },
  {
    index: "05",
    author: "Aida Bell",
    role: "Chief Curator, Museum of Modern Form",
    keyword: "MANIFEST",
    text: "Their work exists at the harsh intersection of brutalist history and generative future. It is raw data made physically manifest in steel and stone.",
    year: "2026",
    bg: "#f5f2eb",
    fg: "#1a1a18",
    accent: "#c96b36",
  }
]

const clientTicker = [
  "ELENA ROSTOVA", "✦", "MARCUS VANCE", "✦", "Dr. Shammas", "✦",
  "JAMESON HOLT", "✦", "AIDA BELL", "✦",
]

export function TestimonialSection() {
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <section className="relative w-full z-20 border-t-[8px] border-[#1a1a18] overflow-hidden bg-[#f5f2eb]">

      {/* Section Header */}
      <div className="w-full border-b-[8px] border-[#1a1a18] flex flex-col md:flex-row items-stretch">
        <div className="flex-grow flex flex-col justify-end p-10 md:p-16 bg-[#f5f2eb]">
          <span className="inline-block text-xs text-[#f5f2eb] font-bold tracking-[0.3em] uppercase bg-[#c96b36] px-4 py-2 border-2 border-[#1a1a18] w-max mb-6">
            // VOICES FROM THE FIELD
          </span>
          <h2 className="text-[#1a1a18] text-[4rem] md:text-[7rem] font-montserrat font-black tracking-tighter uppercase leading-[0.85]">
            WHAT THEY<br />SAID
          </h2>
        </div>
        <div className="md:w-[200px] border-l-[8px] border-[#1a1a18] bg-[#1a1a18] flex items-center justify-center p-8">
          <span
            className="text-[#c96b36] font-montserrat font-black text-4xl tracking-tighter uppercase"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            CLIENT VOICES
          </span>
        </div>
      </div>

      {/* Ticker */}
      <div className="w-full bg-[#c96b36] border-b-[8px] border-[#1a1a18] overflow-hidden py-3">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-10 whitespace-nowrap"
        >
          {[...clientTicker, ...clientTicker, ...clientTicker, ...clientTicker].map((name, i) => (
            <span key={i} className="text-[#1a1a18] font-montserrat font-black text-sm tracking-[0.3em] uppercase">
              {name}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Accordion List */}
      <div className="w-full">
        {testimonials.map((t, idx) => {
          const isOpen = openIndex === idx
          return (
            <motion.div
              key={t.index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="border-b-[6px] border-[#1a1a18] overflow-hidden"
            >
              {/* Collapsed Header — always visible */}
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full flex items-stretch gap-0 group cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                {/* Number — fixed width so vertical line is always at the same x position */}
                <div
                  className="w-[80px] md:w-[130px] shrink-0 flex items-center justify-center py-6 border-r-[6px] border-[#1a1a18] transition-colors duration-300"
                  style={{ backgroundColor: isOpen ? t.accent : '#f5f2eb' }}
                >
                  <span
                    className="font-montserrat font-black text-3xl md:text-5xl tracking-tighter transition-colors duration-300"
                    style={{ color: isOpen ? (t.bg === '#c96b36' ? '#1a1a18' : '#f5f2eb') : '#1a1a18' }}
                  >
                    {t.index}
                  </span>
                </div>

                {/* Author Name — flex-grow fills remaining space */}
                <div
                  className="flex-grow flex items-center px-6 md:px-12 py-6 transition-colors duration-300"
                  style={{ backgroundColor: isOpen ? t.bg : '#f5f2eb' }}
                >
                  <span
                    className="font-montserrat font-black uppercase text-xl md:text-3xl lg:text-4xl tracking-tighter transition-colors duration-300"
                    style={{ color: isOpen ? t.fg : '#1a1a18' }}
                  >
                    {t.author}
                  </span>
                </div>

                {/* Keyword Badge — fixed width so right vertical line always aligns */}
                <div
                  className="w-[300px] shrink-0 hidden md:flex items-center px-12 py-6 border-l-[6px] border-[#1a1a18] justify-end transition-colors duration-300"
                  style={{ backgroundColor: isOpen ? t.bg : '#f5f2eb' }}
                >
                  <span
                    className="font-mono font-black text-xs tracking-[0.2em] uppercase px-3 py-1 border-2 transition-colors duration-300"
                    style={{
                      color: isOpen ? t.accent : '#1a1a18',
                      borderColor: isOpen ? t.accent : '#1a1a18',
                    }}
                  >
                    [{t.keyword}]
                  </span>
                </div>

                {/* Toggle Icon — fixed width matching number column rhythm */}
                <div
                  className="w-[80px] md:w-[90px] shrink-0 flex items-center justify-center py-6 border-l-[6px] border-[#1a1a18] transition-colors duration-300"
                  style={{ backgroundColor: isOpen ? t.accent : '#1a1a18' }}
                >
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="font-black text-3xl leading-none select-none"
                    style={{ color: isOpen ? (t.bg === '#c96b36' ? '#1a1a18' : '#f5f2eb') : '#f5f2eb' }}
                  >
                    +
                  </motion.span>
                </div>
              </button>

              {/* Expandable Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.3 } }}
                    style={{ backgroundColor: t.bg }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 border-t-[4px] border-[#1a1a18]/30">
                      {/* Quote */}
                      <div className="md:col-span-8 p-10 md:p-16">
                        <div
                          className="text-[4rem] leading-none font-montserrat font-black mb-4 select-none"
                          style={{ color: t.accent, opacity: 0.5 }}
                        >
                          "
                        </div>
                        <p
                          className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed"
                          style={{ color: t.fg }}
                        >
                          {t.text}
                        </p>
                      </div>

                      {/* Meta Info */}
                      <div
                        className="md:col-span-4 flex flex-col justify-between p-10 md:p-16 border-l-0 md:border-l-[4px]"
                        style={{ borderColor: t.fg + '33' }}
                      >
                        <div>
                          <div className="w-16 h-1 mb-8" style={{ backgroundColor: t.accent }} />
                          <p className="font-montserrat font-black uppercase text-xl md:text-2xl tracking-tighter mb-2" style={{ color: t.fg }}>
                            {t.author}
                          </p>
                          <p className="text-sm font-bold tracking-wider uppercase" style={{ color: t.accent === '#c96b36' ? '#c96b36' : '#c96b36' }}>
                            {t.role}
                          </p>
                        </div>
                        <div className="mt-8 flex items-center gap-4">
                          <span
                            className="text-[4rem] font-montserrat font-black tracking-tighter leading-none opacity-20 select-none"
                            style={{ color: t.fg }}
                          >
                            {t.year}
                          </span>
                          <span
                            className="text-xs font-bold tracking-[0.3em] border px-3 py-1"
                            style={{ color: t.accent, borderColor: t.accent }}
                          >
                            {t.keyword}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom Ticker */}
      <div className="w-full bg-[#1a1a18] border-t-[8px] border-[#1a1a18] overflow-hidden py-3">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex gap-10 whitespace-nowrap"
        >
          {[...clientTicker, ...clientTicker, ...clientTicker, ...clientTicker].map((name, i) => (
            <span key={i} className="text-[#c96b36] font-montserrat font-black text-sm tracking-[0.3em] uppercase">
              {name}
            </span>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
