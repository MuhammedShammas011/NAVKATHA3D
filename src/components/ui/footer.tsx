"use client"
import React, { useState } from "react"
import { ArrowRight, Instagram, Linkedin, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Waves } from "./wave-background"
import { FadeIn } from "./fade-in"

const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <footer id="contact" className="relative w-full border-t-8 border-[#1a1a18] flex flex-col justify-between min-h-[70vh] md:min-h-[90vh] pt-12 md:pt-16 overflow-hidden z-20">

      {/* Interactive Waves Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Waves
          backgroundColor="#f5f2eb"
          strokeColor="rgba(26,26,24,0.15)"
        />
      </div>

      {/* Absolute Top Right Button */}
      <FadeIn delay={0.2} className="absolute top-12 right-6 lg:right-12 z-20 pointer-events-auto">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-4 bg-[#1a1a18] text-[#f5f2eb] px-6 py-4 font-bold uppercase tracking-widest text-sm border-2 border-[#1a1a18] shadow-[6px_6px_0_0_#c96b36] hover:shadow-[10px_10px_0_0_#c96b36] hover:-translate-y-1 transition-all"
        >
          Get in touch <ArrowRight className="w-5 h-5" />
        </button>
      </FadeIn>

      {/* Absolute Top Left Info Group */}
      <FadeIn className="absolute top-12 left-6 lg:left-8 z-20 pointer-events-none flex flex-col gap-12">

        {/* Top Row: Inquiries & Location */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-8">
          <div className="flex flex-col gap-4 pointer-events-auto min-w-[200px]">
            <h4 className="text-[#1a1a18] font-black font-montserrat tracking-tighter uppercase text-xl border-l-4 border-[#c96b36] pl-3">
              Inquiries
            </h4>
            <div className="flex flex-col gap-1">
              <a href="mailto:hello@navkatha.com" className="text-[#1a1a18] font-medium hover:text-[#c96b36] transition-colors w-max">
                hello@navkatha.com
              </a>
              <p className="text-[#1a1a18] font-medium">
                +91 89953 48457
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 pointer-events-auto min-w-[200px]">
            <h4 className="text-[#1a1a18] font-black font-montserrat tracking-tighter uppercase text-xl border-l-4 border-[#c96b36] pl-3">
              Location
            </h4>
            <p className="text-[#1a1a18] font-medium leading-relaxed">
              100 ARCHITECTURAL WAY<br />
              BANGALORU<br />
              INDIA, KARNATAKA -560016
            </p>
          </div>
        </div>

        {/* Bottom Row: Socials */}
        <div className="flex flex-col gap-4 pointer-events-auto">
          <h4 className="text-[#1a1a18] font-black font-montserrat tracking-tighter uppercase text-xl border-l-4 border-[#c96b36] pl-3">
            Socials
          </h4>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/studionavkatha/" className="text-[#1a1a18] hover:text-[#c96b36] transition-all p-3 border-2 border-[#1a1a18] bg-[#f5f2eb] shadow-[4px_4px_0_0_#1a1a18] hover:shadow-[6px_6px_0_0_#c96b36] hover:-translate-y-1 hover:-translate-x-1">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://www.x.com" className="text-[#1a1a18] hover:text-[#c96b36] transition-all p-3 border-2 border-[#1a1a18] bg-[#f5f2eb] shadow-[4px_4px_0_0_#1a1a18] hover:shadow-[6px_6px_0_0_#c96b36] hover:-translate-y-1 hover:-translate-x-1">
              <XIcon className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/shradha-edavi-395742138/" className="text-[#1a1a18] hover:text-[#c96b36] transition-all p-3 border-2 border-[#1a1a18] bg-[#f5f2eb] shadow-[4px_4px_0_0_#1a1a18] hover:shadow-[6px_6px_0_0_#c96b36] hover:-translate-y-1 hover:-translate-x-1">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </FadeIn>

      {/* Massive Full Width Brand Name */}
      <FadeIn delay={0.1} direction="none" className="relative z-10 w-full flex items-end justify-center px-4 md:px-8 pb-0 pointer-events-none mt-auto">
        <h1 className="text-[#1a1a18]/100 font-black font-montserrat tracking-tighter leading-[0.8] uppercase text-[15vw] w-full text-center flex justify-between select-none">
          <span>N</span>
          <span>A</span>
          <span>V</span>
          <span>K</span>
          <span>A</span>
          <span>T</span>
          <span>H</span>
          <span>A</span>
        </h1>
      </FadeIn>

      {/* Contact Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#f5f2eb] overflow-y-auto pointer-events-auto"
          >
            {/* Massive Background Watermark */}
            <div className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
              <h1 className="text-[#1a1a18] font-black font-montserrat tracking-tighter uppercase text-[22vw] opacity-[0.03] select-none whitespace-nowrap">
                NAVKATHA
              </h1>
            </div>

            <div className="min-h-screen flex flex-col p-6 md:p-12 border-t-[16px] border-[#c96b36] max-w-7xl mx-auto relative z-10">

              {/* Header & Close */}
              <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
                <div className="flex flex-col gap-4">
                  <span className="inline-block text-xs text-[#f5f2eb] font-bold tracking-widest uppercase bg-[#1a1a18] px-4 py-2 border-2 border-[#1a1a18] shadow-[4px_4px_0_0_#c96b36] w-max">
                    // NEW INQUIRY
                  </span>
                  <h2 className="text-[#1a1a18] text-5xl md:text-8xl font-montserrat font-black tracking-tighter uppercase leading-[0.85] max-w-4xl">
                    START A <br /> PROJECT
                  </h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#1a1a18] text-[#f5f2eb] px-8 py-4 font-bold uppercase tracking-widest text-sm border-2 border-[#1a1a18] shadow-[6px_6px_0_0_#c96b36] hover:shadow-[10px_10px_0_0_#c96b36] hover:-translate-y-1 transition-all whitespace-nowrap sticky top-6 z-50"
                >
                  Close [X]
                </button>
              </div>

              {/* Form Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 flex-grow">
                {/* Left Side: Info */}
                <div className="flex flex-col gap-8">
                  <div className="bg-[#1a1a18] text-[#f5f2eb] p-8 border-4 border-[#1a1a18] shadow-[8px_8px_0_0_#c96b36]">
                    <h3 className="text-2xl font-black font-montserrat uppercase mb-6 border-b border-[#f5f2eb]/20 pb-4">
                      Direct Contact
                    </h3>
                    <div className="flex flex-col gap-6">
                      <div>
                        <p className="font-bold tracking-widest uppercase text-xs mb-2 text-[#c96b36]">Email</p>
                        <a href="mailto:hello@navkatha.com" className="font-black text-xl hover:text-[#c96b36] transition-colors">hello@navkatha.com</a>
                      </div>
                      <div>
                        <p className="font-bold tracking-widest uppercase text-xs mb-2 text-[#c96b36]">Phone</p>
                        <p className="font-black text-xl">+91 89953 48457</p>
                      </div>
                      <div>
                        <p className="font-bold tracking-widest uppercase text-xs mb-2 text-[#c96b36]">Headquarters</p>
                        <p className="font-black text-xl uppercase leading-tight">100 Architectural Way<br />BANGALORU<br />INDIA, KARNATAKA 560016</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Form or Success Message */}
                <div className="bg-white p-8 border-4 border-[#1a1a18] shadow-[8px_8px_0_0_#1a1a18] flex flex-col justify-center">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center gap-6 py-12"
                    >
                      <div className="w-24 h-24 bg-[#c96b36] border-4 border-[#1a1a18] shadow-[8px_8px_0_0_#1a1a18] flex items-center justify-center mb-4 -rotate-12">
                        <Send className="w-10 h-10 text-[#f5f2eb]" />
                      </div>
                      <h3 className="text-4xl font-black font-montserrat uppercase text-[#1a1a18]">Inquiry Received</h3>
                      <p className="text-[#1a1a18] font-medium max-w-sm text-lg">
                        Thank you for reaching out. Our architectural team will review your project details and respond within 24 hours.
                      </p>
                      <button
                        onClick={() => { setIsModalOpen(false); setTimeout(() => setIsSubmitted(false), 500) }}
                        className="mt-8 bg-[#1a1a18] text-[#f5f2eb] px-8 py-4 font-bold uppercase tracking-widest text-sm border-2 border-[#1a1a18] shadow-[6px_6px_0_0_#c96b36] hover:shadow-[10px_10px_0_0_#c96b36] hover:-translate-y-1 transition-all"
                      >
                        Return to site
                      </button>
                    </motion.div>
                  ) : (
                    <form className="flex flex-col gap-6" onSubmit={(e) => { 
                      e.preventDefault(); 
                      const formData = new FormData(e.currentTarget);
                      const name = formData.get('name');
                      const email = formData.get('email');
                      const details = formData.get('details');
                      
                      // Open default mail client with pre-filled details
                      window.location.href = `mailto:mhdshammas011@gmail.com?subject=New Project Inquiry from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AProject Details:%0D%0A${details}`;
                      
                      setIsSubmitted(true); 
                    }}>
                      <div className="flex flex-col gap-2">
                        <label className="font-bold tracking-widest uppercase text-xs text-[#1a1a18]">Full Name</label>
                        <input name="name" required type="text" placeholder="John Doe" className="w-full bg-[#f5f2eb] border-2 border-[#1a1a18] p-4 text-[#1a1a18] font-medium focus:outline-none focus:border-[#c96b36] transition-colors placeholder:text-[#1a1a18]/40" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-bold tracking-widest uppercase text-xs text-[#1a1a18]">Email Address</label>
                        <input name="email" required type="email" placeholder="john@company.com" className="w-full bg-[#f5f2eb] border-2 border-[#1a1a18] p-4 text-[#1a1a18] font-medium focus:outline-none focus:border-[#c96b36] transition-colors placeholder:text-[#1a1a18]/40" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-bold tracking-widest uppercase text-xs text-[#1a1a18]">Project Details</label>
                        <textarea name="details" required rows={5} placeholder="Tell us about your vision..." className="w-full bg-[#f5f2eb] border-2 border-[#1a1a18] p-4 text-[#1a1a18] font-medium focus:outline-none focus:border-[#c96b36] transition-colors placeholder:text-[#1a1a18]/40 resize-none"></textarea>
                      </div>
                      <button type="submit" className="mt-4 flex items-center justify-center gap-4 bg-[#1a1a18] text-[#f5f2eb] px-8 py-5 font-bold uppercase tracking-widest text-sm border-2 border-[#1a1a18] shadow-[6px_6px_0_0_#c96b36] hover:shadow-[10px_10px_0_0_#c96b36] hover:-translate-y-1 hover:-translate-x-1 transition-all w-full">
                        Submit Inquiry <Send className="w-5 h-5" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </footer>
  )
}
