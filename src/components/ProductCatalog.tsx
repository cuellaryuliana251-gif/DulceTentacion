import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, Sparkles, Check, ChevronRight } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product, selectedBase?: string) => void;
  onOpenConfigurator: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddToCart,
  onOpenConfigurator,
}) => {
  const [selectedBases, setSelectedBases] = useState<Record<string, string>>({
    'dona-individual': 'Chocolate',
    'caja-6-unidades': 'Surtida (Mora, Arequipe, Choco)',
  });
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const handleBaseChange = (productId: string, base: string) => {
    setSelectedBases(prev => ({ ...prev, [productId]: base }));
  };

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product, selectedBases[product.id]);
    setAddedItemNotice(product.id);
    setTimeout(() => setAddedItemNotice(null), 1800);
  };

  return (
    <section id="catalogo" className="py-16 md:py-20 bg-white/70 border-y border-pink-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-pink-700 tracking-wide uppercase">
            <span>Catálogo Oficial</span>
            <span aria-hidden="true">·</span>
            <span>Gualanday, Tolima</span>
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl text-[#29150d] font-bold mt-1 tracking-tight">
            Nuestra Presentación
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
            Elaboración artesanal con estándares de higiene impecables. Elige tu formato preferido para disfrutar solo o compartir.
          </p>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const isPersonalized = product.category === 'personalizada';

            return (
              <div
                key={product.id}
                className="group relative flex flex-col bg-[#FFF9FA] rounded-2xl border border-pink-200/70 hover:border-pink-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Product Image Slot */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-pink-100/40">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Warning label from official PDF */}
                  {product.subtitle.includes('ALTO EN AZÚCARES') && (
                    <div className="absolute top-3 left-3 bg-[#1c110b]/85 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase">
                      Alto en Azúcares
                    </div>
                  )}

                  {/* Product Badge */}
                  {product.badge && (
                    <div className="absolute top-3 right-3 bg-white/95 text-purple-900 border border-purple-200 text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Metadata line */}
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                      <span>{product.tags.join(' · ')}</span>
                    </div>

                    <h3 className="font-serif-brand text-xl font-bold text-[#29150d] group-hover:text-pink-600 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Flavor selector for individual or box */}
                  {!isPersonalized && (
                    <div className="pt-2 border-t border-pink-100">
                      <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        {product.category === 'caja' ? 'Variedad sugerida:' : 'Glaseado base deseado:'}
                      </label>
                      <select
                        aria-label={`Seleccionar glaseado para ${product.name}`}
                        value={selectedBases[product.id] || 'Chocolate'}
                        onChange={(e) => handleBaseChange(product.id, e.target.value)}
                        className="w-full text-xs bg-white border border-pink-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-pink-500"
                      >
                        {product.category === 'caja' ? (
                          <>
                            <option value="Surtida (Mora, Arequipe, Choco, Fresa, Menta)">Surtida Clásica (6 sabores variados)</option>
                            <option value="Full Chocolate Artesanal">Full Chocolate & Arequipe</option>
                            <option value="Frutas & Glaseado Silvestre">Frutas & Mora Silvestre</option>
                          </>
                        ) : (
                          <>
                            <option value="Chocolate">Chocolate Real de Repostería</option>
                            <option value="Mora">Mora Silvestre del Tolima</option>
                            <option value="Arequipe">Arequipe Tradicional</option>
                            <option value="Fresa">Fresa Suave Glaseada</option>
                            <option value="Menta">Menta Fresca Glaseada</option>
                          </>
                        )}
                      </select>
                    </div>
                  )}

                  {/* Price & Primary Action */}
                  <div className="pt-3 flex items-center justify-between border-t border-pink-200/50">
                    <div>
                      <span className="text-[11px] text-stone-500 block uppercase">Precio</span>
                      <span className="font-data text-lg font-bold text-[#29150d]">
                        ${product.price.toLocaleString('es-CO')}{' '}
                        {product.maxPrice ? `- $${product.maxPrice.toLocaleString('es-CO')}` : 'COP'}
                      </span>
                    </div>

                    {isPersonalized ? (
                      <button
                        onClick={onOpenConfigurator}
                        className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 rounded-xl shadow-xs transition-all active:scale-95"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Configurar</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleQuickAdd(product)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all shadow-xs active:scale-95 ${
                          addedItemNotice === product.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-pink-600 hover:bg-pink-700 text-white'
                        }`}
                      >
                        {addedItemNotice === product.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>¡Agregado!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Añadir</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
