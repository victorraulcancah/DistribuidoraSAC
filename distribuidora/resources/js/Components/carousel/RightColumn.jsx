'use client';

import { useRef, useEffect, useState } from 'react';
import ModuleCarousel from './ModuleCarousel';

export default function RightColumn() {
  const gridRef = useRef(null);
  const [activeGlow, setActiveGlow] = useState('emerald');

  const glowColors = {
    emerald: 'radial-gradient(ellipse at center, rgba(16,185,129,0.15) 0%, transparent 70%)',
    sky: 'radial-gradient(ellipse at center, rgba(14,165,233,0.15) 0%, transparent 70%)',
    amber: 'radial-gradient(ellipse at center, rgba(245,158,11,0.15) 0%, transparent 70%)',
    violet: 'radial-gradient(ellipse at center, rgba(168,85,247,0.15) 0%, transparent 70%)',
  };

  useEffect(() => {
    if (gridRef.current) {
      const ctx = gridRef.current.getContext('2d');
      const canvas = gridRef.current;
      
      const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        drawGrid();
      };
      
      const drawGrid = () => {
        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        const spacing = 56;
        
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = 'rgba(113, 113, 122, 0.15)';
        ctx.lineWidth = 1;
        
        for (let x = 0; x <= width; x += spacing) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        
        for (let y = 0; y <= height; y += spacing) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      };
      
      resize();
      window.addEventListener('resize', resize);
      
      return () => window.removeEventListener('resize', resize);
    }
  }, []);

  return (
    <div className="relative hidden lg:flex flex-1 min-h-screen bg-zinc-950 overflow-hidden">
      <canvas
        ref={gridRef}
        className="absolute inset-0"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out pointer-events-none"
        style={{ background: glowColors[activeGlow] }}
        aria-hidden="true"
      />
      
      <ModuleCarousel 
        onActiveChange={(module) => setActiveGlow(module.accent)} 
      />
    </div>
  );
}