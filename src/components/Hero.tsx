import React from 'react';
import { ArrowRight, Shield, Anchor, Truck, Compass, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { CONSORTIUM_STATS } from '../data/consortium';

interface HeroProps {
  onOpenQuote: () => void;
  onOpenTransporter: () => void;
  onOpenTracker: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onOpenTransporter, onOpenTracker }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-20 border-b border-slate-800">
      {/* Background Radial Glow & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(30,58,138,0.25),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(217,119,6,0.15),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-medium mb-6 shadow-inner">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Unified Pakistan, UAE, Afghan Transit & TIR Multimodal Network</span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-300">Single-Window Logistics Window</span>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Vision & Action */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Integrated Maritime, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                Port Stevedoring &
              </span> <br />
              Cross-Border Freight
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
              <strong className="text-white font-medium">MAK - GROUP</strong> unites the operational prowess of 
              <span className="text-amber-300 font-medium"> Docks (Pvt) Ltd</span>, 
              <span className="text-amber-300 font-medium"> Truckit Logistics</span>, 
              <span className="text-amber-300 font-medium"> Muhib International</span>, and 
              <span className="text-amber-300 font-medium"> Vantage Shipping Line</span> into one consolidated operational window. From Karachi deepwater berths to Jebel Ali and Central Asian TIR corridors.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenQuote}
                className="px-6 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3"
              >
                <span>Request Commercial Rate</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onOpenTransporter}
                className="px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 font-semibold text-sm hover:border-emerald-400 transition-all flex items-center gap-2.5"
              >
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Enroll Transporter Fleet</span>
              </button>

              <button
                onClick={onOpenTracker}
                className="px-4 py-4 rounded-xl text-slate-400 hover:text-slate-200 text-sm font-medium hover:bg-slate-900/60 transition flex items-center gap-1.5"
              >
                <span>Track Reference ID</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Consortium Assurance Badges */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>APTTA & TIR Authorized</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Karachi KPT & PQA Berths</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Jebel Ali NVOCC Services</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consortium Hub Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 p-6 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                    OPERATIONAL CONTROL HUB
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500">24/7 LIVE</span>
              </div>

              {/* 4 Pillars Mini Grid */}
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-blue-900/40 hover:border-blue-700/60 transition group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-blue-300 font-mono flex items-center gap-1.5">
                      <Anchor className="w-3.5 h-3.5 text-blue-400" />
                      DOCKS (PVT) LTD
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-blue-400/80 bg-blue-950/60 px-2 py-0.5 rounded">
                      Stevedoring
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    KPT East & West Wharf Berths, Port Qasim Bulk & Project Cargo handling.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-900/40 hover:border-amber-700/60 transition group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-300 font-mono flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-amber-400" />
                      TRUCKIT LOGISTICS
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-amber-400/80 bg-amber-950/60 px-2 py-0.5 rounded">
                      650+ Fleet
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Bonded container haulage, GPS telematics, nationwide upcountry linehaul.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-900/40 hover:border-emerald-700/60 transition group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-emerald-300 font-mono flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-400" />
                      MUHIB INTERNATIONAL
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-emerald-400/80 bg-emerald-950/60 px-2 py-0.5 rounded">
                      Afghan & TIR
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Torkham & Chaman customs clearing, TIR convention to Uzbekistan & CARs.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-900/40 hover:border-cyan-700/60 transition group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-cyan-300 font-mono flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-cyan-400" />
                      VANTAGE SHIPPING LINE
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded">
                      NVOCC Carrier
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Regular Karachi – Jebel Ali feeder rotations, ISO tank containers & charters.
                  </p>
                </div>
              </div>

              {/* Instant rate estimation banner */}
              <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                <button
                  onClick={onOpenQuote}
                  className="w-full py-2.5 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-950/30 hover:bg-amber-950/50 rounded-lg border border-amber-900/60 transition flex items-center justify-center gap-1.5"
                >
                  <span>Launch Rate Calculator & Quotation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Consortium Statistical Impact Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {CONSORTIUM_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-serif-luxury tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">{stat.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
