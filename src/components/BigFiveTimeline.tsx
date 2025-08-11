import { motion } from 'framer-motion';
import React from 'react';

export interface BigFiveItem {
  title: string;
  value: string;
  target: string;
  color: string; // tailwind bg-* color hint for dot
  // icon is a Lucide icon component
  icon: React.ComponentType<{ className?: string }>;
}

interface BigFiveTimelineProps {
  items: BigFiveItem[];
  visibleCount: number;
}

const cardVariants = {
  hiddenLeft: { opacity: 0, x: -60 },
  hiddenRight: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
};

const colorHexFromClass = (colorClass: string): string => {
  if (!colorClass) return '#9ca3af';
  if (colorClass.includes('blue-')) return '#2563eb';
  if (colorClass.includes('green-')) return '#16a34a';
  if (colorClass.includes('purple-')) return '#7c3aed';
  if (colorClass.includes('orange-')) return '#ea580c';
  if (colorClass.includes('indigo-')) return '#4f46e5';
  return '#9ca3af';
};

const BigFiveTimeline: React.FC<BigFiveTimelineProps> = ({ items, visibleCount }) => {
  return (
    <div className="relative">
      {/* Mobile: simple stacked list */}
      <div className="md:hidden space-y-6">
        {items.slice(0, visibleCount).map((item, index) => {
          const Icon = item.icon as any;
          return (
            <motion.div
              key={`${item.title}-m-${index}`}
              className="group relative bg-white border border-neutral-200 rounded-2xl p-6 shadow-lg overflow-hidden"
              variants={cardVariants}
              initial={index % 2 === 0 ? 'hiddenLeft' : 'hiddenRight'}
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              {/* shine sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition duration-700 ease-out group-hover:translate-x-[220%] group-hover:opacity-100"
                style={{ transform: 'skewX(-20deg)' }}
              />
              {/* shimmering top accent */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
              <div className="flex items-center justify-between min-h-[64px]">
                <div className={`p-3 rounded-xl ${item.color}`}>
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Icon className="w-6 h-6 text-white drop-shadow-[0_2px_10px_rgba(244,160,25,0.4)]" />
                  </motion.div>
                </div>
                <div className="text-right">
                  <motion.div className="text-2xl font-bold gold-glint transition group-hover:scale-[1.02]" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                    {item.value}
                  </motion.div>
                </div>
              </div>
              <motion.div className="mt-2 text-lg font-semibold text-brand-dark" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
                {item.title}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Desktop/Tablet: alternating timeline */}
      <div className="hidden md:block relative">
        {/* vertical line */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1 bg-brand-gold/30 rounded-full h-full" />

        <div className="space-y-10">
          {items.slice(0, visibleCount).map((item, index) => {
            const alignLeft = index % 2 === 0; // alternate sides
            const Icon = item.icon as any;
            const isActive = index < visibleCount;
            const hex = colorHexFromClass(item.color);
            return (
              <div key={item.title} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-center">
                {/* Left side */}
                {alignLeft ? (
                  <motion.div
                    variants={cardVariants}
                    initial="hiddenLeft"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                     className="group relative order-1 md:order-1 bg-white border border-neutral-200 rounded-2xl p-6 shadow-lg overflow-hidden"
                    transition={{ duration: 0.7, delay: index * 0.12 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition duration-700 ease-out group-hover:translate-x-[220%] group-hover:opacity-100"
                      style={{ transform: 'skewX(-20deg)' }}
                    />
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                    />
                    <div className="flex items-center justify-between min-h-[64px]">
                      <div className={`p-3 rounded-xl ${item.color}`}>
                        <motion.div
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <Icon className="w-6 h-6 text-white drop-shadow-[0_2px_10px_rgba(244,160,25,0.4)]" />
                        </motion.div>
                      </div>
                      <div className="text-right">
                        <motion.div className="text-2xl font-bold gold-glint" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                          {item.value}
                        </motion.div>
                      </div>
                    </div>
                    <motion.div className="mt-2 text-lg font-semibold text-brand-dark" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
                      {item.title}
                    </motion.div>
                  </motion.div>
                ) : (
                  <div className="order-1 md:order-1" />
                )}

                {/* Dot */}
                <div className="hidden md:flex order-2 md:order-2 justify-center">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    {isActive && (
                      <motion.span
                        className="absolute rounded-full"
                        style={{
                          width: '100%',
                          height: '100%',
                          border: `2px solid ${hex}`,
                          borderRadius: '9999px'
                        }}
                        initial={{ opacity: 0.6, scale: 0.8 }}
                        animate={{ opacity: 0, scale: 2.2 }}
                        transition={{ duration: 0.8 }}
                      />
                    )}
                    <motion.span
                      className="rounded-full shadow-[0_0_14px_rgba(244,160,25,0.35)]"
                      style={{
                        width: '16px',
                        height: '16px',
                        border: `2px solid ${hex}`,
                        backgroundColor: isActive ? hex : 'transparent',
                        boxShadow: '0 0 0 4px rgba(244,160,25,0.15)'
                      }}
                      initial={{ scale: 0.7 }}
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </div>

                {/* Right side */}
                {!alignLeft ? (
                  <motion.div
                    variants={cardVariants}
                    initial="hiddenRight"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="group relative order-3 bg-white border border-neutral-200 rounded-2xl p-6 shadow-lg overflow-hidden"
                    transition={{ duration: 0.7, delay: index * 0.12 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition duration-700 ease-out group-hover:translate-x-[220%] group-hover:opacity-100"
                      style={{ transform: 'skewX(-20deg)' }}
                    />
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                    />
                    <div className="flex items-center justify-between min-h-[64px]">
                      <div className={`p-3 rounded-xl ${item.color}`}>
                        <motion.div
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <Icon className="w-6 h-6 text-white drop-shadow-[0_2px_10px_rgba(244,160,25,0.4)]" />
                        </motion.div>
                      </div>
                      <div className="text-right">
                        <motion.div className="text-2xl font-bold gold-glint" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                          {item.value}
                        </motion.div>
                      </div>
                    </div>
                    <motion.div className="mt-2 text-lg font-semibold text-brand-dark" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
                      {item.title}
                    </motion.div>
                  </motion.div>
                ) : (
                  <div className="order-3" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BigFiveTimeline;


