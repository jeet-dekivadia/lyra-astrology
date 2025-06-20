import React from 'react';
import { motion } from 'framer-motion';

const BoltBadge: React.FC = () => {
  return (
    <motion.a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 group overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        boxShadow: '0 0 20px rgba(255, 111, 31, 0.3)'
      }}
    >
      <img
        src="https://thechainsmokers.com/images/bolt.png"
        alt="Bolt Badge"
        className="w-full h-full object-cover rounded-full transition-all duration-300 group-hover:filter group-hover:brightness-70"
        style={{ transition: 'filter 0.3s' }}
      />
      <style>{`
        .group:hover img {
          filter: brightness(0.7);
        }
      `}</style>
    </motion.a>
  );
};

export default BoltBadge;