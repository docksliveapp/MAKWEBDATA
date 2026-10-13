import React, { useState, useEffect } from 'react';

export interface MakOfficialLogoProps {
  className?: string;
  size?: number;
  customUrl?: string;
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

export const MakOfficialLogo: React.FC<MakOfficialLogoProps> = ({
  className = 'h-10 w-auto',
  size,
  customUrl,
}) => {
  const [logoSrc, setLogoSrc] = useState<string | null>(() => {
    if (isUploadedLogo(customUrl)) return customUrl;
    if (typeof window !== 'undefined') {
      const saved =
        localStorage.getItem('mak_header_logo') ||
        localStorage.getItem('mak_custom_logo');
      return isUploadedLogo(saved) ? saved : null;
    }
    return null;
  });

  useEffect(() => {
    if (isUploadedLogo(customUrl)) {
      setLogoSrc(customUrl);
      return;
    }

    const saved =
      localStorage.getItem('mak_header_logo') ||
      localStorage.getItem('mak_custom_logo');
    setLogoSrc(isUploadedLogo(saved) ? saved : null);

    const handleUpdate = (e: any) => {
      const nextUrl = e.detail?.headerLogo || e.detail?.logoUrl;
      if (e.detail?.reset || !isUploadedLogo(nextUrl)) {
        setLogoSrc(null);
      } else {
        setLogoSrc(nextUrl);
      }
    };

    window.addEventListener('mak-logo-updated', handleUpdate);
    return () => window.removeEventListener('mak-logo-updated', handleUpdate);
  }, [customUrl]);

  if (!logoSrc) return null;

  return (
    <img
      src={logoSrc}
      alt="MAK - GROUP OF COMPANIES"
      style={size ? { height: size } : undefined}
      className={`object-contain select-none transition-transform duration-300 ${className}`}
      loading="eager"
      onError={() => setLogoSrc(null)}
    />
  );
};
