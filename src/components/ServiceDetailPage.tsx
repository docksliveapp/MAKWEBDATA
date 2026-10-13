import React, { useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Award,
  ArrowRight,
  MessageCircle,
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
    <div className="min-h-screen py-8 sm:py-12 bg-[#FAF9F6] text-slate-900 animate-in fade-in duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <button
            onClick={onBack}
            className="min-h-[40px] inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold text-slate-800 transition shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#9A6B16]" />
            <span>Back to All Services</span>
          </button>

          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider truncate">
            {service.category} · MAK - GROUP
          </span>
        </div>

        {/* Main Service Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-200/90 shadow-xs space-y-6 sm:space-y-7">
          
          {/* Header Title & Unboxed Metadata */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-[#9A6B16] uppercase tracking-wider">
              <span>{service.badge}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-600">{service.managingEntity}</span>
            </div>

            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury text-slate-900 leading-snug">
              {service.title}
            </h1>

            <p className="text-xs sm:text-sm font-semibold text-[#9A6B16] font-mono leading-relaxed">
              {service.subtitle}
            </p>
          </div>

          {/* Statutory Authority Callout */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 flex items-start gap-3">
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {service.operationalMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-xl bg-[#FAF9F6] border border-slate-200/90 text-center space-y-1"
              >
                <span className="text-base sm:text-xl font-bold font-serif-luxury text-slate-900 block leading-tight">
                  {metric.value}
                </span>
                <span className="text-xs font-mono uppercase text-slate-500 font-semibold block leading-tight">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
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
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9A6B16] shrink-0 mt-2" />
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
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                    <span className="leading-relaxed">{hub}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking & Rate Quote CTA Ribbon */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block font-bold">
                Direct Dispatch & Rate Booking
              </span>
              <p className="text-xs sm:text-sm text-slate-300">
                Email: <strong className="text-white font-mono">Info@mak-group.com.pk</strong> · Tel: <strong className="text-white">+92-21-32330103</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-center">
              <a
                href="https://wa.me/923218496006"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[42px] px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => onBookService(service.title)}
                className="btn-gold-luxury min-h-[42px] px-5 py-2.5 rounded-xl text-white text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer"
              >
                <span>Request Rate Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
