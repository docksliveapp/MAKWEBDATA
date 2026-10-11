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
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight
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
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [inquiryDropdownOpen, setInquiryDropdownOpen] = useState(false);

  const handlePageSelect = (page: AppPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
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
    setServicesDropdownOpen(false);
    setInquiryDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs transition-all">
      {/* Top Thin Marketing Slogan Tagline */}
      <div className="border-b border-slate-200/80 px-4 py-1 text-center text-[11px] font-semibold text-slate-700 tracking-wide bg-gradient-to-r from-[#F8FAFC] via-[#ECEEF3] to-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <span className="hidden md:inline font-mono text-[10px] text-amber-800">
            FBR BONDED CARRIER • PSW CUSTOMS BROKER • IRU TIR TRANSIT • NVOCC MARITIME
          </span>
          <span className="mx-auto md:mx-0 font-medium text-slate-700">
            MAK - GROUP OF COMPANIES | Pakistan's Premier Multimodal Logistics Network
          </span>
          <span className="hidden md:inline font-mono text-[10px] text-slate-700 font-semibold">
            Tel: +92-21-32330103 / 0104 • Dubai: +971-4- 570-8397
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22">
          
          {/* Company Brand Logo & Name on Left (Large Logo & Vertically Centered Title) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handlePageSelect('home')}
              className="flex items-center gap-3.5 sm:gap-4 group text-left cursor-pointer focus:outline-none py-1"
            >
              <ConsortiumEmblem
                size={64}
                className="shrink-0 h-13 sm:h-15 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(15,23,42,0.14)]"
              />
              <div className="flex flex-col justify-center">
                <span className="font-serif-luxury font-extrabold tracking-wider text-xl sm:text-2xl lg:text-[26px] text-slate-900 group-hover:text-amber-800 transition-colors leading-none mb-1.5">
                  MAK - GROUP
                </span>
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#B45309] uppercase font-mono leading-none">
                  GROUP OF COMPANIES
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links (Switches Separate Pages) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[13px] font-semibold text-slate-700">
            
            {/* 1. Home Page */}
            <button
              onClick={() => handlePageSelect('home')}
              className={`hover:text-amber-800 transition-colors cursor-pointer py-1 border-b-2 font-bold ${
                currentPage === 'home'
                  ? 'text-amber-900 border-amber-600'
                  : 'text-slate-700 border-transparent'
              }`}
            >
              Home
            </button>

            {/* 2. Services Dropdown Menu (Just like Inquiry list) */}
            <div className="relative">
              <button
                onClick={() => {
                  setServicesDropdownOpen(!servicesDropdownOpen);
                  setInquiryDropdownOpen(false);
                }}
                className={`flex items-center gap-1 hover:text-amber-800 transition-colors cursor-pointer py-1 border-b-2 font-bold ${
                  currentPage === 'services' || servicesDropdownOpen
                    ? 'text-amber-900 border-amber-600'
                    : 'text-slate-700 border-transparent'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  servicesDropdownOpen ? 'rotate-180 text-amber-700' : 'text-slate-500'
                }`} />
              </button>

              {servicesDropdownOpen && (
                <div
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute left-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 space-y-1 z-50 animate-in fade-in duration-150 max-h-[82vh] overflow-y-auto"
                >
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                      Select Service Category Page
                    </span>
                    <button
                      onClick={() => handlePageSelect('services')}
                      className="text-[11px] font-bold text-amber-800 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>All Services</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {COMPREHENSIVE_SERVICES.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => handleCategorySelect(svc)}
                      className="w-full p-2.5 rounded-xl hover:bg-amber-50/80 transition-colors flex items-start gap-3 text-left group cursor-pointer border border-transparent hover:border-amber-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        {svc.category === 'Bonded Carrier' && <Truck className="w-4 h-4 text-amber-800" />}
                        {svc.category === 'Customs Clearance' && <FileText className="w-4 h-4 text-blue-800" />}
                        {svc.category === 'Maritime' && <Anchor className="w-4 h-4 text-cyan-800" />}
                        {svc.category === 'TIR Transit' && <Globe className="w-4 h-4 text-emerald-800" />}
                        {svc.category === 'Afghan Transit' && <ShieldCheck className="w-4 h-4 text-amber-800" />}
                        {svc.category === 'Specialized Fleet' && <Package className="w-4 h-4 text-indigo-800" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-amber-900 block leading-tight">
                          {svc.title}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono block truncate pt-0.5">
                          {svc.managingEntity} • {svc.badge}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. About Us Page (No 45 Years) */}
            <button
              onClick={() => handlePageSelect('about')}
              className={`hover:text-amber-800 transition-colors cursor-pointer py-1 border-b-2 font-bold ${
                currentPage === 'about'
                  ? 'text-amber-900 border-amber-600'
                  : 'text-slate-700 border-transparent'
              }`}
            >
              About Us
            </button>

            {/* 4. Corridors Page */}
            <button
              onClick={() => handlePageSelect('corridors')}
              className={`hover:text-amber-800 transition-colors cursor-pointer py-1 border-b-2 font-bold ${
                currentPage === 'corridors'
                  ? 'text-amber-900 border-amber-600'
                  : 'text-slate-700 border-transparent'
              }`}
            >
              Corridors
            </button>

            {/* 5. Inquiry Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setInquiryDropdownOpen(!inquiryDropdownOpen);
                  setServicesDropdownOpen(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100/90 text-amber-900 border border-amber-300 flex items-center gap-1.5 text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-amber-700" />
                <span>Inquiry</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${inquiryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {inquiryDropdownOpen && (
                <div
                  onMouseLeave={() => setInquiryDropdownOpen(false)}
                  className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 space-y-1 z-50 animate-in fade-in duration-150"
                >
                  <a
                    href="https://status.makpk.online/?mode=status"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setInquiryDropdownOpen(false)}
                    className="p-2.5 rounded-xl hover:bg-amber-50 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 group-hover:text-amber-800 block">
                          Container Status
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          Consignment Tracking
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-700" />
                  </a>

                  <a
                    href="https://status.makpk.online/?mode=vehicle"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setInquiryDropdownOpen(false)}
                    className="p-2.5 rounded-xl hover:bg-blue-50 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-800">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 group-hover:text-blue-800 block">
                          Vehicle Status
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          GPS Telematics & Bond
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-700" />
                  </a>

                  <button
                    onClick={() => {
                      setInquiryDropdownOpen(false);
                      onOpenTransporter();
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-emerald-50 flex items-center justify-between text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
                        <ClipboardCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 block">
                          Vehicle Registration Request
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          Fleet Onboarding Form
                        </span>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setInquiryDropdownOpen(false);
                      onOpenQuote();
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-amber-50 flex items-center justify-between text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 group-hover:text-amber-800 block">
                          Logistics Quotation Request
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          Instant Freight Calculator
                        </span>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setInquiryDropdownOpen(false);
                      onOpenInquiry();
                    }}
                    className="w-full p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold text-center cursor-pointer mt-1"
                  >
                    Open Full Inquiry Hub
                  </button>
                </div>
              )}
            </div>

            {/* 6. Contact Us Page */}
            <button
              onClick={() => handlePageSelect('contact')}
              className={`hover:text-amber-800 transition-colors cursor-pointer py-1 border-b-2 font-bold ${
                currentPage === 'contact'
                  ? 'text-amber-900 border-amber-600'
                  : 'text-slate-700 border-transparent'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Mobile hamburger menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Navigates to distinct pages in pure white theme) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-5 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-2 font-bold text-sm text-slate-800">
            <button
              onClick={() => handlePageSelect('home')}
              className={`text-left py-2 px-3 rounded-lg hover:bg-slate-200/70 cursor-pointer ${
                currentPage === 'home' ? 'bg-amber-100/80 text-amber-950 font-extrabold' : ''
              }`}
            >
              Home
            </button>

            {/* Services Page with Expandable Category List */}
            <div className="space-y-1">
              <button
                onClick={() => handlePageSelect('services')}
                className={`w-full text-left py-2 px-3 rounded-lg hover:bg-slate-200/70 cursor-pointer flex items-center justify-between ${
                  currentPage === 'services' ? 'bg-amber-100/80 text-amber-950 font-extrabold' : ''
                }`}
              >
                <span>Services (All Categories)</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
              
              <div className="pl-4 pr-1 py-1 space-y-1">
                {COMPREHENSIVE_SERVICES.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => handleCategorySelect(svc)}
                    className="w-full text-left py-1.5 px-2.5 rounded-md hover:bg-amber-50 text-xs font-semibold text-slate-700 block truncate"
                  >
                    • {svc.title}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handlePageSelect('about')}
              className={`text-left py-2 px-3 rounded-lg hover:bg-slate-200/70 cursor-pointer ${
                currentPage === 'about' ? 'bg-amber-100/80 text-amber-950 font-extrabold' : ''
              }`}
            >
              About Us (Profile & Blue-Chip Clients)
            </button>

            <button
              onClick={() => handlePageSelect('corridors')}
              className={`text-left py-2 px-3 rounded-lg hover:bg-slate-200/70 cursor-pointer ${
                currentPage === 'corridors' ? 'bg-amber-100/80 text-amber-950 font-extrabold' : ''
              }`}
            >
              Trade Corridors (TIR, CPEC, Afghanistan)
            </button>

            <button
              onClick={() => handlePageSelect('contact')}
              className={`text-left py-2 px-3 rounded-lg hover:bg-slate-200/70 cursor-pointer ${
                currentPage === 'contact' ? 'bg-amber-100/80 text-amber-950 font-extrabold' : ''
              }`}
            >
              Contact Us & Social Media
            </button>
          </div>

          <div className="pt-3 border-t border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              href="https://status.makpk.online/?mode=status"
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
              href="https://status.makpk.online/?mode=vehicle"
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
              className="p-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold text-center cursor-pointer"
            >
              Vehicle Registration Request
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenQuote(); }}
              className="btn-gold-luxury p-2.5 rounded-xl text-white text-xs font-bold text-center cursor-pointer"
            >
              Logistics Quotation Request
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
