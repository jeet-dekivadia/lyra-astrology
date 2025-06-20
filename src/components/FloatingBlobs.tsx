import React from 'react';
import { motion } from 'framer-motion';

const FloatingBlobs: React.FC = () => {
  const blobs = [
    { id: 1, size: 400, x: '15%', y: '25%', delay: 0 },
    { id: 2, size: 300, x: '65%', y: '15%', delay: 2 },
    { id: 3, size: 500, x: '45%', y: '55%', delay: 1 },
    { id: 4, size: 200, x: '80%', y: '65%', delay: 3 },
    { id: 5, size: 350, x: '8%', y: '75%', delay: 1.5 },
    { id: 6, size: 250, x: '70%', y: '80%', delay: 2.5 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className="absolute rounded-full opacity-70"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            background: 'radial-gradient(circle, rgba(255, 181, 160, 0.9) 0%, rgba(255, 181, 160, 0.6) 40%, rgba(255, 181, 160, 0.3) 70%, rgba(255, 181, 160, 0.1) 100%)',
            filter: 'blur(2px)'
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.15, 0.9, 1],
            rotate: [0, 8, -8, 0]
          }}
          transition={{
            duration: 12,
            delay: blob.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBlobs;