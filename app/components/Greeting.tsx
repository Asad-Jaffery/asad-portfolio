'use client';
import { motion } from 'motion/react';

export default function Greetings() {
  const text = 'Hey! Im Asad';

  const container = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      variants={container}
      initial='hidden'
      animate='visible'
      className='text-center w-full text-7xl'
    >
      {text.split('').map((char, index) => (
        <motion.span
          className='text-left font-bold'
          key={index}
          variants={child}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
