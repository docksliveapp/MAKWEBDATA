import React from 'react';
import { ShieldCheck, Award, CheckCircle2, FileCheck, Building2, Globe } from 'lucide-react';

export const CorporateClientPortfolio: React.FC = () => {
  return (
    <div className="glass-pearl rounded-3xl p-6 sm:p-10 border border-white/90 shadow-sm space-y-8">
      {/* Top Header Banner matching Profile */}
      <div className="text-center space-y-2 border-b border-slate-200/90 pb-6">
        <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#B45309] block">
          STRATEGIC PARTNERSHIPS • BLUE-CHIP CLIENTELE • PROVEN OPERATIONAL EXCELLENCE
        </span>
        <h3 className="text-2xl sm:text-4xl font-bold font-serif-luxury text-slate-950 tracking-tight">
          Trusted Logistics Partner for Industry Leaders & Global Conglomerates
        </h3>
      </div>

      {/* Client Trust & Track Record Section */}
      <div className="bg-white/95 rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h4 className="text-lg sm:text-xl font-bold font-serif-luxury text-slate-900">
              Client Trust & Track Record
            </h4>
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
              LONG-TERM ENTERPRISE CONTRACTS
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-mono font-bold tracking-wider self-start sm:self-auto">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            PROVEN LEADERSHIP
          </span>
        </div>

        {/* 5 Core Enterprise Bullets exactly from Profile */}
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#B45309] mt-2 shrink-0" />
            <p>
              <strong className="text-slate-950 font-bold">Multimodal Supply Chain Reliability:</strong> Over two decades of flawless execution for Fortune 500 multinationals, bilateral CPEC megaprojects, and state institutions.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#B45309] mt-2 shrink-0" />
            <p>
              <strong className="text-slate-950 font-bold">Global Shipping Lines Integration:</strong> Preferred carrier and agent for Maersk Line, Sinotrans, and international liner slot allocations with zero demurrage incidents.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#B45309] mt-2 shrink-0" />
            <p>
              <strong className="text-slate-950 font-bold">UN Humanitarian & Relief Operations:</strong> Trusted turnkey food aid transport for the United Nations World Food Programme (WFP) across Pakistan and Afghanistan.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#B45309] mt-2 shrink-0" />
            <p>
              <strong className="text-slate-950 font-bold">Energy & Industrial Kilns:</strong> Over-dimensional haulage for Attock Refinery, China Power Hub Generation (CPHGC), and China Metallurgical Group (MCC).
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#B45309] mt-2 shrink-0" />
            <p>
              <strong className="text-slate-950 font-bold">Zero-Defect Safety Protocol:</strong> Comprehensive transit insurance, 3-tier tamper seals, and satellite telemetry protecting high-value automotive, tech, and retail cargo.
            </p>
          </div>
        </div>

        {/* 3 Metrics Callouts from Profile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-center">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-3xl font-extrabold font-serif-luxury text-slate-900 block">
              600+
            </span>
            <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider block mt-1">
              Corporate Accounts
            </span>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80">
            <span className="text-3xl font-extrabold font-serif-luxury text-amber-900 block">
              99.8%
            </span>
            <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider block mt-1">
              On-Time Delivery
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-3xl font-extrabold font-serif-luxury text-slate-900 block">
              100%
            </span>
            <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider block mt-1">
              Cargo Security Ratio
            </span>
          </div>
        </div>
      </div>

      {/* Major Corporate Client Portfolio - 20 Logos Grid */}
      <div className="bg-white/95 rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h4 className="text-lg sm:text-xl font-bold font-serif-luxury text-slate-900">
              Major Corporate Client Portfolio
            </h4>
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
              CROSS-SECTOR LOGISTICS OPERATIONS EXECUTED BY MAK - GROUP
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-300 text-xs font-mono font-bold tracking-wider self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            BLUE-CHIP PARTNERS
          </span>
        </div>

        {/* 20 Client Logos Display (4 Rows x 5 Columns matching Profile Image) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
          
          {/* 1. Haier */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-blue-400 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#005A9C] font-sans group-hover:scale-105 transition-transform">
              Haier
            </span>
            <span className="text-[10px] text-slate-400 font-mono mt-1">Appliances Logistics</span>
          </div>

          {/* 2. SAMSUNG */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-blue-500 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <div className="px-3.5 py-1.5 rounded-full bg-[#034EA2] text-white font-black tracking-wider text-xs sm:text-sm shadow-xs group-hover:scale-105 transition-transform">
              SAMSUNG
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-1.5">Electronics Supply Chain</span>
          </div>

          {/* 3. HONDA */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-red-400 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <div className="flex flex-col items-center group-hover:scale-105 transition-transform">
              <svg width="34" height="20" viewBox="0 0 100 60" fill="none" className="text-slate-800">
                <path d="M15 10 L30 55 L42 55 L48 24 L52 24 L58 55 L70 55 L85 10 L70 10 L60 42 L55 18 L45 18 L40 42 L30 10 Z" fill="#1E293B" />
              </svg>
              <span className="text-xs sm:text-sm font-extrabold text-[#E4002B] tracking-wider mt-0.5">
                HONDA
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-0.5">Automotive Finished Units</span>
          </div>

          {/* 4. NLC (National Logistics Cell) */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-amber-500 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <div className="flex items-center gap-1.5 group-hover:scale-105 transition-transform">
              <span className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">NLC</span>
              <div className="w-5 h-5 bg-[#C05621] rounded flex items-center justify-center text-white text-[10px] font-bold">
                ▲
              </div>
            </div>
            <span className="text-[9px] text-slate-500 font-mono mt-1 font-semibold">National Logistics Cell</span>
          </div>

          {/* 5. UNITRANS */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-indigo-400 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <div className="flex items-center gap-1.5 group-hover:scale-105 transition-transform">
              <div className="w-5 h-5 rounded-full border border-indigo-700 flex items-center justify-center text-indigo-700 text-[10px] font-bold">
                u
              </div>
              <span className="text-xs sm:text-sm font-black text-[#1E3A8A] tracking-wider">
                UNITRANS
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-1">Global Freight Routing</span>
          </div>

          {/* 6. MCC (China Metallurgical Group) */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-red-500 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <div className="flex items-center gap-1.5 group-hover:scale-105 transition-transform">
              <div className="w-7 h-7 rounded-full border border-red-700 text-red-700 flex items-center justify-center text-[10px] font-extrabold">
                MCC
              </div>
              <div className="text-left">
                <span className="text-[9px] font-bold text-slate-900 block leading-tight">中国冶金科工集团</span>
                <span className="text-[8px] text-slate-500 font-mono block">China Metallurgical Corp</span>
              </div>
            </div>
            <span className="text-[9px] text-slate-400 font-mono mt-1">CPEC Heavy Projects</span>
          </div>

          {/* 7. INDUS HOSPITAL */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-red-400 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <div className="flex items-center gap-1.5 group-hover:scale-105 transition-transform">
              <div className="w-5 h-5 bg-[#DC2626] rounded-xs flex items-center justify-center text-white text-xs font-bold">
                +
              </div>
              <div className="text-left">
                <span className="text-xs font-black text-[#DC2626] tracking-wider block leading-tight">INDUS</span>
                <span className="text-[8px] font-bold text-slate-700 tracking-wider block">HOSPITAL</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-1">Medical Relief Cargo</span>
          </div>

          {/* 8. Mobilink */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-red-500 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <div className="flex items-center gap-1.5 group-hover:scale-105 transition-transform">
              <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 shadow-2xs" />
              <span className="text-sm font-extrabold text-slate-900 tracking-tight">
                Mobilink
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-1">Telecom Infrastructure</span>
          </div>

          {/* 9. dnata */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-cyan-500 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-xl sm:text-2xl font-black text-[#00A3E0] tracking-tight group-hover:scale-105 transition-transform font-sans">
              dnata
            </span>
            <span className="text-[10px] text-slate-400 font-mono mt-1">Air Cargo & Ground Handling</span>
          </div>

          {/* 10. PEPSICO */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-blue-600 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-lg sm:text-xl font-black text-[#004B93] tracking-widest uppercase group-hover:scale-105 transition-transform">
              PEPSICO
            </span>
            <span className="text-[10px] text-slate-400 font-mono mt-1">Beverage FMCG Distribution</span>
          </div>

          {/* 11. MAERSK */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-sky-400 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <div className="flex items-center gap-1.5 group-hover:scale-105 transition-transform">
              <span className="text-sky-500 text-lg">★</span>
              <span className="text-sm sm:text-base font-black text-slate-900 tracking-wider">
                MAERSK
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-1">Global Shipping Line</span>
          </div>

          {/* 12. POWER CEMENT LTD */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-slate-500 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-xs sm:text-sm font-black text-slate-900 tracking-widest block group-hover:scale-105 transition-transform">
              POWER
            </span>
            <span className="text-[9px] font-mono text-slate-500 font-bold tracking-wider">
              POWER CEMENT LTD
            </span>
            <span className="text-[9px] text-slate-400 font-mono">Bulk Clinker & Freight</span>
          </div>

          {/* 13. CPHGC */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-emerald-500 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <div className="flex items-center gap-1 group-hover:scale-105 transition-transform">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-emerald-600 border-t-red-600" />
              <span className="text-xs sm:text-sm font-black text-slate-900 tracking-wider">
                CPHGC
              </span>
            </div>
            <span className="text-[8px] text-slate-500 font-mono text-center leading-tight mt-0.5">
              China Power Hub Gen. (Pvt.)
            </span>
          </div>

          {/* 14. WFP (World Food Programme) */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-blue-400 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <div className="flex items-center gap-1 group-hover:scale-105 transition-transform">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                🌾
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold text-blue-900 block leading-tight">WFP</span>
                <span className="text-[8px] text-slate-500 font-mono">World Food Programme</span>
              </div>
            </div>
            <span className="text-[9px] text-slate-400 font-mono mt-1">UN Food Aid Corridors</span>
          </div>

          {/* 15. PROCON */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-emerald-500 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <div className="flex flex-col items-center group-hover:scale-105 transition-transform">
              <div className="px-2.5 py-0.5 rounded bg-[#107C41] text-white text-[10px] font-black tracking-wider">
                PROCON
              </div>
              <span className="text-[8px] text-slate-600 font-mono font-bold mt-0.5">
                Procon Engineering
              </span>
            </div>
            <span className="text-[9px] text-slate-400 font-mono">Industrial Automotive Parts</span>
          </div>

          {/* 16. SUPREME GLOBAL */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-blue-500 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <div className="flex items-center gap-1 group-hover:scale-105 transition-transform">
              <span className="text-blue-600 text-xs font-bold">✦</span>
              <span className="text-xs sm:text-sm font-black text-[#1E3A8A] tracking-wider">
                SUPREME
              </span>
            </div>
            <span className="text-[8px] text-slate-500 font-mono">Global Service Solutions</span>
          </div>

          {/* 17. ZONG */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-pink-500 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-xl sm:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-pink-500 to-amber-500 group-hover:scale-105 transition-transform">
              ZONG
            </span>
            <span className="text-[9px] text-slate-400 font-mono">China Mobile Telecom Grid</span>
          </div>

          {/* 18. ALLCO */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-green-600 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <span className="text-base sm:text-lg font-black text-[#2E7D32] tracking-wider group-hover:scale-105 transition-transform">
              ALLCO
            </span>
            <span className="text-[8px] text-slate-500 font-mono text-center leading-tight">
              Transfer Printers (Pvt) Ltd
            </span>
          </div>

          {/* 19. ARL (Attock Refinery) */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-emerald-600 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <div className="flex items-center gap-1 group-hover:scale-105 transition-transform">
              <span className="text-emerald-700 font-extrabold text-sm">ARL</span>
              <span className="text-[9px] font-bold text-slate-800 font-mono">Attock Refinery</span>
            </div>
            <span className="text-[8px] text-slate-400 font-mono mt-0.5">Petroleum & Heavy Crude</span>
          </div>

          {/* 20. SINOTRANS & CSC */}
          <div className="h-24 sm:h-28 rounded-2xl bg-[#FAFAFC] border border-slate-200 hover:border-red-600 hover:shadow-md transition flex flex-col items-center justify-center p-3 text-center group">
            <div className="flex flex-col items-center group-hover:scale-105 transition-transform">
              <span className="text-[10px] font-black text-red-700 tracking-wider">
                SINOTRANS & CSC
              </span>
              <span className="text-[9px] font-bold text-slate-800">
                中国外运长航
              </span>
            </div>
            <span className="text-[8px] text-slate-400 font-mono mt-0.5">Sino-Pak Intermodal Agency</span>
          </div>

        </div>

        {/* Contract Excellence Banner from Profile */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="font-mono font-bold text-[#B45309] uppercase tracking-wider block">
              CONTRACT EXCELLENCE
            </span>
            <p className="text-slate-600">
              Full NDA, HSE compliance, statutory audit accreditation, and long-term service level agreements (SLAs) across public & private sectors.
            </p>
          </div>
          <div className="text-[11px] font-mono font-bold text-slate-500 whitespace-nowrap self-start sm:self-auto border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-4">
            DOCKS • TRUCKIT • MUHIB INT. • VANTAGE
          </div>
        </div>
      </div>
    </div>
  );
};
