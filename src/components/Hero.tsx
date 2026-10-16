import React from 'react';
import { FileText, Truck, Compass, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenQuote?: () => void;
  onOpenTransporter?: () => void;
  onOpenInquiry?: () => void;
}

const PRESET_PATHS = [
  '/mak_pearl_grey_edge.svg',
  '/MAK-Group-Of-Companies.svg',
  '/mak_transparent.svg',
  '/erasebg-transformed.svg',
  '/mak_official_logo.svg',
];

function isUploadedLogo(url: string | null | undefined): url is string {
  if (!url || !url.trim()) return false;
  const trimmed = url.trim();
  if (PRESET_PATHS.includes(trimmed)) return false;
  return (
    trimmed.startsWith('data:image/') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('blob:')
  );
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuote,
  onOpenTransporter,
  onOpenInquiry,
}) => {
  const [pageLogoUrl, setPageLogoUrl] = React.useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mak_page_logo');
      return isUploadedLogo(saved) ? saved : null;
    }
    return null;
  });

  React.useEffect(() => {
    const handlePageLogoUpdate = (e: any) => {
      const nextUrl = e.detail?.pageLogo;
      if (e.detail?.resetPageLogo || !isUploadedLogo(nextUrl)) {
        setPageLogoUrl(null);
      } else {
        setPageLogoUrl(nextUrl);
      }
    };
    window.addEventListener('mak-page-logo-updated', handlePageLogoUpdate);
    return () => window.removeEventListener('mak-page-logo-updated', handlePageLogoUpdate);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[#FAF9F6] via-[#FFFFFF] to-[#F3F5F8] text-slate-900 pt-8 pb-14 sm:pt-14 sm:pb-20 lg:pt-18 lg:pb-24 border-b border-slate-200/90"
    >
      {/* Subtle Luxury Ambient Glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[90vw] max-w-[960px] h-[360px] bg-gradient-to-r from-amber-100/40 via-amber-50/25 to-slate-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container-luxury text-center space-y-6 sm:space-y-8 animate-fade-up">

        {/* Uploaded Home Page Logo (Only shown when uploaded via Admin Portal) */}
        {pageLogoUrl && (
          <div className="py-1 flex justify-center">
            <img
              src={pageLogoUrl}
              alt="MAK - GROUP OF COMPANIES"
              className="w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56 object-contain mx-auto select-none drop-shadow-[0_12px_28px_rgba(15,23,42,0.14)] transition-transform duration-500 hover:scale-103"
              loading="eager"
              onError={() => setPageLogoUrl(null)}
            />
          </div>
        )}

        {/* Fluid Responsive Luxury Headline (Scales across Mobile, Tablet, Laptop, Desktop & 2XL) */}
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl 2xl:text-[64px] font-bold tracking-tight text-slate-900 leading-[1.13]">
            <span className="block font-serif-luxury">UNIFIED LOGISTICS,</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5C3D12] via-[#9A6B16] to-[#3B270C] font-serif-luxury py-0.5">
              TRANSSHIPMENT & MARITIME
            </span>
            <span className="block font-serif-luxury">COMMAND</span>
          </h1>
        </div>

        {/* Concise, High-Impact Executive Value Proposition */}
        <p className="max-w-3xl mx-auto text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed">
          Single-window trade and transport authority coordinating{' '}
          <strong className="text-slate-900 font-semibold">
            2,000+ customs-bonded commercial prime movers
          </strong>
          , WeBOC/PSW customs clearance desks at KICT, SAPT & QICT, cross-border TIR overland corridors, and global ocean container slots.
        </p>

        {/* Animated Premium Action Buttons */}
        <div className="pt-1 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          {onOpenQuote && (
            <button
              onClick={onOpenQuote}
              className="group btn-gold-luxury min-h-[48px] px-6 sm:px-7 py-3 rounded-xl text-sm sm:text-base font-semibold tracking-wide flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>Request Commercial Quote</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          )}

          {onOpenTransporter && (
            <button
              onClick={onOpenTransporter}
              className="group btn-surface-luxury min-h-[48px] px-6 py-3 rounded-xl text-sm sm:text-base font-semibold flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Truck className="w-4 h-4 text-[#9A6B16] shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <span>Vehicle & Fleet Registration</span>
            </button>
          )}

          {onOpenInquiry && (
            <button
              onClick={onOpenInquiry}
              className="group btn-dark-luxury min-h-[48px] px-6 py-3 rounded-xl text-sm sm:text-base font-semibold flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 group-hover:rotate-45" />
              <span>Consignment & Vehicle Status</span>
            </button>
          )}
        </div>

        {/* Key Operational Figures Strip (2x2 on Mobile, 4 Columns on Tablet/Laptop/Desktop/Big Screen) */}
        <div className="pt-4 sm:pt-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="card-luxury rounded-2xl p-4 sm:p-5 text-center space-y-1">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury text-slate-900 block">
                2,000+
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#9A6B16] block">
                Bonded Fleet Units
              </span>
              <span className="text-xs text-slate-500 block">
                FBR Registered Carriers
              </span>
            </div>

            <div className="card-luxury rounded-2xl p-4 sm:p-5 text-center space-y-1">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury text-slate-900 block">
                1,000+
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#9A6B16] block">
                Monthly Containers
              </span>
              <span className="text-xs text-slate-500 block">
                Port-to-Dry Port Linehaul
              </span>
            </div>

            <div className="card-luxury rounded-2xl p-4 sm:p-5 text-center space-y-1">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury text-slate-900 block">
                60,000+
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#9A6B16] block">
                Transit TEUs Moved
              </span>
              <span className="text-xs text-slate-500 block">
                Torkham, Chaman & TIR
              </span>
            </div>

            <div className="card-luxury rounded-2xl p-4 sm:p-5 text-center space-y-1">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury text-slate-900 block">
                600+
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#9A6B16] block">
                Enterprise Clients
              </span>
              <span className="text-xs text-slate-500 block">
                Multinational & CPEC
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
