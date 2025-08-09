import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface AnimatedMetricCardProps {
  title: string;
  value: string;
  target: string;
  icon: LucideIcon;
  progress: number;
  color: string;
  subtitle?: string;
  index: number;
}

const AnimatedMetricCard: React.FC<AnimatedMetricCardProps> = ({
  title,
  value,
  target,
  icon: Icon,
  progress,
  color,
  subtitle,
  index
}) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'from-green-400 to-green-600';
    if (progress >= 70) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hover: { 
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.6 }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: { 
      width: `${Math.min(progress, 100)}%`,
      transition: { 
        duration: 1.5, 
        delay: index * 0.1 + 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden group"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${color.replace('bg-', '').replace('-600', '')} 0%, transparent 100%)`
        }}
      />
      
      <div className="relative p-6 z-10">
        <div className="flex items-center justify-between mb-6">
          <motion.div 
            variants={iconVariants}
            whileHover="hover"
            className={`p-4 rounded-2xl ${color} shadow-lg`}
            style={{
              boxShadow: `0 4px 20px ${color.includes('blue') ? 'rgba(59, 130, 246, 0.4)' : 
                         color.includes('green') ? 'rgba(34, 197, 94, 0.4)' :
                         color.includes('purple') ? 'rgba(147, 51, 234, 0.4)' :
                         color.includes('orange') ? 'rgba(249, 115, 22, 0.4)' :
                         'rgba(99, 102, 241, 0.4)'}`
            }}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>
          
          <div className="text-right">
            <motion.div 
              className="text-3xl font-bold text-white mb-1"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
            >
              {value}
            </motion.div>
            {subtitle && (
              <motion.div 
                className="text-sm text-white/70"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                {subtitle}
              </motion.div>
            )}
          </div>
        </div>
        
        <motion.h3 
          className="text-xl font-bold text-white mb-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-white/70 mb-6 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          Target: {target}
        </motion.p>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-white/80">
            <span>Progress</span>
            <motion.span 
              className="font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {progress}%
            </motion.span>
          </div>
          
          <div className="relative h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              variants={progressVariants}
              initial="hidden"
              whileInView="visible"
              className={`h-full bg-gradient-to-r ${getProgressColor(progress)} rounded-full relative`}
            >
              <motion.div
                className="absolute inset-0 bg-white/30 rounded-full"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'linear',
                  delay: index * 0.1 + 1
                }}
                style={{ width: '50%' }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedMetricCard;