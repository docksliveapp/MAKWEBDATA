import React from 'react';
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

export const CorporateClientPortfolio: React.FC = () => {
  return (
    <div className="glass-pearl rounded-3xl p-6 sm:p-10 lg:p-12 space-y-8">
      {/* Top Header Banner */}
      <div className="text-center space-y-2 border-b border-slate-200/90 pb-6">
        <span className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#9A6B16] block">
          STRATEGIC PARTNERSHIPS · BLUE-CHIP CLIENTELE · PROVEN OPERATIONAL EXCELLENCE
        </span>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury text-slate-900 tracking-tight">
          Trusted Logistics Partner for Industry Leaders & Global Conglomerates
        </h3>
      </div>

      {/* Client Trust & Track Record Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h4 className="text-lg sm:text-xl font-bold font-serif-luxury text-slate-900">
              Client Trust & Track Record
            </h4>
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
              LONG-TERM ENTERPRISE CONTRACTS
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#9A6B16]">
            <Award className="w-4 h-4 text-[#9A6B16]" />
            <span>Proven Leadership</span>
          </span>
        </div>

        {/* 5 Core Enterprise Points */}
        <div className="space-y-3.5 text-sm sm:text-base text-slate-700 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#9A6B16] mt-1 shrink-0" />
            <p>
              <strong className="text-slate-900 font-bold">Multimodal Supply Chain Reliability:</strong> Over two decades of flawless execution for Fortune 500 multinationals, bilateral CPEC megaprojects, and state institutions.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#9A6B16] mt-1 shrink-0" />
            <p>
              <strong className="text-slate-900 font-bold">Global Shipping Lines Integration:</strong> Preferred carrier and agent for Maersk Line, Sinotrans, and international liner slot allocations with zero demurrage incidents.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#9A6B16] mt-1 shrink-0" />
            <p>
              <strong className="text-slate-900 font-bold">UN Humanitarian & Relief Operations:</strong> Trusted turnkey food aid transport for the United Nations World Food Programme (WFP) across Pakistan and Afghanistan.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#9A6B16] mt-1 shrink-0" />
            <p>
              <strong className="text-slate-900 font-bold">Energy & Industrial Kilns:</strong> Over-dimensional haulage for Attock Refinery, China Power Hub Generation (CPHGC), and China Metallurgical Group (MCC).
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#9A6B16] mt-1 shrink-0" />
            <p>
              <strong className="text-slate-900 font-bold">Zero-Defect Safety Protocol:</strong> Comprehensive transit insurance, 3-tier tamper seals, and satellite telemetry protecting high-value automotive, tech, and retail cargo.
            </p>
          </div>
        </div>

        {/* 3 Metrics Callouts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-center">
          <div className="card-luxury p-4 sm:p-5 rounded-xl">
            <span className="text-3xl font-extrabold font-serif-luxury text-slate-900 block">
              600+
            </span>
            <span className="text-xs font-mono font-bold text-[#9A6B16] uppercase tracking-wider block mt-1">
              Corporate Accounts
            </span>
          </div>

          <div className="card-luxury p-4 sm:p-5 rounded-xl">
            <span className="text-3xl font-extrabold font-serif-luxury text-[#9A6B16] block">
              99.8%
            </span>
            <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider block mt-1">
              On-Time Delivery
            </span>
          </div>

          <div className="card-luxury p-4 sm:p-5 rounded-xl">
            <span className="text-3xl font-extrabold font-serif-luxury text-slate-900 block">
              100%
            </span>
            <span className="text-xs font-mono font-bold text-[#9A6B16] uppercase tracking-wider block mt-1">
              Cargo Security Ratio
            </span>
          </div>
        </div>
      </div>

      {/* Major Corporate Client Portfolio - 20 Logos Grid */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h4 className="text-lg sm:text-xl font-bold font-serif-luxury text-slate-900">
              Major Corporate Client Portfolio
            </h4>
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
              CROSS-SECTOR LOGISTICS OPERATIONS EXECUTED BY MAK - GROUP
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-blue-800">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Blue-Chip Partners</span>
          </span>
        </div>

        {/* 20 Client Logos Display (Responsive across Mobile, Tablet, Laptop, Desktop & Big Screens) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
          
          {/* 1. Haier */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#005A9C] font-sans group-hover:scale-105 transition-transform">
              Haier
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">Appliances Logistics</span>
          </div>

          {/* 2. SAMSUNG */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-lg sm:text-xl font-black tracking-wider text-[#034EA2] group-hover:scale-105 transition-transform">
              SAMSUNG
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">Electronics Supply Chain</span>
          </div>

          {/* 3. HONDA */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-lg sm:text-xl font-extrabold text-[#E4002B] tracking-wider group-hover:scale-105 transition-transform">
              HONDA
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">Automotive Units</span>
          </div>

          {/* 4. NLC */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:scale-105 transition-transform">
              NLC
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">National Logistics Cell</span>
          </div>

          {/* 5. UNITRANS */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-base sm:text-lg font-black text-[#1E3A8A] tracking-wider group-hover:scale-105 transition-transform">
              UNITRANS
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">Global Freight Routing</span>
          </div>

          {/* 6. MCC */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-lg sm:text-xl font-black text-red-700 tracking-wider group-hover:scale-105 transition-transform">
              MCC
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">China Metallurgical Corp</span>
          </div>

          {/* 7. INDUS HOSPITAL */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-sm sm:text-base font-black text-[#DC2626] tracking-wider group-hover:scale-105 transition-transform">
              INDUS HOSPITAL
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">Medical Relief Cargo</span>
          </div>

          {/* 8. Mobilink */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight group-hover:scale-105 transition-transform">
              Mobilink
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">Telecom Infrastructure</span>
          </div>

          {/* 9. dnata */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-xl sm:text-2xl font-black text-[#00A3E0] tracking-tight group-hover:scale-105 transition-transform">
              dnata
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">Air & Ground Handling</span>
          </div>

          {/* 10. PEPSICO */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-lg sm:text-xl font-black text-[#004B93] tracking-widest uppercase group-hover:scale-105 transition-transform">
              PEPSICO
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">Beverage Distribution</span>
          </div>

          {/* 11. MAERSK */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-base sm:text-lg font-black text-slate-900 tracking-wider group-hover:scale-105 transition-transform">
              MAERSK
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">Global Shipping Line</span>
          </div>

          {/* 12. POWER CEMENT */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-wider group-hover:scale-105 transition-transform">
              POWER CEMENT
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">Bulk Clinker & Freight</span>
          </div>

          {/* 13. CPHGC */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-base sm:text-lg font-black text-emerald-800 tracking-wider group-hover:scale-105 transition-transform">
              CPHGC
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">China Power Hub Gen.</span>
          </div>

          {/* 14. WFP */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-base sm:text-lg font-black text-blue-900 tracking-wider group-hover:scale-105 transition-transform">
              UN WFP
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">World Food Programme</span>
          </div>

          {/* 15. PROCON */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-base sm:text-lg font-black text-[#107C41] tracking-wider group-hover:scale-105 transition-transform">
              PROCON
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">Automotive Engineering</span>
          </div>

          {/* 16. SUPREME */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-base sm:text-lg font-black text-[#1E3A8A] tracking-wider group-hover:scale-105 transition-transform">
              SUPREME
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">Global Service Solutions</span>
          </div>

          {/* 17. ZONG */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-xl sm:text-2xl font-black tracking-wider text-emerald-700 group-hover:scale-105 transition-transform">
              ZONG 4G
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">China Mobile Telecom</span>
          </div>

          {/* 18. ALLCO */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-base sm:text-lg font-black text-[#2E7D32] tracking-wider group-hover:scale-105 transition-transform">
              ALLCO
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">Industrial Packaging</span>
          </div>

          {/* 19. ARL */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-base sm:text-lg font-black text-emerald-800 tracking-wider group-hover:scale-105 transition-transform">
              ARL REFINERY
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">Attock Refinery Ltd</span>
          </div>

          {/* 20. SINOTRANS */}
          <div className="card-luxury h-26 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-sm sm:text-base font-black text-red-700 tracking-wider group-hover:scale-105 transition-transform">
              SINOTRANS & CSC
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-1">Sino-Pak Intermodal</span>
          </div>

        </div>

        {/* Contract Excellence Banner */}
        <div className="mt-6 p-4 sm:p-5 rounded-xl bg-[#FAF9F6] border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="space-y-0.5">
            <span className="font-mono font-bold text-[#9A6B16] uppercase tracking-wider block text-xs">
              CONTRACT EXCELLENCE & SLA ASSURANCE
            </span>
            <p className="text-slate-600">
              Full NDA, HSE compliance, statutory audit accreditation, and long-term service level agreements (SLAs) across public & private sectors.
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-[#9A6B16] whitespace-nowrap self-start sm:self-auto border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-4">
            MAK — GROUP OF COMPANIES
          </div>
        </div>
      </div>
    </div>
  );
};
