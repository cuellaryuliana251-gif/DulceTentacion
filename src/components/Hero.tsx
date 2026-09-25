import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Heart, Award, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onCustomizeClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onCustomizeClick }) => {
  return (
    <section id="inicio" className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-pink-300/20 via-purple-300/20 to-pink-200/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Block */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Subtle editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
              <span>Gualanday, Tolima</span>
              <span aria-hidden="true">·</span>
              <span>I.E. Marco Fidel Suárez</span>
            </div>

            <h1 className="font-serif-brand text-4xl sm:text-5xl lg:text-6xl text-[#29150d] leading-[1.12] tracking-tight text-balance">
              El arte de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-700 to-pink-700">dona artesanal</span> hecha con amor.
            </h1>

            <p className="text-base sm:text-lg text-stone-700 max-w-xl leading-relaxed">
              Descubre nuestras recetas tradicionales de masa esponjosa y fresca, glaseados gourmet y combinaciones infinitas preparadas diariamente por estudiantes emprendedores tolimenses.
            </p>

            {/* Quick Proof Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-stone-600 font-medium">
              <div className="flex items-center gap-1.5 text-stone-800">
                <Heart className="w-4 h-4 text-pink-600 fill-pink-500/20" />
                <span>Preparada diariamente</span>
              </div>
              <span className="text-stone-300">/</span>
              <div className="flex items-center gap-1.5 text-stone-800">
                <Award className="w-4 h-4 text-purple-600" />
                <span>Mantequilla pura sin grasas trans</span>
              </div>
              <span className="text-stone-300">/</span>
              <div className="flex items-center gap-1.5 text-stone-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Checkout verificado & Factura PDF</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onCustomizeClick}
                className="group flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-pink-200 group-hover:rotate-12 transition-transform" />
                <span>Diseña tu Dona Personalizada</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onExploreClick}
                className="flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-purple-950 bg-white hover:bg-pink-50/70 border border-purple-200/80 rounded-xl transition-all shadow-xs"
              >
                Ver Nuestra Presentación
              </button>
            </div>

            {/* Price reference kicker */}
            <div className="pt-2 text-xs text-stone-500">
              Desde <span className="font-semibold text-pink-700 font-data text-sm">$5.000 COP</span> individual o caja de 6 por <span className="font-semibold text-purple-800 font-data text-sm">$25.000 COP</span>
            </div>
          </motion.div>

          {/* Right Visual Image Anchor */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-pink-200/60 bg-white">
              <img
                src="/src/assets/images/hero_gourmet_donuts_1790365906517.jpg"
                alt="Donas artesanales gourmet Dulce Tentación en Gualanday Tolima"
                className="w-full h-80 sm:h-96 object-cover object-center transform hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay note */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#29150d]/85 via-[#29150d]/40 to-transparent p-4 sm:p-5 text-white">
                <span className="text-xs uppercase tracking-wider text-pink-300 font-semibold">Receta de la Casa</span>
                <h3 className="font-serif-brand text-lg font-bold">Dulce Tentación Artesanal</h3>
                <p className="text-xs text-pink-100/90 mt-0.5">Glaseados reales con mora silvestre, arequipe, fresa, chocolate y menta.</p>
              </div>
            </div>

            {/* Floating aesthetic accent tag */}
            <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm border border-purple-200 shadow-lg rounded-xl px-4 py-2.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600 font-serif-brand font-bold text-base">
                DT
              </div>
              <div>
                <p className="text-xs font-bold text-[#29150d]">100% Frescura Local</p>
                <p className="text-[11px] text-stone-500">I.E. Marco Fidel Suárez</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
