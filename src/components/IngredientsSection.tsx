import React from 'react';
import { INGREDIENTS_SHOWCASE } from '../data/mockData';
import { CheckCircle2, Sparkles, GraduationCap } from 'lucide-react';

export const IngredientsSection: React.FC = () => {
  return (
    <section id="ingredientes" className="py-16 md:py-24 bg-[#FFF4F7]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-pink-700 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>Compromiso de Excelencia</span>
              <span aria-hidden="true">·</span>
              <span>Gualanday</span>
            </div>

            <h2 className="font-serif-brand text-3xl sm:text-4xl text-[#29150d] font-bold tracking-tight">
              Calidad en cada Ingrediente
            </h2>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              Utilizamos materias primas seleccionadas para garantizar el mejor sabor, esponjosidad y textura inigualable. Cada lote es elaborado bajo estrictas normas de higiene y amor por la repostería artesanal.
            </p>

            <div className="p-4 bg-white/90 rounded-2xl border border-purple-200/80 shadow-xs flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0 text-purple-700">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#29150d]">Iniciativa Juvenil & Educativa</p>
                <p className="text-stone-600 mt-0.5 leading-relaxed">
                  Proceso de elaboración higiénico y artesanal realizado con dedicación por estudiantes de la <span className="font-semibold text-purple-800">I.E. Marco Fidel Suárez</span> en Gualanday, Tolima.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-pink-200/70 bg-white">
              <img
                src="/src/assets/images/bakery_artisan_craft_1790365936237.jpg"
                alt="Taller de repostería artesanal I.E. Marco Fidel Suárez"
                className="w-full h-80 object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-white text-xs border-t border-pink-100 flex items-center justify-between text-stone-600">
                <span className="font-medium">Taller de Masas & Glaseados Artesanales</span>
                <span className="font-semibold text-purple-700">100% Sin Grasas Trans</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Ingredient Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INGREDIENTS_SHOWCASE.map((item, index) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 border border-pink-200/70 hover:border-pink-300 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-pink-600 uppercase tracking-wider">
                    {item.highlight}
                  </span>
                  <span className="text-xs font-data text-stone-400">0{index + 1}</span>
                </div>
                <h3 className="font-serif-brand text-lg font-bold text-[#29150d] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-pink-100 flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Certificado en Receta Tolimense</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
