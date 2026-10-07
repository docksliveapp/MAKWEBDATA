import React, { useState } from 'react';
import { TRADE_CORRIDORS } from '../data/consortium';
import { Globe2, Navigation, Clock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CorridorRoutesProps {
  onQuoteCorridor: (corridorName: string) => void;
}

export const CorridorRoutes: React.FC<CorridorRoutesProps> = ({ onQuoteCorridor }) => {
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>(TRADE_CORRIDORS[0].id);

  const selectedCorridor = TRADE_CORRIDORS.find(c => c.id === selectedCorridorId) || TRADE_CORRIDORS[0];

  return (
    <section id="corridors" className="py-20 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/80 text-cyan-400 text-xs font-semibold mb-3">
              <Globe2 className="w-3.5 h-3.5" />
              CROSS-BORDER LOGISTICS ARTERIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-luxury text-white">
              Strategic Trade Corridors
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-2xl">
              From Arabian Gulf maritime feeder routes to the high mountain passes of Torkham, Chaman, and Central Asia under TIR convention.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Active Routes: <span className="text-amber-400 font-bold">18+ Bonded Corridors</span>
          </div>
        </div>

        {/* Corridor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
                      ? 'bg-slate-900 border-cyan-500 shadow-md ring-1 ring-cyan-500/50'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-mono text-cyan-400 font-bold uppercase">
                      {corridor.code}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      corridor.category === 'Afghan Transit' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                      corridor.category === 'TIR Corridors' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                      corridor.category === 'Maritime' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      {corridor.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300">
                    {corridor.name}
                  </h3>
                  <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {corridor.transitTime}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px] truncate max-w-[180px]">
                      {corridor.operatingEntity}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Corridor Route Visualizer */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  {selectedCorridor.code} • {selectedCorridor.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-white mt-1">
                  {selectedCorridor.name}
                </h3>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Transit Est.</span>
                <span className="text-sm font-bold text-amber-400 font-mono">{selectedCorridor.transitTime}</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedCorridor.description}
            </p>

            {/* Origin & Destination badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Origin Port / Point</span>
                <span className="text-sm font-bold text-white">{selectedCorridor.origin}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Destination Gateway</span>
                <span className="text-sm font-bold text-emerald-400">{selectedCorridor.destination}</span>
              </div>
            </div>

            {/* Checkpoints Flow */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-slate-400 tracking-wider font-bold flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                Transit Checkpoints & Customs Clearance Line:
              </span>
              <div className="relative pl-6 space-y-3 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-amber-500 before:to-emerald-500">
                {selectedCorridor.keyCheckpoints.map((cp, idx) => (
                  <div key={idx} className="relative flex items-center gap-3 text-xs text-slate-200">
                    <span className="absolute -left-6 w-3 h-3 rounded-full bg-slate-900 border-2 border-cyan-400" />
                    <span className="font-medium">{cp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operating Entity & CTA */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                <span className="block font-medium text-slate-300">Managed By:</span>
                <span className="font-mono text-cyan-300">{selectedCorridor.operatingEntity}</span>
              </div>
              <button
                onClick={() => onQuoteCorridor(selectedCorridor.name)}
                className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow flex items-center gap-2"
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
