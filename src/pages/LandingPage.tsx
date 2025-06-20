import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingBlobs from '../components/FloatingBlobs';
import FloatingNav from '../components/FloatingNav';
import BoltBadge from '../components/BoltBadge';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [billing, setBilling] = useState<'monthly' | 'annually'>("monthly");

  const beltRef = useRef<HTMLDivElement>(null);
  const beltScrollRef = useRef<number>(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const animating = useRef<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'astrology', 'features', 'pricing', 'faq'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section === 'features' ? 'astrology' : section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const belt = beltRef.current;
    if (belt) {
      // Set initial transform
      belt.style.transform = `rotate(-8deg) translateX(0px)`;
    }

    const handleScroll = () => {
      const belt = beltRef.current;
      if (!belt) return;
      // Stop any ongoing animation
      animating.current = false;
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      // Stop the belt immediately
      belt.style.transition = 'none';
      belt.style.transform = `rotate(-8deg) translateX(${beltScrollRef.current}px)`;
      // When user stops scrolling, start the belt animation after debounce
      scrollTimeout.current = setTimeout(() => {
        const belt = beltRef.current;
        if (!belt) return;
        // Animate the belt to the right (or left)
        animating.current = true;
        const start = beltScrollRef.current;
        const distance = 200; // px to move
        const duration = 800; // ms
        const startTime = performance.now();
        belt.style.transition = 'none';
        function animate(now: number) {
          if (!animating.current) return;
          const belt = beltRef.current;
          if (!belt) return;
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const newX = start - distance * progress;
          belt.style.transform = `rotate(-8deg) translateX(${newX}px)`;
          beltScrollRef.current = newX;
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            animating.current = false;
          }
        }
        requestAnimationFrame(animate);
      }, 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqData = [
    {
      question: "How is Lyra different from other astrology apps?",
      answer: "Lyra combines precision astrological calculations using Swiss Ephemeris data with advanced AI therapy. Unlike generic horoscope apps, we provide personalized guidance based on your exact birth chart with therapeutic emotional support."
    },
    {
      question: "What makes Lyra's guidance accurate?",
      answer: "We use circular-natal-horoscope-js for professional-grade calculations and zodiac-winner for precise chart visualizations. Our AI is trained on both astrological principles and therapeutic techniques, ensuring contextually relevant and emotionally supportive responses."
    },
    {
      question: "What's included in the premium plan?",
      answer: "Cosmic Premium includes unlimited AI chat sessions, daily personalized voice horoscopes by ElevenLabs, custom video readings powered by Tavus, detailed PDF reports, compatibility analysis, and priority support for just $9.99/month."
    },
    {
      question: "How do I start my free trial?",
      answer: "Simply click the 'start' button to begin onboarding. You can create an account or continue as a guest. Free users get limited chat messages and access to basic natal chart features to experience Lyra's unique approach."
    },
    {
      question: "Can Lyra help with emotional support too?",
      answer: "Absolutely! Lyra offers three AI personas: Astrologer (wise & technical), Therapist (supportive & soft), and Friend (casual & encouraging). Each provides emotional support while incorporating your astrological profile for personalized guidance."
    }
  ];

  // Gradient backgrounds for each block
  const blockGradients = [
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    'linear-gradient(135deg, #f9d423 0%, #ff4e50 100%)',
    'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  ];
  const blockLabels = [
    'Natal Charts',
    'Transits',
    'Compatibility',
    'Horoscopes',
    'Aspects',
    'Houses',
    'Progressions',
    'Returns',
  ];

  // Replace ChevronArrow with a pixel-art style arrow
  const PixelArrow = ({ open }: { open: boolean }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`transition-transform duration-300 ${open ? 'rotate-90' : 'rotate-0'}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Pixel right arrow (closed) and rotates down (open) */}
      <rect x="6" y="11" width="10" height="2" fill="#FF6F1F" />
      <rect x="14" y="7" width="2" height="10" fill="#FF6F1F" />
    </svg>
  );

  return (
    <div className="min-h-screen">
      <FloatingNav activeSection={activeSection} />
      <BoltBadge />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-orange-100 to-primary-orange" />
        <FloatingBlobs />
        
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-8">
            <motion.h1 
              className="font-pixel text-2xl text-black"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Lyra
            </motion.h1>
            
            <motion.button
              onClick={() => navigate('/onboarding')}
              className="bg-primary-orange text-black px-8 py-4 rounded-2xl font-pixel text-sm hover:shadow-lg transition-all duration-300 flex items-center space-x-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>start</span>
              <span className="text-lg">↗</span>
            </motion.button>
          </div>

          {/* Main Hero Content */}
          <div className="flex-1 flex items-center justify-center px-8">
            <div className="text-center max-w-6xl">
              <motion.h2 
                className="text-8xl md:text-9xl lg:text-[12rem] font-black text-black mb-8 leading-none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Astrologer
              </motion.h2>
              <motion.div 
                className="flex justify-end pr-8 md:pr-16"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h3 className="font-pixel text-4xl md:text-6xl lg:text-7xl text-black leading-none">
                  therapist
                </h3>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Astrology Slaps Section */}
      <section id="astrology" className="py-24 bg-white relative overflow-x-clip">
        <div className="max-w-7xl mx-auto px-0">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-black text-black mb-6 leading-tight">
              Our Astrology Slaps
            </h2>
            <p className="text-xl text-black max-w-4xl mx-auto leading-relaxed">
              Experience the most accurate astrology app ever built. Powered by Swiss Ephemeris precision 
              and GPT-4o, ElevenLabs and Tavus intelligence for guidance that actually transforms your life.
            </p>
          </motion.div>
        </div>

        {/* Single slanted, animated belt of 25 cards, edge-to-edge, seamless loop */}
        <div className="absolute left-0 w-screen top-[340px] pointer-events-none select-none z-10">
          <div
            className="w-screen overflow-hidden pl-115 pr-0"
            style={{
              transform: 'rotate(-6deg)',
              willChange: 'transform',
              position: 'relative',
            }}
          >
            {/* Calculate the width of one set of cards: 25 * (320px + 32px gap) = 8800px */}
            <div className="flex gap-8 animate-belt-ltr -ml-16" style={{ width: '11980px' }}>
              {/* Two sets of 25 cards for seamless loop */}
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={`belt-card-${i}`}
                  className="w-[340px] h-[220px] flex-shrink-0 flex-grow-0 overflow-hidden flex items-center justify-center rounded-2xl border-4 border-black text-3xl font-bold text-black shadow-lg bg-white"
                  style={{
                    background: blockGradients[i % blockGradients.length],
                    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
                  }}
                >
                  {blockLabels[i % blockLabels.length]}
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @keyframes belt-ltr {
              0% { transform: translateX(0); }
              100% { transform: translateX(-5840px); }
            }
            .animate-belt-ltr {
              animation: belt-ltr 18s linear infinite;
            }
          `}</style>
        </div>

        {/* Add extra margin below the belt to push the next section down */}
        <div className="mt-64" />
      </section>

      {/* Features Section (Everything you need) - moved below the belt */}
      <section id="features" className="py-24 bg-gradient-to-b from-orange-100 to-orange-50 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-black text-black mb-6 leading-tight">
              Everything you need
            </h2>
            <p className="text-xl text-black max-w-4xl mx-auto leading-relaxed">
              Choose your cosmic companion mode and <span className="bg-orange-200 px-3 py-1 rounded-full">experience</span> personalized guidance that evolves with your journey. 
              <strong> AI-powered</strong> cosmic guidance using Swiss Ephemeris precision calculations for unmatched <span className="bg-gray-200 px-3 py-1 rounded-full">accuracy</span>.
            </p>
          </motion.div>

          {/* Strict 3x2 grid of feature cards, no empty spaces, all cards same size */}
          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-6 md:grid-rows-2 gap-8">
            {/* Tavus (formerly ElevenLabs/OpenAI/Tavus) */}
            <div className="rounded-3xl shadow-lg p-8 bg-gradient-to-br from-orange-100 to-orange-300 flex flex-col items-center justify-center">
              <img src="https://raw.githubusercontent.com/konfig-sdks/openapi-examples/HEAD/tavus/logo.png" alt="Tavus" className="max-w-[60%] max-h-[60px] object-contain mb-4" />
              <div className="text-xs text-gray-700 mb-1">gpt-4o-mini</div>
              <div className="text-xl font-bold text-black mb-1 text-center">ElevenLabs, Tavus & OpenAI</div>
              <div className="text-black text-sm text-center">Voice, video, and AI chat—seamlessly integrated for your cosmic journey.</div>
            </div>
            {/* RevenueCat */}
            <div className="rounded-3xl shadow-lg p-8 bg-white flex flex-col items-center justify-center">
              <img src="https://www.revenuecat.com/static/logo-10968976818e28fd8eee91f66d535d9a.svg" alt="RevenueCat" className="max-w-[60%] max-h-[60px] object-contain mb-4" />
              <div className="text-black font-medium mb-1 text-center">Premium features available at just 9.99 per month</div>
              <div className="text-xs text-gray-500 text-center">Keep your mental health stable and pockets filled</div>
            </div>
            {/* Custom SVG Natal Chart */}
            <div className="rounded-3xl shadow-lg p-8 bg-gradient-to-br from-orange-100 to-orange-200 flex flex-col items-center justify-center">
              <svg width="60" height="60" viewBox="0 0 48 48" fill="none" className="mb-3"><circle cx="24" cy="24" r="22" stroke="#FF6F1F" strokeWidth="4" fill="#fff"/><path d="M24 2v44M2 24h44" stroke="#FF6F1F" strokeWidth="2"/><circle cx="24" cy="24" r="8" fill="#FF6F1F"/></svg>
              <span className="text-lg font-bold text-black mb-1 text-center">Your Custom Natal Chart</span>
              <div className="text-black text-sm text-center">Every user gets a unique SVG natal chart—the basis of Lyra's therapy and predictions.</div>
            </div>
            {/* Chat Preview */}
            <div className="rounded-3xl shadow-lg p-8 bg-black flex flex-col items-center justify-center">
              <div className="mb-4 w-full">
                <div className="text-xs text-gray-400 mb-2">User</div>
                <div className="bg-gray-800 text-white rounded-lg px-4 py-2 mb-2 w-fit mx-auto">I really feel lonely. Will I ever become happy?</div>
                <div className="text-xs text-orange-300 mb-2">Lyra</div>
                <div className="bg-orange-500 text-white rounded-lg px-4 py-2 mb-2 w-fit mx-auto">Your moon sign is soon transitioning. Just in a few days a magical person will come in your life!</div>
              </div>
              <button className="bg-orange-500 text-white rounded-full px-6 py-2 font-bold w-fit self-end mt-2">Try Lyra Today</button>
              <div className="text-xs text-gray-400 mt-2 text-center">Life really changes after Lyra</div>
            </div>
            {/* Three Guides in One (merged large card, spans two columns) */}
            <div className="rounded-3xl shadow-lg p-8 bg-white flex flex-col items-center justify-center md:col-span-2">
              <span className="text-2xl font-bold text-black mb-4">Three Guides in One</span>
              <div className="flex flex-row w-full justify-center gap-8">
                <div className="flex flex-col items-center bg-orange-50 rounded-2xl p-4 flex-1 mx-2">
                  <span className="text-3xl mb-2">🔮</span>
                  <span className="text-base font-bold text-black mb-1">Astrologer</span>
                  <span className="text-xs bg-orange-100 px-3 py-1 rounded-full mb-1">Insightful</span>
                  <span className="text-xs text-gray-500 text-center">Personalized cosmic insights</span>
                </div>
                <div className="flex flex-col items-center bg-blue-50 rounded-2xl p-4 flex-1 mx-2">
                  <span className="text-3xl mb-2">💙</span>
                  <span className="text-base font-bold text-black mb-1">Therapist</span>
                  <span className="text-xs bg-blue-100 px-3 py-1 rounded-full mb-1">Supportive</span>
                  <span className="text-xs text-gray-500 text-center">Emotional guidance & care</span>
                </div>
                <div className="flex flex-col items-center bg-yellow-50 rounded-2xl p-4 flex-1 mx-2">
                  <span className="text-3xl mb-2">✨</span>
                  <span className="text-base font-bold text-black mb-1">Friend</span>
                  <span className="text-xs bg-yellow-100 px-3 py-1 rounded-full mb-1">Empowering</span>
                  <span className="text-xs text-gray-500 text-center">Motivation & encouragement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-black to-primary-orange">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-pixel text-white mb-4 leading-tight tracking-wider">
              Membership levels
            </h2>
            <p className="text-xl text-white">Choose a plan that's right for you.</p>
          </motion.div>
          {/* Toggle */}
          <div className="flex justify-center mb-10">
            <div className="bg-gray-800 rounded-full flex p-1 border-2 border-orange-400 shadow-inner">
              <button
                className={`px-6 py-2 rounded-full text-sm transition-all duration-200 ${billing === 'monthly' ? 'bg-primary-orange text-black shadow' : 'text-white hover:text-primary-orange'}`}
                onClick={() => setBilling('monthly')}
              >
                monthly
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm transition-all duration-200 ${billing === 'annually' ? 'bg-primary-orange text-black shadow' : 'text-white hover:text-primary-orange'}`}
                onClick={() => setBilling('annually')}
              >
                annually <span className="ml-1 text-xs font-bold">(save 25%)</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 h-96 flex flex-col justify-between shadow-xl hover:scale-[1.03] transition-transform duration-300"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div>
                <p className="text-white text-sm mb-2">free</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-black text-white">$0</span>
                  <span className="text-xl text-white">/{billing === 'monthly' ? 'm' : 'year'}</span>
                  <span className="text-sm text-gray-400 ml-2">USD</span>
                </div>
                <p className="text-white text-sm leading-relaxed">
                  We care about your mental health. Core features are all free for common public's benefit.
                </p>
              </div>
              <button 
                onClick={() => navigate('/onboarding')}
                className="bg-primary-orange text-black px-6 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
              >
                <span>start</span>
                <span className="text-lg">↗</span>
              </button>
            </motion.div>
            {/* Premium Plan */}
            <motion.div 
              className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl p-8 h-96 flex flex-col justify-between shadow-xl hover:scale-[1.03] transition-transform duration-300 relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Most Popular badge */}
              <span className="absolute top-6 right-6 bg-black text-primary-orange text-xs px-3 py-1 rounded-full shadow">most popular</span>
              <div>
                <p className="text-black text-sm mb-2">cosmic +</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-black text-black">{billing === 'monthly' ? '$9.99' : '$90'}</span>
                  <span className="text-xl text-black">/{billing === 'monthly' ? 'm' : 'year'}</span>
                  <span className="text-sm text-gray-800 ml-2">USD</span>
                </div>
                <p className="text-black text-sm leading-relaxed">
                  Cosmic mode. In cosmic mode get unlimited video and voice support.
                </p>
              </div>
              <button 
                onClick={() => window.open('https://www.revenuecat.com/404', '_blank')}
                className="bg-black text-primary-orange px-6 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
              >
                <span>invest for your future</span>
                <span className="text-lg">↗</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gradient-to-b from-primary-orange to-black">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-serif text-black mb-2 leading-tight">Frequently asked</h2>
            <h3 className="text-5xl font-pixel text-black leading-tight">questions.</h3>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  className="w-full p-6 text-left flex justify-between items-center text-white hover:bg-gray-800 transition-colors duration-200"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <span className="ml-4 flex items-center">
                    <PixelArrow open={expandedFaq === index} />
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={expandedFaq === index ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <div className="bg-gray-800/80 rounded-xl p-6 mt-2">
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;