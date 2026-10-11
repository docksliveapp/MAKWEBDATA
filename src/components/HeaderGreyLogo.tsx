import React from 'react';

interface HeaderGreyLogoProps {
  size?: number;
  className?: string;
  customUrl?: string;
}

export const HeaderGreyLogo: React.FC<HeaderGreyLogoProps> = ({
  size = 46,
  className = '',
  customUrl,
}) => {
  const [logoUrl, setLogoUrl] = React.useState<string | null>(() => {
    if (customUrl) return customUrl;
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('mak_header_logo') ||
        localStorage.getItem('mak_custom_logo') ||
        null
      );
    }
    return null;
  });

  React.useEffect(() => {
    if (customUrl) {
      setLogoUrl(customUrl);
      return;
    }
    const saved = localStorage.getItem('mak_header_logo') || localStorage.getItem('mak_custom_logo');
    if (saved) {
      setLogoUrl(saved);
    }

    const handleUpdate = (e: any) => {
      if (e.detail?.headerLogo) {
        setLogoUrl(e.detail.headerLogo);
      } else if (e.detail?.logoUrl) {
        setLogoUrl(e.detail.logoUrl);
      } else if (e.detail?.reset) {
        setLogoUrl(null);
      }
    };

    window.addEventListener('mak-logo-updated', handleUpdate);
    return () => window.removeEventListener('mak-logo-updated', handleUpdate);
  }, [customUrl]);

  if (logoUrl) {
    return (
      <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
        <img
          src={logoUrl}
          alt="MAK - GROUP Header Logo"
          style={{ width: size, height: size, objectFit: 'contain' }}
          className="transition-transform duration-300 drop-shadow-sm"
          onError={() => setLogoUrl(null)}
        />
      </div>
    );
  }

  // Official MAK Cutout Logo as provided by user
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
