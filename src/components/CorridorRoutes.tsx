import React, { useState } from 'react';
import { TRADE_CORRIDORS } from '../data/consortium';
import { Navigation, Clock, ArrowRight } from 'lucide-react';

interface CorridorRoutesProps {
  onQuoteCorridor: (corridorName: string) => void;
}

export const CorridorRoutes: React.FC<CorridorRoutesProps> = ({ onQuoteCorridor }) => {
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>(TRADE_CORRIDORS[0].id);

  const selectedCorridor = TRADE_CORRIDORS.find(c => c.id === selectedCorridorId) || TRADE_CORRIDORS[0];

  return (
    <section id="corridors" className="py-16 md:py-22 bg-[#FAF9F6] text-slate-900 border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-[#9A6B16] block font-mono">
            TRANSCONTINENTAL ARTERIES & STATUTORY GATES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-luxury text-slate-900">
            Strategic Cross-Border Trade Corridors
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Direct bonded multimodal passage from Pakistan deep-sea terminals across Afghanistan (Torkham & Chaman), regional Gulf feeders, and transcontinental TIR routes to Central Asia.
          </p>
        </div>

        {/* Corridor Selection & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          
          {/* Left: Corridor List Selector */}
          <div className="lg:col-span-5 space-y-3">
            {TRADE_CORRIDORS.map((corridor) => {
              const isSelected = corridor.id === selectedCorridorId;
              return (
                <button
                  type="button"
                  key={corridor.id}
                  onClick={() => setSelectedCorridorId(corridor.id)}
                  className={`w-full text-left p-5 rounded-2xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-white border-[#B8860B] shadow-md ring-1 ring-[#B8860B]/30'
                      : 'bg-white/80 border-slate-200/90 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                    <span className="text-[#9A6B16] font-bold uppercase">
                      {corridor.code} · {corridor.category}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-[#9A6B16]" />
                      {corridor.transitTime}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {corridor.name}
                  </h3>
                  <div className="mt-2.5 text-xs text-slate-500 font-mono truncate">
                    {corridor.operatingEntity}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Corridor Route Visualizer */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <span className="text-xs font-mono text-[#9A6B16] uppercase tracking-wider font-bold">
                  {selectedCorridor.code} · {selectedCorridor.category}
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif-luxury text-slate-900 mt-1">
                  {selectedCorridor.name}
                </h3>
              </div>
              <div className="px-4 py-2 rounded-xl bg-[#F4F6F9] border border-slate-200 text-right">
                <span className="text-xs text-slate-500 block uppercase font-mono">Transit Est.</span>
                <span className="text-base font-bold text-slate-900 font-mono">{selectedCorridor.transitTime}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {selectedCorridor.description}
            </p>

            {/* Origin & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                <span className="text-xs font-mono uppercase text-slate-500 block mb-1">Origin Port / Point</span>
                <span className="text-base font-bold text-slate-900">{selectedCorridor.origin}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                <span className="text-xs font-mono uppercase text-slate-500 block mb-1">Destination Gateway</span>
                <span className="text-base font-bold text-emerald-800">{selectedCorridor.destination}</span>
              </div>
            </div>

            {/* Checkpoints Flow */}
            <div className="space-y-3.5">
              <span className="text-xs sm:text-sm font-mono uppercase text-slate-800 tracking-wider font-bold flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#9A6B16]" />
                Transit Checkpoints & Customs Clearance Sequence:
              </span>
              <div className="relative pl-6 space-y-3 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-amber-600 before:via-blue-600 before:to-emerald-600">
                {selectedCorridor.keyCheckpoints.map((cp, idx) => (
                  <div key={idx} className="relative flex items-center gap-3 text-sm text-slate-700">
                    <span className="absolute -left-6 w-3 h-3 rounded-full bg-white border-2 border-amber-600" />
                    <span className="font-medium">{cp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operating Entity & CTA */}
            <div className="pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-slate-600">
                <span className="block font-medium text-slate-500 text-xs">Managing Consortium:</span>
                <span className="font-mono text-slate-900 font-bold">{selectedCorridor.operatingEntity}</span>
              </div>
              <button
                onClick={() => onQuoteCorridor(selectedCorridor.name)}
                className="btn-gold-luxury min-h-[44px] px-6 py-3 rounded-xl text-white font-semibold text-sm tracking-wide transition flex items-center gap-2 cursor-pointer"
              >
                <span>Request Corridor Rate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
