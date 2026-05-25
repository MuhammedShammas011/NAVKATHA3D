"use client"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Box, ChevronLeft, ChevronRight } from "lucide-react"

const works = [
  {
    id: 1,
    title: "KINETIC PAVILION",
    category: "EXPERIMENTAL",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "CONCRETE WAVE",
    category: "INSTALLATION",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "VOID STRUCTURE",
    category: "MONUMENTAL",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "STEEL CANOPY",
    category: "INDUSTRIAL",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "TENSION GRID",
    category: "FRAMEWORK",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "BRUTALIST CORE",
    category: "STRUCTURE",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200&auto=format&fit=crop"
  }
]

export function WorksSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-advance timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % works.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % works.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + works.length) % works.length)

  return (
    <section className="relative w-full min-h-[90vh] bg-[#f5f2eb] border-t-[8px] border-[#1a1a18] flex flex-col items-center justify-center py-24 overflow-hidden">

      <div className="w-full max-w-[1400px] px-6">

        {/* Massive Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-[#c96b36] border-4 border-[#1a1a18] shadow-[8px_8px_0_0_#1a1a18] flex items-center justify-center">
              <Box className="w-8 h-8 text-[#1a1a18]" />
            </div>
            <h2 className="text-[#1a1a18] hover:text-[#c96b36] transition-colors duration-300 text-5xl md:text-7xl font-montserrat font-black tracking-tighter uppercase leading-none bg-[#f5f2eb] px-4 py-2 border-4 border-[#1a1a18] cursor-default">
              Built <br />Projects
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="w-16 h-16 flex items-center justify-center bg-white border-4 border-[#1a1a18] shadow-[6px_6px_0_0_#1a1a18] hover:shadow-[10px_10px_0_0_#c96b36] hover:-translate-y-1 hover:-translate-x-1 transition-all"
            >
              <ChevronLeft className="w-8 h-8 text-[#1a1a18]" />
            </button>
            <button
              onClick={nextSlide}
              className="w-16 h-16 flex items-center justify-center bg-white border-4 border-[#1a1a18] shadow-[6px_6px_0_0_#1a1a18] hover:shadow-[10px_10px_0_0_#c96b36] hover:-translate-y-1 hover:-translate-x-1 transition-all"
            >
              <ChevronRight className="w-8 h-8 text-[#1a1a18]" />
            </button>
          </div>
        </div>

        {/* State-driven Carousel Track */}
        <div className="w-full relative h-[60vh] min-h-[500px]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="group relative w-full h-full max-w-[1000px] border-[6px] border-[#1a1a18] bg-[#1a1a18] shadow-[16px_16px_0_0_#1a1a18] transition-all duration-500 hover:shadow-[24px_24px_0_0_#c96b36] hover:-translate-y-2 overflow-hidden">

                <img
                  src={works[currentIndex].image}
                  alt={works[currentIndex].title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                />

                {/* Harsh Overlay Overlay */}
                <div className="absolute inset-0 bg-[#1a1a18]/20 group-hover:bg-transparent transition-colors duration-500" />

                {/* Badge Slam on Hover */}
                <div className="absolute -bottom-6 -right-6 md:-right-12 z-20 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out">
                  <div className="bg-[#1a1a18] border-[4px] border-[#1a1a18] p-6 shadow-[8px_8px_0_0_#c96b36] flex flex-col gap-2">
                    <span className="text-[#c96b36] text-xs font-bold tracking-[0.2em] uppercase">
                      // {works[currentIndex].category}
                    </span>
                    <div className="flex items-center gap-6">
                      <h3 className="text-[#f5f2eb] text-3xl md:text-5xl font-black font-montserrat tracking-tighter uppercase whitespace-nowrap">
                        {works[currentIndex].title}
                      </h3>
                      <div className="w-12 h-12 bg-[#c96b36] border-2 border-[#1a1a18] flex items-center justify-center -rotate-45">
                        <ArrowRight className="w-6 h-6 text-[#1a1a18]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicator Dots */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-4">
            {works.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-12 h-4 border-2 border-[#1a1a18] transition-all ${idx === currentIndex ? "bg-[#c96b36] shadow-[4px_4px_0_0_#1a1a18] -translate-y-1" : "bg-white"
                  }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
