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
  const [logoUrl, setLogoUrl] = React.useState<string | null>(customUrl || null);

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

  // Exact Grey Transparent Logo matching user's mak_transparent.png
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(30,41,59,0.25)]"
      >
        <defs>
          {/* Metallic Silver-Grey Outer Ring Gradient */}
          <linearGradient id="silverRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="25%" stopColor="#CBD5E1" />
            <stop offset="50%" stopColor="#64748B" />
            <stop offset="75%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* Platinum Core Gradient */}
          <radialGradient id="platinumSheen" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#E2E8F0" stopOpacity="0.4" />
            <stop offset="85%" stopColor="#94A3B8" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#475569" stopOpacity="0.0" />
          </radialGradient>

          {/* Metallic Monogram Gradient */}
          <linearGradient id="chromeText" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="20%" stopColor="#E2E8F0" />
            <stop offset="45%" stopColor="#64748B" />
            <stop offset="55%" stopColor="#334155" />
            <stop offset="80%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* Precision Bevel Gradient */}
          <linearGradient id="greyBevel" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
        </defs>

        {/* Outer Circular Chrome Bezel */}
        <circle cx="50" cy="50" r="47" stroke="url(#silverRim)" strokeWidth="3" fill="none" opacity="0.95" />
        <circle cx="50" cy="50" r="43" stroke="url(#greyBevel)" strokeWidth="1" fill="none" opacity="0.6" strokeDasharray="3 1.5" />
        
        {/* Subtle transparent metallic disc fill */}
        <circle cx="50" cy="50" r="41" fill="url(#platinumSheen)" />

        {/* Dynamic Logistics Hexagonal / Shield Core Accent */}
        <path
          d="M50 14 L80 27 L80 63 L50 86 L20 63 L20 27 Z"
          stroke="url(#silverRim)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.45"
        />

        {/* Central Stylized "M A K" Monogram */}
        {/* 'M' Letter Left Pillar & Cross */}
        <path
          d="M26 66 L26 34 L33 34 L40 48 L47 34 L54 34 L54 66 L47 66 L47 45 L41.5 56 L38.5 56 L33 45 L33 66 Z"
          fill="url(#chromeText)"
        />

        {/* 'A' stylized overlapping delta */}
        <path
          d="M50 33 L62 66 L55 66 L52.5 59 L47.5 59 L49 55 L51.5 55 L50 42 Z"
          fill="url(#silverRim)"
        />

        {/* 'K' sharp wing / chevron */}
        <path
          d="M61 34 L68 34 L68 46 L76 34 L84 34 L74.5 48 L85 66 L77 66 L68 52 L68 66 L61 66 Z"
          fill="url(#chromeText)"
        />

        {/* Horizontal Navigation / Highway Route Divider */}
        <line x1="22" y1="71" x2="78" y2="71" stroke="url(#greyBevel)" strokeWidth="1.2" strokeLinecap="round" />
        
        {/* Subtle "GROUP" tracking mark */}
        <text
          x="50"
          y="79"
          textAnchor="middle"
          fill="#334155"
          fontSize="6.5"
          fontWeight="800"
          letterSpacing="3.5"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          GROUP
        </text>

        {/* Cardinal Navigation Points (North, South, East, West pips) */}
        <circle cx="50" cy="8" r="1.5" fill="#475569" />
        <circle cx="50" cy="92" r="1.5" fill="#475569" />
        <circle cx="8" cy="50" r="1.5" fill="#475569" />
        <circle cx="92" cy="50" r="1.5" fill="#475569" />
      </svg>
    </div>
  );
};
