import React, { useEffect } from 'react';
import { Package, Truck, ExternalLink, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface InquiryPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote?: () => void;
  onOpenTransporter?: () => void;
}

export const InquiryPortalModal: React.FC<InquiryPortalModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] my-auto bg-[#FAF9F6] rounded-2xl border border-slate-300 shadow-2xl text-slate-900 flex flex-col overflow-hidden">
        
        {/* Sticky Top Header */}
        <div className="px-4 py-3.5 sm:px-6 sm:py-4 bg-white border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/80 text-[#9A6B16] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase text-[#9A6B16] font-bold tracking-wider block truncate">
                MAK - GROUP STATUS PORTAL
              </span>
              <h3 className="text-base sm:text-xl font-serif-luxury font-bold text-slate-900 truncate">
                Consignment & Vehicle Status
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Status Portal"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body with the 2 Status Options */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 1. Consignment Status */}
            <a
              href="https://status.makpk.online/?mode=status"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#B8860B] hover:shadow-md transition-all flex flex-col justify-between text-left"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#9A6B16]">
                    <Package className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#9A6B16] transition-colors" />
                </div>
                <div>
                  <h4 className="font-serif-luxury font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#9A6B16] transition-colors">
                    Consignment Status
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Check consignment & container status across seaports (KICT, SAPT, QICT) and up-country bonded dry ports.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#9A6B16]">
                <span>Check Consignment Status</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* 2. Vehicle Status */}
            <a
              href="https://status.makpk.online/?mode=vehicle"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between text-left"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800">
                    <Truck className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-700 transition-colors" />
                </div>
                <div>
                  <h4 className="font-serif-luxury font-bold text-base sm:text-lg text-slate-900 group-hover:text-blue-800 transition-colors">
                    Vehicle Status
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Check vehicle status, registration, and bonded fleet verification across all transit corridors.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-800">
                <span>Check Vehicle Status</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

          </div>

          {/* Footer Bar */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end">
            <button
              onClick={onClose}
              className="w-full sm:w-auto min-h-[38px] px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold cursor-pointer text-xs"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
