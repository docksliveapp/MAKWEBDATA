import React, { useState, useEffect } from 'react';
import { HeaderGreyLogo } from './HeaderGreyLogo';
import { HomeRoundLogo } from './HomeRoundLogo';

export interface ConsortiumEmblemProps {
  className?: string;
  size?: number;
  customUrl?: string;
  variant?: 'header' | 'home' | 'grey-transparent' | 'white-round' | 'gold-vintage';
}

export const ConsortiumEmblem: React.FC<ConsortiumEmblemProps> = ({
  className = '',
  size = 170,
  customUrl,
  variant,
}) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(customUrl || null);

  useEffect(() => {
    if (customUrl) {
      setLogoUrl(customUrl);
      return;
    }
    const saved = localStorage.getItem('mak_custom_logo');
    if (saved) {
      setLogoUrl(saved);
    }

    const handleLogoUpdate = (e: any) => {
      if (e.detail?.logoUrl) {
        setLogoUrl(e.detail.logoUrl);
      } else if (e.detail?.reset) {
        setLogoUrl(null);
      }
    };

    window.addEventListener('mak-logo-updated', handleLogoUpdate);
    return () => window.removeEventListener('mak-logo-updated', handleLogoUpdate);
  }, [customUrl]);

  // If a custom image was uploaded via Admin Portal, display it with high fidelity
  if (logoUrl) {
    return (
      <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
        <img
          src={logoUrl}
          alt="MAK - GROUP Logo"
          style={{ width: size, height: size, objectFit: 'contain' }}
          className="drop-shadow-[0_8px_20px_rgba(30,41,59,0.25)] transition-transform duration-300 hover:scale-105 rounded-full"
          onError={() => setLogoUrl(null)}
        />
      </div>
    );
  }

  // Primary transparent logo (mak_transparent)
  if (variant === 'white-round') {
    return <HomeRoundLogo size={size} className={className} />;
  }

  // Default to HeaderGreyLogo (transparent logo)
  return <HeaderGreyLogo size={size} className={className} />;
};
