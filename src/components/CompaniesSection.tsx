import React, { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
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
      desc: 'Statutory bonded transit carrier under FBR regulations. Single-window WeBOC and Pakistan Single Window (PSW) declaration processing across all terminals (KICT, QICT, SAPT, PICT) and upcountry inland dry ports.',
      points: [
        'Electronic Goods Declaration (GD) automated filing',
        'Duty-unpaid bonded carrier licenses for dry port transit',
        'Custom House Agents (CHA) clearance desks',
        'Green channel compliance and rapid physical examinations'
      ]
    },
    {
      id: 'fleet',
      name: 'Inland Fleet & Heavy Haulage',
      entity: 'MAK - GROUP OF COMPANIES',
      desc: 'National heavy road freight and container haulage fleet equipped with dual-satellite GPS telematics, tamper-evident seals, and dedicated operations dispatch offices on national motorways (M-9, M-5, M-3, M-2).',
      points: [
        '1,500+ commercial prime movers and multi-axle trailers',
        'Low-bed and drop-deck specialized trailers for project cargo',
        'Thermo King temperature-controlled reefer fleet with gensets',
        'Automated geofencing and real-time transit telemetry'
      ]
    },
    {
      id: 'afghan',
      name: 'Afghan Transit & Cross-Border',
      entity: 'MAK - GROUP OF COMPANIES',
      desc: 'Unrivaled leader in Afghan Transit Trade (ATT) under the Afghanistan-Pakistan Transit Trade Agreement (APTTA). Dedicated transshipment yards and customs desks at Torkham and Chaman border stations.',
      points: [
        'Dedicated bonded marshaling yards at Torkham and Chaman',
        'Cross-border transshipment to registered haulers',
        'Zero-delay demurrage mitigation for shipping lines',
        'Commercial and humanitarian food assistance cargo management'
      ]
    },
    {
      id: 'maritime',
      name: 'Maritime Liner & Ocean Forwarding',
      entity: 'MAK - GROUP OF COMPANIES',
      desc: 'Global ocean container liner operations, regional feeder rotations between Karachi and Jebel Ali (Dubai), and full stevedoring terminal husbandry at Karachi Port and Port Qasim.',
      points: [
        'Regular weekly feeder sailings Karachi ⇄ Jebel Ali / Hamriya',
        'Shipper Owned Container (SOC) inventory and leasing',
        'ISO Tank containers for chemical and liquid bulk transport',
        'Heavy-lift vessel berth stevedoring and crane marshalling'
      ]
    },
    {
      id: 'tir',
      name: 'TIR Transcontinental Corridors',
      entity: 'MAK - GROUP OF COMPANIES',
      desc: 'International TIR Convention transport routes connecting Pakistan seaports directly to landlocked Central Asian Republics (Uzbekistan, Tajikistan, Turkmenistan) under international customs transit carnets.',
      points: [
        'Single TIR Carnet transit without intermediate border duty deposits',
        'Karachi / Gwadar to Tashkent (Uzbekistan) via Hairatan corridor',
        'Secured customs sealing recognized across all transit nations',
        'End-to-end multimodal bill of lading from sea to Central Asia'
      ]
    }
  ];

  const currentDept = departments.find(d => d.id === selectedDept) || departments[0];

  return (
    <section id="divisions" className="py-16 md:py-20 bg-[#F4F6F9] text-slate-900 border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-18">
        
        {/* Section 1: MAK - GROUP OF COMPANIES CORE DIVISIONS */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9A6B16] block font-mono">
              MAK - GROUP OF COMPANIES · CORE INTEGRATED DIVISIONS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury text-slate-900">
              Unified Single-Window Operational Pillars
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Four specialized divisions operating under unified executive command across seaports, inland dry ports, and international borders.
            </p>
          </div>

          {/* 4 Crisp White Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Card 1: Bonded Division */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MakOfficialLogo className="h-9 sm:h-10 w-auto shrink-0" />
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
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
                <span className="text-xs font-medium text-slate-600 flex items-center gap-2 font-mono">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  FBR Private Bonded Carrier Lic.
                </span>
              </div>
            </div>

            {/* Card 2: Fleet Division */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MakOfficialLogo className="h-9 sm:h-10 w-auto shrink-0" />
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
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
                <span className="text-xs font-medium text-slate-600 flex items-center gap-2 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  2,000+ Fleet Units Nationwide
                </span>
              </div>
            </div>

            {/* Card 3: Customs Division */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MakOfficialLogo className="h-9 sm:h-10 w-auto shrink-0" />
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    CUSTOMS BROKERAGE DIVISION
                  </h3>
                </div>

                <h4 className="text-sm font-semibold text-[#9A6B16] leading-snug">
                  Customs Clearance & Regulatory Port Desks
                </h4>

                <p className="text-sm text-slate-600 leading-relaxed">
                  WeBOC/PSW electronic GD processing, assessment support, port terminal clearances at KICT, SAPT, QICT, and international borders.
                </p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-slate-100">
                <span className="text-xs font-medium text-slate-600 flex items-center gap-2 font-mono">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  Licensed Customs Clearing Agent
                </span>
              </div>
            </div>

            {/* Card 4: Maritime Division */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MakOfficialLogo className="h-9 sm:h-10 w-auto shrink-0" />
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
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
                <span className="text-xs font-medium text-slate-600 flex items-center gap-2 font-mono">
                  <span className="w-2 h-2 rounded-full bg-cyan-600" />
                  Licensed NVOCC & Ocean Forwarder
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Section 2: CATEGORIZED EXECUTIVE COMMAND HUB */}
        <div id="departments" className="pt-4">
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9A6B16] block font-mono">
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
                className={`min-h-[42px] px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                  selectedDept === dept.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>

          {/* Department Detail Display Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-9 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 p-3 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                        <ChevronRight className="w-4 h-4 text-[#9A6B16] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-5">
                <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-3">
                  MAK Group Operations Desk
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Ready to book freight or clear statutory documentation through this department? Our single-window desk coordinates immediate turnaround.
                </p>
                <div className="space-y-2.5 pt-1 text-sm font-mono text-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Direct Desk Tel:</span>
                    <span className="font-bold text-slate-900">+92-21-32330103</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Operations Email:</span>
                    <span className="font-bold text-[#9A6B16]">info@mak-group.com.pk</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">WhatsApp Dispatch:</span>
                    <a
                      href="https://wa.me/923218496006"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-700 hover:underline flex items-center gap-1"
                    >
                      Direct Message
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => onSelectServiceForQuote(currentDept.name)}
                  className="btn-gold-luxury w-full min-h-[44px] py-3 px-5 rounded-xl text-white font-semibold text-sm tracking-wide transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Department Rate Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
