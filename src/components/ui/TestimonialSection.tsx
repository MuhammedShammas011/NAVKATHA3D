import React from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    id: "PERMIT-001",
    author: "Elena Rostova",
    role: "City Planning Director, Neo-Reykjavik",
    text: "Navkatha doesn't just build structures; they engineer ecosystems. The Sensory Physics pavilion integrated seamlessly into our coastal grid, responding to wind sheer data in real-time.",
    date: "10.12.2025",
    status: "APPROVED",
    stampColor: "#c96b36",
    colSpan: "md:col-span-2",
    animation: { y: 50 },
    hoverAnim: { scale: 1.02, rotate: -1 }
  },
  {
    id: "PERMIT-002",
    author: "Marcus Vance",
    role: "Lead Architect, Vance & Co.",
    text: "Brutal, uncompromising, yet incredibly fluid. Their use of organic double-curved hulls challenged everything we knew about high-tensile concrete forms.",
    date: "04.28.2026",
    status: "VERIFIED",
    stampColor: "#1a1a18",
    colSpan: "md:col-span-1",
    animation: { x: -50 },
    hoverAnim: { y: -10, boxShadow: "16px 16px 0px 0px #c96b36" }
  },
  {
    id: "PERMIT-003",
    author: "Dr. Sarah Lin",
    role: "Head of Kinetic Structures, MIT",
    text: "A masterclass in autonomous architecture. The tactile lighting grids they developed are now standard curriculum in our advanced environmental design courses.",
    date: "11.05.2025",
    status: "REVIEWED",
    stampColor: "#c96b36",
    colSpan: "md:col-span-1",
    animation: { y: -50 },
    hoverAnim: { scale: 0.95, rotate: 2 }
  },
  {
    id: "PERMIT-004",
    author: "Jameson Holt",
    role: "CEO, Holt Luxury Developments",
    text: "We commissioned Navkatha for a floating resort. What they delivered was a living entity that breathes with the tide. Utterly terrifying in its brilliance.",
    date: "02.14.2026",
    status: "COMPLETED",
    stampColor: "#1a1a18",
    colSpan: "md:col-span-1",
    animation: { scale: 0.8 },
    hoverAnim: { x: 10, y: -10 }
  },
  {
    id: "PERMIT-005",
    author: "Aida Bell",
    role: "Chief Curator, Museum of Modern Form",
    text: "Their work exists at the harsh intersection of brutalist history and generative future. It is raw data made physically manifest in steel and stone.",
    date: "05.22.2026",
    status: "ARCHIVED",
    stampColor: "#c96b36",
    colSpan: "md:col-span-2",
    animation: { x: 50 },
    hoverAnim: { skewX: -2, skewY: 1 }
  }
]

export function TestimonialSection() {
  return (
    <section className="relative w-full bg-[#f5f2eb] text-[#1a1a18] py-32 md:py-48 px-6 border-t-[8px] border-[#1a1a18] z-20 overflow-hidden">

      {/* Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'linear-gradient(#1a1a18 1px, transparent 1px), linear-gradient(90deg, #1a1a18 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-24">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b-8 border-[#1a1a18] pb-12">
          <div className="flex flex-col gap-4">
            <span className="inline-block text-xs text-[#f5f2eb] font-bold tracking-widest uppercase bg-[#c96b36] px-4 py-2 border-2 border-[#1a1a18] shadow-[4px_4px_0_0_#1a1a18] w-max">
              // ARCHITECTURAL REVIEWS
            </span>
            <h2 className="text-[#1a1a18] text-5xl md:text-[6rem] font-montserrat font-black tracking-tighter uppercase leading-[0.85]">
              FIELD <br /> ASSESSMENTS
            </h2>
          </div>
          <p className="text-[#1a1a18] font-bold max-w-sm text-left md:text-right bg-white p-4 border-2 border-[#1a1a18] shadow-[4px_4px_0_0_#c96b36]">
            VERIFIED FEEDBACK FROM OUR TRUSTED CLIENTS
          </p>
        </div>

        {/* Asymmetric Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, ...t.animation }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={t.hoverAnim}
              className={`relative bg-white border-[6px] border-[#1a1a18] shadow-[12px_12px_0_0_#1a1a18] p-8 md:p-10 flex flex-col justify-between group transition-shadow duration-300 cursor-default ${t.colSpan}`}
            >
              {/* Permit Header */}
              <div className="flex justify-between items-start mb-12 border-b-2 border-[#1a1a18] pb-4">
                <div className="flex flex-col">
                  <span className="text-xs font-bold tracking-widest font-mono">{t.id}</span>
                  <span className="text-[0.65rem] font-bold tracking-widest text-[#1a1a18]/50 uppercase mt-1">DATE: {t.date}</span>
                </div>
                <div
                  className="px-3 py-1 border-2 border-[#1a1a18] text-xs font-black tracking-widest uppercase transform rotate-6 bg-white"
                  style={{ color: t.stampColor, borderColor: t.stampColor }}
                >
                  {t.status}
                </div>
              </div>

              {/* Quote */}
              <div className="relative mb-12 flex-grow">
                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-[#1a1a18]/10 -rotate-12" />
                <p className="text-[#1a1a18] font-medium text-lg md:text-2xl leading-relaxed relative z-10">
                  "{t.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex justify-between items-end mt-auto pt-8 border-t-[4px] border-[#1a1a18] border-dashed">
                <div className="flex flex-col">
                  <span className="text-[#1a1a18] font-black font-montserrat uppercase text-xl md:text-2xl tracking-tighter">
                    {t.author}
                  </span>
                  <span className="text-[#c96b36] font-bold text-xs md:text-sm tracking-widest uppercase mt-1">
                    {t.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
