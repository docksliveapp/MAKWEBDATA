import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Radio,
  Video,
  Truck,
  Anchor,
  Globe,
  ShieldCheck,
  Activity
} from 'lucide-react';

export const HeroVideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [displayMode, setDisplayMode] = useState<'video' | 'radar'>('video');
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Ensuring muted is true on DOM element for mobile autoplay compliance
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser policy restricts autoplay without click, set to paused
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    setHasInteracted(true);
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    setHasInteracted(true);
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const toggleDisplayMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDisplayMode(prev => (prev === 'video' ? 'radar' : 'video'));
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-4 sm:my-8 px-2 sm:px-4 select-none">
      <div
        onClick={() => togglePlay()}
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-300/80 bg-slate-950 group cursor-pointer transition-all"
      >
        
        {/* Top Control & Status Ribbon */}
        <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-4 sm:left-4 sm:right-4 z-30 flex items-center justify-between gap-2 pointer-events-none">
          
          {/* Left Live Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-white border border-slate-700/80 text-[10px] sm:text-xs font-mono font-bold tracking-wider shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE OPERATIONS</span>
            </span>
            <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-amber-500/90 text-slate-950 font-mono font-bold text-[10px] tracking-widest uppercase shadow-md">
              24/7 PORT & FLEET
            </span>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
            
            {/* View Mode Switcher (Video vs Radar) */}
            <button
              onClick={toggleDisplayMode}
              className="px-2.5 py-1 sm:py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md text-slate-200 hover:text-white hover:bg-slate-800 transition border border-slate-700/90 text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1 shadow-md cursor-pointer"
              title="Toggle Live Video / Animated Radar"
            >
              {displayMode === 'video' ? (
                <>
                  <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span className="hidden xs:inline">Cargo Radar</span>
                </>
              ) : (
                <>
                  <Video className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden xs:inline">Live Stream</span>
                </>
              )}
            </button>

            {/* Play / Pause Quick Button */}
            <button
              onClick={togglePlay}
              className="p-1.5 sm:p-2 rounded-full bg-slate-900/85 backdrop-blur-md text-white hover:bg-slate-800 transition cursor-pointer border border-slate-700 shadow-md active:scale-95"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5" />}
            </button>

            {/* Mute / Unmute Button */}
            <button
              onClick={toggleMute}
              className="p-1.5 sm:p-2 rounded-full bg-slate-900/85 backdrop-blur-md text-white hover:bg-slate-800 transition cursor-pointer border border-slate-700 shadow-md active:scale-95"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />}
            </button>
          </div>
        </div>

        {/* Video Player Display Container */}
        <div className="relative aspect-[16/10] sm:aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
          
          {/* HTML5 Video Tag */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              displayMode === 'video' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
            }`}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="/videos/logistics_showcase.mp4" type="video/mp4" />
            <source src="/videos/logistics_showcase.webm" type="video/webm" />
          </video>

          {/* Animated Multimodal Radar Layer (Runs in radar mode or as visual backdrop) */}
          <div
            className={`absolute inset-0 bg-[#070D18] flex items-center justify-center transition-opacity duration-500 ${
              displayMode === 'radar' ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Grid Backdrop */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:28px_28px]" />

            {/* Radar Concentric Rings */}
            <div className="relative w-64 h-64 sm:w-96 sm:h-96 rounded-full border border-cyan-500/30 flex items-center justify-center">
              <div className="w-48 h-48 sm:w-72 sm:h-72 rounded-full border border-cyan-500/25 flex items-center justify-center">
                <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border border-amber-500/25 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-emerald-500/30 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                  </div>
                </div>
              </div>

              {/* Sweeping Radar Beam */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 via-transparent to-transparent animate-[spin_4s_linear_infinite] origin-center" />
            </div>

            {/* Simulated Logistics Waypoints */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between text-[10px] sm:text-xs font-mono text-cyan-400/90 font-bold">
                <span className="flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  KICT / SAPT BERTH: ACTIVE
                </span>
                <span>TELEMETRY: 68 KM/H</span>
              </div>



              <div className="flex justify-between text-[10px] sm:text-xs font-mono text-slate-400 font-semibold">
                <span>VESSEL STATUS: ON SCHEDULE</span>
                <span>UN TIR CARNET: ESCORTED</span>
              </div>
            </div>
          </div>

          {/* Large Center Play Button Overlay (Shows when video is paused) */}
          {!isPlaying && displayMode === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-slate-950/45 backdrop-blur-[2px] transition-all">
              <button
                onClick={togglePlay}
                className="group/btn px-5 py-3 rounded-2xl bg-gradient-to-r from-[#B8860B] via-[#C59B27] to-[#A37420] text-white shadow-2xl flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95 cursor-pointer border border-amber-300/40"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-4 h-4 ml-0.5 fill-white" />
                </div>
                <div className="text-left">
                  <span className="block text-xs sm:text-sm font-bold uppercase tracking-wider">
                    Play Operations Stream
                  </span>
                  <span className="block text-[9px] font-mono text-amber-100">
                    24/7 Port & Fleet Video Broadcast
                  </span>
                </div>
              </button>
            </div>
          )}

          {/* Bottom Gradient Fade */}
          <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent pointer-events-none" />
        </div>

        {/* Bottom Metric Badges Overlaid on Video */}
        <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-4 sm:inset-x-4 z-20 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 text-white pointer-events-none">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-mono font-semibold">
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/80 flex items-center gap-1 sm:gap-1.5">
              <Anchor className="w-3 h-3 text-cyan-400" />
              <span>Deepwater Berths (KICT / SAPT)</span>
            </span>
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/80 flex items-center gap-1 sm:gap-1.5">
              <Truck className="w-3 h-3 text-amber-400" />
              <span>2,000+ Bonded Prime Movers</span>
            </span>
            <span className="hidden md:inline-flex px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/80 items-center gap-1.5">
              <Globe className="w-3 h-3 text-emerald-400" />
              <span>TIR Transcontinental Corridors</span>
            </span>
          </div>

          <span className="hidden sm:inline-block text-[10px] text-slate-300 font-mono tracking-wider font-semibold">
            MAK - GROUP PROTOCOL
          </span>
        </div>

      </div>
    </div>
  );
};
