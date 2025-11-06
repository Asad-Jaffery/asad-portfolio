'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Experiences() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const images = [
    '/tesla.png',
    '/shopify.svg',
    '/Recognize_logo.png',
    '/usafacts.png',
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (activeIndex !== null) {
        setIsScrolling(true);
        setActiveIndex(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  return (
    <div className='relative z-10 flex justify-center items-center min-h-screen'>
      <div className='grid grid-cols-2 gap-4'>
        <AnimatePresence>
          {images.map((src, index) => {
            const isActive = index === activeIndex;

            return (
              <div key={index} className='relative'>
                {/* Keeps layout consistent when one is acic */}
                {isActive && <div className='invisible w-70 h-30' />}

                <motion.img
                  layout
                  layoutId={`square-${index}`}
                  src={src}
                  alt={`Experience ${index}`}
                  className={`object-cover rounded-2xl cursor-pointer ring-black ${
                    isActive
                      ? 'fixed top-1/2 left-1/2 w-100 h-50 -translate-x-1/2 -translate-y-1/2 z-50'
                      : 'w-70 h-30'
                  }`}
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 600,
                    damping: 100,
                  }}
                  onClick={() => {
                    // Prevent reactivation immediately after scroll
                    if (!isScrolling) {
                      setActiveIndex(isActive ? null : index);
                    }
                    // Reset scrolling state after a short delay
                    setTimeout(() => setIsScrolling(false), 200);
                  }}
                />
              </div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
