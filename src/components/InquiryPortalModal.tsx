import React from 'react';
import { Package, Truck, FileText, ClipboardCheck, ExternalLink, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface InquiryPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
  onOpenTransporter: () => void;
}

export const InquiryPortalModal: React.FC<InquiryPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenQuote,
  onOpenTransporter,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl bg-gradient-to-b from-white via-slate-50 to-[#ECEEF3] rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 my-8 text-slate-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Inquiry Portal"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>MAK — GROUP CENTRAL INQUIRY HUB</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-950">
            Inquiry & Operational Services
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Select an operational inquiry below for instant live tracking, transporter onboarding, or tailored multimodal logistics quotes.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* 1. Container Tracking */}
          <a
            href="https://status.makpk.online/?mode=status"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 group-hover:scale-105 transition-transform">
                  <Package className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 font-mono">
                  LIVE PORTAL <ExternalLink className="w-3 h-3" />
                </span>
              </div>
              <div>
                <h4 className="font-serif-luxury font-bold text-base text-slate-900 group-hover:text-amber-800 transition-colors">
                  Container Status
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Real-time consignment tracking across coastal ports (KICT, SAPT, QICT) and up-country bonded dry ports.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800">
              <span>status.makpk.online/?mode=status</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* 2. Vehicle Verification */}
          <a
            href="https://status.makpk.online/?mode=vehicle"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800 group-hover:scale-105 transition-transform">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 font-mono">
                  LIVE PORTAL <ExternalLink className="w-3 h-3" />
                </span>
              </div>
              <div>
                <h4 className="font-serif-luxury font-bold text-base text-slate-900 group-hover:text-blue-800 transition-colors">
                  Vehicle Status
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Instant GPS telematics and customs registration status verification for 2,000+ bonded fleet units.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-800">
              <span>status.makpk.online/?mode=vehicle</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* 3. Vehicle Registration Request */}
          <button
            onClick={() => {
              onClose();
              onOpenTransporter();
            }}
            className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left cursor-pointer"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 group-hover:scale-105 transition-transform">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-emerald-700 font-mono">
                  FLEET ONBOARDING
                </span>
              </div>
              <div>
                <h4 className="font-serif-luxury font-bold text-base text-slate-900 group-hover:text-emerald-800 transition-colors">
                  Vehicle Registration Request
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Register prime movers, trailers, and specialized units into the MAK Consortium carrier registry network.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>Open Registration Form</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 4. Logistics Quotation Request */}
          <button
            onClick={() => {
              onClose();
              onOpenQuote();
            }}
            className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left cursor-pointer"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-amber-700 font-mono">
                  INSTANT QUOTE
                </span>
              </div>
              <div>
                <h4 className="font-serif-luxury font-bold text-base text-slate-900 group-hover:text-amber-800 transition-colors">
                  Logistics Quotation
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Comprehensive freight rate calculator for bonded transit, ocean slots, Afghan transit, and TIR overland convoys.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800">
              <span>Open Quotation Calculator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

        </div>

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>Need immediate assistance? Central Operations Desk: <strong className="text-slate-800">+92-21-32330103 / 0104</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold cursor-pointer text-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
