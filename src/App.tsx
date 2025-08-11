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
    duration: 1000,
    delay: 100,
    easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
    offset: 60,
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
      transition: { duration: 0.8 }
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
    }, 800);
    return () => clearInterval(intervalId);
  }, [big5Targets.length]);

  return (
    <div className="min-h-screen bg-white text-brand-dark relative overflow-hidden bg-hero">
      <SplashScreen show={showSplash} onFinish={() => setShowSplash(false)} />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={['#F4A019', '#bbbbbb', '#888888']}
          particleCount={160}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={80}
          // hover disabled since pointer events are off to keep UI clickable
          moveParticlesOnHover={false}
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
            data-aos-delay="150"
            data-aos-duration="1000"
            data-aos-easing="cubic-bezier(0.19, 1, 0.22, 1)"
        >
          <div className="bg-white rounded-3xl backdrop-blur-xl border border-neutral-200 p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <motion.h2 
                  className="text-4xl font-bold mb-4 text-brand-gold"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Organization Overview
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
                className="bg-white p-6 rounded-2xl backdrop-blur-sm border border-neutral-200"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Target className="w-12 h-12 text-brand-gold" />
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
          data-aos-delay="300"
          data-aos-duration="1000"
          data-aos-easing="cubic-bezier(0.19, 1, 0.22, 1)"
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl font-bold text-brand-gold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-gold">Big 5 Strategic Targets</span>
            </motion.h2>
            <motion.p 
              className="text-brand-gray text-xl max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Key performance indicators driving organizational success and sustainable growth
            </motion.p>
          </div>
          
        

          {/* Timeline version for mid/large screens */}
          <div className="block mb-12">
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
          </div>
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