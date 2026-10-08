import React from 'react';
import { ConsortiumEmblem } from './ConsortiumEmblem';
import { MapPin, Phone, Mail, Lock, ExternalLink, Package, Truck } from 'lucide-react';

interface FooterProps {
  onOpenQuote: () => void;
  onOpenTransporter: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote, onOpenTransporter, onOpenAdmin }) => {
  return (
    <footer className="bg-gradient-to-b from-[#EAEFF6] via-[#E2E8F0] to-[#DAE1EC] text-slate-700 border-t border-slate-300 text-xs">
      
      {/* Upper Footer: Headquarters & Global Desks */}
      <div className="border-b border-slate-300/80 py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="glass-pearl p-4 rounded-xl border border-white/80 space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
              <h4 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-[11px]">
                Karachi Central Head Office
              </h4>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Office No: 14, 1st Floor, State Life Building No 7, G-Allana Road, Tower, Karachi, Pakistan.
            </p>
            <div className="text-slate-800 pt-1 font-mono font-semibold space-y-0.5">
              <p>+92-21-32330103</p>
              <p>+92-21-32330104</p>
            </div>
          </div>

          <div className="glass-pearl p-4 rounded-xl border border-white/80 space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-700 shrink-0" />
              <h4 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-[11px]">
                Dubai / UAE Regional Center
              </h4>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Vantage Shipping Line FZE, Shipping Tower, Al Mina Road, Jebel Ali Free Zone (JAFZA) South, Dubai, UAE.
            </p>
            <div className="text-slate-800 pt-1 font-mono font-semibold">
              <p>+971 (4) 880-7711</p>
              <p className="text-[10px] text-slate-500 font-normal">NVOCC Slot Allocations</p>
            </div>
          </div>

          <div className="glass-pearl p-4 rounded-xl border border-white/80 space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
              <h4 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-[11px]">
                Afghan Transit & Border Desks
              </h4>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Muhib International Complex, Torkham Border Terminal (KP) & Chaman Custom Dry Port (Balochistan).
            </p>
            <div className="text-slate-800 pt-1 font-mono font-semibold">
              <p>Direct: 03218496006</p>
              <p className="text-[10px] text-slate-500 font-normal">TIR Carnet & Security Escorts</p>
            </div>
          </div>

          <div className="glass-pearl p-4 rounded-xl border border-white/80 space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
              <h4 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-[11px]">
                National Haulage Command (Truckit)
              </h4>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              National Dispatch Center, Motorway Junction M-2 & Multan Road, Lahore Hub, Pakistan.
            </p>
            <div className="text-slate-800 pt-1 font-mono font-semibold">
              <p>+92-42-3759900</p>
              <p className="text-[10px] text-slate-500 font-normal">2,000+ Bonded Fleet Telematics</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand Information */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <ConsortiumEmblem size={34} />
            <span className="font-serif-luxury font-bold text-base text-slate-900">
              MAK — GROUP
            </span>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed max-w-md">
            Single-window logistics command orchestrating four market-leading enterprises: <strong>Docks (Pvt) Ltd</strong>, <strong>Truckit (Pvt) Ltd</strong>, <strong>Muhib International (SMC-Pvt) Ltd</strong>, and <strong>Vantage Shipping Line</strong>. Serving industry leaders for 45+ years.
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
        </div>

        {/* Consortium Operating Entities */}
        <div className="md:col-span-3 space-y-2">
          <h5 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-xs">
            Consortium Operating Pillars
          </h5>
          <ul className="space-y-1.5 text-xs text-slate-600">
            <li>Docks (Pvt) Ltd — Bonded Carrier & Port Stevedoring</li>
            <li>Truckit (Pvt) Ltd — Nationwide Commercial Fleet</li>
            <li>Muhib International — Customs & Afghan Transit</li>
            <li>Vantage Shipping Line — Global NVOCC & Feeder</li>
          </ul>
        </div>

        {/* Quick Statutory Portals & Actions */}
        <div className="md:col-span-2 space-y-2">
          <h5 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-xs">
            Quick Statutory Links
          </h5>
          <ul className="space-y-2 text-xs text-slate-600">
            <li>
              <a
                href="https://ais-pre-uzjhn4dzdhmnrnk7f4uuiz-279269232484.asia-east1.run.app/?mode=vehicle"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-800 transition flex items-center gap-1 font-semibold text-blue-900"
              >
                <Truck className="w-3.5 h-3.5 text-blue-700" />
                <span>Check Vehicle Status</span>
                <ExternalLink className="w-3 h-3 text-blue-600" />
              </a>
              <span className="text-[10px] text-slate-400 font-mono block pl-4">vehicle.makpk.online</span>
            </li>
            <li>
              <a
                href="https://ais-pre-uzjhn4dzdhmnrnk7f4uuiz-279269232484.asia-east1.run.app/?mode=status"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-800 transition flex items-center gap-1 font-semibold text-amber-900"
              >
                <Package className="w-3.5 h-3.5 text-amber-700" />
                <span>Track Container / Consignment</span>
                <ExternalLink className="w-3 h-3 text-amber-600" />
              </a>
              <span className="text-[10px] text-slate-400 font-mono block pl-4">statue.makpk.online</span>
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
            Central Dispatch Contact
          </h5>
          <div className="glass-pearl p-3 rounded-lg border border-white space-y-1.5 text-[11px] text-slate-700">
            <span className="font-bold block text-slate-900">Official Group Email:</span>
            <a href="mailto:info@mak-group.com.pk" className="block font-mono font-bold text-[#B45309] hover:underline">
              info@mak-group.com.pk
            </a>
            <span className="text-[10px] text-slate-500 block pt-0.5">
              Phone: +92-21-32330103 / 0104
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Legal bar with Discreet Admin Button */}
      <div className="bg-[#CBD5E1]/80 border-t border-slate-300 py-3 text-center text-[11px] text-slate-600">
        <div className="max-w-[1440px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} MAK - GROUP Consortium. 45+ Years Maritime & Transshipment Excellence.</span>
          
          <div className="flex items-center gap-4">
            <span className="text-slate-500">Official Inquiries: info@mak-group.com.pk</span>
            
            {/* Discreet Admin Button - Unobtrusive lock icon at bottom edge */}
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
