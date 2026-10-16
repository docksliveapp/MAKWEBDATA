import React from 'react';
import { ConsortiumEmblem } from './ConsortiumEmblem';
import { Lock } from 'lucide-react';
import type { AppPage } from './Navbar';

interface FooterProps {
  onOpenQuote?: () => void;
  onOpenTransporter?: () => void;
  onOpenAdmin: () => void;
  onOpenInquiry?: () => void;
  onNavigate?: (page: AppPage) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-[#EEF2F6] text-slate-700 border-t border-slate-200/90 text-xs sm:text-sm">
      <div className="container-luxury py-4 sm:py-5 pr-20 sm:pr-24 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Brand & Copyright */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-center sm:text-left">
          <ConsortiumEmblem size={32} className="h-8 w-auto shrink-0" />
          <span className="font-serif-luxury font-bold text-slate-900">
            MAK — GROUP OF COMPANIES
          </span>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <span className="text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} All Rights Reserved.
          </span>
        </div>

        {/* Subtle Icon-Only Admin Portal Trigger */}
        <button
          onClick={onOpenAdmin}
          aria-label="Open Login Area"
          title="Login Area"
          className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/80 transition cursor-pointer flex items-center justify-center shrink-0"
        >
          <Lock className="w-4 h-4" />
        </button>

      </div>
    </footer>
  );
};
