import React from 'react';
import { ConsortiumEmblem } from './ConsortiumEmblem';
import { MapPin, Mail, Lock, ExternalLink, Package, Truck } from 'lucide-react';
import type { AppPage } from './Navbar';

interface FooterProps {
  onOpenQuote: () => void;
  onOpenTransporter: () => void;
  onOpenAdmin: () => void;
  onOpenInquiry?: () => void;
  onNavigate?: (page: AppPage) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenQuote,
  onOpenTransporter,
  onOpenAdmin,
  onNavigate,
}) => {
  return (
    <footer className="bg-[#EEF2F6] text-slate-700 border-t border-slate-200 text-sm">
      
      {/* Upper Footer: Official Office Locations */}
      <div className="border-b border-slate-200/90 py-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Karachi Office */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#9A6B16] shrink-0" />
              <h4 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-xs">
                Karachi Central Office
              </h4>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">
              Office No : 13 1st Floor State Life Building No 7 G-Allana Road Tower Karachi
            </p>
            <div className="text-slate-900 pt-1 font-mono font-bold text-sm space-y-0.5">
              <p>+92-21-32330103 / +92-21-32330104</p>
            </div>
          </div>

          {/* Dubai Office */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-700 shrink-0" />
              <h4 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-xs">
                Dubai Regional Center
              </h4>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">
              Office # 304, Shipping Tower, Al Mina Road, Raffa Bur Dubai, Opposite Dubai Customs Building (Stelco building)
            </p>
            <div className="text-slate-900 pt-1 font-mono font-bold text-sm">
              <p>+971-4-570-8397</p>
            </div>
          </div>

          {/* Official Inquiries */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
              <h4 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-xs">
                Official Digital Inquiries
              </h4>
            </div>
            <div className="space-y-1 font-mono font-bold text-sm text-[#9A6B16]">
              <a href="mailto:Info@mak-group.com.pk" className="block hover:underline">
                Info@mak-group.com.pk
              </a>
            </div>
            <div className="pt-1 text-xs font-mono text-slate-600">
              Web:{' '}
              <a
                href="https://www.mak-group.com.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-900 hover:underline"
              >
                www.mak-group.com.pk
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand Information */}
        <div className="md:col-span-5 space-y-3.5">
          <div className="flex items-center gap-3">
            <ConsortiumEmblem size={48} className="h-10 sm:h-12 w-auto shrink-0" />
            <span className="font-serif-luxury font-bold text-lg text-slate-900">
              MAK — GROUP OF COMPANIES
            </span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed max-w-md">
            Single-window logistics command orchestrating nationwide bonded transit, customs brokerage, modern fleet haulage, and international cross-border trade corridors under one unified corporate command: <strong>MAK - GROUP OF COMPANIES</strong>.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-mono pt-1">
            <span>FBR Lic. 1969</span>
            <span>·</span>
            <span>APTTA Lic. #782-PK</span>
            <span>·</span>
            <span>UN TIR & IRU Member</span>
            <span>·</span>
            <span>FIATA & PIFFA</span>
          </div>

          {/* Social Media Links */}
          <div className="pt-2">
            <span className="text-xs uppercase font-mono font-bold text-slate-500 block mb-1.5">
              Official Social Handles (@makgrouppk):
            </span>
            <div className="flex flex-wrap items-center gap-2.5 text-sm">
              <a href="https://facebook.com/makgrouppk" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 font-semibold transition">Facebook</a>
              <span>·</span>
              <a href="https://instagram.com/makgrouppk" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 font-semibold transition">Instagram</a>
              <span>·</span>
              <a href="https://linkedin.com/company/makgrouppk" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 font-semibold transition">LinkedIn</a>
              <span>·</span>
              <a href="https://x.com/makgrouppk" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 font-semibold transition">X</a>
              <span>·</span>
              <a href="https://youtube.com/@makgrouppk" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 font-semibold transition">YouTube</a>
              <span>·</span>
              <a href="https://wa.me/923218496006" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 font-semibold transition">WhatsApp</a>
            </div>
          </div>
        </div>

        {/* Navigation Pages */}
        <div className="md:col-span-3 space-y-2.5">
          <h5 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-xs">
            Portals & Pages
          </h5>
          <ul className="space-y-2 text-sm text-slate-600 font-medium">
            <li>
              <button onClick={() => onNavigate?.('home')} className="hover:text-[#9A6B16] transition cursor-pointer text-left">
                Home Portal & Showcase
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate?.('services')} className="hover:text-[#9A6B16] transition cursor-pointer text-left">
                Services Portfolio
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate?.('about')} className="hover:text-[#9A6B16] transition cursor-pointer text-left">
                About Us & Corporate Profile
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate?.('corridors')} className="hover:text-[#9A6B16] transition cursor-pointer text-left">
                Trade Corridors (CPEC, TIR, Central Asia)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate?.('contact')} className="hover:text-[#9A6B16] transition cursor-pointer text-left">
                Official Contact & Global Desks
              </button>
            </li>
          </ul>
        </div>

        {/* Quick Statutory Portals & Actions */}
        <div className="md:col-span-2 space-y-2.5">
          <h5 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-xs">
            Inquiry & Status
          </h5>
          <ul className="space-y-2.5 text-sm text-slate-600">
            <li>
              <a
                href="https://status.makpk.online/?mode=vehicle"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-800 transition flex items-center gap-1.5 font-semibold text-blue-900"
              >
                <Truck className="w-4 h-4 text-blue-700" />
                <span>Vehicle Status</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
              </a>
            </li>
            <li>
              <a
                href="https://status.makpk.online/?mode=status"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#9A6B16] transition flex items-center gap-1.5 font-semibold text-[#9A6B16]"
              >
                <Package className="w-4 h-4 text-[#9A6B16]" />
                <span>Consignment Status</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#9A6B16]" />
              </a>
            </li>
            <li>
              <button onClick={onOpenQuote} className="hover:text-[#9A6B16] transition text-left cursor-pointer font-medium">
                Logistics Quotation Request
              </button>
            </li>
            <li>
              <button onClick={onOpenTransporter} className="hover:text-[#9A6B16] transition text-left cursor-pointer font-medium">
                Vehicle Registration Request
              </button>
            </li>
          </ul>
        </div>

        {/* Central Dedicated Contact Info */}
        <div className="md:col-span-2 space-y-2.5">
          <h5 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-xs">
            Central Dispatch Desks
          </h5>
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 space-y-1.5 text-xs text-slate-700 shadow-2xs">
            <span className="font-bold block text-slate-900">Official Group Email:</span>
            <a href="mailto:Info@mak-group.com.pk" className="block font-mono font-bold text-[#9A6B16] hover:underline break-all">
              Info@mak-group.com.pk
            </a>
            <span className="text-xs text-slate-600 font-mono block pt-1">
              Tel: +92-21-32330103 / 0104
            </span>
            <span className="text-xs text-slate-600 font-mono block">
              Dubai: +971-4-570-8397
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Legal Bar with Subtle Lock Icon Only (No 'Admin' Text) */}
      <div className="bg-[#E2E8F0] border-t border-slate-300/80 pt-3.5 pb-16 sm:py-3.5 text-center text-xs text-slate-600">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <span>&copy; {new Date().getFullYear()} MAK - GROUP OF COMPANIES. All Rights Reserved.</span>
          
          <div className="flex items-center justify-center gap-3">
            <span className="text-slate-600 font-mono text-xs">
              Official Inquiries: Info@mak-group.com.pk
            </span>
            
            {/* Subtle Icon-Only Admin Portal Trigger */}
            <button
              onClick={onOpenAdmin}
              aria-label="Open Login Area"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-300/70 transition cursor-pointer flex items-center justify-center"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
