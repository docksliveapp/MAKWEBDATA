import React from 'react';

interface HomeRoundLogoProps {
  size?: number;
  className?: string;
  customUrl?: string;
}

export const HomeRoundLogo: React.FC<HomeRoundLogoProps> = ({
  size = 180,
  className = '',
  customUrl,
}) => {
  const [logoUrl, setLogoUrl] = React.useState<string | null>(customUrl || null);

  React.useEffect(() => {
    if (customUrl) {
      setLogoUrl(customUrl);
      return;
    }
    const saved = localStorage.getItem('mak_home_logo') || localStorage.getItem('mak_custom_logo');
    if (saved) {
      setLogoUrl(saved);
    }

    const handleUpdate = (e: any) => {
      if (e.detail?.homeLogo) {
        setLogoUrl(e.detail.homeLogo);
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
          alt="MAK - GROUP Home Round Logo"
          style={{ width: size, height: size, objectFit: 'contain' }}
          className="rounded-full shadow-[0_16px_36px_rgba(15,23,42,0.18)] transition-transform duration-500 hover:scale-105 border-4 border-white"
          onError={() => setLogoUrl(null)}
        />
      </div>
    );
  }

  // Exact White Round Logo matching user's erasebg-transformed.png
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_16px_36px_rgba(15,23,42,0.18)] transition-transform duration-500 hover:scale-105"
      >
        <defs>
          {/* Subtle Outer Drop Shadow */}
          <radialGradient id="discShine" cx="30%" cy="25%" r="75%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="85%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#EEF2F6" />
          </radialGradient>

          {/* Charcoal Metallic Rim */}
          <linearGradient id="medallionRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="25%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="75%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0B1120" />
          </linearGradient>

          {/* Platinum Inlay Ring */}
          <linearGradient id="innerInlay" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Gold Accent Rim for Heritage Touch */}
          <linearGradient id="goldFiligree" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Text Arc Paths */}
          {/* Top Arc for "M.A.K GROUP" */}
          <path id="topTextArc" d="M 30,100 A 70,70 0 0,1 170,100" />
          {/* Bottom Arc for "LOGISTICS & MARITIME • 45 YEARS" */}
          <path id="bottomTextArc" d="M 168,105 A 68,68 0 0,1 32,105" />
        </defs>

        {/* Outer Heavy Circular Rim */}
        <circle cx="100" cy="100" r="97" fill="url(#medallionRim)" stroke="#0F172A" strokeWidth="1.5" />
        
        {/* Subtle Gold / Platinum Stepped Bezel */}
        <circle cx="100" cy="100" r="93" fill="none" stroke="url(#goldFiligree)" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="90" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />

        {/* PRISTINE SOLID WHITE ROUND INTERIOR DISC */}
        <circle cx="100" cy="100" r="88" fill="url(#discShine)" stroke="#CBD5E1" strokeWidth="1" />

        {/* Concentric Beaded Border */}
        <circle cx="100" cy="100" r="84" fill="none" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
        <circle cx="100" cy="100" r="62" fill="none" stroke="#94A3B8" strokeWidth="0.8" opacity="0.5" />

        {/* Top Arc Text: "M.A.K GROUP" */}
        <text
          fill="#0F172A"
          fontSize="14.5"
          fontWeight="900"
          letterSpacing="4"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          <textPath href="#topTextArc" startOffset="50%" textAnchor="middle">
            M.A.K GROUP
          </textPath>
        </text>

        {/* Left & Right Decorative Emblem Stars */}
        {/* Left Star */}
        <g transform="translate(26, 99) scale(0.8)">
          <polygon points="0,-6 1.8,-1.8 6.3,-1.8 2.7,0.9 4,5.4 0,2.7 -4,5.4 -2.7,0.9 -6.3,-1.8 -1.8,-1.8" fill="#B45309" />
        </g>
        {/* Right Star */}
        <g transform="translate(174, 99) scale(0.8)">
          <polygon points="0,-6 1.8,-1.8 6.3,-1.8 2.7,0.9 4,5.4 0,2.7 -4,5.4 -2.7,0.9 -6.3,-1.8 -1.8,-1.8" fill="#B45309" />
        </g>

        {/* Bottom Arc Text: "LOGISTICS & MARITIME • 45 YEARS" */}
        <text
          fill="#334155"
          fontSize="8.5"
          fontWeight="800"
          letterSpacing="2.5"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          <textPath href="#bottomTextArc" startOffset="50%" textAnchor="middle">
            LOGISTICS • MARITIME • PAKISTAN
          </textPath>
        </text>

        {/* INNER EMBLEM CORE */}
        <g transform="translate(100, 102)">
          {/* Inner Light Circle Background */}
          <circle cx="0" cy="0" r="42" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />

          {/* Latitude & Longitude Globe Lines */}
          <circle cx="0" cy="0" r="38" fill="none" stroke="#E2E8F0" strokeWidth="1" />
          <ellipse cx="0" cy="0" rx="38" ry="17" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
          <ellipse cx="0" cy="0" rx="19" ry="38" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
          <line x1="-38" y1="0" x2="38" y2="0" stroke="#CBD5E1" strokeWidth="0.8" />
          <line x1="0" y1="-38" x2="0" y2="38" stroke="#CBD5E1" strokeWidth="0.8" />

          {/* Stylized Compass / Navigation Rose Points */}
          <path d="M0 -34 L3 -12 L0 -16 L-3 -12 Z" fill="#B45309" />
          <path d="M0 34 L3 12 L0 16 L-3 12 Z" fill="#94A3B8" />
          <path d="M-34 0 L-12 3 L-16 0 L-12 -3 Z" fill="#94A3B8" />
          <path d="M34 0 L12 3 L16 0 L12 -3 Z" fill="#94A3B8" />

          {/* Prominent Bold "MAK" Monogram Centerpiece */}
          {/* Letter 'M' */}
          <path
            d="M-28 14 L-28 -14 L-21 -14 L-15 0 L-9 -14 L-2 -14 L-2 14 L-8 14 L-8 -3 L-13 7 L-17 7 L-22 -3 L-22 14 Z"
            fill="#0F172A"
          />

          {/* Letter 'A' with sharp apex */}
          <path
            d="M-4 14 L4 -14 L11 -14 L19 14 L13 14 L11.2 7 L3.8 7 L2 14 Z M5.2 2 L9.8 2 L7.5 -7 Z"
            fill="#B45309"
          />

          {/* Letter 'K' */}
          <path
            d="M17 -14 L24 -14 L24 -2 L30 -14 L38 -14 L30 1 L39 14 L31 14 L24 3 L24 14 L17 14 Z"
            fill="#0F172A"
          />

          {/* Horizontal Golden Accent Underline */}
          <rect x="-26" y="19" width="52" height="2" rx="1" fill="url(#goldFiligree)" />

          {/* Subtext ribbon badge */}
          <text
            x="0"
            y="28"
            textAnchor="middle"
            fill="#475569"
            fontSize="5.5"
            fontWeight="800"
            letterSpacing="1.8"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            TRANSSHIPMENT
          </text>
        </g>
      </svg>
    </div>
  );
};
