import React from 'react';
import { NATIONWIDE_STATIONS, CONSORTIUM_ENTITIES } from '../data/consortium';
import { CorporateClientPortfolio } from './CorporateClientPortfolio';
import { MapPin, CheckCircle2, Phone, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onSelectServiceForQuote?: (service: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onSelectServiceForQuote }) => {
  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
      title: 'Deepwater Berth Stevedoring & Shore Cranes',
      subtitle: 'Karachi Port Trust (KPT) & Port Qasim (QICT) Operations',
    },
    {
      url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      title: 'Bonded Multi-Axle Line-Haul Fleet',
      subtitle: '2,000+ Customs-Registered Prime Movers on National Motorways',
    },
    {
      url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      title: 'Maritime Container Line & Jebel Ali Feeder',
      subtitle: 'Dedicated Ocean Charters & Regional Slot Feeders (Karachi ⇄ Dubai / UAE)',
    },
    {
      url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
      title: 'TIR & Afghan Transit Cross-Border Convoys',
      subtitle: 'Torkham, Chaman & Central Asian Corridors with Security Escorts',
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-20 bg-[#FAF9F6] text-slate-900 border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-[#9A6B16] block">
            PREMIER MULTIMODAL LOGISTICS, MARITIME & TRANSSHIPMENT GROUP
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury text-slate-900 leading-tight">
            About MAK - GROUP OF COMPANIES
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            MAK - GROUP OF COMPANIES stands at the vanguard of Pakistan and regional international trade, operating as a unified single-window organization orchestrating comprehensive bonded transit, customs brokerage, heavy road haulage, and international maritime logistics.
          </p>
        </div>

        {/* Corporate Profile & Strategic Overview */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Big Highlight */}
            <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-8 text-center lg:text-left">
              <div className="space-y-1.5">
                <span className="text-xs font-bold font-mono uppercase text-[#9A6B16] block">
                  STATUTORY CORPORATE ARCHITECTURE
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900">
                  Flawless Execution Across Land, Sea & Borders
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                From pioneering deepwater vessel stevedoring at Karachi Port to operating Pakistan’s premier private customs-bonded carrier network under FBR regulations, our group ensures total cargo security, zero demurrage risk, and nationwide statutory clearance.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1.5 pt-2 text-xs font-mono font-semibold text-slate-700">
                <span>FBR Bonded Lic.</span>
                <span className="text-slate-300">·</span>
                <span>APTTA Lic. #782-PK</span>
                <span className="text-slate-300">·</span>
                <span>UN TIR & IRU Accredited</span>
                <span className="text-slate-300">·</span>
                <span>PSW & WeBOC Certified</span>
              </div>
            </div>

            {/* Right Metrics Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200/90 text-center">
                <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900 block">
                  1,000+
                </span>
                <span className="text-xs font-mono uppercase text-slate-700 font-bold mt-1 block">
                  Monthly Containers
                </span>
                <span className="text-xs text-slate-500 mt-0.5 block">Bonded Dry Ports</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200/90 text-center">
                <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900 block">
                  2,000+
                </span>
                <span className="text-xs font-mono uppercase text-slate-700 font-bold mt-1 block">
                  Registered Fleet
                </span>
                <span className="text-xs text-slate-500 mt-0.5 block">Customs-Bonded</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200/90 text-center">
                <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900 block">
                  60,000+
                </span>
                <span className="text-xs font-mono uppercase text-slate-700 font-bold mt-1 block">
                  Afghan TEUs Moved
                </span>
                <span className="text-xs text-slate-500 mt-0.5 block">Torkham & Chaman</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200/90 text-center">
                <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900 block">
                  200+
                </span>
                <span className="text-xs font-mono uppercase text-slate-700 font-bold mt-1 block">
                  Reefer Gensets
                </span>
                <span className="text-xs text-slate-500 mt-0.5 block">-25°C Cold Chain</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200/90 text-center">
                <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900 block">
                  600+
                </span>
                <span className="text-xs font-mono uppercase text-slate-700 font-bold mt-1 block">
                  Corporate Clients
                </span>
                <span className="text-xs text-slate-500 mt-0.5 block">Multinational & CPEC</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200/90 text-center">
                <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900 block">
                  100%
                </span>
                <span className="text-xs font-mono uppercase text-slate-700 font-bold mt-1 block">
                  Bonded Compliance
                </span>
                <span className="text-xs text-slate-500 mt-0.5 block">Statutory Escort</span>
              </div>
            </div>

          </div>
        </div>

        {/* Complete Profile Data: The 4 Operating Consortium Companies */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9A6B16] block font-mono">
              THE 4 STRATEGIC DIVISIONS OF MAK - GROUP OF COMPANIES
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900">
              Core Operational Divisions & Capabilities
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONSORTIUM_ENTITIES.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-[#9A6B16] uppercase tracking-wider">
                      {company.badge}
                    </span>
                    <span className="text-slate-600">
                      {company.fleetCount}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold font-serif-luxury text-slate-900">
                    {company.name}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-[#9A6B16] font-mono">
                    {company.brandTag}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {company.description}
                  </p>

                  <div className="pt-2 space-y-1.5">
                    <span className="text-xs font-bold uppercase font-mono text-slate-700 block">
                      Core Operations:
                    </span>
                    <ul className="space-y-1.5">
                      {company.specialties.slice(0, 3).map((spec, sIdx) => (
                        <li key={sIdx} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-600">
                    {company.keyHighlights.map((kh, khIdx) => (
                      <span key={khIdx} className="px-2.5 py-1 rounded-lg bg-[#FAF9F6] border border-slate-200 font-semibold">
                        {kh}
                      </span>
                    ))}
                  </div>
                  {onSelectServiceForQuote && (
                    <button
                      onClick={() => onSelectServiceForQuote(company.name)}
                      className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#9A6B16] text-xs font-bold flex items-center gap-1 cursor-pointer transition"
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
            <span className="text-xs font-bold uppercase tracking-wider text-[#9A6B16] block font-mono">
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
                className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 border border-slate-200/90 bg-white"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-200">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h4 className="text-sm font-bold text-slate-900 leading-snug font-serif-luxury">
                    {img.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {img.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Office Locations */}
        <div id="stations" className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-[#9A6B16] block">
                STRATEGIC CORPORATE LOCATIONS & LOGISTICS HUBS
              </span>
              <h3 className="text-2xl font-bold font-serif-luxury text-slate-900">
                Official Corporate Office Locations
              </h3>
            </div>
            <span className="text-xs sm:text-sm font-mono text-slate-500">
              Karachi (Head Office) & Dubai (International Hub)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NATIONWIDE_STATIONS.map((station, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200/90 hover:border-amber-300 transition space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#9A6B16] shrink-0" />
                    {station.name}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-600 font-semibold">
                    {station.role}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {station.address}
                </p>
                <div className="text-xs font-mono text-slate-700 font-semibold flex items-center gap-2 pt-0.5">
                  <Phone className="w-3.5 h-3.5 text-[#9A6B16]" />
                  <span>{station.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Major Corporate Client Portfolio */}
        <CorporateClientPortfolio />

      </div>
    </section>
  );
};
