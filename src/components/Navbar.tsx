import React, { useState } from 'react';
import { ConsortiumEmblem } from './ConsortiumEmblem';
import { User, ChevronRight, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenTransporter: () => void;
  onOpenTracker: () => void;
  onOpenAdmin: () => void;
  onOpenSignIn: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuote,
  onOpenTransporter,
  onOpenTracker,
  onOpenAdmin,
  onOpenSignIn,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#ECEEF3]/95 backdrop-blur-md border-b border-slate-300/70 text-slate-800 transition-all">
      {/* Top Thin Tagline */}
      <div className="border-b border-slate-200/80 px-4 py-1 text-center text-[11px] font-medium text-slate-600 tracking-wide bg-[#ECEEF3]">
        <span>MAK - GROUP | Logistics, Transshipment & Maritime Network</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <ConsortiumEmblem size={38} className="shrink-0" />
              <div className="flex flex-col">
                <span className="font-serif-luxury font-extrabold tracking-wider text-lg text-slate-900 group-hover:text-amber-800 transition-colors">
                  MAK - GROUP
                </span>
                <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase -mt-0.5">
                  Consortium of Four Leaders
                </span>
              </div>
            </a>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-[13px] font-medium text-slate-700">
            <a href="#consortium" className="hover:text-amber-800 transition-colors">
              Consortium
            </a>
            <a href="#departments" className="hover:text-amber-800 transition-colors">
              Services
            </a>
            <a href="#corridors" className="hover:text-amber-800 transition-colors">
              Corridors
            </a>
            <a href="#fleet" className="hover:text-amber-800 transition-colors">
              Fleet
            </a>
            <a href="#governance" className="hover:text-amber-800 transition-colors">
              Governance
            </a>
            <a href="#stations" className="hover:text-amber-800 transition-colors">
              Stations
            </a>
            <a href="#gallery" className="hover:text-amber-800 transition-colors">
              Gallery
            </a>
            <button
              onClick={onOpenTransporter}
              className="text-slate-700 hover:text-amber-800 transition-colors font-medium cursor-pointer"
            >
              Vehicle Registration Request
            </button>
            <button
              onClick={onOpenQuote}
              className="text-slate-700 hover:text-amber-800 transition-colors font-medium cursor-pointer"
            >
              Logistics Quotation
            </button>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenSignIn}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 flex items-center gap-1.5 transition"
            >
              <User className="w-3.5 h-3.5 text-slate-600" />
              <span>Sign In / Sign Up</span>
            </button>

            <button
              onClick={onOpenQuote}
              className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#B8860B] via-[#C59B27] to-[#A37420] hover:from-[#A37420] hover:to-[#8B6214] rounded-md shadow-sm transition hover:shadow-md cursor-pointer"
            >
              Request Rate Quote
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#B8860B] rounded-md"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-slate-700 hover:bg-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#ECEEF3] border-b border-slate-300 px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-800">
            <a href="#consortium" onClick={() => setMobileMenuOpen(false)} className="py-1.5">Consortium</a>
            <a href="#departments" onClick={() => setMobileMenuOpen(false)} className="py-1.5">Services</a>
            <a href="#corridors" onClick={() => setMobileMenuOpen(false)} className="py-1.5">Corridors</a>
            <a href="#fleet" onClick={() => setMobileMenuOpen(false)} className="py-1.5">Fleet</a>
            <a href="#governance" onClick={() => setMobileMenuOpen(false)} className="py-1.5">Governance</a>
            <a href="#stations" onClick={() => setMobileMenuOpen(false)} className="py-1.5">Stations</a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="py-1.5">Gallery</a>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenTransporter(); }}
              className="text-left py-1.5 font-semibold text-emerald-800"
            >
              Vehicle Registration Request
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenQuote(); }}
              className="text-left py-1.5 font-semibold text-amber-800"
            >
              Logistics Quotation
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenTracker(); }}
              className="text-left py-1.5 font-semibold text-slate-700"
            >
              Track Status
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className="text-left py-1.5 text-xs text-slate-500 font-mono"
            >
              Admin Operations
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
