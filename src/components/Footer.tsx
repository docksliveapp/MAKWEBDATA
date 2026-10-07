import React from 'react';
import { Anchor, Mail, Phone, MapPin, Globe, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenQuote: () => void;
  onOpenTransporter: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote, onOpenTransporter, onOpenAdmin }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Consortium Presence Bar */}
      <div className="border-b border-slate-800/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-white uppercase tracking-wider font-mono">
                Karachi HQ (Maritime & Stevedoring)
              </h4>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Docks (Pvt) Ltd & MAK Group Tower, Marine Drive, Near KPT Head Office, Karachi 74000, Pakistan.
            </p>
            <p className="text-slate-500 mt-2 font-mono">UAN: +92 (21) 111-MAK-GRP</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <h4 className="font-bold text-white uppercase tracking-wider font-mono">
                UAE Regional Center (NVOCC)
              </h4>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Vantage Shipping Line FZE, Jebel Ali Free Zone (JAFZA) South, Dubai Maritime Hub, UAE.
            </p>
            <p className="text-slate-500 mt-2 font-mono">Direct: +971 (4) 880-7711</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <h4 className="font-bold text-white uppercase tracking-wider font-mono">
                Afghan & TIR Border Hubs
              </h4>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Muhib International Complex, Torkham Border Terminal (Khyber) & Chaman Custom Dry Port (Balochistan).
            </p>
            <p className="text-slate-500 mt-2 font-mono">Border Desk: +92 (91) 527-4400</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-white uppercase tracking-wider font-mono">
                Inland Fleet Command (Truckit)
              </h4>
            </div>
            <p className="text-slate-400 leading-relaxed">
              National Dispatch Center, Multan Road & M-2 Interchange, Lahore Industrial Hub, Pakistan.
            </p>
            <p className="text-slate-500 mt-2 font-mono">Dispatch: +92 (42) 375-9900</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-bold">
              <Anchor className="w-4 h-4" />
            </div>
            <span className="font-serif-luxury font-bold text-lg text-white">
              MAK — GROUP
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Consortium of Docks (Pvt) Ltd, Truckit, Muhib International, and Vantage Shipping Line. Unified multimodal logistics, marine terminal management, and bonded cross-border corridors.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
            <span>APTTA Lic. #782-PK</span>
            <span>•</span>
            <span>FIATA & TIR Certified</span>
          </div>
        </div>

        <div className="md:col-span-3 space-y-3">
          <h5 className="font-bold text-white uppercase tracking-wider font-mono">
            Consortium Entities
          </h5>
          <ul className="space-y-2 text-xs">
            <li><a href="#companies" className="hover:text-amber-400 transition">Docks (Pvt) Ltd — Stevedoring</a></li>
            <li><a href="#companies" className="hover:text-amber-400 transition">Truckit Logistics — Inland Haulage</a></li>
            <li><a href="#companies" className="hover:text-amber-400 transition">Muhib International — Afghan Transit</a></li>
            <li><a href="#companies" className="hover:text-amber-400 transition">Vantage Shipping Line — NVOCC</a></li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-3">
          <h5 className="font-bold text-white uppercase tracking-wider font-mono">
            Interactive Services
          </h5>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={onOpenQuote} className="hover:text-amber-400 transition text-left">
                Request Commercial Rate Quote
              </button>
            </li>
            <li>
              <button onClick={onOpenTransporter} className="hover:text-amber-400 transition text-left">
                Enroll Fleet in Transporter Network
              </button>
            </li>
            <li>
              <button onClick={onOpenAdmin} className="hover:text-amber-400 transition text-left">
                Consortium Operations Desk
              </button>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-3">
          <h5 className="font-bold text-white uppercase tracking-wider font-mono">
            Single Window
          </h5>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-[11px]">
            <span className="text-emerald-400 font-mono font-bold block">24/7 Dispatch Desk</span>
            <span className="text-slate-300 block">docks.live.app@gmail.com</span>
            <span className="text-slate-500 block">ops@makgroup.com</span>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="bg-slate-950/90 border-t border-slate-900 py-4 text-center text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} MAK - GROUP Consortium. All commercial rights reserved.</span>
          <span>Docks (Pvt) Ltd • Truckit • Muhib International • Vantage Shipping Line</span>
        </div>
      </div>
    </footer>
  );
};
