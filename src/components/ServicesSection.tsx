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
    <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-[#F3F5F9] via-[#EAEFF6] to-[#F3F5F9] border-b border-slate-300/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-slate-300 shadow-xs text-[#A0522D] text-[11px] font-bold uppercase tracking-wider font-mono">
            <span>OUR COMPREHENSIVE SERVICE PORTFOLIO</span>
            <span>•</span>
            <span>MULTIMODAL END-TO-END CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold font-serif-luxury text-slate-900 leading-tight">
            End-to-End Logistics, Maritime & Customs Architecture
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Statutory bonded carriers and customs house clearance desks operated under strict FBR, IRU, and maritime authority licensing. Click any service to view its complete technical specifications and network routes.
          </p>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Services (6)' },
            { id: 'bonded', label: 'Bonded Carrier (DPL)' },
            { id: 'customs', label: 'Customs Clearance (Muhib)' },
            { id: 'maritime', label: 'Maritime & Liner (Vantage)' },
            { id: 'tir', label: 'International TIR' },
            { id: 'afghan', label: 'Afghan Transit (AzOT)' },
            { id: 'fleet', label: 'Specialized Fleet (Truckit)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                filterCategory === tab.id
                  ? 'btn-dark-luxury shadow-sm'
                  : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-300/90 shadow-xs'
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
              className="glass-pearl-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              <div className="space-y-4">
                {/* Top Badge & Managing Entity */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-100/90 border border-slate-200/90 group-hover:scale-110 transition-transform">
                      {getServiceIcon(service.category)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B45309] block">
                        {service.managingEntity}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-slate-200/80 text-slate-700 inline-block font-mono">
                        {service.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-lg font-bold font-serif-luxury text-slate-900 leading-snug group-hover:text-amber-900 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-1 line-clamp-1">
                    {service.subtitle}
                  </p>
                </div>

                {/* Short Description */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {service.overview}
                </p>

                {/* Top 3 Core Points */}
                <div className="space-y-1.5 pt-1 border-t border-slate-200/80">
                  {service.coreHighlights.slice(0, 3).map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: View Details & Request Rate */}
              <div className="pt-6 border-t border-slate-200/80 mt-6 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onSelectServiceDetail(service)}
                  className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer border border-slate-200"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                  <span>View Details</span>
                </button>

                <button
                  onClick={() => onRequestQuote(service.title)}
                  className="btn-gold-luxury px-3 py-2.5 rounded-xl text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                >
                  <span>Quote</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Statutory Compliance Footer Notice */}
        <div className="glass-pearl rounded-2xl p-5 border border-white/90 text-center max-w-4xl mx-auto space-y-1">
          <span className="text-xs font-mono font-bold text-slate-800 uppercase block">
            Statutory Bonded Licensing & Customs Act Governance
          </span>
          <p className="text-xs text-slate-600">
            Docks (Pvt) Ltd holds FBR Customs Bonded Carrier Lic. under Sec 121–123 Customs Act 1969. Muhib International holds Customs House Agent Lic. under Sec 207 Customs Act 1969. All central logistics inquiries directed strictly to <strong className="text-slate-900 font-bold">info@mak-group.com.pk</strong>.
          </p>
        </div>

      </div>
    </section>
  );
};
