import React from 'react';
import { HeaderGreyLogo } from './HeaderGreyLogo';
import { MapPin, Phone, Mail, Lock, ExternalLink, Package, Truck, Globe } from 'lucide-react';

interface FooterProps {
  onOpenQuote: () => void;
  onOpenTransporter: () => void;
  onOpenAdmin: () => void;
  onOpenInquiry?: () => void;
  onNavigate?: (page: 'home' | 'services' | 'about' | 'corridors' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenQuote,
  onOpenTransporter,
  onOpenAdmin,
  onOpenInquiry,
  onNavigate,
}) => {
  return (
    <footer className="bg-gradient-to-b from-[#EAEFF6] via-[#E2E8F0] to-[#DAE1EC] text-slate-700 border-t border-slate-300 text-xs">
      
      {/* Upper Footer: Official Profile Addresses Only (Karachi & Dubai) */}
      <div className="border-b border-slate-300/80 py-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Karachi Office */}
          <div className="glass-pearl p-5 rounded-2xl border border-white/80 space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
              <h4 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-[11px]">
                Karachi Central Office
              </h4>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Office No : 13 1st Floor State Life Building No 7 G-Allana Road Towe Karachi
            </p>
            <div className="text-slate-900 pt-1 font-mono font-bold space-y-0.5">
              <p>+92-21-32330103</p>
              <p>+92-21-32330104</p>
            </div>
          </div>

          {/* Dubai Office */}
          <div className="glass-pearl p-5 rounded-2xl border border-white/80 space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-700 shrink-0" />
              <h4 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-[11px]">
                Dubai Regional Center
              </h4>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Office # 304, Shipping Tower, Al Mina Road, Raffa Bur Dubai, Opposite Dubai Customs Building (Stelco building)
            </p>
            <div className="text-slate-900 pt-1 font-mono font-bold">
              <p>+971-4- 570-8397</p>
            </div>
          </div>

          {/* Official Inquiries */}
          <div className="glass-pearl p-5 rounded-2xl border border-white/80 space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
              <h4 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-[11px]">
                Official Digital Inquiries
              </h4>
            </div>
            <div className="space-y-1 font-mono font-bold text-[11px] text-[#B45309]">
              <a href="mailto:Info@mak-group.com.pk" className="block hover:underline">
                Info@mak-group.com.pk
              </a>
              <a href="mailto:Info@vantageliners.com" className="block hover:underline">
                Info@vantageliners.com
              </a>
            </div>
            <div className="pt-1 text-[11px] font-mono text-slate-700">
              Web: <a href="https://www.mak-group.com.pk" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-900 hover:underline">www.mak-group.com.pk</a>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand Information */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <HeaderGreyLogo size={36} />
            <span className="font-serif-luxury font-bold text-base text-slate-900">
              MAK — GROUP OF COMPANIES
            </span>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed max-w-md">
            Single-window logistics command orchestrating four market-leading enterprises: <strong>Docks (Pvt) Ltd</strong>, <strong>Truckit (Pvt) Ltd</strong>, <strong>Muhib International (SMC-Pvt) Ltd</strong>, and <strong>Vantage Shipping Line</strong>.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-mono pt-1">
            <span>FBR Lic. 1969</span>
            <span>•</span>
            <span>APTTA Lic. #782-PK</span>
            <span>•</span>
            <span>UN TIR & IRU Member</span>
            <span>•</span>
            <span>FIATA & PIFFA</span>
          </div>

          {/* Social Media Links with handle @makgrouppk */}
          <div className="pt-2">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1">
              Official Social Handles (@makgrouppk):
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <a href="https://facebook.com/makgrouppk" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 font-semibold transition">Facebook</a>
              <span>•</span>
              <a href="https://instagram.com/makgrouppk" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 font-semibold transition">Instagram</a>
              <span>•</span>
              <a href="https://linkedin.com/company/makgrouppk" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 font-semibold transition">LinkedIn</a>
              <span>•</span>
              <a href="https://x.com/makgrouppk" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 font-semibold transition">X</a>
              <span>•</span>
              <a href="https://youtube.com/@makgrouppk" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 font-semibold transition">YouTube</a>
              <span>•</span>
              <a href="https://wa.me/923218496006" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 font-semibold transition">WhatsApp</a>
            </div>
          </div>
        </div>

        {/* Navigation Pages */}
        <div className="md:col-span-3 space-y-2">
          <h5 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-xs">
            Distinct Portals & Pages
          </h5>
          <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
            <li>
              <button onClick={() => onNavigate?.('home')} className="hover:text-amber-800 transition cursor-pointer text-left">
                Home Portal & Showcase
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate?.('services')} className="hover:text-amber-800 transition cursor-pointer text-left">
                Services Categories (Bonded, Customs, Maritime)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate?.('about')} className="hover:text-amber-800 transition cursor-pointer text-left">
                About Us & Corporate Profile
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate?.('corridors')} className="hover:text-amber-800 transition cursor-pointer text-left">
                Trade Corridors (CPEC, TIR, Central Asia)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate?.('contact')} className="hover:text-amber-800 transition cursor-pointer text-left">
                Official Contact & Global Desks
              </button>
            </li>
          </ul>
        </div>

        {/* Quick Statutory Portals & Actions */}
        <div className="md:col-span-2 space-y-2">
          <h5 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-xs">
            Inquiry & Status
          </h5>
          <ul className="space-y-2 text-xs text-slate-600">
            <li>
              <a
                href="https://status.makpk.online/?mode=vehicle"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-800 transition flex items-center gap-1 font-semibold text-blue-900"
              >
                <Truck className="w-3.5 h-3.5 text-blue-700" />
                <span>Vehicle Status</span>
                <ExternalLink className="w-3 h-3 text-blue-600" />
              </a>
            </li>
            <li>
              <a
                href="https://status.makpk.online/?mode=status"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-800 transition flex items-center gap-1 font-semibold text-amber-900"
              >
                <Package className="w-3.5 h-3.5 text-amber-700" />
                <span>Container Status</span>
                <ExternalLink className="w-3 h-3 text-amber-600" />
              </a>
            </li>
            <li>
              <button onClick={onOpenQuote} className="hover:text-amber-800 transition text-left cursor-pointer">
                Logistics Quotation Request
              </button>
            </li>
            <li>
              <button onClick={onOpenTransporter} className="hover:text-amber-800 transition text-left cursor-pointer">
                Vehicle Registration Request
              </button>
            </li>
          </ul>
        </div>

        {/* Central Dedicated Contact Info */}
        <div className="md:col-span-2 space-y-2">
          <h5 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-xs">
            Central Dispatch Desks
          </h5>
          <div className="glass-pearl p-3 rounded-lg border border-white space-y-1.5 text-[11px] text-slate-700">
            <span className="font-bold block text-slate-900">Official Group Email:</span>
            <a href="mailto:Info@mak-group.com.pk" className="block font-mono font-bold text-[#B45309] hover:underline">
              Info@mak-group.com.pk
            </a>
            <span className="text-[10px] text-slate-700 font-mono block pt-0.5">
              Phone: +92-21-32330103 / 0104
            </span>
            <span className="text-[10px] text-slate-700 font-mono block">
              Dubai: +971-4- 570-8397
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Legal bar with Discreet Admin Button */}
      <div className="bg-[#CBD5E1]/80 border-t border-slate-300 py-3 text-center text-[11px] text-slate-600">
        <div className="max-w-[1440px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} MAK - GROUP OF COMPANIES. All Rights Reserved.</span>
          
          <div className="flex items-center gap-4">
            <span className="text-slate-500">Official Inquiries: Info@mak-group.com.pk</span>
            
            {/* Discreet Admin Button */}
            <button
              onClick={onOpenAdmin}
              aria-label="Staff Administration Portal"
              title="Consortium Administration"
              className="opacity-30 hover:opacity-100 transition-opacity p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-300/60 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
