import React, { useState } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from './fade-in'

export function FeatureSection() {
  const cards = [
    {
      num: "01",
      title: "SENSORY PHYSICS",
      desc: "Autonomously shifting structures responding to human touch, real-time kinetic coordinates, and environmental breeze patterns.",
      badge: "KINETIC",
      image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop",
      longDesc: "A deeper exploration into Sensory Physics reveals that our structures are not merely passive objects, but active participants in their environment. By utilizing advanced sensors and kinetic mechanisms, the architecture physically breathes, expanding and contracting with the rhythm of its inhabitants. The kinetic facades provide dynamic shading, optimal airflow, and an ever-evolving visual aesthetic that challenges traditional static building methodologies.",
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    {
      num: "02",
      title: "ORGANIC HULLS",
      desc: "Sleek double-curved concrete shells inspired by biological waveforms, floating gracefully on calm marine preserves.",
      badge: "ARCHITECTURAL",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      longDesc: "Organic Hulls represent a radical departure from rigid geometry. We cast specialized high-strength concrete over complex, double-curved molds to create shells that mimic the fluid grace of marine life. These installations don't just sit on the water—they interact with the waves, distributing stress efficiently across their sweeping surfaces while creating serene, cavernous interiors that amplify the acoustics of the ocean.",
      gallery: [
        "https://images.unsplash.com/photo-1541888045656-d70399478f7e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1481026469463-66327c86e544?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    {
      num: "03",
      title: "TACTILE LIGHTING",
      desc: "Soft interior ambient glow that mirrors twilight cycles, throwing warm golden reflections across quiet coastal surfaces.",
      badge: "LUMINOUS",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      longDesc: "Lighting should be felt, not just seen. Tactile Lighting is our approach to embedding luminosity directly into the raw structural materials of a space. We integrate thousands of micro-LEDs within translucent concrete and porous steel networks. The result is a structure that glows softly from within, shifting its color temperature and intensity to perfectly match natural circadian rhythms and the ambient light of the setting sun.",
      gallery: [
        "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop"
      ]
    }
  ]

  const [selectedFeature, setSelectedFeature] = useState<typeof cards[0] | null>(null)

  return (
    <section id="sensory-architecture" className="relative w-full bg-[#f5f2eb] text-[#1a1a18] py-24 md:py-40 px-6 border-t-[8px] border-[#1a1a18] rounded-t-[3rem] md:rounded-t-[5rem] z-10 flex flex-col items-center justify-center overflow-hidden">

      <div className="max-w-7xl w-full flex flex-col gap-24">

        {/* Massive Brutalist Header */}
        <div className="flex flex-col gap-8 border-b-4 border-[#1a1a18] pb-16 overflow-hidden">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-3 bg-[#c96b36] text-[#f5f2eb] px-4 py-2 w-max border-2 border-[#1a1a18] shadow-[4px_4px_0_0_#1a1a18]">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs tracking-[0.2em] uppercase font-bold">
                THE EXHIBIT / VOLUME_01
              </span>
            </div>
          </FadeIn>

          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#1a1a18] text-6xl md:text-[8rem] font-montserrat font-black tracking-tighter uppercase leading-[0.85] cursor-default"
          >
            <motion.div
              animate={{ y: [-5, 5, -5], x: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            >
              SENSORY<br />
              ARCHITECTURE
            </motion.div>
          </motion.h2>

          <FadeIn delay={0.2}>
            <p className="text-[#1a1a18] text-lg md:text-xl font-bold max-w-2xl leading-relaxed bg-[#f0e8d5] p-6 border-l-8 border-[#c96b36]">
              EXPLORING THE DYNAMIC FRONTIER WHERE GENERATIVE CODE MELTS INTO PHYSICALLY FLOATING, AUTONOMOUS LUXURY PAVILIONS.
            </p>
          </FadeIn>
        </div>

        {/* 3-Column Bulky Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {cards.map((c, idx) => (
            <FadeIn key={idx} delay={idx * 0.15}>
              <div
                onClick={() => setSelectedFeature(c)}
                className="group relative flex flex-col justify-between p-8 bg-white border-4 border-[#1a1a18] min-h-[400px] transition-transform duration-300 hover:-translate-y-2 hover:-translate-x-2 shadow-[8px_8px_0_0_#1a1a18] hover:shadow-[16px_16px_0_0_#c96b36] h-full cursor-pointer"
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
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Feature Detail Overlay Modal */}
      <AnimatePresence>
        {selectedFeature && (
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
                    // {selectedFeature.badge}
                  </span>
                  <h2 className="text-[#1a1a18] text-5xl md:text-8xl font-montserrat font-black tracking-tighter uppercase leading-[0.85] max-w-4xl">
                    {selectedFeature.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="bg-[#1a1a18] text-[#f5f2eb] px-8 py-4 font-bold uppercase tracking-widest text-sm border-2 border-[#1a1a18] shadow-[6px_6px_0_0_#c96b36] hover:shadow-[10px_10px_0_0_#c96b36] hover:-translate-y-1 transition-all whitespace-nowrap sticky top-6 z-50"
                >
                  [X]
                </button>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
                <div className="lg:col-span-8">
                  <img
                    src={selectedFeature.image}
                    alt={selectedFeature.title}
                    className="w-full h-auto object-cover border-[6px] border-[#1a1a18] shadow-[16px_16px_0_0_#1a1a18]"
                  />
                </div>
                <div className="lg:col-span-4 flex flex-col gap-8">
                  <div className="bg-white p-8 border-4 border-[#1a1a18] shadow-[8px_8px_0_0_#1a1a18]">
                    <h3 className="text-2xl font-black font-montserrat uppercase mb-6 border-b-4 border-[#1a1a18] pb-4">
                      Concept Details
                    </h3>
                    <p className="text-[#1a1a18] font-medium leading-relaxed text-lg">
                      {selectedFeature.longDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <h3 className="text-4xl md:text-6xl font-black font-montserrat uppercase mb-12 border-b-8 border-[#1a1a18] pb-4">
                Exploration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-24">
                {selectedFeature.gallery.map((img: string, idx: number) => (
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
