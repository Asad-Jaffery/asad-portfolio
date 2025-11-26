import React from 'react';

const NavBar = () => {
  return (
    <>
      {/* 1. The Filter Definition */}
      <svg
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          pointerEvents: 'none',
        }}
      >
        <filter id='liquid-glass-filter' primitiveUnits='objectBoundingBox'>
          <feImage result='map' width='100%' height='100%' x='0' y='0' />
          <feGaussianBlur
            in='SourceGraphic'
            stdDeviation='0.04'
            result='blur'
          />
          <feDisplacementMap
            in='blur'
            in2='map'
            scale='0.5'
            xChannelSelector='R'
            yChannelSelector='G'
          />
        </filter>
      </svg>

      {/* 2. The Liquid Glass Element */}
      <div
        style={{
          // --- NEW: Global Positioning ---
          position: 'fixed', // Keeps it stuck to the screen while scrolling
          top: '20px', // Spacing from the very top edge
          left: '50%', // Move to the horizontal center
          transform: 'translateX(-50%)', // Perfectly centers the element
          zIndex: 9999, // Ensures it sits on top of all other site content

          // --- Existing: Sizing ---
          width: '244px',
          height: '70px',
          borderRadius: '99em',

          // --- Existing: Liquid Glass Effect ---
          backgroundColor: 'rgba(187, 187, 188, 0.12)',
          backdropFilter: 'blur(8px) url(#liquid-glass-filter) saturate(150%)',
          WebkitBackdropFilter: 'blur(8px) saturate(150%)',

          // --- Existing: Bezel & Lighting ---
          boxShadow: `
            inset 0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 1.8px 3px 0px -2px rgba(255, 255, 255, 0.9),
            inset -2px -2px 0px -2px rgba(255, 255, 255, 0.8),
            inset -3px -8px 1px -6px rgba(255, 255, 255, 0.6),
            inset -0.3px -1px 4px 0px rgba(0, 0, 0, 0.12),
            inset -1.5px 2.5px 0px -2px rgba(0, 0, 0, 0.2),
            inset 0px 3px 4px -2px rgba(0, 0, 0, 0.2),
            inset 2px -6.5px 1px -4px rgba(0, 0, 0, 0.1),
            0px 1px 5px 0px rgba(0, 0, 0, 0.1),
            0px 6px 16px 0px rgba(0, 0, 0, 0.08)
          `,
        }}
      />
    </>
  );
};

export default NavBar;
