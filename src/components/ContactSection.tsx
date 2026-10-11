import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { HeaderGreyLogo } from './HeaderGreyLogo';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-gradient-to-b from-[#F5F7FA] via-[#ECEEF3] to-[#E5E9F0] border-t border-slate-300 relative overflow-hidden">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Official Contact Card matching IMG-20261012-WA0001.jpg */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-12 shadow-2xl border border-white/90 text-center space-y-8">
          
          {/* Top MAK GROUP OF COMPANIES Brand Typography */}
          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="flex items-center gap-3">
              <HeaderGreyLogo size={58} className="drop-shadow-sm" />
              <div className="text-left">
                <span className="font-serif-luxury font-black text-3xl sm:text-5xl text-slate-900 tracking-wider block leading-none">
                  MAK
                </span>
                <span className="text-[11px] sm:text-xs font-mono font-extrabold tracking-[0.3em] uppercase text-slate-600 block mt-1 border-t border-slate-300 pt-1">
                  GROUP OF COMPANIES
                </span>
              </div>
            </div>
          </div>

          {/* Golden Handshake Icon Badge */}
          <div className="flex justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-amber-100 to-amber-200/90 border border-amber-300 flex items-center justify-center shadow-inner text-3xl sm:text-4xl">
              🤝
            </div>
          </div>

          {/* Thank You & Appreciation Heading */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black font-serif-luxury text-slate-900 tracking-tight">
              Thank You
            </h2>
            <p className="text-sm sm:text-base font-bold text-[#8B5E14] font-serif-luxury">
              We Appreciate Your Valuable Time & Consideration
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Your trusted single-window command for Licensed Customs Bonded Line-Haul, Transcontinental TIR Corridors, Afghan Transit Trade (AzOT), Domestic Haulage, and Global Maritime Liner Operations.
            </p>
          </div>

          {/* Contact Details Grid (Email, Phone, Address) exactly from Profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left max-w-3xl mx-auto pt-2">
            
            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 shadow-2xs space-y-2 hover:border-amber-400 transition">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-xs sm:text-sm font-mono">
                <span className="text-lg">✉️</span>
                <span>Email :</span>
              </div>
              <div className="space-y-1 pl-6">
                <a
                  href="mailto:Info@mak-group.com.pk"
                  className="block text-xs sm:text-sm font-semibold text-slate-900 hover:text-amber-800 hover:underline font-mono"
                >
                  Info@mak-group.com.pk
                </a>
                <a
                  href="mailto:Info@vantageliners.com"
                  className="block text-xs sm:text-sm font-semibold text-slate-900 hover:text-amber-800 hover:underline font-mono"
                >
                  Info@vantageliners.com
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 shadow-2xs space-y-2 hover:border-amber-400 transition">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-xs sm:text-sm font-mono">
                <span className="text-lg">📞</span>
                <span>Phone :</span>
              </div>
              <div className="space-y-1 pl-6 text-xs sm:text-sm font-semibold text-slate-900 font-mono">
                <a href="tel:+922132330103" className="block hover:text-blue-800 hover:underline">
                  +92-21-32330103
                </a>
                <a href="tel:+922132330104" className="block hover:text-blue-800 hover:underline">
                  +92-21-32330104
                </a>
                <a href="tel:+97145708397" className="block hover:text-blue-800 hover:underline">
                  +971-4- 570-8397
                </a>
              </div>
            </div>

            {/* Address Card (Full Width) */}
            <div className="md:col-span-2 p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 shadow-2xs space-y-3 hover:border-red-400 transition">
              <div className="flex items-center gap-2 text-red-700 font-bold text-xs sm:text-sm font-mono">
                <span className="text-lg">📍</span>
                <span>Address :</span>
              </div>
              <div className="space-y-2.5 pl-6 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <div>
                  <strong className="text-slate-950 font-bold font-mono">Karachi:</strong>{' '}
                  Office No : 13 1st Floor State Life Building No 7 G-Allana Road Towe Karachi
                </div>
                <div className="border-t border-slate-200/80 pt-2">
                  <strong className="text-slate-950 font-bold font-mono">Dubai:</strong>{' '}
                  Office # 304, Shipping Tower, Al Mina Road, Raffa Bur Dubai, Opposite Dubai Customs Building (Stelco building)
                </div>
              </div>
            </div>

          </div>

          {/* Social Media Rounded Squircles exactly from IMG-20261012-WA0001.jpg */}
          <div className="pt-4 space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
              
              {/* Facebook */}
              <a
                href="https://facebook.com/makgrouppk"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook @makgrouppk"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center font-black text-2xl shadow-md hover:scale-110 hover:shadow-xl transition-all duration-300"
              >
                f
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com/makgrouppk"
                target="_blank"
                rel="noopener noreferrer"
                title="X @makgrouppk"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-md hover:scale-110 hover:shadow-xl transition-all duration-300"
              >
                𝕏
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/923218496006"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp 03218496006"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center font-bold text-2xl shadow-md hover:scale-110 hover:shadow-xl transition-all duration-300"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/makgrouppk"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram @makgrouppk"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white flex items-center justify-center font-bold text-2xl shadow-md hover:scale-110 hover:shadow-xl transition-all duration-300"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0A66C2] text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-md hover:scale-110 hover:shadow-xl transition-all duration-300"
              >
                in
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@makgrouppk"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube @makgrouppk"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FF0000] text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-md hover:scale-110 hover:shadow-xl transition-all duration-300"
              >
                ▶
              </a>

            </div>

            {/* Username Handle */}
            <div className="pt-2">
              <span className="text-base sm:text-lg font-black text-slate-900 tracking-wide font-mono block">
                @makgrouppk
              </span>
            </div>

            {/* Official Website with Globe */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xs shadow-xs">
                🌐
              </div>
              <a
                href="https://www.mak-group.com.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg font-extrabold text-blue-900 hover:text-amber-700 underline font-mono tracking-tight"
              >
                www.mak-group.com.pk
              </a>
            </div>

          </div>

          {/* Bottom 4 Companies Strip from Profile */}
          <div className="pt-4 border-t border-slate-200/90 text-[11px] sm:text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <span>DOCKS</span>
            <span className="text-slate-300">|</span>
            <span>TRUCKIT</span>
            <span className="text-slate-300">|</span>
            <span>MUHIB INTERNATIONAL</span>
            <span className="text-slate-300">|</span>
            <span>VANTAGE SHIPPING LINE</span>
          </div>

        </div>

      </div>
    </section>
  );
};
