import React, { useState, useEffect, useCallback } from 'react';
import Wheel from './components/Wheel';
import Controls from './components/Controls';
import WinnerModal from './components/WinnerModal';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Contact from './components/Contact';
import { WheelSettings, DEFAULT_PARTICIPANTS, LOCAL_STORAGE_KEY } from './constants';
import { playWinSound, speak } from './utils/audio';
import { Zap, Play, RotateCcw, Star, ShieldCheck, Shuffle, Trophy, HelpCircle, ArrowDown } from 'lucide-react';

const App: React.FC = () => {
  // State initialization
  const [segments, setSegments] = useState<string[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_PARTICIPANTS;
  });

  const [settings, setSettings] = useState<WheelSettings>({
    duration: 10, // Default duration set to 10s as requested
    removeWinner: false,
    spinSound: true
  });

  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // Persist segments to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(segments));
  }, [segments]);

  const handleSpinStart = () => {
    if (segments.length < 2) {
      alert("Please add at least 2 participants to spin!");
      return;
    }
    if (isSpinning) return;

    setWinner(null);
    setIsSpinning(true);
    
    // Smooth scroll to wheel if needed (mostly for mobile)
    document.getElementById('wheel-app')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSpinComplete = useCallback((winningSegment: string) => {
    setIsSpinning(false);
    setWinner(winningSegment);
    playWinSound();
    
    if (settings.spinSound) {
      speak("The winner is " + winningSegment);
    }
  }, [settings.spinSound]);

  const handleModalClose = () => {
    if (settings.removeWinner && winner) {
      setSegments(prev => prev.filter(s => s !== winner));
    }
    setWinner(null);
  };

  const handleReset = () => {
    if (isSpinning) return;
    if (window.confirm("Reset list to defaults?")) {
      setSegments(DEFAULT_PARTICIPANTS);
    }
  };

  const scrollToWheel = () => {
    document.getElementById('wheel-app')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 selection:text-blue-200 font-sans">
      {/* Header */}
      <header className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="p-2 bg-blue-600 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.5)]">
               <Zap className="text-white fill-white" size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">
              Winner<span className="text-blue-400">Wheel</span>
            </h1>
          </div>
          <nav className="flex gap-4 text-sm font-medium text-slate-400">
            <button onClick={scrollToWheel} className="hover:text-blue-400 transition-colors">The Wheel</button>
            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-400 transition-colors hidden sm:block">Features</button>
            <button onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-400 transition-colors hidden sm:block">FAQ</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-sm font-medium">
            <Star size={14} className="fill-blue-300" />
            <span>The #1 Random Name Picker</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-tight">
            Spin the Wheel of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Fortune & Destiny</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A free, professional random choice generator. Perfect for raffles, classroom activities, decision making, and giveaways. Fair, fun, and fully customizable.
          </p>
          
          <div className="flex items-center justify-center gap-4 pt-4">
            <button 
              onClick={scrollToWheel}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2"
            >
              Start Spinning <ArrowDown size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Main App Section */}
      <main id="wheel-app" className="relative py-12 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                
                {/* Left Column: Wheel Area */}
                <div className="w-full lg:flex-1 flex flex-col items-center">
                    <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">
                        <Wheel 
                        segments={segments.length > 0 ? segments : ['Add Names', 'To Spin']}
                        isSpinning={isSpinning}
                        onSpinComplete={handleSpinComplete}
                        spinDuration={settings.duration}
                        settings={settings}
                        />
                    </div>

                    {/* Wheel Controls */}
                    <div className="mt-8 flex gap-4 z-30 justify-center w-full">
                    <button
                        onClick={handleSpinStart}
                        disabled={isSpinning || segments.length < 2}
                        className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xl font-bold rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-3 min-w-[200px] justify-center"
                    >
                        <Play className="fill-white" size={24} />
                        {isSpinning ? 'SPINNING...' : 'SPIN'}
                    </button>
                    
                    <button
                        onClick={handleReset}
                        disabled={isSpinning}
                        className="p-5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full shadow-lg hover:shadow-slate-700/50 transition-all border border-slate-700"
                        title="Reset to defaults"
                    >
                        <RotateCcw size={24} />
                    </button>
                    </div>
                </div>

                {/* Right Column: Controls */}
                <div className="w-full lg:w-[450px] flex-shrink-0">
                    <Controls 
                        segments={segments}
                        setSegments={setSegments}
                        settings={settings}
                        setSettings={setSettings}
                        isSpinning={isSpinning}
                    />
                </div>
            </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">Why Use WinnerWheel?</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Built for teachers, streamers, and event organizers who need a reliable, fair, and exciting way to pick winners.
                </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                        <Shuffle className="text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">100% Random & Fair</h3>
                    <p className="text-slate-400">
                        Our advanced algorithm uses cryptographic randomness to ensure every spin is completely unbiased and unpredictable.
                    </p>
                </div>
                <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                        <ShieldCheck className="text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Secure & Private</h3>
                    <p className="text-slate-400">
                        Your data never leaves your browser. All participant lists are stored locally on your device for maximum privacy.
                    </p>
                </div>
                <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                        <Trophy className="text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Exciting Rewards</h3>
                    <p className="text-slate-400">
                        Engage your audience with immersive sound effects, realistic physics, and a celebratory confetti explosion for winners.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* How To Use Section */}
      <section className="py-24 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">How to Spin the Wheel</h2>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
                {[
                    { step: "01", title: "Add Entries", desc: "Type names manually or upload a text/CSV file." },
                    { step: "02", title: "Customize", desc: "Adjust spin time and sound settings." },
                    { step: "03", title: "Spin", desc: "Click the spin button and watch the wheel go!" },
                    { step: "04", title: "Celebrate", desc: "Announce the winner with confetti and sound." }
                ].map((item, idx) => (
                    <div key={idx} className="relative group">
                        <div className="text-6xl font-black text-slate-800/50 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 -z-10 select-none group-hover:text-blue-900/20 transition-colors">
                            {item.step}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 pt-4">{item.title}</h3>
                        <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                ))}
            </div>
          </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-6">
                <div className="bg-slate-800/50 rounded-xl p-6">
                    <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-2">
                        <HelpCircle size={20} className="text-blue-400" />
                        Is the wheel rigged?
                    </h3>
                    <p className="text-slate-400 pl-8">
                        No. The WinnerWheel uses a pseudo-random number generator provided by your browser to ensure fair and unpredictable results every time you spin.
                    </p>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-6">
                    <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-2">
                        <HelpCircle size={20} className="text-blue-400" />
                        Can I save my lists?
                    </h3>
                    <p className="text-slate-400 pl-8">
                        Yes! The application automatically saves your current list to your browser's local storage. You can also export your list as a text file for backup.
                    </p>
                </div>
                 <div className="bg-slate-800/50 rounded-xl p-6">
                    <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-2">
                        <HelpCircle size={20} className="text-blue-400" />
                        How many names can I add?
                    </h3>
                    <p className="text-slate-400 pl-8">
                        You can add hundreds of names. The wheel segments will automatically adjust to fit everyone, though for the best visual experience, we recommend under 100 entries.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <Footer 
        onPrivacyClick={() => setShowPrivacyPolicy(true)}
        onTermsClick={() => setShowTermsOfService(true)}
        onContactClick={() => setShowContact(true)}
      />

      {/* Modals */}
      {showPrivacyPolicy && <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />}
      {showTermsOfService && <TermsOfService onClose={() => setShowTermsOfService(false)} />}
      {showContact && <Contact onClose={() => setShowContact(false)} />}

      {/* Winner Overlay */}
      <WinnerModal 
        winner={winner} 
        onClose={handleModalClose} 
      />
    </div>
  );
};

export default App;