import React from "react"
import { ArrowRight, Instagram, Twitter, Linkedin } from "lucide-react"
import { Waves } from "./wave-background"

export function Footer() {
  return (
    <footer className="relative w-full border-t-8 border-[#1a1a18] flex flex-col justify-between min-h-[70vh] md:min-h-[90vh] pt-12 md:pt-16 overflow-hidden z-20">

      {/* Interactive Waves Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Waves
          backgroundColor="#f5f2eb"
          strokeColor="rgba(26,26,24,0.15)"
        />
      </div>

      {/* Absolute Top Right Button */}
      <div className="absolute top-12 right-6 lg:right-12 z-20 pointer-events-auto">
        <button className="flex items-center gap-4 bg-[#1a1a18] text-[#f5f2eb] px-6 py-4 font-bold uppercase tracking-widest text-sm border-2 border-[#1a1a18] shadow-[6px_6px_0_0_#c96b36] hover:shadow-[10px_10px_0_0_#c96b36] hover:-translate-y-1 transition-all">
          Get in touch <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Absolute Top Left Info Group */}
      <div className="absolute top-12 left-6 lg:left-8 z-20 pointer-events-none flex flex-col gap-12">
        
        {/* Top Row: Inquiries & Location */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-8">
          <div className="flex flex-col gap-4 pointer-events-auto min-w-[200px]">
            <h4 className="text-[#1a1a18] font-black font-montserrat tracking-tighter uppercase text-xl border-l-4 border-[#c96b36] pl-3">
              Inquiries
            </h4>
            <a href="mailto:hello@navkatha.com" className="text-[#1a1a18] font-medium hover:text-[#c96b36] transition-colors w-max">
              hello@navkatha.com
            </a>
            <p className="text-[#1a1a18]/70 font-medium">
              +1 (555) 123-4567
            </p>
          </div>

          <div className="flex flex-col gap-4 pointer-events-auto min-w-[200px]">
            <h4 className="text-[#1a1a18] font-black font-montserrat tracking-tighter uppercase text-xl border-l-4 border-[#c96b36] pl-3">
              Location
            </h4>
            <p className="text-[#1a1a18]/70 font-medium leading-relaxed">
              100 Architectural Way<br />
              Design District<br />
              New York, NY 10001
            </p>
          </div>
        </div>

        {/* Bottom Row: Socials */}
        <div className="flex flex-col gap-4 pointer-events-auto">
          <h4 className="text-[#1a1a18] font-black font-montserrat tracking-tighter uppercase text-xl border-l-4 border-[#c96b36] pl-3">
            Socials
          </h4>
          <div className="flex gap-6">
            <a href="#instagram" className="text-[#1a1a18] hover:text-[#c96b36] transition-all p-3 border-2 border-[#1a1a18] bg-[#f5f2eb] shadow-[4px_4px_0_0_#1a1a18] hover:shadow-[6px_6px_0_0_#c96b36] hover:-translate-y-1 hover:-translate-x-1">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#twitter" className="text-[#1a1a18] hover:text-[#c96b36] transition-all p-3 border-2 border-[#1a1a18] bg-[#f5f2eb] shadow-[4px_4px_0_0_#1a1a18] hover:shadow-[6px_6px_0_0_#c96b36] hover:-translate-y-1 hover:-translate-x-1">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#linkedin" className="text-[#1a1a18] hover:text-[#c96b36] transition-all p-3 border-2 border-[#1a1a18] bg-[#f5f2eb] shadow-[4px_4px_0_0_#1a1a18] hover:shadow-[6px_6px_0_0_#c96b36] hover:-translate-y-1 hover:-translate-x-1">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Massive Full Width Brand Name */}
      <div className="relative z-10 w-full flex items-end justify-center px-4 md:px-8 pb-4 pointer-events-none mt-auto">
        <h1 className="text-[#1a1a18] font-black font-montserrat tracking-tighter leading-[0.8] uppercase text-[15vw] w-full text-center flex justify-between select-none">
          <span>N</span>
          <span>A</span>
          <span>V</span>
          <span>K</span>
          <span>A</span>
          <span>T</span>
          <span>H</span>
          <span>A</span>
        </h1>
      </div>

    </footer>
  )
}
