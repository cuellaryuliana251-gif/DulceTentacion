import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="Contacto directo por WhatsApp" className="fixed bottom-6 right-6 z-30">
      <a
        href="https://wa.me/573213610322?text=¡Hola%20Dulce%20Tentación!%20Deseo%20hacer%20un%20pedido%20de%20donas%20artesanales%20en%20Gualanday."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp al 3213610322"
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-108 active:scale-95 ring-4 ring-white/80"
      >
        <MessageCircle className="w-7 h-7" />

        {/* Pulse effect */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-600 text-[9px] font-bold text-white items-center justify-center">
            1
          </span>
        </span>

        {/* Tooltip on hover */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#29150d] text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          WhatsApp Oficial: 3213610322
        </span>
      </a>
    </aside>
  );
};
