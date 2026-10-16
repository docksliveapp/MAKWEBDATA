import React from 'react';
import { Mail, Phone, MapPin, Globe, ArrowRight, ShieldCheck, FileText, Truck, ArrowLeft } from 'lucide-react';
import { MakOfficialLogo } from './MakOfficialLogo';

interface ContactSectionProps {
  onOpenQuote?: () => void;
  onOpenTransporter?: () => void;
  onBack?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenQuote,
  onOpenTransporter,
  onBack,
}) => {
  return (
    <section id="contact" className="py-8 sm:py-14 lg:py-18 bg-gradient-to-b from-[#FAF9F6] via-[#F3F5F8] to-[#EEF2F6] border-b border-slate-200 relative overflow-hidden">
      
      {/* Subtle Luxury Ambient Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container-luxury space-y-5 animate-fade-up">
        
        {/* Small Icon-Only Back Arrow */}
        {onBack && (
          <div className="max-w-5xl mx-auto">
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
        
        {/* Main Official Executive Contact Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-200/90 text-center space-y-8">
          
          {/* Top Uploaded Brand Logo (if uploaded via Admin Portal) */}
          <div className="flex flex-col items-center justify-center">
            <MakOfficialLogo className="h-16 sm:h-22 w-auto object-contain mx-auto drop-shadow-sm" />
          </div>

          {/* Executive Shield Emblem */}
          <div className="flex justify-center">
            <div className="w-15 h-15 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/90 border border-amber-300/80 text-[#9A6B16] flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>
          </div>

          {/* Executive Appreciation & Direct Dispatch Header */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#9A6B16] block">
              OFFICIAL GLOBAL OPERATIONS & DISPATCH DESKS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury text-slate-900 tracking-tight">
              Connect With MAK - GROUP
            </h2>
            <p className="text-sm sm:text-base font-semibold text-[#9A6B16] font-serif-luxury">
              We Appreciate Your Valuable Time & Consideration
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Your trusted single-window command for Licensed Customs Bonded Line-Haul, Transcontinental TIR Corridors, Afghan Transit Trade (APTTA / ATT), Domestic Haulage, and Global Maritime Liner Operations.
            </p>
          </div>

          {/* Direct Action Buttons on Contact Page */}
          {(onOpenQuote || onOpenTransporter) && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto pt-1">
              {onOpenQuote && (
                <button
                  onClick={onOpenQuote}
                  className="group btn-gold-luxury min-h-[46px] px-6 py-3 rounded-xl text-sm sm:text-base font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>Request Commercial Quote</span>
                  <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              )}
              {onOpenTransporter && (
                <button
                  onClick={onOpenTransporter}
                  className="group btn-surface-luxury min-h-[46px] px-6 py-3 rounded-xl text-sm sm:text-base font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4 text-[#9A6B16] shrink-0" />
                  <span>Vehicle & Fleet Registration</span>
                </button>
              )}
            </div>
          )}

          {/* Contact Details Grid (Email, Phone, Address) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left max-w-4xl mx-auto pt-2">
            
            {/* Email Card */}
            <div className="card-luxury p-5 sm:p-6 rounded-2xl space-y-2.5">
              <div className="flex items-center gap-2.5 text-[#9A6B16] font-bold text-xs sm:text-sm font-mono uppercase tracking-wider">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#9A6B16]" />
                </div>
                <span>Official Corporate Email</span>
              </div>
              <div className="pl-11 space-y-1">
                <a
                  href="mailto:Info@mak-group.com.pk"
                  className="block text-sm sm:text-base font-bold text-slate-900 hover:text-[#9A6B16] hover:underline font-mono whitespace-nowrap"
                >
                  Info@mak-group.com.pk
                </a>
                <span className="text-xs text-slate-500 block">
                  24/7 Commercial Quotation & Customs Desk
                </span>
              </div>
            </div>

            {/* Phone Card */}
            <div className="card-luxury p-5 sm:p-6 rounded-2xl space-y-2.5">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-xs sm:text-sm font-mono uppercase tracking-wider">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#9A6B16]" />
                </div>
                <span>Direct Telephone Lines</span>
              </div>
              <div className="pl-11 space-y-1 text-sm sm:text-base font-bold text-slate-900 font-mono">
                <a href="tel:+922132330103" className="block hover:text-[#9A6B16] transition whitespace-nowrap">
                  +92-21-32330103 / 0104
                </a>
                <a href="tel:+97145708397" className="block text-slate-700 hover:text-[#9A6B16] transition whitespace-nowrap">
                  +971-4-570-8397 (Dubai Hub)
                </a>
              </div>
            </div>

            {/* Address Card (Full Width) */}
            <div className="md:col-span-2 card-luxury p-5 sm:p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-xs sm:text-sm font-mono uppercase tracking-wider">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#9A6B16]" />
                </div>
                <span>Official Registered Offices</span>
              </div>
              <div className="pl-11 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div>
                  <strong className="text-slate-900 font-bold font-mono uppercase">Karachi Head Office:</strong>{' '}
                  Office No. 13, 1st Floor, State Life Building No. 7, G. Allana Road, Tower, Karachi, Pakistan
                </div>
                <div className="border-t border-slate-100 pt-2.5">
                  <strong className="text-slate-900 font-bold font-mono uppercase">Dubai Regional Center:</strong>{' '}
                  Office # 304, Shipping Tower, Al Mina Road, Raffa Bur Dubai, Opposite Dubai Customs Building (Stelco Building), UAE
                </div>
              </div>
            </div>

          </div>

          {/* Social Media Squircles & Official Web Handle */}
          <div className="pt-4 space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
              
              {/* Facebook */}
              <a
                href="https://facebook.com/makgrouppk"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook @makgrouppk"
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center font-black text-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                f
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com/makgrouppk"
                target="_blank"
                rel="noopener noreferrer"
                title="X @makgrouppk"
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                𝕏
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/923218496006"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp +92-321-8496006"
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#25D366] text-white flex items-center justify-center font-bold text-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/makgrouppk"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram @makgrouppk"
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white flex items-center justify-center font-bold text-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/makgrouppk"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn @makgrouppk"
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#0A66C2] text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                in
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@makgrouppk"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube @makgrouppk"
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#FF0000] text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                ▶
              </a>

            </div>

            {/* Username Handle & Official Website */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-1 font-mono">
              <span className="text-base sm:text-lg font-bold text-slate-900">
                @makgrouppk
              </span>
              <span className="text-slate-300">·</span>
              <a
                href="https://www.mak-group.com.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-base sm:text-lg font-bold text-[#9A6B16] hover:underline"
              >
                <Globe className="w-4 h-4 text-[#9A6B16]" />
                <span>www.mak-group.com.pk</span>
              </a>
            </div>
          </div>

          {/* Bottom Accreditation & Group Strip */}
          <div className="pt-5 border-t border-slate-200/90 text-xs font-mono font-bold text-[#9A6B16] uppercase tracking-widest flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>MAK - GROUP OF COMPANIES</span>
            <span className="text-slate-300">·</span>
            <span>MULTIMODAL LOGISTICS NETWORK</span>
            <span className="text-slate-300">·</span>
            <span>PAKISTAN & REGIONAL TRADE CORRIDORS</span>
          </div>

        </div>

      </div>
    </section>
  );
};
