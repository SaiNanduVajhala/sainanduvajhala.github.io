import React from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number; // stagger delay in ms
  animateBy?: 'words' | 'letters';
  className?: string;
  style?: React.CSSProperties;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 35,
  animateBy = 'letters',
  className = '',
  style
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000
      }
    }
  };

  const itemVariants = {
    hidden: {
      filter: 'blur(8px)',
      opacity: 0,
      y: 12
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] // sleek custom bezier ease
      }
    }
  };

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      style={{ 
        display: 'inline-flex', 
        flexWrap: 'wrap',
        justifyContent: 'inherit',
        ...style 
      }}
    >
      {elements.map((el, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          style={{
            display: 'inline-block',
            // Maintain whitespace spacing properly
            whiteSpace: el === ' ' ? 'pre' : 'normal'
          }}
        >
          {el === ' ' ? ' ' : el}
          {animateBy === 'words' && i < elements.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default BlurText;
