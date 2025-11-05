'use client';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function Experiences() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const squares = [0, 1, 2, 3];

  return (
    <div className='relative z-10 flex justify-center items-center min-h-screen'>
      <div className='grid grid-cols-2 gap-4'>
        <AnimatePresence>
          {squares.map((_, index) => {
            const isActive = index === activeIndex;

            return (
              <div key={index} className='relative'>
                {/* Keeps layout consistent when active square is fixed */}
                {isActive && <div className='invisible w-75 h-45' />}

                <motion.div
                  layout
                  layoutId={`square-${index}`}
                  className={`bg-blue-500 rounded-2xl cursor-pointer ring-black ${
                    isActive
                      ? 'fixed top-1/2 left-1/2 w-75 h-45 -translate-x-1/2 -translate-y-1/2 z-50'
                      : 'w-75 h-45'
                  }`}
                  transition={{
                    type: 'spring',
                    stiffness: 600,
                    damping: 100,
                  }}
                  onClick={() => setActiveIndex(isActive ? null : index)}
                />
              </div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
