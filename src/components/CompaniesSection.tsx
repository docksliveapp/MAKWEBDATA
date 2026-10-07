import React, { useState } from 'react';
import { CONSORTIUM_ENTITIES } from '../data/consortium';
import { Anchor, Truck, Shield, Compass, CheckCircle2, MapPin, Award, ArrowUpRight } from 'lucide-react';

interface CompaniesSectionProps {
  onSelectServiceForQuote: (serviceName: string) => void;
}

export const CompaniesSection: React.FC<CompaniesSectionProps> = ({ onSelectServiceForQuote }) => {
  const [activeTab, setActiveTab] = useState<string>(CONSORTIUM_ENTITIES[0].id);

  const activeCompany = CONSORTIUM_ENTITIES.find(c => c.id === activeTab) || CONSORTIUM_ENTITIES[0];

  const getCompanyIcon = (id: string) => {
    switch (id) {
      case 'docks':
        return <Anchor className="w-5 h-5" />;
      case 'truckit':
        return <Truck className="w-5 h-5" />;
      case 'muhib':
        return <Shield className="w-5 h-5" />;
      case 'vantage':
        return <Compass className="w-5 h-5" />;
      default:
        return <Anchor className="w-5 h-5" />;
    }
  };

  return (
    <section id="companies" className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            FOUR SPECIALIZED PILLARS • ONE UNIFIED WINDOW
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-luxury text-white tracking-tight">
            The MAK - GROUP Consortium
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Each operating company brings decades of specialized infrastructure, bonded licensures, and ground assets—orchestrated seamlessly into a single freight pipeline.
          </p>
        </div>

        {/* Tab navigation for companies */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {CONSORTIUM_ENTITIES.map((company) => {
            const isActive = company.id === activeTab;
            return (
              <button
                key={company.id}
                onClick={() => setActiveTab(company.id)}
                className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-b from-slate-800 to-slate-950 border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    {getCompanyIcon(company.id)}
                  </div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                    {company.badge}
                  </span>
                </div>
                <div>
                  <h3 className={`text-base font-bold ${isActive ? 'text-amber-400' : 'text-slate-200'}`}>
                    {company.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {company.brandTag}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Company Showcase Card */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Company Narrative & Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-400 font-mono text-xs font-bold border border-amber-400/20">
                    {activeCompany.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Established: {activeCompany.established}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif-luxury">
                  {activeCompany.name}
                </h3>
                <p className="text-sm font-semibold text-amber-400 font-mono">
                  {activeCompany.tagline}
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeCompany.description}
              </p>

              {/* Highlights & Fleet Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {activeCompany.keyHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Operational Hubs */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Primary Hubs & Berths:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeCompany.operationalHubs.map((hub, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {hub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Core Capabilities & Quick Quote */}
            <div className="lg:col-span-5 bg-slate-900/90 rounded-xl p-6 border border-slate-800 space-y-5">
              <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-3">
                Key Operations & Multi-Modal Specs
              </h4>

              <div className="space-y-2.5">
                {activeCompany.specialties.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between group"
                  >
                    <span className="text-xs text-slate-200 font-medium">{spec}</span>
                    <button
                      onClick={() => onSelectServiceForQuote(spec)}
                      className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-0.5 opacity-80 group-hover:opacity-100 transition"
                      title="Request quotation for this service"
                    >
                      <span>Quote</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 text-center">
                <button
                  onClick={() => onSelectServiceForQuote(`${activeCompany.name} Full Services`)}
                  className="w-full py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-md"
                >
                  Book Services with {activeCompany.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
