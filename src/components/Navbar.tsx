import React, { useState } from 'react';
import { ConsortiumEmblem } from './ConsortiumEmblem';
import { ExternalLink, Truck, Package, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenTransporter: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuote,
  onOpenTransporter,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-white/70 shadow-xs transition-all">
      {/* Top Thin Tagline */}
      <div className="border-b border-slate-200/80 px-4 py-1 text-center text-[11px] font-semibold text-slate-600 tracking-wide bg-gradient-to-r from-[#F8FAFC] via-[#ECEEF3] to-[#F8FAFC]">
        <span>MAK - GROUP | Logistics, Transshipment & Maritime Network</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Company Logo & Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              <ConsortiumEmblem size={44} className="shrink-0 group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <span className="font-serif-luxury font-extrabold tracking-wider text-xl text-slate-900 group-hover:text-amber-800 transition-colors">
                  MAK - GROUP
                </span>
                <span className="text-[10px] font-bold tracking-widest text-[#B45309] uppercase -mt-0.5 font-mono">
                  Consortium of Four Leaders
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[13px] font-semibold text-slate-700">
            <button
              onClick={() => scrollToSection('home')}
              className="hover:text-amber-800 transition-colors cursor-pointer"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection('services')}
              className="hover:text-amber-800 transition-colors cursor-pointer"
            >
              Services
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-amber-800 transition-colors cursor-pointer"
            >
              About Us (45+ Yrs)
            </button>

            <button
              onClick={() => scrollToSection('corridors')}
              className="hover:text-amber-800 transition-colors cursor-pointer"
            >
              Corridors
            </button>

            {/* Direct Link: Container Tracking */}
            <a
              href="https://ais-pre-uzjhn4dzdhmnrnk7f4uuiz-279269232484.asia-east1.run.app/?mode=status"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-200/90 flex items-center gap-1.5 text-xs font-bold transition shadow-2xs"
              title="Track Container / Consignment"
            >
              <Package className="w-3.5 h-3.5 text-amber-700" />
              <span>Container Status</span>
              <ExternalLink className="w-3 h-3 text-amber-600" />
            </a>

            {/* Direct Link: Vehicle Verification */}
            <a
              href="https://ais-pre-uzjhn4dzdhmnrnk7f4uuiz-279269232484.asia-east1.run.app/?mode=vehicle"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100/80 text-blue-900 border border-blue-200/90 flex items-center gap-1.5 text-xs font-bold transition shadow-2xs"
              title="Check Vehicle Status"
            >
              <Truck className="w-3.5 h-3.5 text-blue-700" />
              <span>Vehicle Status</span>
              <ExternalLink className="w-3 h-3 text-blue-600" />
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenTransporter}
              className="px-3.5 py-2 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition hover:shadow-xs cursor-pointer"
            >
              Vehicle Registration Request
            </button>

            <button
              onClick={onOpenQuote}
              className="btn-gold-luxury px-4 py-2 text-xs font-bold text-white rounded-lg shadow-sm cursor-pointer uppercase tracking-wider"
            >
              Logistics Quotation
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="btn-gold-luxury px-3 py-1.5 text-xs font-bold text-white rounded-lg"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-pearl border-b border-slate-300 px-4 py-5 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3 font-semibold text-sm text-slate-800">
            <button onClick={() => scrollToSection('home')} className="text-left py-1 hover:text-amber-800">Home</button>
            <button onClick={() => scrollToSection('services')} className="text-left py-1 hover:text-amber-800">Services (Bonded & Customs)</button>
            <button onClick={() => scrollToSection('about')} className="text-left py-1 hover:text-amber-800">About Us (45+ Years Legacy)</button>
            <button onClick={() => scrollToSection('corridors')} className="text-left py-1 hover:text-amber-800">Trade Corridors</button>
            <button onClick={() => scrollToSection('gallery')} className="text-left py-1 hover:text-amber-800">Visual Gallery</button>
            <button onClick={() => scrollToSection('stations')} className="text-left py-1 hover:text-amber-800">15 Stations & Hubs</button>
          </div>

          <div className="pt-3 border-t border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              href="https://ais-pre-uzjhn4dzdhmnrnk7f4uuiz-279269232484.asia-east1.run.app/?mode=status"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Package className="w-4 h-4 text-amber-700" />
                Container Status
              </span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://ais-pre-uzjhn4dzdhmnrnk7f4uuiz-279269232484.asia-east1.run.app/?mode=vehicle"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-blue-50 border border-blue-300 text-blue-900 text-xs font-bold flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue-700" />
                Vehicle Status
              </span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenTransporter(); }}
              className="p-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold text-center"
            >
              Vehicle Registration Request
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenQuote(); }}
              className="btn-gold-luxury p-2.5 rounded-xl text-white text-xs font-bold text-center"
            >
              Logistics Quotation Request
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
