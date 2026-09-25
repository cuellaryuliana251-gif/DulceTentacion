import React from 'react';
import { Heart, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1F1009] text-stone-300 pt-12 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800 text-xs">
          
          {/* Brand info */}
          <div className="space-y-3 md:col-span-2">
            <span className="font-serif-brand text-2xl font-bold text-white tracking-tight">
              Dulce Tentación
            </span>
            <p className="text-stone-400 max-w-sm leading-relaxed">
              Emprendimiento de venta de donas artesanas elaborado por estudiantes de la I.E. Marco Fidel Suárez en Gualanday, Tolima. Masa madre esponjosa, coberturas de chocolate real y amor por la repostería.
            </p>
            <div className="flex items-center gap-1.5 text-pink-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>Gualanday, Tolima, Colombia</span>
            </div>
          </div>

          {/* Nav links */}
          <div className="space-y-2">
            <h4 className="font-bold text-stone-200 uppercase tracking-wider text-[11px]">Navegación</h4>
            <ul className="space-y-1.5 text-stone-400">
              <li><a href="#inicio" className="hover:text-pink-400 transition-colors">Inicio</a></li>
              <li><a href="#catalogo" className="hover:text-pink-400 transition-colors">Nuestra Presentación</a></li>
              <li><a href="#personalizador" className="hover:text-pink-400 transition-colors">Configura tu Dona</a></li>
              <li><a href="#ingredientes" className="hover:text-pink-400 transition-colors">Calidad e Ingredientes</a></li>
              <li><a href="#ai-hub" className="hover:text-pink-400 transition-colors">Extracción con IA & GitHub</a></li>
            </ul>
          </div>

          {/* Contact & Orders */}
          <div className="space-y-2">
            <h4 className="font-bold text-stone-200 uppercase tracking-wider text-[11px]">Atención & Pedidos</h4>
            <p className="text-stone-400">WhatsApp Oficial: <span className="text-emerald-400 font-semibold font-data">3213610322</span></p>
            <p className="text-stone-400">Entregas locales en Gualanday</p>
            <p className="text-stone-400">Efectivo contra entrega, Nequi y PSE</p>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-2">
          <p>© {new Date().getFullYear()} Dulce Tentación. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>por estudiantes de la I.E. Marco Fidel Suárez</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
