import React, { useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Award,
  ArrowRight,
  Phone,
  Mail,
  Truck,
  MessageCircle
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
    <div className="min-h-screen py-8 sm:py-12 bg-gradient-to-b from-[#F3F5F9] via-[#EAEFF6] to-[#F3F5F9] text-slate-900 animate-in fade-in duration-200">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-300/80">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300/90 text-xs sm:text-sm font-bold text-slate-800 transition shadow-2xs cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-amber-700" />
            <span>Back to All Services</span>
          </button>

          <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-500 uppercase tracking-wider truncate">
            {service.category} • MAK - GROUP
          </span>
        </div>

        {/* Main Service Card / Header Section */}
        <div className="glass-pearl rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-white/90 shadow-sm space-y-5 sm:space-y-7">
          
          {/* Header Title & Badges */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
                {service.badge}
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-600">
                Operating Command: {service.managingEntity}
              </span>
            </div>

            {/* Responsive Heading: mobile text-lg, tablet text-2xl, desktop text-3xl */}
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold font-serif-luxury text-slate-950 leading-snug sm:leading-tight">
              {service.title}
            </h1>

            {/* Responsive Subtitle */}
            <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-[#B45309] font-mono leading-relaxed">
              {service.subtitle}
            </p>
          </div>

          {/* Statutory Authority Callout */}
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50/80 border border-amber-300/80 flex items-start sm:items-center gap-2.5 sm:gap-3">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
            <div className="text-[11px] sm:text-xs md:text-sm text-amber-950 font-medium">
              <span className="font-bold uppercase tracking-wider font-mono block text-[9px] sm:text-[11px] text-amber-800">
                Statutory Regulatory Mandate:
              </span>
              {service.statutoryAuthority}
            </div>
          </div>

          {/* Operational Scope & Infrastructure */}
          <div className="space-y-1.5 sm:space-y-2">
            <span className="text-[9px] sm:text-xs font-mono font-bold uppercase text-slate-500 tracking-wider block">
              Operational Scope & Infrastructure
            </span>
            <p className="text-[11px] sm:text-xs md:text-sm text-slate-700 leading-relaxed font-sans">
              {service.overview}
            </p>
          </div>

          {/* Operational Metrics Bar (2 columns on mobile, 4 on desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3.5 pt-1">
            {service.operationalMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-2.5 sm:p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-center space-y-0.5"
              >
                <span className="text-sm sm:text-xl font-bold font-serif-luxury text-slate-900 block leading-tight">
                  {metric.value}
                </span>
                <span className="text-[8.5px] sm:text-[11px] font-mono uppercase text-slate-500 font-semibold block leading-tight">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          {/* Core Highlights List */}
          <div className="space-y-2 sm:space-y-2.5 pt-1 sm:pt-2">
            <span className="text-[9px] sm:text-xs font-mono font-bold uppercase text-slate-500 tracking-wider block">
              Core Capabilities & Execution Specs
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {service.coreHighlights.map((hl, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-[11px] sm:text-xs md:text-sm text-slate-700 p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs & Active Hubs (1 column on mobile, 2 on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
            {/* Technical Specs Card */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 sm:space-y-2.5">
              <span className="text-[11px] sm:text-xs md:text-sm font-mono font-bold uppercase text-slate-800 flex items-center gap-1.5 sm:gap-2 border-b border-slate-100 pb-1.5 sm:pb-2">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                Technical & Legal Compliance
              </span>
              <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs md:text-sm text-slate-600">
                {service.technicalSpecs.map((spec, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 sm:gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                    <span className="leading-snug">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Active Hubs Card */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 sm:space-y-2.5">
              <span className="text-[11px] sm:text-xs md:text-sm font-mono font-bold uppercase text-slate-800 flex items-center gap-1.5 sm:gap-2 border-b border-slate-100 pb-1.5 sm:pb-2">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                Active Hubs & Terminal Desks
              </span>
              <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs md:text-sm text-slate-600">
                {service.activeHubs.map((hub, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 sm:gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                    <span className="leading-snug">{hub}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking & Rate Quote CTA Ribbon */}
          <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-amber-400 block font-bold">
                Direct Dispatch & Rate Booking
              </span>
              <p className="text-xs sm:text-sm text-slate-300">
                Contact: <strong className="text-white font-mono">info@mak-group.com.pk</strong> • Tel: <strong className="text-white">+92-21-32330103</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-center">
              <a
                href="https://wa.me/923218496006"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => onBookService(service.title)}
                className="btn-gold-luxury px-5 py-2.5 rounded-xl text-white text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-md"
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
