import React from 'react';
import { motion } from 'framer-motion';
import type { FC } from 'react';

interface FloatingNavProps {
  activeSection: string;
}

const PixelHome: FC = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="10" width="18" height="10" fill="#FF6F1F" stroke="#000" strokeWidth="2"/>
    <rect x="7" y="14" width="4" height="6" fill="#fff" stroke="#000" strokeWidth="2"/>
    <polygon points="1,11 11,2 21,11" fill="#fff" stroke="#000" strokeWidth="2"/>
  </svg>
);

const PixelInfo: FC = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="9" fill="#fff" stroke="#000" strokeWidth="2"/>
    <rect x="10" y="7" width="2" height="2" fill="#FF6F1F" stroke="#000" strokeWidth="1"/>
    <rect x="10" y="11" width="2" height="6" fill="#FF6F1F" stroke="#000" strokeWidth="1"/>
  </svg>
);

const PixelDollar: FC = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="9" fill="#fff" stroke="#000" strokeWidth="2"/>
    <foreignObject x="5" y="5" width="12" height="12">
      <div style={{
        width: '12px',
        height: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins, Arial, sans-serif',
        fontSize: '13px',
        color: '#000',
        fontWeight: 700,
        lineHeight: 1
      }}>
        $
      </div>
    </foreignObject>
  </svg>
);

const navItems = [
  { id: 'home', label: 'Home', icon: <PixelHome /> },
  { id: 'astrology', label: 'Info', icon: <PixelInfo /> },
  { id: 'pricing', label: 'Pricing', icon: <PixelDollar /> }
];

const FloatingNav: React.FC<FloatingNavProps> = ({ activeSection }) => {
  return (
    <div className="fixed top-6 left-0 w-full flex justify-center z-50 pointer-events-none">
      <motion.div 
        className="bg-black/30 backdrop-blur-md rounded-full px-6 py-3 flex items-center space-x-8 pointer-events-auto border border-white/20 shadow-2xl"
        style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18), 0 1.5px 8px 0 #FF6F1F33' }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`relative px-4 py-2 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-transparent ${
              activeSection === item.id 
                ? 'bg-primary-orange text-black border-black' 
                : 'text-white hover:text-primary-orange'
            }`}
            style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 14 }}
            onClick={() => {
              const element = document.getElementById(item.id);
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {activeSection === item.id && (
              <motion.div
                className="absolute inset-0 bg-primary-orange rounded-full z-0"
                layoutId="activeTab"
                initial={false}
                transition={{ duration: 0.3 }}
              />
            )}
            <span className="relative z-10 flex items-center space-x-2">
              <span className="w-6 h-6 flex items-center justify-center">{item.icon}</span>
            </span>
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default FloatingNav;