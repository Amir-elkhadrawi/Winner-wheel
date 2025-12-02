// Simple Web Audio API helper to avoid external dependencies
let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

// Text-to-Speech helper
export const speak = (text: string) => {
  if (!window.speechSynthesis) return;
  
  // Cancel previous utterances to avoid queue buildup
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.volume = 1;
  utterance.rate = 1.1; // Slightly faster for excitement
  utterance.pitch = 1.0;
  
  // Try to find a good voice
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) || voices[0];
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  window.speechSynthesis.speak(utterance);
};

export const playWinSound = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Play a cheerful major arpeggio
    const now = ctx.currentTime;
    
    // Note 1
    osc.frequency.setValueAtTime(523.25, now); // C5
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.start(now);
    osc.stop(now + 0.5);

    // Note 2
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.frequency.setValueAtTime(659.25, now + 0.1); // E5
    gain2.gain.setValueAtTime(0.1, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.6);

    // Note 3
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.connect(gain3);
    gain3.connect(ctx.destination);
    osc3.frequency.setValueAtTime(783.99, now + 0.2); // G5
    gain3.gain.setValueAtTime(0.1, now + 0.2);
    gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc3.start(now + 0.2);
    osc3.stop(now + 0.8);
    
     // Note 4
    const osc4 = ctx.createOscillator();
    const gain4 = ctx.createGain();
    osc4.connect(gain4);
    gain4.connect(ctx.destination);
    osc4.frequency.setValueAtTime(1046.50, now + 0.3); // C6
    gain4.gain.setValueAtTime(0.1, now + 0.3);
    gain4.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    osc4.start(now + 0.3);
    osc4.stop(now + 1.2);

  } catch (e) {
    console.error("Audio play failed", e);
  }
};

export const playTickSound = () => {
    // Very short click for spinning tick
    try {
        const ctx = getAudioContext();
        // Randomize pitch slightly for realism
        const randomDetune = Math.random() * 200 - 100; 

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        // High pitch short blip - slightly lower frequency for a "clack" sound
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.detune.setValueAtTime(randomDetune, ctx.currentTime);
        osc.type = 'triangle';
        
        // Very fast envelope
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
        // silent fail
    }
}

export const playConfettiSound = () => {
  try {
    const ctx = getAudioContext();

    const now = ctx.currentTime;

    // Create noise burst for the 'boom' / paper rustle body
    const bufferSize = ctx.sampleRate * 0.3; // 300ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // white noise
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1200, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.linearRampToValueAtTime(0.12, now + 0.01);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.3);

    // Add several short bright oscillator 'sparkles'
    for (let i = 0; i < 6; i++) {
      const t = now + i * 0.03;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      // rising pitch for sparkle
      const base = 800 + i * 120;
      osc.frequency.setValueAtTime(base, t);
      osc.frequency.exponentialRampToValueAtTime(base * 1.8, t + 0.12);

      g.gain.setValueAtTime(0.05, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

      osc.connect(g);
      g.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.14);
    }

  } catch (e) {
    console.error('Confetti audio failed', e);
  }
};