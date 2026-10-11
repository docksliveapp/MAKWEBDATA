import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ShieldCheck, Sparkles, Truck, Anchor, Globe } from 'lucide-react';

export const HeroVideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 sm:my-8 px-2">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-300/80 bg-slate-950 group">
        
        {/* Top Video Header Tag */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white border border-slate-700/80 text-[10px] sm:text-xs font-mono font-bold tracking-wider shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            MAK - GROUP LOGISTICS STREAM
          </span>
          <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-amber-500/90 text-slate-950 font-mono font-bold text-[10px] tracking-widest uppercase shadow-md">
            24/7 PORT & FLEET OPERATIONS
          </span>
        </div>

        {/* Top Right Quick Controls */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-2 sm:p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white hover:bg-slate-800 transition cursor-pointer border border-slate-700 shadow-md"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            onClick={toggleMute}
            className="p-2 sm:p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white hover:bg-slate-800 transition cursor-pointer border border-slate-700 shadow-md"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-300" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-[16/9] w-full bg-slate-950 flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="/videos/logistics_showcase.mp4" type="video/mp4" />
            <source src="/videos/logistics_showcase.webm" type="video/webm" />
            Your browser does not support HTML5 video streaming.
          </video>

          {/* Subtle Bottom Gradient for Metric Chips */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />
        </div>

        {/* Bottom Metric Badges Overlaid on Video */}
        <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 z-20 flex flex-wrap items-center justify-between gap-2 text-white">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono font-semibold">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/80 flex items-center gap-1.5">
              <Anchor className="w-3 h-3 text-cyan-400" />
              Deepwater Berths (KICT / SAPT / QICT)
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/80 flex items-center gap-1.5">
              <Truck className="w-3 h-3 text-amber-400" />
              2,000+ Bonded Prime Movers
            </span>
            <span className="hidden md:inline-flex px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/80 items-center gap-1.5">
              <Globe className="w-3 h-3 text-emerald-400" />
              TIR Transcontinental Corridors
            </span>
          </div>

          <span className="hidden sm:inline-block text-[10px] text-slate-300 font-mono tracking-wider">
            PAKISTAN CUSTOMS ESCORT PROTOCOL
          </span>
        </div>

      </div>
    </div>
  );
};
