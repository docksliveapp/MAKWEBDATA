import React, { useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Award,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import type { ComprehensiveService } from '../data/consortium';

interface ServiceDetailPageProps {
  service: ComprehensiveService;
  onBack: () => void;
  onBookService: (serviceTitle: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onBack,
  onBookService,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [service]);

  return (
    <div className="min-h-screen py-6 sm:py-10 bg-[#FAF9F6] text-slate-900 animate-fade-up">
      <div className="container-luxury max-w-5xl space-y-4 sm:space-y-6">
        
        {/* Small Icon-Only Back Arrow Button */}
        <div>
          <button
            onClick={onBack}
            aria-label="Go Back"
            title="Back"
            className="w-9 h-9 rounded-full bg-white hover:bg-[#FAF9F6] border border-slate-200/90 hover:border-[#B8860B] text-slate-700 hover:text-[#9A6B16] shadow-2xs flex items-center justify-center transition-all hover:-translate-x-0.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Main Service Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-9 lg:p-11 border border-slate-200/90 shadow-sm space-y-6 sm:space-y-8">
          
          {/* Header Title & Unboxed Metadata */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-[#9A6B16] uppercase tracking-wider">
              <span>{service.badge}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-600">{service.managingEntity}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury text-slate-900 leading-snug">
              {service.title}
            </h1>

            <p className="text-xs sm:text-sm font-semibold text-[#9A6B16] font-mono leading-relaxed">
              {service.subtitle}
            </p>
          </div>

          {/* Statutory Authority Callout */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#9A6B16] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-800">
              <span className="font-bold uppercase tracking-wider font-mono block text-xs text-[#9A6B16] mb-0.5">
                Statutory Regulatory Mandate:
              </span>
              {service.statutoryAuthority}
            </div>
          </div>

          {/* Operational Scope & Infrastructure */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider block">
              Operational Scope & Infrastructure
            </span>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {service.overview}
            </p>
          </div>

          {/* Operational Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-1">
            {service.operationalMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="card-luxury p-4 rounded-xl text-center space-y-1"
              >
                <span className="text-lg sm:text-xl font-bold font-serif-luxury text-slate-900 block leading-tight">
                  {metric.value}
                </span>
                <span className="text-xs font-mono uppercase text-[#9A6B16] font-semibold block leading-tight">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          {/* Core Highlights List */}
          <div className="space-y-2.5 pt-1">
            <span className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider block">
              Core Capabilities & Execution Specs
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.coreHighlights.map((hl, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 p-3.5 rounded-xl bg-[#FAF9F6] border border-slate-200/80"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs & Active Hubs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-slate-200/90 space-y-3">
              <span className="text-xs sm:text-sm font-mono font-bold uppercase text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
                <Award className="w-4 h-4 text-[#9A6B16]" />
                Technical & Legal Compliance
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                {service.technicalSpecs.map((spec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#9A6B16] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-slate-200/90 space-y-3">
              <span className="text-xs sm:text-sm font-mono font-bold uppercase text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
                <MapPin className="w-4 h-4 text-blue-700" />
                Active Hubs & Terminal Desks
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                {service.activeHubs.map((hub, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{hub}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Clean Rate Quote Action Bar (No duplicate contact details) */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end">
            <button
              onClick={() => onBookService(service.title)}
              className="group btn-gold-luxury min-h-[44px] px-6 py-2.5 rounded-xl text-white text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer"
            >
              <span>Request Rate Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
