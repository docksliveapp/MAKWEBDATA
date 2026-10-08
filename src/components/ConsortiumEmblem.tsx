import React, { useState, useEffect } from 'react';

export const ConsortiumEmblem: React.FC<{ className?: string; size?: number; customUrl?: string }> = ({ className = '', size = 170, customUrl }) => {
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

  if (logoUrl) {
    return (
      <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
        <img
          src={logoUrl}
          alt="MAK - GROUP Logo"
          style={{ width: size, height: size, objectFit: 'contain' }}
          className="drop-shadow-[0_8px_20px_rgba(180,130,40,0.3)] transition-transform duration-300 hover:scale-105 rounded-full"
          onError={() => setLogoUrl(null)}
        />
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className="drop-shadow-[0_10px_25px_rgba(180,130,40,0.35)] transition-transform duration-500 hover:scale-105"
      >
        <defs>
          {/* Radial gold sheen */}
          <radialGradient id="goldPlate" cx="45%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="25%" stopColor="#E3BE63" />
            <stop offset="55%" stopColor="#B38628" />
            <stop offset="85%" stopColor="#7E5813" />
            <stop offset="100%" stopColor="#4A3408" />
          </radialGradient>

          {/* Rim gradient */}
          <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="30%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#FEF3C7" />
            <stop offset="70%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* Dark inner center */}
          <radialGradient id="centerCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E2638" />
            <stop offset="80%" stopColor="#0B1120" />
            <stop offset="100%" stopColor="#050811" />
          </radialGradient>

          {/* Small sub-medal gold gradient */}
          <linearGradient id="subGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
        </defs>

        {/* Outer Beveled Gold Coin Rim */}
        <circle cx="100" cy="100" r="96" fill="url(#goldRim)" stroke="#5B3E0A" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="91" fill="url(#goldPlate)" />
        <circle cx="100" cy="100" r="88" fill="none" stroke="#68470E" strokeWidth="1" strokeDasharray="2,2" />

        {/* Concentric Step */}
        <circle cx="100" cy="100" r="85" fill="none" stroke="#FDE68A" strokeWidth="1" opacity="0.8" />
        <circle cx="100" cy="100" r="82" fill="url(#centerCore)" stroke="#D4AF37" strokeWidth="1.5" />

        {/* 4 Cardinal Nodes for DPL, Truckit, Muhib, Vantage */}
        {/* Top Node: DPL */}
        <g transform="translate(100, 34)">
          <circle cx="0" cy="0" r="14" fill="#0A0E1A" stroke="url(#subGold)" strokeWidth="1.5" />
          <text
            x="0"
            y="3.5"
            textAnchor="middle"
            fill="#FDE68A"
            fontSize="8"
            fontWeight="bold"
            fontFamily="Outfit, sans-serif"
            letterSpacing="0.5"
          >
            DPL
          </text>
        </g>

        {/* Right Node: Vantage */}
        <g transform="translate(162, 100)">
          <circle cx="0" cy="0" r="14" fill="#0A0E1A" stroke="url(#subGold)" strokeWidth="1.5" />
          <path
            d="M -7 -2 Q 0 -6 7 -2 Q 0 4 -7 -2"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.5"
          />
          <path
            d="M -5 2 Q 0 6 5 2"
            fill="none"
            stroke="#FDE68A"
            strokeWidth="1.2"
          />
        </g>

        {/* Bottom Node: Truckit */}
        <g transform="translate(100, 166)">
          <circle cx="0" cy="0" r="14" fill="#0A0E1A" stroke="url(#subGold)" strokeWidth="1.5" />
          {/* Truck stripes red & blue */}
          <rect x="-8" y="-4" width="16" height="2" fill="#EF4444" rx="1" />
          <rect x="-8" y="-1" width="16" height="2" fill="#F8FAFC" rx="1" />
          <rect x="-8" y="2" width="16" height="2" fill="#3B82F6" rx="1" />
        </g>

        {/* Left Node: Muhib */}
        <g transform="translate(38, 100)">
          <circle cx="0" cy="0" r="14" fill="#0A0E1A" stroke="url(#subGold)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="7" fill="none" stroke="#10B981" strokeWidth="1.2" />
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fill="#FDE68A"
            fontSize="7"
            fontWeight="bold"
            fontFamily="Cinzel, serif"
          >
            M
          </text>
        </g>

        {/* Central Core Circle with Gold Ring */}
        <circle cx="100" cy="100" r="42" fill="#0B132B" stroke="url(#goldRim)" strokeWidth="2" />
        <circle cx="100" cy="100" r="39" fill="none" stroke="#FDE68A" strokeWidth="0.8" opacity="0.6" />

        {/* Brand Text */}
        <text
          x="100"
          y="93"
          textAnchor="middle"
          fill="#FDE68A"
          fontSize="16"
          fontWeight="900"
          fontFamily="Cinzel, serif"
          letterSpacing="2"
        >
          MAK
        </text>

        <text
          x="100"
          y="103"
          textAnchor="middle"
          fill="#E2E8F0"
          fontSize="5.5"
          fontWeight="700"
          fontFamily="Outfit, sans-serif"
          letterSpacing="1.2"
        >
          GROUP OF COMPANIES
        </text>

        <line x1="72" y1="107" x2="128" y2="107" stroke="#D97706" strokeWidth="0.8" opacity="0.8" />

        <text
          x="100"
          y="114"
          textAnchor="middle"
          fill="#CBD5E1"
          fontSize="4.2"
          fontWeight="600"
          fontFamily="Outfit, sans-serif"
          letterSpacing="0.8"
        >
          DOCKS • TRUCKIT
        </text>
        <text
          x="100"
          y="120"
          textAnchor="middle"
          fill="#CBD5E1"
          fontSize="4.2"
          fontWeight="600"
          fontFamily="Outfit, sans-serif"
          letterSpacing="0.8"
        >
          MUHIB • VANTAGE
        </text>
      </svg>
    </div>
  );
};
