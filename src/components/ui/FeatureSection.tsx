import React from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export function FeatureSection() {
  const cards = [
    {
      num: "01",
      title: "SENSORY PHYSICS",
      desc: "Autonomously shifting structures responding to human touch, real-time kinetic coordinates, and environmental breeze patterns.",
      badge: "KINETIC"
    },
    {
      num: "02",
      title: "ORGANIC HULLS",
      desc: "Sleek double-curved concrete shells inspired by biological waveforms, floating gracefully on calm marine preserves.",
      badge: "ARCHITECTURAL"
    },
    {
      num: "03",
      title: "TACTILE LIGHTING",
      desc: "Soft interior ambient glow that mirrors twilight cycles, throwing warm golden reflections across quiet coastal surfaces.",
      badge: "LUMINOUS"
    }
  ]

  return (
    <section className="relative w-full bg-[#f5f2eb] text-[#1a1a18] py-24 md:py-40 px-6 border-t-[8px] border-[#1a1a18] z-10 flex flex-col items-center justify-center">

      <div className="max-w-7xl w-full flex flex-col gap-24">

        {/* Massive Brutalist Header */}
        <div className="flex flex-col gap-8 border-b-4 border-[#1a1a18] pb-16 overflow-hidden">
          <div className="inline-flex items-center gap-3 bg-[#c96b36] text-[#f5f2eb] px-4 py-2 w-max border-2 border-[#1a1a18] shadow-[4px_4px_0_0_#1a1a18]">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs tracking-[0.2em] uppercase font-bold">
              THE EXHIBIT / VOLUME_01
            </span>
          </div>

          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#1a1a18] hover:text-[#c96b36] transition-colors duration-300 text-6xl md:text-[8rem] font-montserrat font-black tracking-tighter uppercase leading-[0.85] cursor-default"
          >
            <motion.div
              animate={{ y: [-5, 5, -5], x: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            >
              SENSORY<br />
              ARCHITECTURE
            </motion.div>
          </motion.h2>

          <p className="text-[#1a1a18] text-lg md:text-xl font-bold max-w-2xl leading-relaxed bg-[#f0e8d5] p-6 border-l-8 border-[#c96b36]">
            EXPLORING THE DYNAMIC FRONTIER WHERE GENERATIVE CODE MELTS INTO PHYSICALLY FLOATING, AUTONOMOUS LUXURY PAVILIONS.
          </p>
        </div>

        {/* 3-Column Bulky Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {cards.map((c, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between p-8 bg-white border-4 border-[#1a1a18] min-h-[400px] transition-transform duration-300 hover:-translate-y-2 hover:-translate-x-2 shadow-[8px_8px_0_0_#1a1a18] hover:shadow-[16px_16px_0_0_#c96b36]"
            >
              <div className="flex justify-between items-start mb-12">
                {/* Huge Block Number */}
                <span className="text-[#1a1a18] font-black text-6xl tracking-tighter leading-none">
                  {c.num}
                </span>

                {/* Harsh Arrow */}
                <div className="w-12 h-12 flex items-center justify-center bg-[#1a1a18] text-[#f5f2eb] group-hover:bg-[#c96b36] transition-colors border-2 border-[#1a1a18]">
                  <ArrowRight className="w-6 h-6 -rotate-45" />
                </div>
              </div>

              <div>
                <h3 className="text-[#1a1a18] text-2xl font-montserrat font-black tracking-tight uppercase mb-6">
                  {c.title}
                </h3>
                <p className="text-[#1a1a18] font-medium leading-relaxed">
                  {c.desc}
                </p>
              </div>

              {/* Solid Badge */}
              <div className="mt-12">
                <span className="inline-block text-xs text-[#f5f2eb] font-bold tracking-widest uppercase bg-[#1a1a18] px-4 py-2 border-2 border-[#1a1a18] shadow-[4px_4px_0_0_#c96b36]">
                  {c.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
