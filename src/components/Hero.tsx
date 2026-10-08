import React from 'react';
import { ConsortiumEmblem } from './ConsortiumEmblem';
import { ArrowRight, Truck, Package, ExternalLink, ShieldCheck, ChevronDown } from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
  onOpenTransporter: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onOpenTransporter }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#F5F7FB] via-[#EBF0F7] to-[#F3F5F9] text-slate-900 pt-10 pb-16 md:pt-14 md:pb-20 border-b border-slate-300/80">
      
      {/* Subtle Pearl Glow & Luxury Backdrop Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-amber-200/25 to-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
        
        {/* Top Mini Pill Ribbon */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-300/90 shadow-2xs text-slate-700 text-[11px] font-bold tracking-wider uppercase font-mono">
          <span>INTEGRATED LOGISTICS</span>
          <span>•</span>
          <span>CROSS-BORDER TRANSIT</span>
          <span>•</span>
          <span>MARITIME FREIGHT</span>
        </div>

        {/* Center Circular Golden Consortium Emblem */}
        <div className="flex justify-center pt-1 pb-1">
          <ConsortiumEmblem size={180} />
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

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
          Single-window strategic command coordinating <strong className="text-slate-900 font-semibold">2,000+ customs-registered commercial prime movers</strong>, statutory FBR bonded transshipment, transcontinental TIR corridors, and global deep-sea liner operations.
        </p>

        {/* Primary Animated Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenQuote}
            className="btn-gold-luxury px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer"
          >
            <span>Logistics Quotation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenTransporter}
            className="btn-dark-luxury px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer"
          >
            <Truck className="w-4 h-4 text-slate-300" />
            <span>Vehicle Registration Request</span>
          </button>
        </div>

        {/* Direct Link Tracking Buttons */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          {/* Button 1: Vehicle Verification */}
          <a
            href="https://ais-pre-uzjhn4dzdhmnrnk7f4uuiz-279269232484.asia-east1.run.app/?mode=vehicle"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-interactive px-5 py-3 rounded-xl bg-white/95 hover:bg-white border border-slate-300/90 text-slate-900 text-xs font-bold flex items-center gap-2.5 shadow-sm"
          >
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
              <Truck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-slate-500 uppercase block font-mono">GPS TELEMATICS</span>
              <span className="flex items-center gap-1 font-bold">
                Check Vehicle Status <ExternalLink className="w-3 h-3 text-slate-400" />
              </span>
            </div>
          </a>

          {/* Button 2: Container Tracking */}
          <a
            href="https://ais-pre-uzjhn4dzdhmnrnk7f4uuiz-279269232484.asia-east1.run.app/?mode=status"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-interactive px-5 py-3 rounded-xl bg-white/95 hover:bg-white border border-slate-300/90 text-slate-900 text-xs font-bold flex items-center gap-2.5 shadow-sm"
          >
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
              <Package className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-slate-500 uppercase block font-mono">FBR & PORT TRACKING</span>
              <span className="flex items-center gap-1 font-bold">
                Track Container / Consignment <ExternalLink className="w-3 h-3 text-slate-400" />
              </span>
            </div>
          </a>

          {/* Explore Services Scroll Button */}
          <a
            href="#services"
            className="btn-pill-interactive px-5 py-3 rounded-xl bg-white/95 hover:bg-white border border-slate-300/90 text-slate-900 text-xs font-bold flex items-center gap-2.5 shadow-sm"
          >
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-slate-500 uppercase block font-mono">PORTFOLIO</span>
              <span className="flex items-center gap-1 font-bold">
                All Services & Rates <ChevronDown className="w-3 h-3 text-slate-400" />
              </span>
            </div>
          </a>
        </div>

        {/* Central Operations Desk Contact Bar strictly using info@mak-group.com.pk */}
        <div className="pt-2 text-[12px] text-slate-600 font-medium">
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
