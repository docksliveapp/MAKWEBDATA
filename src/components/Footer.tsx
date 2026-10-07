import React from 'react';
import { ConsortiumEmblem } from './ConsortiumEmblem';
import { MapPin, Phone, Mail, Globe, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenQuote: () => void;
  onOpenTransporter: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote, onOpenTransporter, onOpenAdmin }) => {
  return (
    <footer className="bg-[#DEE2E9] text-slate-700 border-t border-slate-300 text-xs">
      {/* Consortium Stations Bar */}
      <div id="stations" className="border-b border-slate-300 py-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#ECEEF3] p-4 rounded-xl border border-slate-300">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-amber-700" />
              <h4 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-[11px]">
                Karachi Central Port Desk
              </h4>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Docks (Pvt) Ltd & MAK Group HQ, Marine Drive, Near KPT Head Office, Karachi, Pakistan.
            </p>
            <p className="text-slate-800 mt-2 font-mono font-semibold">+92-21-32330103 / 0104</p>
          </div>

          <div className="bg-[#ECEEF3] p-4 rounded-xl border border-slate-300">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-blue-700" />
              <h4 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-[11px]">
                Dubai / UAE Regional Center
              </h4>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Vantage Shipping Line FZE, Jebel Ali Free Zone (JAFZA) South, Dubai Maritime Hub, UAE.
            </p>
            <p className="text-slate-800 mt-2 font-mono font-semibold">+971 (4) 880-7711</p>
          </div>

          <div className="bg-[#ECEEF3] p-4 rounded-xl border border-slate-300">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <h4 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-[11px]">
                Afghan & TIR Border Gates
              </h4>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Muhib International Complex, Torkham Border Terminal & Chaman Custom Dry Port.
            </p>
            <p className="text-slate-800 mt-2 font-mono font-semibold">Border Desk: 03218496806</p>
          </div>

          <div className="bg-[#ECEEF3] p-4 rounded-xl border border-slate-300">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-amber-700" />
              <h4 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-[11px]">
                Inland Haulage Command (Truckit)
              </h4>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              National Dispatch Center, Motorway Junction M-2 & Multan Road, Lahore Hub, Pakistan.
            </p>
            <p className="text-slate-800 mt-2 font-mono font-semibold">Telematics: +92-42-3759900</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <ConsortiumEmblem size={32} />
            <span className="font-serif-luxury font-bold text-base text-slate-900">
              MAK — GROUP
            </span>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed max-w-md">
            Single-window logistics consortium uniting <strong>Docks (Pvt) Ltd</strong>, <strong>Truckit (Pvt) Ltd</strong>, <strong>Muhib International (SMC-Pvt) Ltd</strong>, and <strong>Vantage Shipping Line</strong>.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono pt-1">
            <span>FBR Bonded Lic.</span>
            <span>•</span>
            <span>APTTA Lic. #782-PK</span>
            <span>•</span>
            <span>FIATA & TIR Registered</span>
          </div>
        </div>

        <div className="md:col-span-3 space-y-2">
          <h5 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-xs">
            Consortium Operating Leaders
          </h5>
          <ul className="space-y-1.5 text-xs text-slate-600">
            <li>Docks (Pvt) Ltd — Stevedoring & Terminal Handling</li>
            <li>Truckit (Pvt) Ltd — Commercial Fleet Haulage</li>
            <li>Muhib International — Afghan Transit & Customs</li>
            <li>Vantage Shipping Line — NVOCC & Ocean Feeder</li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-2">
          <h5 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-xs">
            Single Window
          </h5>
          <ul className="space-y-1.5 text-xs text-slate-600">
            <li>
              <button onClick={onOpenQuote} className="hover:text-amber-800 transition text-left cursor-pointer">
                Logistics Quotation
              </button>
            </li>
            <li>
              <button onClick={onOpenTransporter} className="hover:text-amber-800 transition text-left cursor-pointer">
                Vehicle Registration Request
              </button>
            </li>
            <li>
              <button onClick={onOpenAdmin} className="hover:text-amber-800 transition text-left cursor-pointer">
                Operations Registry
              </button>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-2">
          <h5 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-xs">
            Direct Dispatch
          </h5>
          <div className="p-3 rounded-lg bg-[#ECEEF3] border border-slate-300 space-y-1 text-[11px] text-slate-700">
            <span className="font-bold block text-slate-900">Karachi Control Desk</span>
            <span className="block font-mono">info@mak-group.com.pk</span>
            <span className="block font-mono font-semibold text-emerald-800">WhatsApp: 03218496806</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#D5DAE3] border-t border-slate-300 py-3 text-center text-[11px] text-slate-600">
        <div className="max-w-[1440px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} MAK - GROUP Consortium. All commercial rights reserved.</span>
          <span>Docks (Pvt) Ltd • Truckit • Muhib International • Vantage Shipping Line</span>
        </div>
      </div>
    </footer>
  );
};
