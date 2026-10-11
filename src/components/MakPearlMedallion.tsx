import React from 'react';

interface MakPearlMedallionProps {
  size?: number;
  className?: string;
}

/**
 * MakPearlMedallion
 * The exact 3D pearl medallion logo matching user's uploaded mak_pearl_grey_edge.png.
 * Displayed directly on the Home page above "UNIFIED LOGISTICS".
 */
export const MakPearlMedallion: React.FC<MakPearlMedallionProps> = ({
  size = 190,
  className = '',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/mak_pearl_grey_edge.svg"
        alt="MAK - GROUP OF COMPANIES 3D Pearl Medallion"
        style={{ width: size, height: size }}
        className="w-full h-full object-contain select-none drop-shadow-[0_16px_36px_rgba(15,23,42,0.22)] transition-transform duration-300 hover:scale-105"
        loading="eager"
      />
    </div>
  );
};
