import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

import AnimatedHeader from './components/AnimatedHeader';
import SplashScreen from './components/SplashScreen';

// import AnimatedMetricCard from './components/AnimatedMetricCard';
import BigFiveTimeline from './components/BigFiveTimeline';
// import ThreeScene from './components/ThreeScene';
// import WebGLBackground from './components/WebGLBackground';
import Particles from './components/Particles';
import Footer from './components/Footer';
import { 
  DollarSign, 
  CreditCard, 
  Briefcase, 
  Users, 
  TrendingUp,
  Target,
  BarChart3,
} from 'lucide-react';

function App() {
  // Sequential reveal of Big 5 cards
  const [visibleCount, setVisibleCount] = useState(0);
  const [showSplash, setShowSplash] = useState(true);

useEffect(() => {
  if (showSplash) return;

  AOS.init({
    duration: 900,
    delay: 120,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    offset: 90,
    anchorPlacement: 'top-bottom',
    once: true,
    mirror: false,
    throttleDelay: 50,
    debounceDelay: 50,
  });

  const handleResize = () => AOS.refresh();
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);

  // ensure first calculation after splash removal
  const rafId = window.requestAnimationFrame(() => AOS.refresh());

  return () => {
    window.cancelAnimationFrame(rafId);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('orientationchange', handleResize);
  };
}, [showSplash]);

  // Ensure AOS recalculates when content visibility changes
