import React, { useState } from 'react';
import { MessageSquare, Send, MapPin, Phone, School, CheckCircle, Sparkles } from 'lucide-react';

export const SuggestionsAndContact: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [senderName, setSenderName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setFeedback('');
      setSenderName('');
    }, 1500);
  };

  return (
    <section id="contacto" className="py-16 md:py-24 bg-[#FFF8FA] border-t border-pink-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Suggestions Column (Left) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-pink-200/80 shadow-xs space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-pink-700 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>Buzón Abierto</span>
            </div>

            <div>
              <h2 className="font-serif-brand text-2xl sm:text-3xl text-[#29150d] font-bold tracking-tight">
                Sugerencias
              </h2>
              <p className="text-sm text-stone-600 mt-1">
                ¿Cómo podemos mejorar para ti? Tu opinión ayuda a crecer nuestro emprendimiento estudiantil.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif-brand text-lg font-bold text-emerald-950">¡Muchas Gracias!</h4>
                <p className="text-xs text-emerald-800">
                  Hemos recibido tu sugerencia con mucho aprecio. El equipo de la I.E. Marco Fidel Suárez la revisará.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs text-emerald-700 font-semibold underline"
                >
                  Enviar otra sugerencia
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Tu Nombre (Opcional)</label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Ej: David Pérez"
                    className="w-full text-xs bg-[#FFF9FA] border border-stone-200 rounded-xl p-3 text-stone-800 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Tu Sugerencia o Idea de Sabor *</label>
                  <textarea
                    rows={4}
                    required
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Nos encantaría saber qué nuevos sabores, glaseados o mejoras en el empaque te gustarían..."
                    className="w-full text-xs bg-[#FFF9FA] border border-stone-200 rounded-xl p-3 text-stone-800 focus:outline-none focus:ring-1 focus:ring-pink-500 resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Sugerencia</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Details (Right) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 tracking-wide uppercase">
                <span>Atención & Despachos</span>
              </div>
              <h2 className="font-serif-brand text-2xl sm:text-3xl text-[#29150d] font-bold tracking-tight mt-1">
                Canales de Contacto
              </h2>
              <p className="text-sm text-stone-600 mt-1">
                Estamos ubicados en el corazón de Tolima. Contáctanos directamente para pedidos especiales, eventos o dudas.
              </p>
            </div>

            <div className="space-y-4">
              {/* Sede */}
              <div className="p-4 bg-white rounded-2xl border border-pink-200/80 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center shrink-0 text-pink-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500">Sede Principal</h4>
                  <p className="font-serif-brand text-base font-bold text-[#29150d] mt-0.5">Gualanday, Tolima</p>
                  <p className="text-xs text-stone-600 mt-0.5">Repostería artesanal local con entrega a domicilio.</p>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/573213610322?text=Hola%20Dulce%20Tentación!%20Quiero%20hacer%20un%20pedido%20de%20donas."
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-white rounded-2xl border border-emerald-200 hover:border-emerald-300 shadow-xs flex items-start gap-4 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center shrink-0 text-emerald-700 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500">Línea WhatsApp Oficial</h4>
                  <p className="font-data text-base font-bold text-emerald-800 mt-0.5">321 361 0322</p>
                  <p className="text-xs text-stone-600 mt-0.5">Atención directa y confirmación inmediata de órdenes.</p>
                </div>
              </a>

              {/* Institución */}
              <div className="p-4 bg-white rounded-2xl border border-purple-200/80 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0 text-purple-700">
                  <School className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500">Institución Educativa</h4>
                  <p className="font-serif-brand text-base font-bold text-[#29150d] mt-0.5">I.E. Marco Fidel Suárez</p>
                  <p className="text-xs text-stone-600 mt-0.5">Emprendimiento juvenil estudiantil fomentando la vocación pastelera.</p>
                </div>
              </div>
            </div>

            {/* Technical sheet summary footer from PDF page 5 */}
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs text-purple-950 space-y-1">
              <p className="font-bold">Ficha Técnica & Despliegue:</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-purple-900">
                <span>• Proyecto: <strong>Dulce Tentación</strong></span>
                <span>• Ubicación: <strong>Gualanday, Tolima</strong></span>
                <span>• Hosting: <strong>Netlify & Cloud</strong></span>
                <span>• Factura: <strong>jsPDF Integrado</strong></span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
