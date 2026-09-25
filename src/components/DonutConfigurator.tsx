import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BASES_LIST, TOPPINGS_LIST, SALSAS_LIST } from '../data/mockData';
import { CartItem } from '../types';
import { Sparkles, ShoppingBag, Check, RefreshCw } from 'lucide-react';

interface DonutConfiguratorProps {
  onAddCustomDonut: (item: CartItem) => void;
}

export const DonutConfigurator: React.FC<DonutConfiguratorProps> = ({ onAddCustomDonut }) => {
  const [presentation, setPresentation] = useState<'individual' | 'caja6'>('individual');
  const [selectedBase, setSelectedBase] = useState<'Chocolate' | 'Menta' | 'Fresa' | 'Arequipe' | 'Mora'>('Mora');
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['Oreo Crunch', 'Almendras Laminadas']);
  const [selectedSauce, setSelectedSauce] = useState<string>('Chocolate Real');
  const [isAdded, setIsAdded] = useState(false);

  // Pricing math matching document:
  // Base Individual: $5.000 | Caja 6: $25.000
  // Sauce: +$1.500
  const basePrice = presentation === 'individual' ? 5000 : 25000;
  const saucePrice = selectedSauce !== 'Ninguna' ? 1500 : 0;
  const subtotalItem = basePrice + saucePrice;

  // Glaze color mapping
  const glazeColors: Record<string, { bg: string; shine: string; name: string }> = {
    Mora: { bg: '#86198f', shine: '#c026d3', name: 'Mora Silvestre Púrpura' },
    Chocolate: { bg: '#3e1c0d', shine: '#5d2c16', name: 'Chocolate Gourmet' },
    Fresa: { bg: '#e11d48', shine: '#fb7185', name: 'Fresa Glaseada Rosa' },
    Arequipe: { bg: '#b45309', shine: '#d97706', name: 'Arequipe Dulce de Leche' },
    Menta: { bg: '#059669', shine: '#34d399', name: 'Menta Fresca' },
  };

  const sauceColors: Record<string, string> = {
    'Chocolate Real': '#29150d',
    'Arequipe Tradicional': '#92400e',
    'Fresa Silvestre': '#be123c',
    'Maracuyá Intenso': '#ca8a04',
    'Lechera Dulce': '#fef08a',
    'Ninguna': 'transparent',
  };

  const toggleTopping = (toppingName: string) => {
    setSelectedToppings(prev => {
      if (prev.includes(toppingName)) {
        return prev.filter(t => t !== toppingName);
      }
      if (prev.length >= 3) {
        // limit to 3 for optimal visual balance
        return [...prev.slice(1), toppingName];
      }
      return [...prev, toppingName];
    });
  };

  const handleAddToCart = () => {
    const customItem: CartItem = {
      id: `custom-${Date.now()}`,
      productId: 'dona-personalizada',
      title: presentation === 'individual' ? 'Dona Personalizada Artesanal' : 'Caja de 6 Donas Personalizadas',
      description: `Base: ${selectedBase} · Toppings: ${selectedToppings.join(', ') || 'Ninguno'} · Salsa: ${selectedSauce}`,
      customDetails: {
        base: selectedBase,
        toppings: selectedToppings,
        sauce: selectedSauce,
      },
      unitPrice: subtotalItem,
      quantity: 1,
      image: '/src/assets/images/hero_gourmet_donuts_1790365906517.jpg',
    };

    onAddCustomDonut(customItem);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="personalizador" className="py-16 md:py-24 bg-gradient-to-b from-white/40 via-purple-50/40 to-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-700 bg-purple-100/70 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Paso 1 del Sistema de Pedidos</span>
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl text-[#29150d] font-bold tracking-tight">
            1. Configura tu Dona Gourmet
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Elige cada capa de sabor: desde la masa esponjosa hasta la salsa líquida artesanal. Observa cómo cobra vida tu creación en tiempo real.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Donut 2D/3D Graphic Viewport */}
          <div className="lg:col-span-5 sticky top-24 bg-white rounded-3xl p-6 sm:p-8 border border-purple-200/80 shadow-md">
            <div className="text-center mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600">Previsualización en Vivo</span>
              <h3 className="font-serif-brand text-xl font-bold text-[#29150d]">
                {glazeColors[selectedBase]?.name}
              </h3>
            </div>

            {/* Donut SVG Animation Canvas */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto flex items-center justify-center">
              <motion.div
                key={`${selectedBase}-${selectedSauce}-${selectedToppings.length}`}
                initial={{ scale: 0.94, rotate: -4 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 14 }}
                className="w-full h-full relative"
              >
                <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl">
                  {/* Drop shadow */}
                  <ellipse cx="150" cy="270" rx="90" ry="16" fill="rgba(0,0,0,0.12)" />

                  {/* Golden-baked Donut Dough Base */}
                  <defs>
                    <radialGradient id="doughGradient" cx="40%" cy="35%">
                      <stop offset="0%" stopColor="#fde047" />
                      <stop offset="60%" stopColor="#d97706" />
                      <stop offset="100%" stopColor="#92400e" />
                    </radialGradient>
                    <radialGradient id="glazeGradient" cx="35%" cy="30%">
                      <stop offset="0%" stopColor={glazeColors[selectedBase]?.shine || '#c026d3'} />
                      <stop offset="85%" stopColor={glazeColors[selectedBase]?.bg || '#86198f'} />
                      <stop offset="100%" stopColor="#29150d" />
                    </radialGradient>
                  </defs>

                  {/* Outer Dough ring */}
                  <path
                    d="M 150, 20
                       A 130,130 0 1,0 150,280
                       A 130,130 0 1,0 150,20 Z
                       M 150, 105
                       A 45,45 0 1,1 150,195
                       A 45,45 0 1,1 150,105 Z"
                    fill="url(#doughGradient)"
                    fillRule="evenodd"
                  />

                  {/* Organic Glaze Wave Overlay */}
                  <path
                    d="M 150, 30
                       C 195,30 220,40 245,65
                       C 270,90 275,120 270,155
                       C 265,190 250,215 225,245
                       C 200,270 170,270 145,268
                       C 115,265 85,255 60,230
                       C 35,200 25,165 30,135
                       C 35,100 65,55 95,40
                       C 120,28 135,30 150,30 Z
                       M 150, 108
                       C 165,108 185,115 190,135
                       C 195,155 185,175 170,188
                       C 155,198 135,195 125,185
                       C 112,172 108,150 115,130
                       C 120,115 138,108 150,108 Z"
                    fill="url(#glazeGradient)"
                    fillRule="evenodd"
                    className="transition-colors duration-500"
                  />

                  {/* Glossy reflection highlight */}
                  <path
                    d="M 85,60 C 110,48 140,46 170,52 C 150,58 125,60 100,72 C 90,78 82,75 85,60 Z"
                    fill="rgba(255,255,255,0.45)"
                  />

                  {/* Drizzled Sauce Ribbon */}
                  {selectedSauce !== 'Ninguna' && (
                    <path
                      d="M 60,110 Q 90,80 130,120 T 210,100 T 250,160 M 70,170 Q 110,150 160,200 T 235,190"
                      fill="none"
                      stroke={sauceColors[selectedSauce] || '#29150d'}
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-95"
                    />
                  )}

                  {/* Toppings scattering */}
                  {selectedToppings.includes('Chispas de Chocolate') && (
                    <g fill="#f43f5e">
                      <rect x="75" y="80" width="12" height="4" rx="2" transform="rotate(25 75 80)" fill="#ec4899" />
                      <rect x="210" y="75" width="12" height="4" rx="2" transform="rotate(-30 210 75)" fill="#a855f7" />
                      <rect x="80" y="190" width="12" height="4" rx="2" transform="rotate(60 80 190)" fill="#38bdf8" />
                      <rect x="220" y="180" width="12" height="4" rx="2" transform="rotate(-15 220 180)" fill="#fbbf24" />
                      <rect x="150" y="60" width="12" height="4" rx="2" transform="rotate(45 150 60)" fill="#ffffff" />
                      <rect x="180" y="230" width="12" height="4" rx="2" transform="rotate(-40 180 230)" fill="#34d399" />
                    </g>
                  )}

                  {selectedToppings.includes('Oreo Crunch') && (
                    <g fill="#18181b">
                      <circle cx="95" cy="100" r="5" />
                      <circle cx="115" cy="70" r="4" fill="#3f3f46" />
                      <circle cx="195" cy="85" r="5.5" />
                      <circle cx="215" cy="140" r="4.5" />
                      <circle cx="75" cy="150" r="4" />
                      <circle cx="110" cy="225" r="5" fill="#3f3f46" />
                      <circle cx="185" cy="220" r="4.5" />
                    </g>
                  )}

                  {selectedToppings.includes('Almendras Laminadas') && (
                    <g fill="#fef3c7" stroke="#d97706" strokeWidth="0.8">
                      <ellipse cx="90" cy="85" rx="8" ry="4" transform="rotate(35 90 85)" />
                      <ellipse cx="200" cy="95" rx="8" ry="4" transform="rotate(-45 200 95)" />
                      <ellipse cx="140" cy="65" rx="7" ry="3.5" transform="rotate(10 140 65)" />
                      <ellipse cx="220" cy="170" rx="8" ry="4" transform="rotate(25 220 170)" />
                      <ellipse cx="95" cy="210" rx="8" ry="4" transform="rotate(-30 95 210)" />
                      <ellipse cx="160" cy="235" rx="7" ry="3.5" transform="rotate(50 160 235)" />
                    </g>
                  )}

                  {selectedToppings.includes('Maní Tostado') && (
                    <g fill="#d97706">
                      <ellipse cx="105" cy="80" rx="6" ry="3" />
                      <ellipse cx="185" cy="75" rx="6" ry="3" />
                      <ellipse cx="225" cy="120" rx="6" ry="3" />
                      <ellipse cx="70" cy="130" rx="6" ry="3" />
                      <ellipse cx="130" cy="230" rx="6" ry="3" />
                    </g>
                  )}

                  {selectedToppings.includes('Coco Rallado') && (
                    <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="85" y1="95" x2="98" y2="92" />
                      <line x1="190" y1="80" x2="202" y2="88" />
                      <line x1="135" y1="65" x2="146" y2="70" />
                      <line x1="210" y1="160" x2="222" y2="155" />
                      <line x1="80" y1="170" x2="92" y2="175" />
                      <line x1="170" y1="225" x2="182" y2="228" />
                    </g>
                  )}

                  {selectedToppings.includes('Nutella Pura') && (
                    <g fill="#451a03">
                      <circle cx="85" cy="115" r="7" />
                      <circle cx="205" cy="110" r="7.5" />
                      <circle cx="140" cy="75" r="8" />
                      <circle cx="165" cy="225" r="7" />
                    </g>
                  )}
                </svg>
              </motion.div>
            </div>

            {/* Breakdown Pill */}
            <div className="mt-6 pt-4 border-t border-purple-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">Subtotal Item:</span>
              <span className="font-data text-base font-bold text-pink-700">
                ${subtotalItem.toLocaleString('es-CO')} COP
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className={`mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95 ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>¡Añadida al Carrito con Éxito!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Agregar al Carrito (${subtotalItem.toLocaleString('es-CO')})</span>
                </>
              )}
            </button>
          </div>

          {/* Configuration Controls (Right) */}
          <div className="lg:col-span-7 space-y-8 bg-white/90 rounded-3xl p-6 sm:p-8 border border-pink-200/80 shadow-sm">
            
            {/* 1. Presentación */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  1. Elige tu Presentación:
                </span>
                <span className="text-xs text-stone-500">Documento Oficial</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPresentation('individual')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    presentation === 'individual'
                      ? 'border-pink-500 bg-pink-50/60 ring-1 ring-pink-500'
                      : 'border-stone-200 hover:border-pink-300'
                  }`}
                >
                  <p className="font-bold text-xs text-[#29150d]">Dona Individual</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Esponjosa y fresca del día</p>
                  <p className="font-data text-xs font-bold text-pink-700 mt-1">$5.000 COP</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPresentation('caja6')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    presentation === 'caja6'
                      ? 'border-purple-600 bg-purple-50/60 ring-1 ring-purple-600'
                      : 'border-stone-200 hover:border-purple-300'
                  }`}
                >
                  <p className="font-bold text-xs text-[#29150d]">Caja de 6 Unidades</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Para compartir en familia</p>
                  <p className="font-data text-xs font-bold text-purple-700 mt-1">$25.000 COP</p>
                </button>
              </div>
            </div>

            {/* 2. Sabor Base */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  2. Sabor Base (Glaseado Artesanal):
                </span>
                <span className="text-xs text-purple-700 font-semibold">{selectedBase}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {BASES_LIST.map((base) => {
                  const isSelected = selectedBase === base;
                  return (
                    <button
                      key={base}
                      type="button"
                      onClick={() => setSelectedBase(base)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50 ring-1 ring-purple-600 font-bold text-purple-950 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <span className="text-xs">{base}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Toppings */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  3. Añadir Toppings (Hasta 3 incluidos):
                </span>
                <span className="text-xs text-stone-500">{selectedToppings.length}/3 seleccionados</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TOPPINGS_LIST.map((topping) => {
                  const isChecked = selectedToppings.includes(topping.name);
                  return (
                    <button
                      key={topping.name}
                      type="button"
                      onClick={() => toggleTopping(topping.name)}
                      className={`px-3 py-2 rounded-lg border text-left text-xs flex items-center justify-between transition-all ${
                        isChecked
                          ? 'border-pink-500 bg-pink-50/70 text-pink-950 font-semibold'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <span className="truncate">{topping.name}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-pink-600 shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Salsas */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  4. Añadir Salsa Artesanal:
                </span>
                <span className="text-xs text-stone-500 font-data">+$1.500 COP</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSauce('Ninguna')}
                  className={`p-2.5 rounded-lg border text-xs text-center transition-all ${
                    selectedSauce === 'Ninguna'
                      ? 'border-stone-800 bg-stone-100 font-bold text-stone-900'
                      : 'border-stone-200 hover:border-stone-300 text-stone-600'
                  }`}
                >
                  Sin Salsa Adicional
                </button>
                {SALSAS_LIST.map((sauce) => {
                  const isSelected = selectedSauce === sauce.name;
                  return (
                    <button
                      key={sauce.name}
                      type="button"
                      onClick={() => setSelectedSauce(sauce.name)}
                      className={`p-2.5 rounded-lg border text-xs text-center transition-all ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50 font-bold text-purple-900 ring-1 ring-purple-600'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      {sauce.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset button */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setSelectedBase('Mora');
                  setSelectedToppings(['Oreo Crunch']);
                  setSelectedSauce('Chocolate Real');
                }}
                className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Restablecer opciones</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
