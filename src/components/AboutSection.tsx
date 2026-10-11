import React, { useState } from 'react';
import { NATIONWIDE_STATIONS, CONSORTIUM_ENTITIES } from '../data/consortium';
import { CorporateClientPortfolio } from './CorporateClientPortfolio';
import { Award, ShieldCheck, MapPin, Users, CheckCircle2, ChevronRight, Building2, Phone, Mail, Globe, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onSelectServiceForQuote?: (service: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onSelectServiceForQuote }) => {
  const [selectedStation, setSelectedStation] = useState<string>(NATIONWIDE_STATIONS[0].name);

  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
      title: 'Deepwater Berth Stevedoring & Shore Cranes',
      subtitle: 'Karachi Port Trust (KPT) & Port Qasim (QICT) Operations'
    },
    {
      url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      title: 'Bonded Multi-Axle Line-Haul Fleet',
      subtitle: '2,000+ Customs-Registered Prime Movers on National Motorways'
    },
    {
      url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      title: 'Maritime Container Line & Jebel Ali Feeder',
      subtitle: 'Vantage Shipping Line Ocean Charters & Regional Slots'
    },
    {
      url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
      title: 'TIR & Afghan Transit Cross-Border Convoys',
      subtitle: 'Torkham, Chaman & Central Asian Corridors with Security Escorts'
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-[#ECEEF3] text-slate-900 border-b border-slate-300/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-300 shadow-xs text-[#A0522D] text-xs font-bold uppercase tracking-wider font-mono">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>PREMIER MULTIMODAL LOGISTICS, MARITIME & TRANSSHIPMENT CONSORTIUM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury text-slate-900 leading-tight">
            About MAK - GROUP Consortium
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
            MAK - GROUP stands at the vanguard of Pakistan and regional international trade, operating as a unified single-window consortium orchestrating four market-leading enterprises: <strong>Docks (Pvt) Ltd</strong>, <strong>Truckit (Pvt) Ltd</strong>, <strong>Muhib International (SMC-Pvt) Ltd</strong>, and <strong>Vantage Shipping Line</strong>.
          </p>
        </div>

        {/* Consortium Profile & Strategic Overview */}
        <div className="glass-pearl rounded-3xl p-8 sm:p-12 border border-white/90 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Big Highlight */}
            <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-r border-slate-200/80 pb-6 lg:pb-0 lg:pr-8 text-center lg:text-left">
              <div className="space-y-1">
                <span className="text-xs font-bold font-mono uppercase text-[#B45309] block">
                  STATUTORY CONSORTIUM ARCHITECTURE
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-950">
                  Flawless Execution Across Land, Sea & Borders
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                From pioneering deepwater vessel stevedoring at Karachi Port to creating Pakistan’s premier private customs-bonded carrier network under FBR Sections 121–123, our consortium ensures total cargo security, zero demurrage risk, and nationwide statutory clearance.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-800 shadow-2xs">
                  FBR Bonded Lic. 2012
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-800 shadow-2xs">
                  APTTA Lic. #782-PK
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-800 shadow-2xs">
                  UN TIR & IRU Accredited
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-800 shadow-2xs">
                  PSW & WeBOC Certified
                </span>
              </div>
            </div>

            {/* Right Metrics Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 text-center shadow-xs">
                <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900 block">
                  1,000+
                </span>
                <span className="text-xs font-mono uppercase text-slate-500 font-bold mt-1 block">
                  Monthly Containers
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Bonded Dry Ports Haulage</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 text-center shadow-xs">
                <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900 block">
                  2,000+
                </span>
                <span className="text-xs font-mono uppercase text-slate-500 font-bold mt-1 block">
                  Registered Fleet
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Customs-Bonded Carrier</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 text-center shadow-xs">
                <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900 block">
                  60,000+
                </span>
                <span className="text-xs font-mono uppercase text-slate-500 font-bold mt-1 block">
                  Afghan TEUs Moved
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">AzOT Torkham & Chaman</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 text-center shadow-xs">
                <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900 block">
                  200+
                </span>
                <span className="text-xs font-mono uppercase text-slate-500 font-bold mt-1 block">
                  Reefer Gensets
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">-25°C to +25°C Cold Chain</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 text-center shadow-xs">
                <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900 block">
                  600+
                </span>
                <span className="text-xs font-mono uppercase text-slate-500 font-bold mt-1 block">
                  Corporate Clients
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Fortune 500 & CPEC</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 text-center shadow-xs">
                <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900 block">
                  100%
                </span>
                <span className="text-xs font-mono uppercase text-slate-500 font-bold mt-1 block">
                  Bonded Compliance
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Zero Loss / Escort Track</span>
              </div>
            </div>

          </div>
        </div>

        {/* Complete Profile Data: The 4 Operating Consortium Companies */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A0522D] block font-mono">
              THE 4 STRATEGIC PILLARS OF MAK - GROUP
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900">
              Consortium Companies & Core Capabilities
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONSORTIUM_ENTITIES.map((company) => (
              <div
                key={company.id}
                className="glass-pearl rounded-3xl p-6 sm:p-8 border border-white/90 shadow-sm space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-slate-900 text-amber-300 text-[10px] font-mono font-bold uppercase">
                      {company.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-semibold">
                      {company.fleetCount}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold font-serif-luxury text-slate-950">
                    {company.name}
                  </h4>
                  <p className="text-xs font-bold text-[#B45309] font-mono">
                    {company.brandTag}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {company.description}
                  </p>

                  <div className="pt-2 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase font-mono text-slate-700 block">
                      Core Operations:
                    </span>
                    <ul className="space-y-1">
                      {company.specialties.slice(0, 3).map((spec, sIdx) => (
                        <li key={sIdx} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/90 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {company.keyHighlights.map((kh, khIdx) => (
                      <span key={khIdx} className="px-2 py-0.5 rounded bg-white text-[10px] font-bold text-slate-700 border border-slate-300">
                        {kh}
                      </span>
                    ))}
                  </div>
                  {onSelectServiceForQuote && (
                    <button
                      onClick={() => onSelectServiceForQuote(company.name)}
                      className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High-Fidelity Visual Photo Gallery */}
        <div id="gallery" className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A0522D] block font-mono">
              OPERATIONAL GROUND ASSETS & FACILITIES
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900">
              Visual Overview of MAK Operations
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-white/80 bg-white"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-200">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 bg-white/95">
                  <h4 className="text-xs font-bold text-slate-900 leading-snug font-serif-luxury">
                    {img.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                    {img.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 15 Strategic Nationwide Stations Grid */}
        <div id="stations" className="glass-pearl rounded-3xl p-8 sm:p-10 border border-white/90 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase text-[#B45309] block">
                15 KEY STRATEGIC STATIONS ACROSS PAKISTAN & UAE
              </span>
              <h3 className="text-2xl font-bold font-serif-luxury text-slate-900">
                Operational Office Locations & Border Clearances
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Coordinated via Karachi HQ & Dubai Liner Office
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {NATIONWIDE_STATIONS.map((station, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/90 border border-slate-200/80 hover:border-amber-400 transition shadow-2xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    {station.name}
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                    {station.role}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {station.address}
                </p>
                <div className="text-[10px] font-mono text-slate-700 flex items-center gap-2 pt-0.5">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{station.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Major Corporate Client Portfolio & Strategic Partnerships (Matches Exact Profile Layout) */}
        <CorporateClientPortfolio />

      </div>
    </section>
  );
};
