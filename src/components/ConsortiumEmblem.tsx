import React, { useState, useEffect } from 'react';

export interface ConsortiumEmblemProps {
  className?: string;
  size?: number;
  customUrl?: string;
  variant?: 'header' | 'home' | 'grey-transparent' | 'white-round' | 'pearl-medallion';
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

export const ConsortiumEmblem: React.FC<ConsortiumEmblemProps> = ({
  className = '',
  size = 56,
  customUrl,
  variant = 'header',
}) => {
  const [headerLogoUrl, setHeaderLogoUrl] = useState<string | null>(() => {
    if (isUploadedLogo(customUrl)) return customUrl;
    if (typeof window !== 'undefined') {
      const saved =
        localStorage.getItem('mak_header_logo') ||
        localStorage.getItem('mak_custom_logo');
      return isUploadedLogo(saved) ? saved : null;
    }
    return null;
  });

  const [pageLogoUrl, setPageLogoUrl] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mak_page_logo');
      return isUploadedLogo(saved) ? saved : null;
    }
    return null;
  });

  useEffect(() => {
    if (isUploadedLogo(customUrl)) {
      setHeaderLogoUrl(customUrl);
      return;
    }
    const savedHeader =
      localStorage.getItem('mak_header_logo') ||
      localStorage.getItem('mak_custom_logo');
    setHeaderLogoUrl(isUploadedLogo(savedHeader) ? savedHeader : null);

    const savedPage = localStorage.getItem('mak_page_logo');
    setPageLogoUrl(isUploadedLogo(savedPage) ? savedPage : null);

    const handleLogoUpdate = (e: any) => {
      const nextUrl = e.detail?.logoUrl || e.detail?.headerLogo;
      if (e.detail?.reset || !isUploadedLogo(nextUrl)) {
        setHeaderLogoUrl(null);
      } else {
        setHeaderLogoUrl(nextUrl);
      }
    };

    const handlePageLogoUpdate = (e: any) => {
      const nextPageUrl = e.detail?.pageLogo;
      if (e.detail?.resetPageLogo || !isUploadedLogo(nextPageUrl)) {
        setPageLogoUrl(null);
      } else {
        setPageLogoUrl(nextPageUrl);
      }
    };

    window.addEventListener('mak-logo-updated', handleLogoUpdate);
    window.addEventListener('mak-page-logo-updated', handlePageLogoUpdate);
    return () => {
      window.removeEventListener('mak-logo-updated', handleLogoUpdate);
      window.removeEventListener('mak-page-logo-updated', handlePageLogoUpdate);
    };
  }, [customUrl]);

  if (variant === 'pearl-medallion' || variant === 'white-round' || variant === 'home') {
    if (!pageLogoUrl) return null;
    return (
      <img
        src={pageLogoUrl}
        alt="MAK - GROUP OF COMPANIES"
        style={{ width: size, height: size }}
        className={`object-contain select-none ${className}`}
        loading="eager"
        onError={() => setPageLogoUrl(null)}
      />
    );
  }

  if (!headerLogoUrl) return null;

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <img
        src={headerLogoUrl}
        alt="MAK - GROUP Header Logo"
        style={{ width: size, height: size, objectFit: 'contain' }}
        className="drop-shadow-[0_2px_8px_rgba(15,23,42,0.14)] transition-transform duration-300"
        onError={() => setHeaderLogoUrl(null)}
      />
    </div>
  );
};
