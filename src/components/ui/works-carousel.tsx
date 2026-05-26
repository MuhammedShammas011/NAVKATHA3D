"use client"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Box, ChevronLeft, ChevronRight } from "lucide-react"
import { FadeIn } from "./fade-in"

const works = [
  {
    id: 1,
    title: "KINETIC PAVILION",
    category: "EXPERIMENTAL",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop",
    description: "An autonomously shifting structure that responds to human touch, real-time kinetic coordinates, and environmental breeze patterns. This experimental pavilion blurs the line between static architecture and living organisms, creating an ever-changing volume of space.",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541888045656-d70399478f7e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    title: "CONCRETE WAVE",
    category: "INSTALLATION",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    description: "A sleek, double-curved concrete shell inspired by biological waveforms. Floating gracefully on a calm marine preserve, this installation challenges the heavy nature of concrete by manipulating it into fluid, continuous surfaces.",
    gallery: [
      "https://images.unsplash.com/photo-1541888045656-d70399478f7e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1481026469463-66327c86e544?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    title: "VOID STRUCTURE",
    category: "MONUMENTAL",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    description: "A monumental study in negative space. This brutalist core carves massive voids into monolithic concrete, allowing sunlight to slice through the structure at aggressive angles, tracking time like a monumental sundial.",
    gallery: [
      "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1481026469463-66327c86e544?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: 4,
    title: "STEEL CANOPY",
    category: "INDUSTRIAL",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
    description: "An exposed skeletal canopy built entirely from raw, unpolished industrial steel. The framework spans across a massive public plaza, providing an aggressive yet protective grid that filters heavy rain and harsh sunlight.",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541888045656-d70399478f7e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: 5,
    title: "TENSION GRID",
    category: "FRAMEWORK",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    description: "A web of high-tension cables supporting suspended walkways in a densely packed urban environment. The grid emphasizes structural honesty, leaving all load-bearing components completely exposed.",
    gallery: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541888045656-d70399478f7e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: 6,
    title: "BRUTALIST CORE",
    category: "STRUCTURE",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200&auto=format&fit=crop",
    description: "A monolithic fortress designed to withstand extreme coastal weathering. Its unyielding, massive concrete walls contrast sharply with the fragile, delicate lighting installed throughout its cavernous interior.",
    gallery: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1481026469463-66327c86e544?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=1200&auto=format&fit=crop"
    ]
  }
]

export function WorksSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<typeof works[0] | null>(null)

  // Auto-advance timer
  useEffect(() => {
    if (selectedProject) return; // Pause auto-advance when viewing details
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % works.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [selectedProject])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % works.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + works.length) % works.length)

  return (
    <section id="built-projects" className="relative w-full min-h-[90vh] bg-[#f5f2eb] border-t-[8px] border-[#1a1a18] flex flex-col items-center justify-center py-24 overflow-hidden">

      <div className="w-full max-w-[1400px] px-6">

        {/* Massive Header Row */}
        <FadeIn>
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
        </FadeIn>

        {/* State-driven Carousel Track */}
        <FadeIn delay={0.2} className="w-full relative h-[60vh] min-h-[500px]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div 
                onClick={() => setSelectedProject(works[currentIndex])}
                className="group relative w-full h-full max-w-[1000px] border-[6px] border-[#1a1a18] bg-[#1a1a18] shadow-[16px_16px_0_0_#1a1a18] transition-all duration-500 hover:shadow-[24px_24px_0_0_#c96b36] hover:-translate-y-2 overflow-hidden cursor-pointer"
              >

                <img
                  src={works[currentIndex].image}
                  alt={works[currentIndex].title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                />

                {/* Harsh Overlay Overlay */}
                <div className="absolute inset-0 bg-[#1a1a18]/20 group-hover:bg-transparent transition-colors duration-500" />

                {/* Badge Slam on Hover */}
                <div className="absolute bottom-0 right-0 z-20 opacity-0 scale-90 origin-bottom-right group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out">
                  <div className="bg-[#1a1a18] border-t-[4px] border-l-[4px] border-[#1a1a18] p-6 shadow-[-8px_-8px_0_0_#c96b36] flex flex-col gap-2">
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

        </FadeIn>

      </div>

      {/* Project Detail Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#f5f2eb] overflow-y-auto pointer-events-auto"
          >
            <div className="min-h-screen flex flex-col p-6 md:p-12 border-t-[16px] border-[#c96b36] max-w-7xl mx-auto">
              
              {/* Header & Close */}
              <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
                <div className="flex flex-col gap-4">
                  <span className="inline-block text-xs text-[#f5f2eb] font-bold tracking-widest uppercase bg-[#1a1a18] px-4 py-2 border-2 border-[#1a1a18] shadow-[4px_4px_0_0_#c96b36] w-max">
                    // {selectedProject.category}
                  </span>
                  <h2 className="text-[#1a1a18] text-5xl md:text-8xl font-montserrat font-black tracking-tighter uppercase leading-[0.85] max-w-4xl">
                    {selectedProject.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-[#1a1a18] text-[#f5f2eb] px-8 py-4 font-bold uppercase tracking-widest text-sm border-2 border-[#1a1a18] shadow-[6px_6px_0_0_#c96b36] hover:shadow-[10px_10px_0_0_#c96b36] hover:-translate-y-1 transition-all whitespace-nowrap sticky top-6 z-50"
                >
                  Close [X]
                </button>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
                <div className="lg:col-span-8">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-auto object-cover border-[6px] border-[#1a1a18] shadow-[16px_16px_0_0_#1a1a18]"
                  />
                </div>
                <div className="lg:col-span-4 flex flex-col gap-8">
                  <div className="bg-white p-8 border-4 border-[#1a1a18] shadow-[8px_8px_0_0_#1a1a18]">
                    <h3 className="text-2xl font-black font-montserrat uppercase mb-6 border-b-4 border-[#1a1a18] pb-4">
                      Project Details
                    </h3>
                    <p className="text-[#1a1a18] font-medium leading-relaxed text-lg">
                      {selectedProject.description}
                    </p>
                  </div>
                  <div className="bg-[#1a1a18] text-[#f5f2eb] p-8 border-4 border-[#1a1a18] shadow-[8px_8px_0_0_#c96b36]">
                    <p className="font-bold tracking-widest uppercase text-xs mb-2 text-[#c96b36]">Client</p>
                    <p className="font-black text-xl uppercase mb-6 border-b border-[#f5f2eb]/20 pb-4">Confidential</p>
                    <p className="font-bold tracking-widest uppercase text-xs mb-2 text-[#c96b36]">Year</p>
                    <p className="font-black text-xl uppercase mb-6 border-b border-[#f5f2eb]/20 pb-4">2026</p>
                    <p className="font-bold tracking-widest uppercase text-xs mb-2 text-[#c96b36]">Location</p>
                    <p className="font-black text-xl uppercase">Global Overlay</p>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <h3 className="text-4xl md:text-6xl font-black font-montserrat uppercase mb-12 border-b-8 border-[#1a1a18] pb-4">
                Gallery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-24">
                {selectedProject.gallery.map((img, idx) => (
                  <div key={idx} className="relative aspect-square border-4 border-[#1a1a18] shadow-[8px_8px_0_0_#1a1a18] overflow-hidden group">
                    <img 
                      src={img} 
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#1a1a18]/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
