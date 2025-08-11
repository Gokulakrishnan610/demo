import React from 'react';
import { motion } from 'framer-motion';
// no icon used in header; logo image is displayed

const AnimatedHeader: React.FC = () => {
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2 }
    }
  };

  // badgeVariants removed as header now only shows logo

  return (
    <motion.header 
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-white text-brand-dark shadow-2xl overflow-hidden border-b border-brand-gold/20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(0,0,0,0.06) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(0,0,0,0.04) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 50%, rgba(0,0,0,0.05) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-black/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <motion.img
              variants={logoVariants}
              loading="eager"
              src="/image.png"
              alt="Casa Grande PropCare"
              className="h-14 md:h-16 w-auto select-none"
              draggable={false}
            />
          </div>
          
          {/* <motion.div 
            variants={badgeVariants}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 bg-neutral-900/70 px-6 py-3 rounded-2xl backdrop-blur-sm border border-neutral-800"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-neutral-300" />
            </motion.div>
            <div>
              <div className="text-sm font-medium text-neutral-400">Organization Value</div>
              <div className="text-xl font-bold text-white">₹500 Cr</div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </motion.header>
  );
};

export default AnimatedHeader;