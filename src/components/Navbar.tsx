import React, { useState } from 'react';
import { Anchor, ShieldCheck, Truck, Globe2, Ship, Search, PlusCircle, UserCheck } from 'lucide-react';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenTransporter: () => void;
  onOpenTracker: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuote,
  onOpenTransporter,
  onOpenTracker,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950/60 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-semibold text-amber-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              SINGLE-WINDOW CONSORTIUM
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">
              Docks (Pvt) Ltd • Truckit • Muhib International • Vantage Shipping Line
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-400">Port Operations & Cross-Border Dispatch:</span>
            <a href="tel:+922135689100" className="text-amber-300 font-mono hover:underline">
              +92 (21) 3568-9100
            </a>
            <span className="text-slate-600">/</span>
            <span className="font-mono text-emerald-400">HQ: Karachi & Dubai</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                <Anchor className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury font-bold tracking-wider text-2xl text-white flex items-center gap-1.5">
                  MAK <span className="text-amber-400 font-light">—</span> GROUP
                </span>
                <span className="text-[11px] font-medium tracking-widest text-slate-400 uppercase">
                  Logistics • Transshipment • Maritime
                </span>
              </div>
            </a>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#companies" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <Ship className="w-4 h-4 text-amber-400" />
              Consortium Pillars
            </a>
            <a href="#corridors" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-cyan-400" />
              Trade Corridors
            </a>
            <a href="#fleet" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-400" />
              Fleet Network
            </a>
            <a href="#compliance" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              TIR & Customs
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenTracker}
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg flex items-center gap-1.5 transition"
              title="Track submitted rate quote or transporter registration"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              Track ID
            </button>

            <button
              onClick={onOpenTransporter}
              className="px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:text-emerald-200 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/80 rounded-lg flex items-center gap-1.5 transition"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              Transporter Portal
            </button>

            <button
              onClick={onOpenQuote}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-md shadow-amber-500/20 flex items-center gap-2 transition hover:-translate-y-0.5"
            >
              Request Quote
            </button>

            <button
              onClick={onOpenAdmin}
              className="p-2 text-slate-400 hover:text-amber-300 hover:bg-slate-900 rounded-lg border border-transparent hover:border-slate-800 transition"
              title="Consortium Administration Portal"
            >
              <UserCheck className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-lg"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 py-5 space-y-4">
          <div className="flex flex-col space-y-3 font-medium text-slate-200">
            <a
              href="#companies"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 hover:text-amber-400 border-b border-slate-900"
            >
              <Ship className="w-4 h-4 text-amber-400" />
              Consortium Pillars
            </a>
            <a
              href="#corridors"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 hover:text-amber-400 border-b border-slate-900"
            >
              <Globe2 className="w-4 h-4 text-cyan-400" />
              Trade Corridors
            </a>
            <a
              href="#fleet"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 hover:text-amber-400 border-b border-slate-900"
            >
              <Truck className="w-4 h-4 text-emerald-400" />
              Fleet Network
            </a>
            <a
              href="#compliance"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 hover:text-amber-400"
            >
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              TIR & Customs
            </a>
          </div>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracker();
              }}
              className="px-3 py-2.5 text-xs font-semibold text-center text-slate-300 bg-slate-900 rounded-lg border border-slate-800"
            >
              Track Reference
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTransporter();
              }}
              className="px-3 py-2.5 text-xs font-semibold text-center text-emerald-300 bg-emerald-950/80 rounded-lg border border-emerald-900"
            >
              Transporters
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="col-span-2 px-3 py-2.5 text-xs font-semibold text-center text-amber-300 bg-slate-900 rounded-lg border border-amber-900/60"
            >
              Consortium Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
