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
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
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
              className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 shadow-2xl"
              variants={cardVariants}
              initial={index % 2 === 0 ? 'hiddenLeft' : 'hiddenRight'}
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-xl ${item.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{item.value}</div>
                  <div className="text-sm text-neutral-500">Target: {item.target}</div>
                </div>
              </div>
              <div className="text-lg font-semibold text-white">{item.title}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Desktop/Tablet: alternating timeline */}
      <div className="hidden md:block relative">
        {/* vertical line */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1 bg-neutral-800 rounded-full h-full" />

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
                    className="order-1 md:order-1 bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-xl ${item.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{item.value}</div>
                        <div className="text-sm text-neutral-500">Target: {item.target}</div>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-white">{item.title}</div>
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
                        animate={{ opacity: 0, scale: 1.8 }}
                        transition={{ duration: 0.8 }}
                      />
                    )}
                    <motion.span
                      className="rounded-full"
                      style={{
                        width: '16px',
                        height: '16px',
                        border: `2px solid ${hex}`,
                        backgroundColor: isActive ? hex : 'transparent',
                        boxShadow: '0 0 0 4px rgba(0,0,0,1)'
                      }}
                      initial={{ scale: 0.7 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
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
                    className="order-3 bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-xl ${item.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{item.value}</div>
                        <div className="text-sm text-neutral-500">Target: {item.target}</div>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-white">{item.title}</div>
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


