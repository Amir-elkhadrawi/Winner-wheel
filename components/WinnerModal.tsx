import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playConfettiSound } from '../utils/audio';
import { X, Trophy } from 'lucide-react';

interface WinnerModalProps {
  winner: string | null;
  onClose: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onClose }) => {
  useEffect(() => {
    if (winner) {
      const duration = 3000;
      const end = Date.now() + duration;

      // Play confetti sound once at start
      try {
        playConfettiSound();
      } catch (e) {
        // ignore
      }

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#f43f5e', '#3b82f6', '#10b981']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#f43f5e', '#3b82f6', '#10b981']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [winner]);

  if (!winner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-8 transform animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.5)]">
            <Trophy size={40} className="text-white" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-slate-400 text-lg font-medium uppercase tracking-wider">The Winner Is</h2>
            <h1 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 break-words">
              {winner}
            </h1>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:-translate-y-0.5 active:translate-y-0"
          >
            Awesome!
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;
