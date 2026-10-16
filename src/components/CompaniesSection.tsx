import React, { useState } from 'react';
import { ArrowRight, ChevronRight, ShieldCheck, Truck, Award, Anchor } from 'lucide-react';
import { MakOfficialLogo } from './MakOfficialLogo';

interface CompaniesSectionProps {
  onSelectServiceForQuote: (serviceName: string) => void;
}

export const CompaniesSection: React.FC<CompaniesSectionProps> = ({ onSelectServiceForQuote }) => {
  const [selectedDept, setSelectedDept] = useState<string>('customs');

  const departments = [
    {
      id: 'customs',
      name: 'Customs Clearance & Bonded Carriers',
      entity: 'MAK - GROUP OF COMPANIES',
      desc: 'Statutory bonded transit carrier under FBR regulations. Single-window WeBOC and Pakistan Single Window (PSW) declaration processing across all deep-sea terminals (KICT, QICT, SAPT, PICT) and inland dry ports.',
      points: [
        'Electronic Goods Declaration (GD) automated filing',
        'Duty-unpaid bonded carrier licenses for dry port transit',
        'Custom House Agents (CHA) clearance desks at all ports',
        'Green channel compliance & rapid physical examinations',
      ],
    },
    {
      id: 'fleet',
      name: 'Inland Fleet & Heavy Haulage',
      entity: 'MAK - GROUP OF COMPANIES',
      desc: 'National heavy road freight and container haulage fleet equipped with dual-satellite GPS telematics, tamper-evident seals, and dedicated operations dispatch offices across national motorways (M-9, M-5, M-3, M-2).',
      points: [
        '2,000+ commercial prime movers & multi-axle trailers',
        'Low-bed & drop-deck specialized trailers for project cargo',
        'Thermo King temperature-controlled reefer fleet with gensets',
        'Automated geofencing & real-time transit security',
      ],
    },
    {
      id: 'afghan',
      name: 'Afghan Transit & Cross-Border',
      entity: 'MAK - GROUP OF COMPANIES',
      desc: 'Premier operator in Afghan Transit Trade (ATT) under the Afghanistan-Pakistan Transit Trade Agreement (APTTA), with dedicated transshipment yards and customs desks at Torkham and Chaman borders.',
      points: [
        'Dedicated bonded marshaling yards at Torkham & Chaman',
        'Cross-border transshipment to registered haulers',
        'Zero-delay demurrage mitigation for shipping lines',
        'Commercial & UN humanitarian cargo management',
      ],
    },
    {
      id: 'maritime',
      name: 'Maritime Liner & Ocean Forwarding',
      entity: 'MAK - GROUP OF COMPANIES',
      desc: 'Global ocean container liner operations, regional feeder rotations between Karachi and Jebel Ali (Dubai), and full stevedoring terminal husbandry at Karachi Port and Port Qasim.',
      points: [
        'Regular weekly feeder sailings Karachi ⇄ Jebel Ali / UAE',
        'Shipper Owned Container (SOC) inventory & leasing',
        'ISO Tank containers for chemical & liquid bulk transport',
        'Heavy-lift vessel berth stevedoring & crane marshalling',
      ],
    },
    {
      id: 'tir',
      name: 'TIR Transcontinental Corridors',
      entity: 'MAK - GROUP OF COMPANIES',
      desc: 'International TIR Convention transport routes connecting Pakistan seaports directly to landlocked Central Asian Republics (Uzbekistan, Tajikistan, Turkmenistan, Kazakhstan) under single customs transit carnets.',
      points: [
        'Single TIR Carnet transit without border duty deposits',
        'Karachi / Gwadar to Tashkent via Hairatan corridor',
        'Secured customs sealing recognized across transit nations',
        'End-to-end multimodal bill of lading from sea to Central Asia',
      ],
    },
  ];

  const currentDept = departments.find((d) => d.id === selectedDept) || departments[0];

  return (
    <section id="divisions" className="py-14 sm:py-20 lg:py-24 bg-[#F3F5F8] text-slate-900 border-b border-slate-200">
      <div className="container-luxury space-y-16 lg:space-y-20">
        
        {/* Section 1: 4 CORE OPERATIONAL PILLARS */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#9A6B16] block font-mono">
              MAK - GROUP OF COMPANIES · CORE INTEGRATED DIVISIONS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-[42px] font-bold font-serif-luxury text-slate-900">
              Unified Single-Window Operational Pillars
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Four specialized divisions operating under unified executive command across seaports, inland dry ports, and international borders.
            </p>
          </div>

          {/* 4 Luxury Cards Grid (1 col mobile, 2 col tablet, 4 col laptop/desktop/big screen) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 2xl:gap-6">
            
            {/* Card 1: Bonded Division */}
            <div className="card-luxury rounded-2xl p-6 2xl:p-7 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MakOfficialLogo className="h-9 sm:h-10 w-auto shrink-0" />
                  <h3 className="font-bold text-slate-900 text-base 2xl:text-lg leading-snug">
                    BONDED CARRIER DIVISION
                  </h3>
                </div>
                
                <h4 className="text-sm font-semibold text-[#9A6B16] leading-snug">
                  Customs Bonded Carrier & Regional Transit
                </h4>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Duty-unpaid bonded line-haul, TP dry ports network, and regional transit trade across Pakistan seaports and inland dry ports.
                </p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-2 font-mono">
                  <ShieldCheck className="w-4 h-4 text-[#9A6B16] shrink-0" />
                  <span>FBR Bonded Carrier Lic.</span>
                </span>
              </div>
            </div>

            {/* Card 2: Fleet Division */}
            <div className="card-luxury rounded-2xl p-6 2xl:p-7 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MakOfficialLogo className="h-9 sm:h-10 w-auto shrink-0" />
                  <h3 className="font-bold text-slate-900 text-base 2xl:text-lg leading-snug">
                    NATIONWIDE FLEET DIVISION
                  </h3>
                </div>

                <h4 className="text-sm font-semibold text-[#9A6B16] leading-snug">
                  Commercial Heavy Haulage & Cold-Chain
                </h4>

                <p className="text-sm text-slate-600 leading-relaxed">
                  2,000+ commercial prime movers, heavy drop-deck low beds, double-deck car carriers, and active refrigerated gensets.
                </p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-2 font-mono">
                  <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>2,000+ Fleet Units Nationwide</span>
                </span>
              </div>
            </div>

            {/* Card 3: Customs Division */}
            <div className="card-luxury rounded-2xl p-6 2xl:p-7 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MakOfficialLogo className="h-9 sm:h-10 w-auto shrink-0" />
                  <h3 className="font-bold text-slate-900 text-base 2xl:text-lg leading-snug">
                    CUSTOMS BROKERAGE DIVISION
                  </h3>
                </div>

                <h4 className="text-sm font-semibold text-[#9A6B16] leading-snug">
                  Customs Clearance & Regulatory Port Desks
                </h4>

                <p className="text-sm text-slate-600 leading-relaxed">
                  WeBOC/PSW electronic GD processing, assessment support, and terminal clearances at KICT, SAPT, QICT, and international borders.
                </p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-2 font-mono">
                  <Award className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Licensed Customs Clearing Agent</span>
                </span>
              </div>
            </div>

            {/* Card 4: Maritime Division */}
            <div className="card-luxury rounded-2xl p-6 2xl:p-7 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MakOfficialLogo className="h-9 sm:h-10 w-auto shrink-0" />
                  <h3 className="font-bold text-slate-900 text-base 2xl:text-lg leading-snug">
                    MARITIME & LINER DIVISION
                  </h3>
                </div>

                <h4 className="text-sm font-semibold text-[#9A6B16] leading-snug">
                  Global Maritime Liner & NVOCC Slots
                </h4>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Maritime ocean container operations, slot charter agreements on Middle East and Asia trunk routes, and scheduled feeder loops.
                </p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-2 font-mono">
                  <Anchor className="w-4 h-4 text-cyan-700 shrink-0" />
                  <span>Licensed NVOCC & Ocean Forwarder</span>
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Section 2: CATEGORIZED EXECUTIVE COMMAND HUB */}
        <div id="departments" className="pt-2">
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#9A6B16] block font-mono">
              CATEGORIZED EXECUTIVE COMMAND HUB
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury text-slate-900">
              Explore Operations by Department
            </h2>
          </div>

          {/* Interactive Department Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer ${
                  selectedDept === dept.id
                    ? 'btn-dark-luxury'
                    : 'btn-surface-luxury'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>

          {/* Department Detail Display Card */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-bold text-[#9A6B16] uppercase tracking-wider block">
                    Managing Command · {currentDept.entity}
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif-luxury text-slate-900">
                    {currentDept.name}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {currentDept.desc}
                </p>

                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono uppercase font-bold text-slate-500 block tracking-wider">
                    Operational Competencies:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentDept.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 p-3.5 rounded-xl bg-[#FAF9F6] border border-slate-200/80">
                        <ChevronRight className="w-4 h-4 text-[#9A6B16] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clean Rate Quotation Action Box (No duplicate contact details) */}
              <div className="lg:col-span-5 bg-[#FAF9F6] border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-5">
                <h4 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-3">
                  Commercial Rate & Booking Desk
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Ready to book freight, container haulage, or statutory customs clearance through <strong className="text-slate-900">{currentDept.name}</strong>? Submit a direct commercial quotation request below.
                </p>

                <button
                  onClick={() => onSelectServiceForQuote(currentDept.name)}
                  className="group btn-gold-luxury w-full min-h-[48px] py-3 px-4 rounded-xl text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>Request Rate Quote</span>
                  <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
