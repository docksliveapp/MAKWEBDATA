import React, { useState } from 'react';
import { COMPREHENSIVE_SERVICES, type ComprehensiveService } from '../data/consortium';
import { ShieldCheck, Truck, Anchor, Globe, Navigation, Award, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceDetail: (service: ComprehensiveService) => void;
  onRequestQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceDetail,
  onRequestQuote,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredServices = filterCategory === 'all'
    ? COMPREHENSIVE_SERVICES
    : COMPREHENSIVE_SERVICES.filter(s => s.category.toLowerCase().includes(filterCategory.toLowerCase()));

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'Bonded Carrier':
        return <ShieldCheck className="w-5 h-5 text-amber-700" />;
      case 'Customs Clearance':
        return <Award className="w-5 h-5 text-emerald-700" />;
      case 'Maritime':
        return <Anchor className="w-5 h-5 text-sky-700" />;
      case 'TIR Transit':
        return <Globe className="w-5 h-5 text-blue-700" />;
      case 'Afghan Transit':
        return <Navigation className="w-5 h-5 text-rose-700" />;
      case 'Specialized Fleet':
        return <Truck className="w-5 h-5 text-amber-600" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-slate-700" />;
    }
  };

  return (
    <section id="services" className="py-16 md:py-22 bg-[#F4F6F9] border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.16em] text-[#9A6B16]">
            COMPREHENSIVE SERVICE PORTFOLIO · MULTIMODAL END-TO-END CAPABILITIES
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold font-serif-luxury text-slate-900 leading-tight">
            End-to-End Logistics, Maritime & Customs Architecture
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Statutory bonded carriers and customs house clearance desks operated under strict FBR, IRU, and maritime authority licensing. Select any service to view its complete technical specifications and network routes.
          </p>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {[
            { id: 'all', label: 'All Services (6)' },
            { id: 'bonded', label: 'Bonded Carrier Line-Haul' },
            { id: 'customs', label: 'Customs Clearance & PSW' },
            { id: 'maritime', label: 'Maritime & Liner Slots' },
            { id: 'tir', label: 'International TIR Transit' },
            { id: 'afghan', label: 'Afghan Transit (AzOT)' },
            { id: 'fleet', label: 'Specialized Road Fleet' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`min-h-[42px] px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                filterCategory === tab.id
                  ? 'btn-dark-luxury shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 shadow-2xs'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid (6 Distinct Pillars) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-slate-200/90 shadow-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group"
            >
              <div className="space-y-4">
                {/* Clean Unboxed Managing Entity & Badge Metadata */}
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#F4F6F9] border border-slate-200/80 group-hover:scale-105 transition-transform">
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
                  <h3 className="text-xl font-bold font-serif-luxury text-slate-900 leading-snug group-hover:text-[#9A6B16] transition-colors">
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
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Balanced Action Buttons: View Details & Request Rate */}
              <div className="pt-6 border-t border-slate-100 mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => onSelectServiceDetail(service)}
                  className="min-h-[42px] px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-sm font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer border border-slate-200"
                >
                  <Eye className="w-4 h-4 text-slate-600" />
                  <span>Details</span>
                </button>

                <button
                  onClick={() => onRequestQuote(service.title)}
                  className="btn-gold-luxury min-h-[42px] px-4 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Get Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Statutory Compliance Footer Notice */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 text-center max-w-4xl mx-auto space-y-1.5 shadow-2xs">
          <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider block">
            Statutory Bonded Licensing & Customs Act Governance
          </span>
          <p className="text-sm text-slate-600 leading-relaxed">
            MAK - GROUP OF COMPANIES operates under statutory FBR Customs Bonded Carrier Lic. under Sec 121–123 Customs Act 1969, Customs House Agent Lic. under Sec 207 Customs Act 1969, and APTTA / UN TIR credentials. All central logistics inquiries directed strictly to <strong className="text-slate-900 font-semibold">info@mak-group.com.pk</strong>.
          </p>
        </div>

      </div>
    </section>
  );
};
