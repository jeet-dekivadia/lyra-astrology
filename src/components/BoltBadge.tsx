import React from 'react';
import { motion } from 'framer-motion';

const BoltBadge: React.FC = () => {
  return (
    <motion.a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        boxShadow: '0 0 20px rgba(255, 111, 31, 0.3)'
      }}
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-orange to-yellow-400 flex items-center justify-center">
        <span className="text-white font-bold text-sm">⚡</span>
      </div>
      <div className="absolute inset-0 rounded-full border-2 border-primary-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow" />
    </motion.a>
  );
};

export default BoltBadge;