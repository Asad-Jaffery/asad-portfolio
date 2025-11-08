'use client';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { useState } from 'react';

export default function Experiences() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const images = [
    '/tesla.png',
    '/shopify.svg',
    '/Recognize_logo.png',
    '/usafacts.png',
  ];

  return (
    <div className='relative z-10 flex justify-center items-center min-h-screen'>
      {/* Layout root for Framer Motion */}
      <motion.div layoutRoot className='relative overflow-hidden p-20'>
        <LayoutGroup>
          <div className='grid grid-cols-2 gap-4'>
            {images.map((src, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={index}
                  className='relative w-70 h-30'
                  layout
                  layoutId={`square-${index}`} // <- layoutId for shared layout
                >
                  <motion.img
                    src={src}
                    alt={`Experience ${index}`}
                    className='w-full h-full object-cover rounded-2xl cursor-pointer ring-black'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveIndex(index)}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Expanded image overlay */}
          <AnimatePresence>
            {activeIndex !== null && (
              <>
                {/* Dark overlay */}
                <motion.div
                  className='fixed inset-0 bg-black/50 z-40'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveIndex(null)}
                />

                {/* Expanded image */}
                <motion.div
                  className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-100 h-50'
                  layoutId={`square-${activeIndex}`} // <- same layoutId for shared layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <img
                    src={images[activeIndex]}
                    alt={`Experience ${activeIndex}`}
                    className='w-full h-full object-cover rounded-2xl cursor-pointer'
                    onClick={() => setActiveIndex(null)}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </motion.div>
    </div>
  );
}
