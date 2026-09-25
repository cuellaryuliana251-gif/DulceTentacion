import React from 'react';
import { ShoppingBag, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  isCustomerVerified: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigate,
  activeSection,
  isCustomerVerified
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFF6F9]/90 backdrop-blur-md border-b border-pink-200/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#inicio" 
          onClick={(e) => { e.preventDefault(); onNavigate('inicio'); }}
          className="group flex items-center gap-2"
        >
          <span className="font-serif-brand text-2xl font-bold tracking-tight text-[#29150d] group-hover:text-pink-600 transition-colors">
            Dulce Tentación
          </span>
          <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
          <button 
            onClick={() => onNavigate('inicio')}
            className={`transition-colors hover:text-pink-600 ${activeSection === 'inicio' ? 'text-pink-600 font-semibold' : ''}`}
          >
            Inicio
          </button>
          <button 
            onClick={() => onNavigate('catalogo')}
            className={`transition-colors hover:text-pink-600 ${activeSection === 'catalogo' ? 'text-pink-600 font-semibold' : ''}`}
          >
            Nuestra Presentación
          </button>
          <button 
            onClick={() => onNavigate('personalizador')}
            className={`flex items-center gap-1.5 transition-colors hover:text-purple-700 ${activeSection === 'personalizador' ? 'text-purple-700 font-semibold' : ''}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            Configura tu Dona
          </button>
          <button 
            onClick={() => onNavigate('ingredientes')}
            className={`transition-colors hover:text-pink-600 ${activeSection === 'ingredientes' ? 'text-pink-600 font-semibold' : ''}`}
          >
            Calidad & Taller
          </button>
          <button 
            onClick={() => onNavigate('ai-hub')}
            className={`flex items-center gap-1.5 transition-colors hover:text-pink-600 ${activeSection === 'ai-hub' ? 'text-pink-600 font-semibold' : ''}`}
          >
            <span>IA & Inventario</span>
          </button>
          <button 
            onClick={() => onNavigate('contacto')}
            className={`transition-colors hover:text-pink-600 ${activeSection === 'contacto' ? 'text-pink-600 font-semibold' : ''}`}
          >
            Contacto & Sugerencias
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {isCustomerVerified && (
            <div className="hidden lg:flex items-center gap-1 text-xs text-purple-700 bg-purple-100/80 px-2.5 py-1 rounded-md border border-purple-200">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Cliente Verificado</span>
            </div>
          )}

          <a 
            href="https://wa.me/573213610322?text=Hola%20Dulce%20Tentación!%20Quiero%20información%20sobre%20sus%20donas%20artesanales%20en%20Gualanday."
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>3213610322</span>
          </a>

          <button
            onClick={onOpenCart}
            aria-label="Abrir carrito de compras"
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden xs:inline">Carrito</span>
            <span className="w-5 h-5 rounded-full bg-white text-purple-800 text-[11px] font-bold flex items-center justify-center font-data">
              {cartCount}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
