import React, { useMemo } from 'react';

export default function WaterDropletsBackground() {
  // Generate 32 realistic 3D water droplets with varied positions, speeds, sizes, and delays
  const droplets = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => {
      const left = Math.floor((i * 3.1 + (i % 5) * 1.7) % 96 + 2);
      const duration = 3.2 + (i % 6) * 1.1; // 3.2s to 8.7s
      const delay = (i % 9) * 0.6; // Staggered entry delays
      const width = 8 + (i % 5) * 3.5; // 8px to 22px realistic drop size
      const height = width * 1.5; // Realistic fluid teardrop aspect ratio

      return {
        id: i,
        style: {
          left: `${left}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          width: `${width}px`,
          height: `${height}px`,
        }
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {droplets.map((drop) => (
        <div
          key={drop.id}
          className="realistic-water-drop animate-realisticDrop"
          style={drop.style}
        />
      ))}
    </div>
  );
}

