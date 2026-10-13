import React, { useState } from 'react';
import { ConsortiumEmblem } from './ConsortiumEmblem';
import { COMPREHENSIVE_SERVICES, type ComprehensiveService } from '../data/consortium';
import {
  ExternalLink,
  Truck,
  Package,
  Menu,
  X,
  ChevronDown,
  Compass,
  FileText,
  ClipboardCheck,
  Anchor,
  Globe,
  ShieldCheck,
  Phone,
  Mail,
  ArrowRight,
  Home,
  Building2,
} from 'lucide-react';

export type AppPage = 'home' | 'services' | 'about' | 'corridors' | 'contact';

interface NavbarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  onOpenQuote: () => void;
  onOpenTransporter: () => void;
  onOpenInquiry: () => void;
  onSelectServiceDetail?: (service: ComprehensiveService) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenQuote,
  onOpenTransporter,
  onOpenInquiry,
  onSelectServiceDetail,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [inquiryDropdownOpen, setInquiryDropdownOpen] = useState(false);

  const handlePageSelect = (page: AppPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setServicesDropdownOpen(false);
    setInquiryDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (service: ComprehensiveService) => {
    onNavigate('services');
    if (onSelectServiceDetail) {
      onSelectServiceDetail(service);
    }
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setServicesDropdownOpen(false);
    setInquiryDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs transition-all">
      {/* Top Executive Information Strip */}
      <div className="border-b border-slate-200/80 px-4 py-1.5 text-center text-xs font-medium text-slate-700 tracking-wide bg-[#F4F6F9]">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <span className="hidden md:inline font-mono text-[11px] font-semibold text-[#9A6B16]">
            FBR BONDED CARRIER · PSW CUSTOMS BROKER · IRU TIR TRANSIT · NVOCC MARITIME
          </span>
          <span className="mx-auto md:mx-0 font-semibold text-slate-800">
            MAK - GROUP OF COMPANIES | Pakistan's Premier Multimodal Logistics Network
          </span>
          <span className="hidden md:inline font-mono text-[11px] text-slate-700 font-semibold">
            Tel: +92-21-32330103 / 0104 · Dubai: +971-4-570-8397
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center">
            <button
              onClick={() => handlePageSelect('home')}
              className="flex items-center gap-3 sm:gap-4 group text-left cursor-pointer focus:outline-none py-1.5"
            >
              <ConsortiumEmblem
                size={68}
                className="shrink-0 h-13 sm:h-16 w-auto transition-transform duration-300 group-hover:scale-103 drop-shadow-[0_2px_8px_rgba(15,23,42,0.14)]"
              />
              <div className="flex flex-col justify-center">
                <span className="font-serif-luxury font-bold tracking-wider text-lg sm:text-2xl text-slate-900 group-hover:text-[#9A6B16] transition-colors leading-tight">
                  MAK - GROUP
                </span>
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] text-[#9A6B16] uppercase font-mono leading-tight mt-0.5">
                  GROUP OF COMPANIES
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <button
              onClick={() => handlePageSelect('home')}
              className={`hover:text-[#9A6B16] transition-colors cursor-pointer py-1.5 border-b-2 font-semibold ${
                currentPage === 'home'
                  ? 'text-[#9A6B16] border-[#B8860B]'
                  : 'text-slate-700 border-transparent'
              }`}
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setServicesDropdownOpen(!servicesDropdownOpen);
                  setInquiryDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 hover:text-[#9A6B16] transition-colors cursor-pointer py-1.5 border-b-2 font-semibold ${
                  currentPage === 'services' || servicesDropdownOpen
                    ? 'text-[#9A6B16] border-[#B8860B]'
                    : 'text-slate-700 border-transparent'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  servicesDropdownOpen ? 'rotate-180 text-[#9A6B16]' : 'text-slate-500'
                }`} />
              </button>

              {servicesDropdownOpen && (
                <div
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute left-0 mt-2 w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 space-y-1 z-50 animate-in fade-in duration-150 max-h-[80vh] overflow-y-auto"
                >
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase font-bold text-slate-500 tracking-wider">
                      Service Divisions
                    </span>
                    <button
                      onClick={() => handlePageSelect('services')}
                      className="text-xs font-bold text-[#9A6B16] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>View All Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {COMPREHENSIVE_SERVICES.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => handleCategorySelect(svc)}
                      className="w-full p-3 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 text-left group cursor-pointer border border-transparent hover:border-slate-200"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#F4F6F9] text-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                        {svc.category === 'Bonded Carrier' && <Truck className="w-4 h-4 text-amber-800" />}
                        {svc.category === 'Customs Clearance' && <FileText className="w-4 h-4 text-blue-800" />}
                        {svc.category === 'Maritime' && <Anchor className="w-4 h-4 text-cyan-800" />}
                        {svc.category === 'TIR Transit' && <Globe className="w-4 h-4 text-emerald-800" />}
                        {svc.category === 'Afghan Transit' && <ShieldCheck className="w-4 h-4 text-amber-800" />}
                        {svc.category === 'Specialized Fleet' && <Package className="w-4 h-4 text-indigo-800" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-[#9A6B16] block leading-snug">
                          {svc.title}
                        </span>
                        <span className="text-xs text-slate-500 font-mono block truncate pt-0.5">
                          {svc.managingEntity} · {svc.badge}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handlePageSelect('about')}
              className={`hover:text-[#9A6B16] transition-colors cursor-pointer py-1.5 border-b-2 font-semibold ${
                currentPage === 'about'
                  ? 'text-[#9A6B16] border-[#B8860B]'
                  : 'text-slate-700 border-transparent'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => handlePageSelect('corridors')}
              className={`hover:text-[#9A6B16] transition-colors cursor-pointer py-1.5 border-b-2 font-semibold ${
                currentPage === 'corridors'
                  ? 'text-[#9A6B16] border-[#B8860B]'
                  : 'text-slate-700 border-transparent'
              }`}
            >
              Corridors
            </button>

            <button
              onClick={() => handlePageSelect('contact')}
              className={`hover:text-[#9A6B16] transition-colors cursor-pointer py-1.5 border-b-2 font-semibold ${
                currentPage === 'contact'
                  ? 'text-[#9A6B16] border-[#B8860B]'
                  : 'text-slate-700 border-transparent'
              }`}
            >
              Contact Us
            </button>

            {/* Status Hub Dropdown (Consignment Status & Vehicle Status Only) */}
            <div className="relative">
              <button
                onClick={() => {
                  setInquiryDropdownOpen(!inquiryDropdownOpen);
                  setServicesDropdownOpen(false);
                }}
                className="min-h-[40px] px-4 py-2 rounded-xl bg-[#FAF9F6] hover:bg-amber-50/80 text-slate-800 border border-slate-300 flex items-center gap-1.5 text-sm font-semibold transition shadow-2xs cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#9A6B16]" />
                <span>Status Hub</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${inquiryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {inquiryDropdownOpen && (
                <div
                  onMouseLeave={() => setInquiryDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2.5 space-y-1 z-50 animate-in fade-in duration-150"
                >
                  <a
                    href="https://status.makpk.online/?mode=status"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setInquiryDropdownOpen(false)}
                    className="p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-800">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 group-hover:text-[#9A6B16] block">
                          Consignment Status
                        </span>
                        <span className="text-xs text-slate-500 font-mono block">
                          Container & Cargo Tracking
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#9A6B16]" />
                  </a>

                  <a
                    href="https://status.makpk.online/?mode=vehicle"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setInquiryDropdownOpen(false)}
                    className="p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200/70 flex items-center justify-center text-blue-800">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 group-hover:text-blue-800 block">
                          Vehicle Status
                        </span>
                        <span className="text-xs text-slate-500 font-mono block">
                          Fleet & Bond Verification
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-700" />
                  </a>
                </div>
              )}
            </div>

            {/* Primary CTA Button */}
            <button
              onClick={onOpenQuote}
              className="btn-gold-luxury min-h-[40px] px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#F4F6F9] border border-slate-200 text-slate-800 hover:bg-slate-200/70 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Redesigned Clean & Decent Mobile Navigation Menu (Without Google Drive Vault) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F6] border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl max-h-[84vh] overflow-y-auto">
          <div className="max-w-lg mx-auto space-y-4">
            
            {/* Primary Navigation List */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-2 space-y-1 shadow-2xs">
              <button
                onClick={() => handlePageSelect('home')}
                className={`w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                  currentPage === 'home'
                    ? 'bg-amber-50/90 text-[#9A6B16] border border-amber-200/80'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Home className="w-4 h-4 text-[#9A6B16]" />
                  <span>Home</span>
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              {/* Collapsible Services Section */}
              <div className="rounded-xl overflow-hidden">
                <div className={`flex items-center justify-between rounded-xl transition ${
                  currentPage === 'services'
                    ? 'bg-amber-50/90 text-[#9A6B16] border border-amber-200/80'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}>
                  <button
                    onClick={() => handlePageSelect('services')}
                    className="flex-1 flex items-center gap-3 py-2.5 pl-3.5 pr-2 text-left text-sm font-semibold cursor-pointer"
                  >
                    <Anchor className="w-4 h-4 text-[#9A6B16]" />
                    <span>Our Services</span>
                  </button>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="py-2.5 px-3.5 text-slate-500 hover:text-slate-900 cursor-pointer flex items-center gap-1 text-xs font-mono"
                    aria-label="Toggle service categories"
                  >
                    <span>{mobileServicesOpen ? 'Hide' : '6 Divisions'}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180 text-[#9A6B16]' : ''}`} />
                  </button>
                </div>

                {mobileServicesOpen && (
                  <div className="mt-1 ml-4 pl-3 border-l-2 border-amber-200 space-y-1 py-1">
                    {COMPREHENSIVE_SERVICES.map((svc) => (
                      <button
                        key={svc.id}
                        onClick={() => handleCategorySelect(svc)}
                        className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 text-xs font-medium text-slate-700 hover:text-slate-900 flex items-center justify-between gap-2 cursor-pointer"
                      >
                        <span className="truncate">{svc.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => handlePageSelect('about')}
                className={`w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                  currentPage === 'about'
                    ? 'bg-amber-50/90 text-[#9A6B16] border border-amber-200/80'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-[#9A6B16]" />
                  <span>About Us & Profile</span>
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handlePageSelect('corridors')}
                className={`w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                  currentPage === 'corridors'
                    ? 'bg-amber-50/90 text-[#9A6B16] border border-amber-200/80'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-[#9A6B16]" />
                  <span>Trade Corridors</span>
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handlePageSelect('contact')}
                className={`w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                  currentPage === 'contact'
                    ? 'bg-amber-50/90 text-[#9A6B16] border border-amber-200/80'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#9A6B16]" />
                  <span>Contact & Global Desks</span>
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Live Status Tracking Links (Compact 2-Column Row) */}
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="https://status.makpk.online/?mode=status"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white border border-slate-200/90 text-slate-800 hover:border-amber-400 text-xs font-semibold flex items-center justify-between shadow-2xs transition"
              >
                <span className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#9A6B16] shrink-0" />
                  <span>Consignment Status</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </a>

              <a
                href="https://status.makpk.online/?mode=vehicle"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white border border-slate-200/90 text-slate-800 hover:border-blue-400 text-xs font-semibold flex items-center justify-between shadow-2xs transition"
              >
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Vehicle Status</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </a>
            </div>

            {/* Direct Email Inquiry Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="btn-gold-luxury min-h-[44px] py-2.5 px-4 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Request Logistics Quote</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTransporter();
                }}
                className="min-h-[44px] py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <ClipboardCheck className="w-4 h-4 text-amber-400" />
                <span>Vehicle Registration</span>
              </button>
            </div>

            {/* Direct Contact Strip */}
            <div className="pt-1 flex items-center justify-between text-xs text-slate-500 px-1">
              <a href="tel:+922132330103" className="hover:text-slate-900 font-mono">
                +92-21-32330103
              </a>
              <a href="mailto:Info@mak-group.com.pk" className="text-[#9A6B16] font-mono font-semibold hover:underline flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                <span>Info@mak-group.com.pk</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
