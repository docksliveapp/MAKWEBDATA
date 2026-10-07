import React, { useState } from 'react';
import { TRADE_CORRIDORS } from '../data/consortium';
import { Globe2, Navigation, Clock, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface CorridorRoutesProps {
  onQuoteCorridor: (corridorName: string) => void;
}

export const CorridorRoutes: React.FC<CorridorRoutesProps> = ({ onQuoteCorridor }) => {
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>(TRADE_CORRIDORS[0].id);

  const selectedCorridor = TRADE_CORRIDORS.find(c => c.id === selectedCorridorId) || TRADE_CORRIDORS[0];

  return (
    <section id="corridors" className="py-16 bg-[#ECEEF3] text-slate-900 border-b border-slate-300/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#A0522D] block font-mono">
            TRANSCONTINENTAL ARTERIES & STATUTORY GATES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-luxury text-slate-900">
            Strategic Cross-Border Trade Corridors
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Direct bonded multimodal passage from Pakistan deep-sea terminals across Afghanistan (Torkham & Chaman), regional Gulf feeders, and transcontinental TIR routes to Central Asia.
          </p>
        </div>

        {/* Corridor Selection & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Corridor List Selector */}
          <div className="lg:col-span-5 space-y-3">
            {TRADE_CORRIDORS.map((corridor) => {
              const isSelected = corridor.id === selectedCorridorId;
              return (
                <div
                  key={corridor.id}
                  onClick={() => setSelectedCorridorId(corridor.id)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-white border-[#B8860B] shadow-md ring-1 ring-[#B8860B]/40'
                      : 'bg-[#F8FAFC] border-slate-300 hover:border-slate-400 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-mono text-[#B45309] font-bold uppercase">
                      {corridor.code}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      corridor.category === 'Afghan Transit' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                      corridor.category === 'TIR Corridors' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                      corridor.category === 'Maritime' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                      'bg-slate-200 text-slate-800'
                    }`}>
                      {corridor.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {corridor.name}
                  </h3>
                  <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      {corridor.transitTime}
                    </span>
                    <span className="font-mono text-[11px] truncate max-w-[200px]">
                      {corridor.operatingEntity}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Corridor Route Visualizer */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono text-[#B45309] uppercase tracking-widest font-bold">
                  {selectedCorridor.code} • {selectedCorridor.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-slate-900 mt-1">
                  {selectedCorridor.name}
                </h3>
              </div>
              <div className="px-3.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-slate-200 text-right">
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Transit Est.</span>
                <span className="text-sm font-bold text-slate-900 font-mono">{selectedCorridor.transitTime}</span>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedCorridor.description}
            </p>

            {/* Origin & Destination badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Origin Port / Point</span>
                <span className="text-sm font-bold text-slate-900">{selectedCorridor.origin}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Destination Gateway</span>
                <span className="text-sm font-bold text-emerald-800">{selectedCorridor.destination}</span>
              </div>
            </div>

            {/* Checkpoints Flow */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-slate-700 tracking-wider font-bold flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-amber-700" />
                Transit Checkpoints & Customs Clearance Sequence:
              </span>
              <div className="relative pl-6 space-y-3 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-amber-600 before:via-blue-600 before:to-emerald-600">
                {selectedCorridor.keyCheckpoints.map((cp, idx) => (
                  <div key={idx} className="relative flex items-center gap-3 text-xs text-slate-700">
                    <span className="absolute -left-6 w-3 h-3 rounded-full bg-white border-2 border-amber-600" />
                    <span className="font-medium">{cp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operating Entity & CTA */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                <span className="block font-medium text-slate-700">Managing Consortium:</span>
                <span className="font-mono text-slate-900 font-bold">{selectedCorridor.operatingEntity}</span>
              </div>
              <button
                onClick={() => onQuoteCorridor(selectedCorridor.name)}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#B8860B] via-[#C59B27] to-[#A37420] hover:from-[#A37420] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Request Corridor Rate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
