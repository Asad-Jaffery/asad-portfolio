'use client';
import React, { useState } from 'react';

const NavBar = () => {
  const [active, setActive] = useState(0);

  // CHANGED: Converted to Array for easy mapping and 0-based indexing
  const items = ['resume', 'about me', 'experience', 'projects'];

  return (
    <>
      <style>
        {`
          @keyframes scaleToggle1 {
            0% { transform: scale(1, 1); }
            50% { transform: scale(1.05, 1); } 
            100% { transform: scale(1, 1); }
          }
          @keyframes scaleToggle2 {
            0% { transform: scale(1, 1); }
            50% { transform: scale(1.05, 1); } 
            100% { transform: scale(1, 1); }
          }
        `}
      </style>

      {/* Filter Definition */}
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

      {/* Main Container */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px 10px',
          boxSizing: 'border-box',
          width: '900px',
          height: '70px',
          borderRadius: '99em',
          backgroundColor: 'rgba(187, 187, 188, 0.12)',
          backdropFilter: 'blur(8px) url(#liquid-glass-filter) saturate(150%)',
          WebkitBackdropFilter: 'blur(8px) saturate(150%)',
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
      >
        {/* Moving Blob */}
        <div
          style={{
            position: 'absolute',
            zIndex: -1,
            top: '4px',
            left: '12px',
            width: 'calc((100% - 48px) / 4)',
            height: 'calc(100% - 10px)',
            borderRadius: '99em',
            translate: `calc(${active} * (100% + 8px)) 0`,
            transition: 'translate 400ms cubic-bezier(1, 0.0, 0.4, 1)',
            animation: `${
              active % 2 === 0 ? 'scaleToggle1' : 'scaleToggle2'
            } 440ms ease`,
            backgroundColor: 'rgba(187, 187, 188, 0.36)',
            boxShadow: `
              inset 0 0 0 1px rgba(255, 255, 255, 0.1),
              inset 2px 1px 0px -1px rgba(255, 255, 255, 0.9),
              inset -1.5px -1px 0px -1px rgba(255, 255, 255, 0.8),
              inset -2px -6px 1px -5px rgba(255, 255, 255, 0.6),
              inset -1px 2px 3px -1px rgba(0, 0, 0, 0.2),
              inset 0px -4px 1px -2px rgba(0, 0, 0, 0.1),
              0px 3px 6px 0px rgba(0, 0, 0, 0.08)
            `,
          }}
        />

        {/* Text Items */}
        {items.map((text, index) => (
          <div
            key={index}
            onClick={() => setActive(index)}
            style={{
              flex: 1,
              height: '100%',
              borderRadius: '99em',
              cursor: 'pointer',
              zIndex: 10,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#333',
              fontWeight: 500,
              userSelect: 'none',
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </>
  );
};

export default NavBar;
