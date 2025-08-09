import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  show: boolean;
  durationMs?: number;
  onFinish?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ show, durationMs = 1000, onFinish }) => {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onFinish?.();
    }, durationMs);
    return () => clearTimeout(timer);
  }, [show, durationMs, onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="fixed inset-0 z-80 flex items-center justify-center bg-black"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                background:
                  'radial-gradient(1200px 600px at 50% 50%, rgba(255,255,255,0.06), transparent 60%)',
              }}
            />
          </div>

          {/* Logo */}
          <motion.img
            src="/image.png"
            alt="Casa Grande PropCare"
            loading="eager"
            className="h-16 md:h-20 w-auto select-none drop-shadow-[0_6px_24px_rgba(255,255,255,0.15)]"
            draggable={false}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          />

          {/* Soft pulse ring */}
          <motion.span
            className="absolute rounded-full"
            style={{ width: 200, height: 200, borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.12)' }}
            initial={{ opacity: 0.6, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1.6, ease: 'easeOut', repeat: Infinity, repeatDelay: 0.4 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;


