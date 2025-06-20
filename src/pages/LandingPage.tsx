import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingBlobs from '../components/FloatingBlobs';
import FloatingNav from '../components/FloatingNav';
import BoltBadge from '../components/BoltBadge';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

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
      <section id="astrology" className="py-24 bg-gradient-to-b from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-8">
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 transform rotate-2">
            {Array.from({ length: 8 }, (_, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl border-2 border-black p-6 h-40 flex items-center justify-center hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 10 - 5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: Math.random() * 6 - 3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 0 }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-orange to-yellow-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-2xl">{['✨', '🔮', '⭐', '🌙', '☄️', '🪐', '🌟', '💫'][i]}</span>
                  </div>
                  <p className="font-semibold text-sm text-black">
                    {['Natal Charts', 'Transits', 'Compatibility', 'Horoscopes', 'Aspects', 'Houses', 'Progressions', 'Returns'][i]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-orange-100 to-orange-50">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* GPT-4o Card */}
            <motion.div 
              className="col-span-1 md:col-span-2 bg-gradient-to-br from-orange-200 to-orange-300 rounded-3xl p-8 h-64"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <p className="text-sm font-medium text-black mb-2">gpt-4o-mini</p>
                  <h3 className="text-3xl font-bold text-black leading-tight">ElevenLabs and Tavus</h3>
                </div>
                <div className="w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🧠</span>
                </div>
              </div>
            </motion.div>

            {/* Stripe Card */}
            <motion.div 
              className="bg-white rounded-3xl p-8 h-64 flex flex-col justify-center items-center text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">$</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">stripe</p>
              <p className="text-black font-medium">Premium features available at just 9.99 per month</p>
            </motion.div>

            {/* Orange Placeholder */}
            <motion.div 
              className="bg-primary-orange rounded-3xl h-64"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            />

            {/* Three Guides Card */}
            <motion.div 
              className="col-span-1 md:col-span-2 bg-white rounded-3xl p-8 h-64"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-black mb-2">Three Guides in One</h3>
              <p className="text-gray-600 mb-6">Astrologer, Therapist, Friend</p>
              <div className="flex space-x-6">
                {[
                  { name: 'Astrologer', tag: 'Wise', emoji: '🔮' },
                  { name: 'Therapist', tag: 'Caring', emoji: '💙' },
                  { name: 'Friend', tag: 'Fun', emoji: '✨' }
                ].map((persona, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-xl">{persona.emoji}</span>
                    </div>
                    <p className="text-xs font-medium text-black">{persona.name}</p>
                    <span className="text-xs bg-orange-200 px-2 py-1 rounded-full text-black">{persona.tag}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Chat Preview Card */}
            <motion.div 
              className="col-span-1 md:col-span-2 bg-black rounded-3xl p-6 h-64 flex flex-col justify-between"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-2xl p-4 max-w-xs">
                  <p className="text-white text-sm">I really feel lonely. Will I ever become happy?</p>
                </div>
                <div className="bg-primary-orange rounded-2xl p-4 max-w-xs ml-auto">
                  <p className="text-black text-sm">Your moon sign is soon transitioning. Just in a few days a magical function will come in your life!</p>
                </div>
              </div>
              <div className="text-center">
                <button 
                  onClick={() => navigate('/onboarding')}
                  className="bg-primary-orange text-black px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                >
                  Try Lyra Today
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-black to-primary-orange">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-black text-white mb-4 leading-tight">
              Memberships levels
            </h2>
            <p className="text-xl text-white">Choose a plan that's right for you.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <motion.div 
              className="bg-gray-900 rounded-3xl p-8 h-96 flex flex-col justify-between"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div>
                <p className="text-white text-sm mb-2">free</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-bold text-white">$0</span>
                  <span className="text-xl text-white">/m</span>
                  <span className="text-sm text-gray-400 ml-2">USD</span>
                </div>
                <p className="text-white text-sm leading-relaxed">
                  We care about your mental health. Core features are all free for common public's benefit.
                </p>
              </div>
              <button 
                onClick={() => navigate('/onboarding')}
                className="bg-primary-orange text-black px-6 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
              >
                <span>start</span>
                <span>↗</span>
              </button>
            </motion.div>

            {/* Premium Plan */}
            <motion.div 
              className="bg-primary-orange rounded-3xl p-8 h-96 flex flex-col justify-between"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div>
                <p className="text-black text-sm mb-2">cosmic +</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-bold text-black">$9.99</span>
                  <span className="text-xl text-black">/m</span>
                  <span className="text-sm text-gray-800 ml-2">USD</span>
                </div>
                <p className="text-black text-sm leading-relaxed">
                  Cosmic mode. In cosmic mode get unlimited video and voice support.
                </p>
              </div>
              <button 
                onClick={() => window.open('https://www.revenuecat.com/404', '_blank')}
                className="bg-black text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
              >
                <span>invest for your future</span>
                <span>↗</span>
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
                  <div className="w-8 h-8 border border-white rounded flex items-center justify-center">
                    <span className="text-sm">↗</span>
                  </div>
                </button>
                {expandedFaq === index && (
                  <motion.div
                    className="px-6 pb-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;