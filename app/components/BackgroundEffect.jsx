'use client';
import { useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';

export default function BackgroundEffect() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const particleCount = 700;
    const particlePropCount = 9;
    const particlePropsLength = particleCount * particlePropCount;
    const rangeY = 100;
    const baseTTL = 50;
    const rangeTTL = 150;
    const baseSpeed = 0.1;
    const rangeSpeed = 2;
    const baseRadius = 1;
    const rangeRadius = 4;
    const baseHue = 220;
    const rangeHue = 100;
    const noiseSteps = 8;
    const xOff = 0.00125;
    const yOff = 0.00125;
    const zOff = 0.0005;
    const backgroundColor = 'hsla(260,40%,5%,1)';

    let container;
    let canvas;
    let ctx;
    let center;
    let tick;
    let noise3D; // <-- renamed
    let particleProps;

    // Utility helpers
    const rand = (n) => Math.random() * n;
    const randRange = (n) => n - Math.random() * n * 2;
    const fadeInOut = (t, m) => {
      let hm = 0.5 * m;
      return Math.abs(((t + hm) % m) - hm) / hm;
    };
    const lerp = (a, b, t) => a + (b - a) * t;
    const TAU = Math.PI * 2;
    const cos = Math.cos;
    const sin = Math.sin;

    function setup() {
      createCanvas();
      resize();
      initParticles();
      draw();
    }

    function initParticles() {
      tick = 0;
      noise3D = createNoise3D(); // ✅ new API usage
      particleProps = new Float32Array(particlePropsLength);

      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        initParticle(i);
      }
    }

    function initParticle(i) {
      let x = rand(canvas.a.width);
      let y = center[1] + randRange(rangeY);
      let vx = 0;
      let vy = 0;
      let life = 0;
      let ttl = baseTTL + rand(rangeTTL);
      let speed = baseSpeed + rand(rangeSpeed);
      let radius = baseRadius + rand(rangeRadius);
      let hue = baseHue + rand(rangeHue);

      particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    }

    function drawParticles() {
      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticle(i);
      }
    }

    function updateParticle(i) {
      const i2 = 1 + i,
        i3 = 2 + i,
        i4 = 3 + i,
        i5 = 4 + i,
        i6 = 5 + i,
        i7 = 6 + i,
        i8 = 7 + i,
        i9 = 8 + i;

      let x = particleProps[i];
      let y = particleProps[i2];
      let n = noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU; // ✅ uses createNoise3D()
      let vx = lerp(particleProps[i3], cos(n), 0.5);
      let vy = lerp(particleProps[i4], sin(n), 0.5);
      let life = particleProps[i5];
      let ttl = particleProps[i6];
      let speed = particleProps[i7];
      let x2 = x + vx * speed;
      let y2 = y + vy * speed;
      let radius = particleProps[i8];
      let hue = particleProps[i9];

      drawParticle(x, y, x2, y2, life, ttl, radius, hue);

      life++;

      particleProps[i] = x2;
      particleProps[i2] = y2;
      particleProps[i3] = vx;
      particleProps[i4] = vy;
      particleProps[i5] = life;

      (checkBounds(x, y) || life > ttl) && initParticle(i);
    }

    function drawParticle(x, y, x2, y2, life, ttl, radius, hue) {
      ctx.a.save();
      ctx.a.lineCap = 'round';
      ctx.a.lineWidth = radius;
      ctx.a.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
      ctx.a.beginPath();
      ctx.a.moveTo(x, y);
      ctx.a.lineTo(x2, y2);
      ctx.a.stroke();
      ctx.a.closePath();
      ctx.a.restore();
    }

    function checkBounds(x, y) {
      return x > canvas.a.width || x < 0 || y > canvas.a.height || y < 0;
    }

    function createCanvas() {
      container = containerRef.current;
      canvas = {
        a: document.createElement('canvas'),
        b: document.createElement('canvas'),
      };
      canvas.b.style = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      `;
      container.appendChild(canvas.b);
      ctx = {
        a: canvas.a.getContext('2d'),
        b: canvas.b.getContext('2d'),
      };
      center = [];
    }

    function resize() {
      const { innerWidth, innerHeight } = window;

      canvas.a.width = innerWidth;
      canvas.a.height = innerHeight;

      ctx.a.drawImage(canvas.b, 0, 0);

      canvas.b.width = innerWidth;
      canvas.b.height = innerHeight;

      ctx.b.drawImage(canvas.a, 0, 0);

      center[0] = 0.5 * canvas.a.width;
      center[1] = 0.5 * canvas.a.height;
    }

    function renderGlow() {
      ctx.b.save();
      ctx.b.filter = 'blur(8px) brightness(200%)';
      ctx.b.globalCompositeOperation = 'lighter';
      ctx.b.drawImage(canvas.a, 0, 0);
      ctx.b.restore();

      ctx.b.save();
      ctx.b.filter = 'blur(4px) brightness(200%)';
      ctx.b.globalCompositeOperation = 'lighter';
      ctx.b.drawImage(canvas.a, 0, 0);
      ctx.b.restore();
    }

    function renderToScreen() {
      ctx.b.save();
      ctx.b.globalCompositeOperation = 'lighter';
      ctx.b.drawImage(canvas.a, 0, 0);
      ctx.b.restore();
    }

    function draw() {
      tick++;

      ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);

      ctx.b.fillStyle = backgroundColor;
      ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height);

      drawParticles();
      renderGlow();
      renderToScreen();

      window.requestAnimationFrame(draw);
    }

    window.addEventListener('load', setup);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <div className='content--canvas' ref={containerRef}></div>;
}
