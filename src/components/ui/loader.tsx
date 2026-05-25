import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function InitialLoader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Keep loader visible for a minimum duration
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 800) // Wait for exit animation
    }, 2500)
    return () => clearTimeout(timer)
  }, [onComplete])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  }

  const itemVariants = {
    hidden: { scale: 0, y: 10 },
    show: {
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f5f2eb]"
        >
          <motion.svg
            viewBox="0 0 100 100"
            className="w-24 h-24 text-[#c96b36] select-none drop-shadow-sm"
          >
            {/* Row 1 */}
            <motion.rect variants={itemVariants} x="6" y="6" width="24" height="24" rx="4" fill="currentColor" opacity="0.8" />
            <motion.rect variants={itemVariants} x="38" y="6" width="24" height="24" rx="4" fill="currentColor" opacity="0.85" />
            <motion.circle variants={itemVariants} cx="82" cy="18" r="12" fill="currentColor" opacity="1.0" />

            {/* Row 2 */}
            <motion.rect variants={itemVariants} x="6" y="38" width="24" height="24" rx="4" fill="currentColor" opacity="0.7" />
            <motion.rect variants={itemVariants} x="38" y="38" width="24" height="24" rx="4" fill="currentColor" opacity="0.75" />
            <motion.rect variants={itemVariants} x="70" y="38" width="24" height="24" rx="4" fill="currentColor" opacity="0.85" />

            {/* Row 3 */}
            <motion.rect variants={itemVariants} x="6" y="70" width="24" height="24" rx="4" fill="currentColor" opacity="0.55" />
            <motion.rect variants={itemVariants} x="38" y="70" width="24" height="24" rx="4" fill="currentColor" opacity="0.6" />
            <motion.rect variants={itemVariants} x="70" y="70" width="24" height="24" rx="4" fill="currentColor" opacity="0.7" />
          </motion.svg>

          {/* Loading Bar */}
          <div className="mt-12 w-48 h-[2px] bg-[#1a1a18]/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="h-full bg-[#c96b36] origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
