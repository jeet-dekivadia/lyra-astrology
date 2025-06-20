import React from 'react';
import { motion } from 'framer-motion';

interface FloatingNavProps {
  activeSection: string;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ activeSection }) => {
  const navItems = [
    { id: 'home', label: 'Home', symbol: '⌂' },
    { id: 'astrology', label: 'Info', symbol: 'i' },
    { id: 'pricing', label: 'Pricing', symbol: '$' }
  ];

  return (
    <motion.div 
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="bg-black/70 backdrop-blur-md rounded-full px-6 py-3 flex items-center space-x-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
              activeSection === item.id 
                ? 'bg-primary-orange text-black' 
                : 'text-white hover:text-primary-orange'
            }`}
            onClick={() => {
              const element = document.getElementById(item.id);
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {activeSection === item.id && (
              <motion.div
                className="absolute inset-0 bg-primary-orange rounded-full"
                layoutId="activeTab"
                initial={false}
                transition={{ duration: 0.3 }}
              />
            )}
            <span className="relative z-10 font-medium text-sm">{item.symbol}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default FloatingNav;