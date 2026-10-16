import React, { useState } from 'react';
import { COMPREHENSIVE_SERVICES, type ComprehensiveService } from '../data/consortium';
import { ShieldCheck, Truck, Anchor, Globe, Navigation, Award, ArrowRight, Eye, CheckCircle2, ArrowLeft } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceDetail: (service: ComprehensiveService) => void;
  onRequestQuote: (serviceTitle: string) => void;
  onBack?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceDetail,
  onRequestQuote,
  onBack,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredServices = filterCategory === 'all'
    ? COMPREHENSIVE_SERVICES
    : COMPREHENSIVE_SERVICES.filter((s) => s.category.toLowerCase().includes(filterCategory.toLowerCase()));

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'Bonded Carrier':
        return <ShieldCheck className="w-5 h-5 text-[#9A6B16]" />;
      case 'Customs Clearance':
        return <Award className="w-5 h-5 text-emerald-700" />;
      case 'Maritime':
        return <Anchor className="w-5 h-5 text-sky-700" />;
      case 'TIR Transit':
        return <Globe className="w-5 h-5 text-blue-700" />;
      case 'Afghan Transit':
        return <Navigation className="w-5 h-5 text-rose-700" />;
      case 'Specialized Fleet':
        return <Truck className="w-5 h-5 text-[#9A6B16]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-slate-700" />;
    }
  };

  return (
    <section id="services" className="py-8 sm:py-14 lg:py-18 bg-[#F3F5F8] border-b border-slate-200">
      <div className="container-luxury space-y-8 sm:space-y-10 animate-fade-up">
        
        {/* Small Icon-Only Back Arrow */}
        {onBack && (
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
        )}
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#9A6B16]">
            COMPREHENSIVE SERVICE PORTFOLIO · MULTIMODAL CAPABILITIES
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold font-serif-luxury text-slate-900 leading-tight">
            End-to-End Logistics, Maritime & Customs Architecture
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
            Statutory bonded carriers and customs house clearance desks operated under FBR, IRU, and maritime authority licensing.
          </p>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {[
            { id: 'all', label: 'All Services (6)' },
            { id: 'bonded', label: 'Bonded Carrier' },
            { id: 'customs', label: 'Customs & PSW' },
            { id: 'maritime', label: 'Maritime & Liner' },
            { id: 'tir', label: 'TIR Transit' },
            { id: 'afghan', label: 'Afghan Transit' },
            { id: 'fleet', label: 'Specialized Fleet' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`min-h-[42px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer ${
                filterCategory === tab.id
                  ? 'btn-dark-luxury'
                  : 'btn-surface-luxury'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid (1 col mobile, 2 col tablet, 3 col laptop/desktop/big screen) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-7">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="card-luxury rounded-2xl p-6 2xl:p-7 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Clean Unboxed Managing Entity & Badge Metadata */}
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#FAF9F6] border border-slate-200/80 group-hover:scale-105 transition-transform">
                    {getServiceIcon(service.category)}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9A6B16] block">
                      {service.managingEntity}
                    </span>
                    <span className="text-xs font-mono text-slate-500 block mt-0.5">
                      {service.category} · {service.badge}
                    </span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-serif-luxury text-slate-900 leading-snug group-hover:text-[#9A6B16] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 line-clamp-1">
                    {service.subtitle}
                  </p>
                </div>

                {/* Readable Description */}
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {service.overview}
                </p>

                {/* Top 3 Core Points */}
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  {service.coreHighlights.slice(0, 3).map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Animated Action Buttons */}
              <div className="pt-5 border-t border-slate-100 mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => onSelectServiceDetail(service)}
                  className="btn-surface-luxury min-h-[42px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#9A6B16]" />
                  <span>Details</span>
                </button>

                <button
                  onClick={() => onRequestQuote(service.title)}
                  className="group/btn btn-gold-luxury min-h-[42px] px-4 py-2.5 rounded-xl text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Get Quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
