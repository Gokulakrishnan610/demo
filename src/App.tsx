import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

import AnimatedHeader from './components/AnimatedHeader';
import SplashScreen from './components/SplashScreen';
// import SplitText from './components/SplitText';

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
  TrendingUp
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

    const timer = window.setTimeout(() => AOS.refresh(), 50);

    return () => {
      window.clearTimeout(timer);
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
    <div className="min-h-screen bg-black text-neutral-100 relative overflow-hidden">
      <SplashScreen show={showSplash} durationMs={2500} onFinish={() => setShowSplash(false)} />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={['#ffffff', '#cfcfcf']}
          particleCount={160}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={60}
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
        className="relative max-w-7xl mx-auto px-6 py-4 z-10"
      >
       {/* Organisation Wide Case */}
{/* <motion.div 
  variants={sectionVariants}
  className="mb-0" 
  data-aos="fade-up"
  data-aos-delay="150"
  data-aos-duration="900"
  data-aos-easing="cubic-bezier(0.19, 1, 0.22, 1)"
>
  <div className="max-w-5xl mx-auto text-center">
    <div className="inline-flex items-center text-neutral-300/90 uppercase tracking-widest text-base md:text-lg">
      <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-emerald-300" />
      <SplitText
        text="Organisation Wide Case"
        className="inline-block"
        splitType="chars"
        delay={40}
        duration={0.5}
        from={{ opacity: 0, y: 12 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.15}
        rootMargin="-80px"
        textAlign="center"
      />
    </div>
    <div className="h-px w-24 md:w-32 mx-auto mt-1 bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
  </div>
</motion.div> */}

{/* ₹500 Cr and Plan & Estimation */}
{/* <motion.div
  variants={sectionVariants}
  className="mb-2" 
  data-aos="fade-up"
  data-aos-delay="350"
  data-aos-duration="1000"
  data-aos-offset="200"
  data-aos-easing="cubic-bezier(0.19, 1, 0.22, 1)"
>
  <div className="max-w-5xl mx-auto text-center">
    <div
      className="relative mx-auto inline-flex items-center justify-center bg-center bg-no-repeat w-[380px] h-[380px] md:w-[540px] md:h-[540px]"
      style={{ backgroundImage: "url('/%E2%82%B9500%20Cr.png')", backgroundSize: 'contain', filter: 'drop-shadow(0 10px 35px rgba(244,160,25,0.35))' }}
    >
      <SplitText
        text="₹500 Cr"
        className="block text-3xl md:text-5xl leading-none tracking-tight font-extrabold text-brand-dark"
        splitType="chars"
        delay={50}
        duration={0.6}
        ease="power3.out"
        from={{ opacity: 0, y: 16, scale: 0.98 }}
        to={{ opacity: 1, y: 0, scale: 1 }}
        threshold={0.2}
        rootMargin="-120px"
        textAlign="center"
      />
    </div>
    <SplitText
      text="Plan & Estimation"
      className="block text-brand-gray mt-2 text-lg md:text-xl" 
      splitType="words"
      delay={60}
      duration={0.5}
      from={{ opacity: 0, y: 12 }}
      to={{ opacity: 1, y: 0 }}
      threshold={0.2}
      rootMargin="-120px"
      textAlign="center"
    />
  </div>
</motion.div> */}

        {/* Main Content */}
      <div className="relative z-10 px-8 py-16">
        {/* Organization Wide Case Badge */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, type: "spring" }}
        >
          <motion.p
            className="text-gray-400 text-sm mb-12 tracking-[0.3em] font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            $ ORGANISATION WIDE CASE
          </motion.p>

          <motion.div
            className="relative inline-block mb-8"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="relative w-64 h-64">
              {/* Golden Badge Background */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <img
                  src="/₹500 Cr.png"
                  alt="Golden Badge"
                  width={600}
                  height={600}
                  className="filter drop-shadow-2xl w-full h-full object-contain"
                />
              </motion.div>

              {/* Text Content - Counter-rotating to stay upright */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center">
                {/* animate={{ rotate: [0, -360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} */}
              
                <div className="text-center">
                  <motion.div
                    className="text-2xl font-bold text-black drop-shadow-sm"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, type: "spring" }}
                  >
                    <span>₹500 Cr</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Pulsing glow effect */}
              <motion.div
                className="absolute inset-0 bg-yellow-400 rounded-full opacity-20 blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>

          <motion.p
            className="text-gray-300 text-xl font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            Plan & Estimation
          </motion.p>
        </motion.div>



        {/* Big 5 Strategic Targets */}
        <motion.div 
          variants={sectionVariants}
          className="mb-20"
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
              <span className="bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-clip-text text-transparent">
                Big 5 Strategic Targets
              </span>
            </motion.h2>
            <motion.p 
              className="text-neutral-400 text-xl max-w-3xl mx-auto"
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
        </div>
      </motion.main>
      {!showSplash && <Footer />}
    </div>
  );
}

export default App;