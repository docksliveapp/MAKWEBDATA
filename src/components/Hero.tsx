import React from 'react';
import { Sparkles } from 'lucide-react';
import { HeroVideoPlayer } from './HeroVideoPlayer';

interface HeroProps {
  onOpenQuote?: () => void;
  onOpenTransporter?: () => void;
  onOpenInquiry?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#F5F7FB] via-[#EBF0F7] to-[#F3F5F9] text-slate-900 pt-8 pb-14 md:pt-12 md:pb-18 border-b border-slate-300/80">
      
      {/* Subtle Pearl Glow & Luxury Backdrop Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-amber-200/25 to-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Top Marketing Greeting & Slogan Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-slate-300/90 shadow-xs text-slate-800 text-[11px] sm:text-xs font-bold tracking-wider font-mono">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>WELCOME TO MAK - GROUP CONSORTIUM</span>
          <span className="hidden sm:inline text-slate-400">•</span>
          <span className="hidden sm:inline text-[#B45309]">PAKISTAN'S PREMIER MULTIMODAL NETWORK</span>
        </div>

        {/* Brand Slogan Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono font-bold uppercase text-[#8B6220] tracking-widest">
          <span>CONNECTING PORTS</span>
          <span>•</span>
          <span>CROSS-BORDER TRANSIT</span>
          <span>•</span>
          <span>OCEAN LINER FREIGHT</span>
        </div>

        {/* Main Serif Luxury Headline */}
        <div className="space-y-1">
          <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-950 leading-[1.12]">
            <span className="block font-serif-luxury">
              UNIFIED LOGISTICS,
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#4A3415] via-[#8B6220] to-[#2E2010] font-serif-luxury">
              TRANSSHIPMENT & MARITIME
            </span>
            <span className="block font-serif-luxury">
              NETWORK
            </span>
          </h1>
        </div>

        {/* Warm Marketing Subtitle & Value Proposition */}
        <div className="max-w-3xl mx-auto space-y-2">
          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
            Welcome to Pakistan's foremost single-window trade and transport consortium. We coordinate <strong className="text-slate-950 font-bold">2,000+ customs-registered commercial prime movers</strong>, statutory FBR bonded carrier line-haul, transcontinental TIR overland corridors, and global deep-sea liner operations.
          </p>
          <p className="text-xs sm:text-sm text-slate-500 italic">
            "Delivering cargo from deepwater seaports to inland dry ports and Central Asian frontiers with guaranteed integrity, speed, and statutory escort."
          </p>
        </div>

        {/* Cinematic Video Showcase Player (All buttons removed from here; accessible via top Services & Inquiry menus) */}
        <HeroVideoPlayer />

        {/* Central Operations Desk Contact Bar */}
        <div className="pt-1 text-[12px] text-slate-600 font-medium">
          <span>Karachi Central Operations Desk: </span>
          <a href="tel:+922132330103" className="font-bold text-slate-800 hover:underline">
            +92-21-32330103
          </a>
          <span> / </span>
          <span className="font-bold text-slate-800">0104</span>
          <span className="mx-2">•</span>
          <span>Official Corporate Email: </span>
          <a href="mailto:info@mak-group.com.pk" className="font-bold text-[#B45309] hover:underline font-mono">
            info@mak-group.com.pk
          </a>
        </div>

      </div>
    </section>
  );
};
