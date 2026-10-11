import React, { useState, useEffect } from 'react';
import { HeaderGreyLogo } from './HeaderGreyLogo';

export interface ConsortiumEmblemProps {
  className?: string;
  size?: number;
  customUrl?: string;
  variant?: 'header' | 'home' | 'grey-transparent' | 'white-round' | 'pearl-medallion';
}

export const ConsortiumEmblem: React.FC<ConsortiumEmblemProps> = ({
  className = '',
  size = 46,
  customUrl,
  variant = 'header',
}) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(() => {
    if (customUrl) return customUrl;
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('mak_custom_logo') ||
        localStorage.getItem('mak_header_logo') ||
        null
      );
    }
    return null;
  });

  useEffect(() => {
    if (customUrl) {
      setLogoUrl(customUrl);
      return;
    }
    const saved =
      localStorage.getItem('mak_custom_logo') ||
      localStorage.getItem('mak_header_logo');
    if (saved) {
      setLogoUrl(saved);
    }

    const handleLogoUpdate = (e: any) => {
      if (e.detail?.logoUrl) {
        setLogoUrl(e.detail.logoUrl);
      } else if (e.detail?.headerLogo) {
        setLogoUrl(e.detail.headerLogo);
      } else if (e.detail?.reset) {
        setLogoUrl(null);
      }
    };

    const handlePageLogoUpdate = () => {
      // Force re-render if variant is pearl-medallion or home
      setLogoUrl(prev => prev);
    };

    window.addEventListener('mak-logo-updated', handleLogoUpdate);
    window.addEventListener('mak-page-logo-updated', handlePageLogoUpdate);
    return () => {
      window.removeEventListener('mak-logo-updated', handleLogoUpdate);
      window.removeEventListener('mak-page-logo-updated', handlePageLogoUpdate);
    };
  }, [customUrl]);

  // 1. If variant is home or pearl-medallion, render page logo (default: mak_pearl_grey_edge.svg)
  if (variant === 'pearl-medallion' || variant === 'white-round' || variant === 'home') {
    const pageLogo = typeof window !== 'undefined' ? localStorage.getItem('mak_page_logo') : null;
    return (
      <img
        src={pageLogo || "/mak_pearl_grey_edge.svg"}
        alt="MAK - GROUP OF COMPANIES"
        style={{ width: size, height: size }}
        className={`object-contain select-none ${className}`}
        loading="eager"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/mak_pearl_grey_edge.svg';
        }}
      />
    );
  }

  // 2. For header & general branding: if custom logo was uploaded via Admin, render it
  if (logoUrl) {
    return (
      <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
        <img
          src={logoUrl}
          alt="MAK - GROUP Header Logo"
          style={{ width: size, height: size, objectFit: 'contain' }}
          className="drop-shadow-[0_4px_12px_rgba(30,41,59,0.20)] transition-transform duration-300 hover:scale-105"
          onError={() => setLogoUrl(null)}
        />
      </div>
    );
  }

  // 3. Default to the official MAK cutout logo
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <img
        src="/mak_official_logo.svg"
        alt="MAK - GROUP OF COMPANIES"
        style={{ width: size, height: size, objectFit: 'contain' }}
        className="transition-transform duration-300 drop-shadow-xs"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/MAK-Group-Of-Companies.svg';
        }}
      />
    </div>
  );
};
