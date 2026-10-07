import React from 'react';
import { ConsortiumEmblem } from './ConsortiumEmblem';
import { ArrowRight, Truck, Package, ExternalLink, Activity, Phone } from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
  onOpenTransporter: () => void;
  onOpenTracker: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onOpenTransporter, onOpenTracker }) => {
  return (
    <section className="relative overflow-hidden bg-[#ECEEF3] text-slate-900 pt-8 pb-14 border-b border-slate-300/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Top Mini Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2E6ED] border border-slate-300/90 text-slate-600 text-[11px] font-semibold tracking-wider uppercase">
          <span>INTEGRATED LOGISTICS</span>
          <span>•</span>
          <span>CROSS-BORDER TRANSIT</span>
          <span>•</span>
          <span>MARITIME FREIGHT</span>
        </div>

        {/* Center Circular Golden Consortium Seal */}
        <div className="flex justify-center pt-1 pb-1">
          <ConsortiumEmblem size={175} />
        </div>

        {/* Main Serif Luxury Headline */}
        <div className="space-y-1">
          <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-slate-900 leading-[1.15]">
            <span className="block text-slate-950 font-serif-luxury">
              UNIFIED LOGISTICS,
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#422E1A] via-[#855B25] to-[#2E2012] font-serif-luxury">
              TRANSSHIPMENT & MARITIME
            </span>
            <span className="block text-slate-950 font-serif-luxury">
              NETWORK
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
          Single-window strategic command coordinating <strong className="text-slate-900 font-semibold">2,000+ customs-registered commercial prime movers</strong>, statutory FBR bonded transshipment, transcontinental TIR corridors, and global deep-sea liner operations.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenQuote}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#B8860B] via-[#C59B27] to-[#A37420] hover:from-[#A37420] hover:to-[#8B6214] text-white font-semibold text-sm shadow-sm transition hover:shadow flex items-center gap-2 cursor-pointer"
          >
            <span>Logistics Quotation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenTransporter}
            className="px-6 py-3 rounded-lg bg-[#111827] hover:bg-[#1E293B] text-white font-semibold text-sm shadow-sm transition hover:shadow flex items-center gap-2 cursor-pointer"
          >
            <Truck className="w-4 h-4 text-slate-300" />
            <span>Vehicle Registration Request</span>
          </button>
        </div>

        {/* Secondary Pill Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenTracker}
            className="px-4 py-2.5 rounded-lg bg-[#DEE2E9] hover:bg-[#D5DAE3] border border-slate-300/80 text-slate-800 text-xs font-semibold flex items-center gap-2 shadow-xs transition"
          >
            <Package className="w-4 h-4 text-amber-700 shrink-0" />
            <div className="text-left">
              <span className="text-[10px] text-slate-500 uppercase block font-mono">FBR & PORT TRACKING</span>
              <span className="text-slate-900 font-medium flex items-center gap-1">
                Check Container Status <ExternalLink className="w-3 h-3 text-slate-500" />
              </span>
            </div>
          </button>

          <button
            onClick={onOpenTracker}
            className="px-4 py-2.5 rounded-lg bg-[#DEE2E9] hover:bg-[#D5DAE3] border border-slate-300/80 text-slate-800 text-xs font-semibold flex items-center gap-2 shadow-xs transition"
          >
            <Truck className="w-4 h-4 text-blue-700 shrink-0" />
            <div className="text-left">
              <span className="text-[10px] text-slate-500 uppercase block font-mono">GPS & TELEMATICS</span>
              <span className="text-slate-900 font-medium flex items-center gap-1">
                Check Vehicle Status <ExternalLink className="w-3 h-3 text-slate-500" />
              </span>
            </div>
          </button>

          <a
            href="#departments"
            className="px-4 py-2.5 rounded-lg bg-[#DEE2E9] hover:bg-[#D5DAE3] border border-slate-300/80 text-slate-800 text-xs font-semibold flex items-center gap-2 shadow-xs transition"
          >
            <Activity className="w-4 h-4 text-rose-600 shrink-0" />
            <div className="text-left">
              <span className="text-slate-900 font-medium">Checkpoint SOPs</span>
            </div>
          </a>
        </div>

        {/* Operations Desk Info Line */}
        <div className="pt-2 text-[12px] text-slate-500">
          <span>Karachi Central Operations Desk: </span>
          <a href="tel:+922132330103" className="font-semibold text-slate-700 hover:underline">
            +92-21-32330103
          </a>
          <span> / </span>
          <span className="font-semibold text-slate-700">0104</span>
          <span className="mx-2">•</span>
          <span>Email: </span>
          <a href="mailto:info@mak-group.com.pk" className="font-semibold text-slate-700 hover:underline">
            info@mak-group.com.pk
          </a>
          <span className="mx-2">•</span>
          <span>WhatsApp: </span>
          <a href="https://wa.me/923218496806" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 hover:underline">
            03218496806
          </a>
        </div>
      </div>

      {/* Floating WhatsApp Hotline pill at bottom right */}
      <a
        href="https://wa.me/923218496806"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 bg-[#16A34A] hover:bg-[#15803D] text-white px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2.5 text-xs font-bold transition hover:scale-105"
      >
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <div className="text-left leading-tight">
          <span className="text-[9px] uppercase tracking-wider block opacity-90 font-mono">WHATSAPP HOTLINE</span>
          <span className="text-sm font-bold tracking-wide">03218496806</span>
        </div>
      </a>
    </section>
  );
};
