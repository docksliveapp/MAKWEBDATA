import React, { useState, useEffect } from 'react';

export interface MakOfficialLogoProps {
  className?: string;
  size?: number; // optional height/size hint
  customUrl?: string;
}

export const MakOfficialLogo: React.FC<MakOfficialLogoProps> = ({
  className = 'h-10 w-auto',
  size,
  customUrl,
}) => {
  const [logoSrc, setLogoSrc] = useState<string>(() => {
    if (customUrl) return customUrl;
    if (typeof window !== 'undefined') {
      const saved =
        localStorage.getItem('mak_header_logo') ||
        localStorage.getItem('mak_custom_logo');
      if (saved) return saved;
    }
    return '/mak_official_logo.svg';
  });

  useEffect(() => {
    if (customUrl) {
      setLogoSrc(customUrl);
      return;
    }

    const saved =
      localStorage.getItem('mak_header_logo') ||
      localStorage.getItem('mak_custom_logo');
    if (saved) {
      setLogoSrc(saved);
    }

    const handleUpdate = (e: any) => {
      if (e.detail?.headerLogo) {
        setLogoSrc(e.detail.headerLogo);
      } else if (e.detail?.logoUrl) {
        setLogoSrc(e.detail.logoUrl);
      } else if (e.detail?.reset) {
        setLogoSrc('/mak_official_logo.svg');
      }
    };

    window.addEventListener('mak-logo-updated', handleUpdate);
    return () => window.removeEventListener('mak-logo-updated', handleUpdate);
  }, [customUrl]);

  return (
    <img
      src={logoSrc}
      alt="MAK - GROUP OF COMPANIES"
      style={size ? { height: size } : undefined}
      className={`object-contain select-none transition-transform duration-300 hover:scale-102 ${className}`}
      loading="eager"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = '/mak_official_logo.svg';
      }}
    />
  );
};
