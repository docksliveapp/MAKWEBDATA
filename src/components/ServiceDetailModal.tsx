import React from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, ArrowRight, Award, Zap } from 'lucide-react';
import type { ComprehensiveService } from '../data/consortium';

interface ServiceDetailModalProps {
  service: ComprehensiveService | null;
  isOpen: boolean;
  onClose: () => void;
  onBookService: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onBookService,
}) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white/95 backdrop-blur-xl border border-white/80 rounded-2xl shadow-2xl text-slate-900 my-8 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Ribbon */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#F8FAFC] via-[#ECEEF3] to-[#F1F5F9] border-b border-slate-200/90 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold uppercase tracking-wider font-mono">
                {service.badge}
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                Managed By: {service.managingEntity}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-slate-900 leading-tight">
              {service.title}
            </h3>
            <p className="text-xs text-[#B45309] font-medium font-mono">
              {service.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200/70 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Statutory Authority Callout */}
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
            <div className="text-xs text-amber-950 font-medium">
              <span className="font-bold uppercase tracking-wider font-mono block text-[10px] text-amber-800">
                Statutory Regulatory Mandate:
              </span>
              {service.statutoryAuthority}
            </div>
          </div>

          {/* Overview Paragraph */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider mb-2">
              Operational Scope & Infrastructure
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {service.overview}
            </p>
          </div>

          {/* Operational Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {service.operationalMetrics.map((metric, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200/80 text-center">
                <span className="text-lg sm:text-xl font-bold font-serif-luxury text-slate-900 block">
                  {metric.value}
                </span>
                <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold mt-0.5 block">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          {/* Core Highlights List */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider mb-3">
              Core Capabilities & Execution Specs
            </h4>
            <div className="space-y-2.5">
              {service.coreHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs & Active Hubs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80 space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-700 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                Technical & Legal Compliance:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {service.technicalSpecs.map((spec, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80 space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                Active Hubs & Terminal Desks:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {service.activeHubs.map((hub, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                    <span className="leading-tight">{hub}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-mono">
            Direct Central Desk: <strong className="text-slate-800">info@mak-group.com.pk</strong>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 text-xs font-semibold hover:bg-slate-200/60 transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookService(service.title);
              }}
              className="btn-gold-luxury px-5 py-2.5 rounded-lg text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Book / Request Quote For This Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
