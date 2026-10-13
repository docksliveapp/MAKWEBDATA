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
  return !PRESET_PATHS.includes(url.trim());
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
      className="relative overflow-hidden bg-gradient-to-b from-[#FAF9F6] via-[#FFFFFF] to-[#F4F6F9] text-slate-900 pt-7 pb-12 sm:pt-12 sm:pb-18 border-b border-slate-200/90"
    >
      {/* Soft Eye-Friendly Ambient Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[780px] h-[380px] bg-gradient-to-b from-amber-100/35 to-slate-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-6">
        {/* Clean Unboxed Kicker & Slogan Metadata */}
        <div className="space-y-1.5">
          <p className="text-[11px] sm:text-sm font-mono font-bold tracking-[0.16em] uppercase text-[#9A6B16]">
            MAK - GROUP OF COMPANIES · PAKISTAN'S PREMIER MULTIMODAL NETWORK
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-medium text-slate-600">
            <span>Connecting Deepwater Ports</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Cross-Border TIR & Afghan Transit</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Global Ocean Liner Freight</span>
          </div>
        </div>

        {/* Uploaded Home Page Logo (Only shown when uploaded via Admin Portal) */}
        {pageLogoUrl && (
          <div className="pt-2 pb-1 flex justify-center">
            <img
              src={pageLogoUrl}
              alt="MAK - GROUP OF COMPANIES"
              className="w-36 h-36 sm:w-52 sm:h-52 md:w-56 md:h-56 object-contain mx-auto select-none drop-shadow-[0_12px_28px_rgba(15,23,42,0.16)] transition-transform duration-300"
              loading="eager"
              onError={() => setPageLogoUrl(null)}
            />
          </div>
        )}

        {/* Main Serif Luxury Headline */}
        <div className="space-y-2">
          <h1 className="font-serif-luxury text-2xl sm:text-5xl md:text-[54px] font-bold tracking-tight text-slate-900 leading-[1.16]">
            <span className="block font-serif-luxury">UNIFIED LOGISTICS,</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5C3D12] via-[#9A6B16] to-[#3B270C] font-serif-luxury">
              TRANSSHIPMENT & MARITIME
            </span>
            <span className="block font-serif-luxury">NETWORK</span>
          </h1>
        </div>

        {/* Eye-Friendly Readable Subtitle & Value Proposition */}
        <div className="max-w-3xl mx-auto space-y-2.5">
          <p className="text-sm sm:text-lg text-slate-700 font-normal leading-relaxed">
            Welcome to Pakistan's foremost single-window trade and transport group of companies. We coordinate{' '}
            <strong className="text-slate-900 font-semibold">
              2,000+ customs-registered commercial prime movers
            </strong>
            , statutory FBR bonded carrier line-haul, transcontinental TIR overland corridors, and global deep-sea liner operations.
          </p>
          <p className="text-xs sm:text-base text-slate-600 italic">
            "Delivering cargo from deepwater seaports to inland dry ports and Central Asian frontiers with guaranteed integrity, speed, and statutory escort."
          </p>
        </div>

        {/* Balanced, Easy-to-Use Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 max-w-md sm:max-w-none mx-auto">
          {onOpenQuote && (
            <button
              onClick={onOpenQuote}
              className="btn-gold-luxury min-h-[46px] px-6 py-3 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>Request Commercial Quote</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          )}

          {onOpenTransporter && (
            <button
              onClick={onOpenTransporter}
              className="min-h-[46px] px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-2xs text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Truck className="w-4 h-4 text-[#9A6B16] shrink-0" />
              <span>Vehicle & Fleet Registration</span>
            </button>
          )}

          {onOpenInquiry && (
            <button
              onClick={onOpenInquiry}
              className="min-h-[46px] px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200 text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Compass className="w-4 h-4 text-slate-700 shrink-0" />
              <span>Consignment & Vehicle Status</span>
            </button>
          )}
        </div>

        {/* Central Operations Desk Contact Bar */}
        <div className="pt-3 text-xs sm:text-sm text-slate-600 font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span>Karachi Central Operations Desk:</span>
          <a href="tel:+922132330103" className="font-semibold text-slate-900 hover:underline">
            +92-21-32330103 / 0104
          </a>
          <span aria-hidden="true" className="text-slate-400">·</span>
          <span>Official Corporate Email:</span>
          <a
            href="mailto:Info@mak-group.com.pk"
            className="font-semibold text-[#9A6B16] hover:underline font-mono"
          >
            Info@mak-group.com.pk
          </a>
        </div>
      </div>
    </section>
  );
};
