import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  const whatsappUrl = 'https://wa.me/923218496006?text=Hello%20MAK%20Group%20Consortium%20Operations,%20I%20would%20like%20to%20inquire%20about%20logistics%20and%20transshipment%20services.';

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-5 right-5 z-40 flex items-center select-none"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="WhatsApp Support"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:from-[#1EBE5D] hover:to-[#16A34A] text-white shadow-[0_6px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-108 active:scale-95"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
      </a>
    </aside>
  );
};
