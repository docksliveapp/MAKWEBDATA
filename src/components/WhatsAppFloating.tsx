import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  // Target number provided by user: 03218496006
  const whatsappUrl = 'https://wa.me/923218496006?text=Hello%20MAK%20Group%20Consortium%20Operations,%20I%20would%20like%20to%20inquire%20about%20logistics%20and%20transshipment%20services.';

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-50 flex items-center group select-none"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp Chat with MAK Group Logistics"
        className="relative flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:from-[#1EBE5D] hover:to-[#16A34A] text-white shadow-[0_8px_25px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {/* Animated radar rings */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-200"></span>
        </span>

        {/* WhatsApp Icon */}
        <div className="w-6 h-6 flex items-center justify-center shrink-0">
          <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        </div>

        {/* Text without exposing phone number on button face */}
        <div className="flex flex-col text-left pr-1 leading-tight">
          <span className="text-[10px] uppercase font-bold tracking-wider font-mono opacity-90">
            24/7 Operations Desk
          </span>
          <span className="text-xs font-bold tracking-wide">
            Chat on WhatsApp
          </span>
        </div>
      </a>
    </aside>
  );
};
