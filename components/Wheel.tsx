import React, { useEffect, useRef, useState, useMemo } from 'react';
import { WHEEL_COLORS, WheelSettings } from '../constants';
import { playTickSound, speak } from '../utils/audio';

interface WheelProps {
  segments: string[];
  isSpinning: boolean;
  onSpinComplete: (winner: string) => void;
  spinDuration: number; // seconds
  settings: WheelSettings;
}

// Easing function: Cubic Out
const easeOutCubic = (x: number): number => {
  return 1 - Math.pow(1 - x, 3);
};

const Wheel: React.FC<WheelProps> = ({ segments, isSpinning, onSpinComplete, spinDuration, settings }) => {
  const [rotation, setRotation] = useState(0);
  
  // Animation refs
  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const startRotationRef = useRef<number>(0);
  const targetRotationRef = useRef<number>(0);
  const lastSegmentIndexRef = useRef<number>(-1);
  const isSpinningRef = useRef<boolean>(false);

  // Memoize wheel data
  const wheelData = useMemo(() => {
    const numSegments = segments.length;
    const anglePerSegment = 360 / numSegments;
    
    return segments.map((segment, index) => {
      const startAngle = index * anglePerSegment;
      const endAngle = (index + 1) * anglePerSegment;
      
      const radius = 50;
      const center = 50;
      
      const x1 = center + radius * Math.cos(Math.PI * startAngle / 180);
      const y1 = center + radius * Math.sin(Math.PI * startAngle / 180);
      const x2 = center + radius * Math.cos(Math.PI * endAngle / 180);
      const y2 = center + radius * Math.sin(Math.PI * endAngle / 180);
      
      const largeArcFlag = anglePerSegment > 180 ? 1 : 0;
      const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      
  const midAngle = startAngle + anglePerSegment / 2;
  // Shrink text radius slightly when many segments exist so labels don't overflow
  const textRadius = radius * (numSegments > 60 ? 0.6 : numSegments > 30 ? 0.7 : 0.75);
      const tx = center + textRadius * Math.cos(Math.PI * midAngle / 180);
      const ty = center + textRadius * Math.sin(Math.PI * midAngle / 180);
      
      return {
        pathData,
        color: WHEEL_COLORS[index % WHEEL_COLORS.length],
        text: segment,
        tx,
        ty,
        rotation: midAngle + (midAngle > 90 && midAngle < 270 ? 180 : 0)
      };
    });
  }, [segments]);

  // Compute label sizing/truncation based on number of segments
  const labelOptions = useMemo(() => {
    const n = segments.length;
    // Font size in SVG coordinate units; reduce as number grows
    const fontSize = n <= 12 ? 4 : n <= 30 ? 3 : n <= 60 ? 2.4 : 1.8;
    // Truncate longer names more aggressively when many segments exist
    const truncLen = n > 60 ? 6 : n > 30 ? 8 : n > 15 ? 10 : 12;
    return { fontSize, truncLen };
  }, [segments]);

  // Handle spin trigger
  useEffect(() => {
    if (isSpinning && !isSpinningRef.current) {
      // START SPIN
      isSpinningRef.current = true;
      startTimeRef.current = performance.now();
      startRotationRef.current = rotation;
      
      // Calculate target: Current + (MinSpins * 360) + Random
      const minSpins = 5;
      const randomDegree = Math.floor(Math.random() * 360);
      // Add extra rotation to ensure we don't land exactly on a line if possible, though random covers it
      targetRotationRef.current = rotation + (360 * minSpins) + randomDegree;
      
      // Voice announcement
      if (settings.spinSound) {
        speak("Spinning!");
      }

      // Start animation loop
      requestRef.current = requestAnimationFrame(animate);
    } else if (!isSpinning && isSpinningRef.current) {
      // External reset
      isSpinningRef.current = false;
      cancelAnimationFrame(requestRef.current);
    }
  }, [isSpinning, rotation, settings.spinSound]);

  const animate = (time: number) => {
    const elapsed = (time - startTimeRef.current) / 1000; // seconds
    const duration = spinDuration;
    
    if (elapsed < duration) {
      // Calculate progress
      const progress = elapsed / duration;
      const ease = easeOutCubic(progress);
      
      // Update rotation
      const newRotation = startRotationRef.current + (targetRotationRef.current - startRotationRef.current) * ease;
      setRotation(newRotation);

      // Check for Ticking Sound
      if (settings.spinSound) {
        const anglePerSegment = 360 / segments.length;
        // Pointer is at 0 degrees (Right).
        // Current Angle of pointer relative to wheel = (360 - rotation % 360)
        const normalizedRotation = newRotation % 360;
        const pointerAngle = (360 - normalizedRotation) % 360;
        const currentSegmentIndex = Math.floor(pointerAngle / anglePerSegment);

        if (currentSegmentIndex !== lastSegmentIndexRef.current) {
          playTickSound();
          lastSegmentIndexRef.current = currentSegmentIndex;
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    } else {
      // FINISH SPIN
      const finalRotation = targetRotationRef.current;
      setRotation(finalRotation);
      isSpinningRef.current = false;
      
      // Determine winner
      const normalizedRotation = finalRotation % 360;
      const pointerAngle = (360 - normalizedRotation) % 360;
      const anglePerSegment = 360 / segments.length;
      const winnerIndex = Math.floor(pointerAngle / anglePerSegment);
      const safeIndex = Math.max(0, Math.min(winnerIndex, segments.length - 1));
      
      onSpinComplete(segments[safeIndex]);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto">
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full border-4 border-slate-700 shadow-[0_0_50px_rgba(59,130,246,0.2)]"></div>
      
      {/* Pointer (Triangle) at 3 o'clock position (Right) */}
      <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-20 w-0 h-0 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent border-r-[25px] border-r-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] filter"></div>

      {/* The Wheel SVG */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        style={{ 
          transform: `rotate(${rotation}deg)`,
          // We removed CSS transition here to allow JS to control the frame updates for physics/sound sync
        }}
      >
        {wheelData.map((seg, i) => (
          <g key={i}>
            <path d={seg.pathData} fill={seg.color} stroke="#0f172a" strokeWidth="0.5" />
                <text 
                  x={seg.tx} 
                  y={seg.ty} 
                  fill="white" 
                  fontSize={labelOptions.fontSize} 
                  fontWeight="bold"
                  textAnchor="middle" 
                  alignmentBaseline="middle"
                  transform={`rotate(${seg.rotation}, ${seg.tx}, ${seg.ty})`}
                  style={{ pointerEvents: 'none', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  {seg.text.length > labelOptions.truncLen ? seg.text.substring(0, labelOptions.truncLen - 2) + '..' : seg.text}
                </text>
          </g>
        ))}
        {/* Center Cap */}
        <circle cx="50" cy="50" r="5" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
        <circle cx="50" cy="50" r="2" fill="#3b82f6" className={isSpinning ? "animate-pulse" : ""} />
      </svg>
    </div>
  );
};

export default Wheel;