useEffect(() => {
  if (!showSplash) AOS.refresh();
}, [visibleCount, showSplash]);

  const big5Targets = [
    {
      title: 'Revenue',
      value: '₹400 Cr',
      target: '₹400 Cr',
      icon: DollarSign,
      progress: 0,
      color: 'bg-blue-600',
      subtitle: 'Plan'
    },
    {
      title: 'Collection',
      value: '₹400 Cr',
      target: '₹400 Cr',
      icon: CreditCard,
      progress: 0,
      color: 'bg-green-600',
      subtitle: 'Plan'
    },
    {
      title: 'New Business',
      value: '₹400 Cr',
      target: '₹400 Cr',
      icon: Briefcase,
      progress: 0,
      color: 'bg-purple-600',
      subtitle: 'Plan'
    },
    {
      title: 'Human Capital',
      value: '20K nos',
      target: '20K nos',
      icon: Users,
      progress: 0,
      color: 'bg-orange-600',
      subtitle: 'Plan'
    },
    {
      title: 'EBITDA',
      value: '50%',
      target: '50%',
      icon: TrendingUp,
      progress: 0,
      color: 'bg-indigo-600',
      subtitle: 'Plan'
    }
  ];

  // const threeMetrics = big5Targets.map(target => ({
  //   title: target.title,
  //   value: target.value,
  //   progress: target.progress,
  //   color: target.color.replace('bg-', '#').replace('-600', '')
  // }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
    transition: { duration: 0.9 }
    }
  };

  useEffect(() => {
    setVisibleCount(0);
    const intervalId = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= big5Targets.length) {
          clearInterval(intervalId);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
    return () => clearInterval(intervalId);
  }, [big5Targets.length]);

  return (
    <div className="min-h-screen bg-white text-brand-dark relative overflow-hidden bg-hero">
      <SplashScreen show={showSplash} onFinish={() => setShowSplash(false)} />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={['#C2410C', '#D97706', '#B45309']}
          particleCount={400}
          particleSpread={20}
          speed={0.1}
          particleBaseSize={80}
          // hover disabled since pointer events are off to keep UI clickable
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          className="w-full h-full"
        />
      </div>
      
      {!showSplash && <AnimatedHeader />}
      
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate={showSplash ? 'hidden' : 'visible'}
        className="relative max-w-7xl mx-auto px-6 py-12 z-10"
      >
        {/* Organization Overview */}
          <motion.div 
          variants={sectionVariants}
          className="mb-16"
            data-aos="fade-up"
            data-aos-delay="180"
            data-aos-duration="900"
            data-aos-easing="cubic-bezier(0.22, 1, 0.36, 1)"
        >
          <div className="bg-transparent rounded-3xl backdrop-blur-xl border border-neutral-200 p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <motion.h2 
                  className="text-4xl font-bold mb-4 text-brand-gold"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="relative md:hidden inline-flex items-center justify-center w-12 h-12">
                      <Target className="relative z-10 w-6 h-6 text-brand-gold" />
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full ring-2 ring-brand-gold/60"
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      />
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-brand-gold/25 blur-md"
                        initial={{ opacity: 0.4 }}
                        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.05, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity }}
                      />
                    </span>
                    Organization Overview
                  </span>
                </motion.h2>
                <motion.p 
                  className="text-brand-gray text-xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Strategic Business Performance Analytics
                </motion.p>
              </div>
              <motion.div 
                className="hidden md:flex bg-transparent p-6 rounded-2xl backdrop-blur-sm border border-neutral-200"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="relative inline-flex items-center justify-center w-16 h-16">
                  <Target className="relative z-10 w-8 h-8 text-brand-gold" />
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-brand-gold/15 blur-md"
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  />
                </span>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 {[
                { icon: DollarSign, label: 'Organisation Wide Case', value: '₹500 Cr', desc: 'Plan & Estimation', color: 'text-brand-gray' },
                { icon: TrendingUp, label: 'Growth Rate', value: '15.2%', desc: 'Year over Year', color: 'text-brand-gray' },
                { icon: Users, label: 'Team Size', value: '20K+', desc: 'Human Capital', color: 'text-brand-gray' },
                { icon: BarChart3, label: 'Target EBITDA', value: '50%', desc: 'Margin Goal', color: 'text-brand-gray' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 backdrop-blur-sm border border-neutral-200"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                    <span className="text-sm font-medium text-brand-gray">{item.label}</span>
                  </div>
                  <div className="text-3xl font-bold text-brand-gold mb-1">{item.value}</div>
                  <div className="text-sm text-brand-gray">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Big 5 Strategic Targets */}
        <motion.div 
          variants={sectionVariants}
          className="mb-16"
          data-aos="fade-up"
          data-aos-delay="220"
          data-aos-duration="900"
          data-aos-easing="cubic-bezier(0.22, 1, 0.36, 1)"
        >
          <div className="text-center mb-12 relative">
            {/* Floating decorative orbs behind heading */}
            <motion.span
              aria-hidden
              className="absolute -top-6 left-1/3 block h-3 w-3 rounded-full bg-brand-gold/70 blur-[1px]"
              animate={{ y: [0, -8, 0], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              aria-hidden
              className="absolute -top-3 right-1/4 block h-2.5 w-2.5 rounded-full bg-brand-gold/60"
              animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            />
            
            <motion.h2 
              className="text-4xl font-bold text-brand-gold mb-3 relative inline-block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="bg-gradient-to-r from-brand-gold via-[#ffc861] to-brand-gold bg-clip-text text-transparent"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Big 5 Strategic Targets
              </motion.span>
              {/* Animated underline */}
              <motion.span
                aria-hidden
                className="absolute -bottom-2 left-0 right-0 mx-auto h-[3px] w-40 bg-gradient-to-r from-transparent via-brand-gold to-transparent rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                style={{ transformOrigin: 'center' }}
              />
            </motion.h2>
            <motion.p 
              className="text-brand-gray text-xl max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Key performance indicators driving organizational success and sustainable growth
            </motion.p>
          </div>
          
        

          {/* Timeline version for mid/large screens */}
          <motion.div 
            className="block mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <BigFiveTimeline
              items={big5Targets.map(t => ({
                title: t.title,
                value: t.value,
                target: t.target,
                color: t.color,
                icon: t.icon
              }))}
              visibleCount={visibleCount}
            />
          </motion.div>
        </motion.div>

         {/* <div className="hidden xl:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {big5Targets.slice(0, visibleCount).map((target, index) => (
              <AnimatedMetricCard
                key={target.title}
                title={target.title}
                value={target.value}
                target={target.target}
                icon={target.icon}
                progress={target.progress}
                color={target.color}
                subtitle={target.subtitle}
                index={index}
              />
            ))}
          </div> */}

      

      </motion.main>
      {!showSplash && <Footer />}
    </div>
  );
}

export default App;