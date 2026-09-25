import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CartItem, CustomerVerification } from '../types';
import { generateInvoicePDF } from '../utils/pdfGenerator';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
  Download,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  AlertCircle,
  QrCode
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  customer: CustomerVerification;
  onUpdateCustomer: (customer: CustomerVerification) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  customer,
  onUpdateCustomer,
}) => {
  // Steps: 'cart' -> 'customer_auth' -> 'payment' -> 'review' -> 'success'
  const [currentStep, setCurrentStep] = useState<'cart' | 'customer_auth' | 'payment' | 'review' | 'success'>('cart');
  
  // Verification states
  const [otpCode, setOtpCode] = useState<string>('');
  const [otpSentNotice, setOtpSentNotice] = useState<string | null>(null);
  const [simulatedCodePreview, setSimulatedCodePreview] = useState<string | null>(null);
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Completed order data
  const [completedOrderId, setCompletedOrderId] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const total = subtotal; // Free delivery in Gualanday, Tolima

  // Send verification OTP code
  const handleRequestVerificationCode = async () => {
    if (!customer.whatsapp || !customer.fullName) {
      setAuthError('Por favor ingresa tu Nombre Completo y WhatsApp primero.');
      return;
    }
    setAuthError(null);
    setIsSendingOtp(true);

    try {
      const res = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: customer.whatsapp,
          email: customer.email,
          name: customer.fullName,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSentNotice(data.message);
        if (data.simulatedCode) {
          setSimulatedCodePreview(data.simulatedCode);
        }
      } else {
        setAuthError(data.error || 'Error al enviar código');
      }
    } catch (err: any) {
      setAuthError('Error de conexión al servidor de verificación');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Verify entered code
  const handleVerifyCode = async () => {
    if (!otpCode.trim()) {
      setAuthError('Por favor ingresa el código de 6 dígitos.');
      return;
    }
    setAuthError(null);
    setIsVerifyingOtp(true);

    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: customer.whatsapp,
          email: customer.email,
          code: otpCode.trim(),
        }),
      });
      const data = await res.json();
      if (data.verified) {
        onUpdateCustomer({
          ...customer,
          isVerified: true,
          verificationToken: data.verificationToken,
          verifiedAt: data.verifiedAt,
        });
        setOtpSentNotice(null);
        setSimulatedCodePreview(null);
      } else {
        setAuthError(data.error || 'Código incorrecto');
      }
    } catch (err: any) {
      setAuthError('Error al validar código');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleFinalizeOrder = () => {
    const orderId = `DT-${Math.floor(10000 + Math.random() * 90000)}`;
    setCompletedOrderId(orderId);
    setCurrentStep('success');

    // Celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#7e22ce', '#db2777', '#f43f5e']
      });
    } catch (e) {
      // ignore
    }
  };

  const handleDownloadPDF = () => {
    generateInvoicePDF(completedOrderId, items, customer, subtotal, total);
  };

  const getWhatsAppOrderUrl = () => {
    const itemsSummary = items
      .map(i => `• ${i.quantity}x ${i.title} ($${(i.unitPrice * i.quantity).toLocaleString('es-CO')})${i.customDetails ? ` [${i.customDetails.base}, ${i.customDetails.toppings.join(', ')}]` : ''}`)
      .join('%0A');

    const message = `*¡HOLA DULCE TENTACIÓN! Acabo de realizar mi pedido oficial:*%0A%0A` +
      `*Orden:* #${completedOrderId}%0A` +
      `*Cliente:* ${customer.fullName}%0A` +
      `*Teléfono:* ${customer.whatsapp}%0A` +
      `*Dirección:* ${customer.address} (Gualanday, Tolima)%0A` +
      `*Método de Pago:* ${customer.paymentMethod.toUpperCase()}%0A` +
      `*Estado de Seguridad:* VERIFICADO (${customer.verificationToken})%0A%0A` +
      `*Detalle del Pedido:*%0A${itemsSummary}%0A%0A` +
      `*TOTAL A PAGAR:* $${total.toLocaleString('es-CO')} COP%0A%0A` +
      `_Por favor confirmen la recepción y tiempo estimado de entrega. ¡Muchas gracias!_`;

    return `https://wa.me/573213610322?text=${message}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FFF9FA] h-full shadow-2xl flex flex-col border-l border-pink-200">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-pink-200/80 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif-brand text-lg font-bold text-[#29150d]">
              {currentStep === 'cart' && 'Tu Carrito de Compras'}
              {currentStep === 'customer_auth' && 'Registro & Verificación Segura'}
              {currentStep === 'payment' && 'Método de Pago'}
              {currentStep === 'review' && 'Resumen del Pedido'}
              {currentStep === 'success' && '¡Orden Generada con Éxito!'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-500 transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progression Indicator */}
        <div className="bg-pink-50/80 px-4 py-2 border-b border-pink-100 flex items-center justify-between text-[11px] font-semibold text-stone-600">
          <span className={currentStep === 'cart' ? 'text-pink-600 font-bold' : ''}>1. Carrito</span>
          <span>→</span>
          <span className={currentStep === 'customer_auth' ? 'text-pink-600 font-bold' : ''}>2. Verificación</span>
          <span>→</span>
          <span className={currentStep === 'payment' ? 'text-pink-600 font-bold' : ''}>3. Pago</span>
          <span>→</span>
          <span className={currentStep === 'review' || currentStep === 'success' ? 'text-pink-600 font-bold' : ''}>4. Confirmación</span>
        </div>

        {/* Drawer Body Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* STEP 1: CART ITEMS */}
          {currentStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="py-16 text-center text-stone-500 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center mx-auto">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif-brand text-lg font-bold text-[#29150d]">Tu carrito está vacío</h4>
                  <p className="text-xs max-w-xs mx-auto text-stone-600">
                    Añade donas individuales, cajas de 6 o diseña tu propia dona personalizada para comenzar tu pedido en Gualanday.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 bg-white rounded-2xl border border-pink-200/70 shadow-xs flex items-center gap-3.5"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-pink-50"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-[#29150d] truncate">{item.title}</h4>
                        <p className="text-[11px] text-stone-500 line-clamp-1">{item.description}</p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="font-data text-xs font-bold text-pink-700">
                            ${(item.unitPrice * item.quantity).toLocaleString('es-CO')} COP
                          </span>

                          <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-1">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-5 h-5 rounded flex items-center justify-center hover:bg-white text-stone-600"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-data text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-5 h-5 rounded flex items-center justify-center hover:bg-white text-stone-600"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* STEP 2: CUSTOMER AUTH & REGISTRATION */}
          {currentStep === 'customer_auth' && (
            <div className="space-y-4 bg-white p-5 rounded-2xl border border-pink-200">
              <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900">
                <Lock className="w-4 h-4 text-purple-600 shrink-0" />
                <span>
                  <strong>Seguridad Garantizada:</strong> Requerimos verificar tu número para proteger tus transacciones y asegurar la entrega en Gualanday.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  value={customer.fullName}
                  onChange={(e) => onUpdateCustomer({ ...customer, fullName: e.target.value })}
                  placeholder="Ej: Laura Gómez"
                  className="w-full text-xs bg-[#FFF9FA] border border-stone-200 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">WhatsApp de Contacto *</label>
                <input
                  type="tel"
                  value={customer.whatsapp}
                  onChange={(e) => onUpdateCustomer({ ...customer, whatsapp: e.target.value })}
                  placeholder="Ej: 3213610322"
                  className="w-full text-xs bg-[#FFF9FA] border border-stone-200 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Correo Electrónico (Para Factura Digital) *</label>
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => onUpdateCustomer({ ...customer, email: e.target.value })}
                  placeholder="cliente@ejemplo.com"
                  className="w-full text-xs bg-[#FFF9FA] border border-stone-200 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Dirección Exacta en Gualanday *</label>
                <input
                  type="text"
                  value={customer.address}
                  onChange={(e) => onUpdateCustomer({ ...customer, address: e.target.value })}
                  placeholder="Ej: Barrio Centro, Calle 4 #5-12, frente al parque"
                  className="w-full text-xs bg-[#FFF9FA] border border-stone-200 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Fecha Deseada de Entrega (Opcional)</label>
                <input
                  type="text"
                  value={customer.desiredDate || ''}
                  onChange={(e) => onUpdateCustomer({ ...customer, desiredDate: e.target.value })}
                  placeholder="Ej: Hoy a las 4:00 PM o Sábado en la mañana"
                  className="w-full text-xs bg-[#FFF9FA] border border-stone-200 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>

              {/* Verification Section */}
              <div className="pt-3 border-t border-stone-200 space-y-3">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                  Verificación de Identidad
                </span>

                {customer.isVerified ? (
                  <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <p className="font-bold">Cliente Verificado Exitosamente</p>
                        <p className="text-[11px] text-emerald-700">Token: {customer.verificationToken}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-emerald-700">Activo</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={handleRequestVerificationCode}
                      disabled={isSendingOtp || !customer.whatsapp}
                      className="w-full py-2.5 px-3 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
                    >
                      {isSendingOtp ? 'Generando código...' : 'Solicitar Código de Seguridad (OTP)'}
                    </button>

                    {simulatedCodePreview && (
                      <div className="p-2.5 bg-purple-50/80 rounded-lg border border-purple-200 text-[11px] text-purple-900">
                        Código enviado para pruebas: <strong className="font-data text-xs">{simulatedCodePreview}</strong> (o use 777999)
                      </div>
                    )}

                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Código de 6 dígitos"
                        className="flex-1 text-center font-data text-sm tracking-widest bg-[#FFF9FA] border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-pink-500"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyCode}
                        disabled={isVerifyingOtp || !otpCode}
                        className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-700 text-white rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
                      >
                        {isVerifyingOtp ? 'Validando...' : 'Verificar'}
                      </button>
                    </div>
                  </div>
                )}

                {authError && (
                  <div className="p-2.5 bg-red-50 text-red-700 rounded-lg text-xs flex items-center gap-1.5 border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {currentStep === 'payment' && (
            <div className="space-y-4 bg-white p-5 rounded-2xl border border-pink-200">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                Selecciona tu Método de Pago:
              </span>

              {/* Option 1: Cash on Delivery */}
              <button
                type="button"
                onClick={() => onUpdateCustomer({ ...customer, paymentMethod: 'efectivo' })}
                className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                  customer.paymentMethod === 'efectivo'
                    ? 'border-pink-600 bg-pink-50/70 ring-1 ring-pink-600'
                    : 'border-stone-200 hover:border-pink-300'
                }`}
              >
                <Banknote className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-xs text-[#29150d]">Efectivo contra entrega</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Pagas al recibir tus donas frescas en tu domicilio en Gualanday, Tolima.
                  </p>
                </div>
              </button>

              {/* Option 2: Nequi */}
              <button
                type="button"
                onClick={() => onUpdateCustomer({ ...customer, paymentMethod: 'nequi' })}
                className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                  customer.paymentMethod === 'nequi'
                    ? 'border-purple-600 bg-purple-50/70 ring-1 ring-purple-600'
                    : 'border-stone-200 hover:border-purple-300'
                }`}
              >
                <Smartphone className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-xs text-[#29150d]">Nequi (Transferencia Directa o QR)</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Transfiere al número oficial: <strong className="text-purple-800">3213610322</strong>
                  </p>
                </div>
              </button>

              {/* Option 3: PSE */}
              <button
                type="button"
                onClick={() => onUpdateCustomer({ ...customer, paymentMethod: 'pse' })}
                className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                  customer.paymentMethod === 'pse'
                    ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600'
                    : 'border-stone-200 hover:border-blue-300'
                }`}
              >
                <CreditCard className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-xs text-[#29150d]">PSE (Bancos de Colombia)</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Débito bancario seguro con cualquier entidad financiera.
                  </p>
                </div>
              </button>

              {customer.paymentMethod === 'nequi' && (
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-center space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-900">
                    <QrCode className="w-4 h-4 text-purple-700" />
                    <span>Nequi Dulce Tentación Tolima</span>
                  </div>
                  <p className="font-data text-sm font-bold text-purple-900">321 361 0322</p>
                  <p className="text-[11px] text-stone-600">Envía el comprobante tras confirmar tu orden.</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: REVIEW & CONFIRM */}
          {currentStep === 'review' && (
            <div className="space-y-4 bg-white p-5 rounded-2xl border border-pink-200">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                Resumen Final de tu Pedido
              </span>

              {/* Customer recap */}
              <div className="p-3 bg-[#FFF9FA] rounded-xl border border-pink-100 text-xs space-y-1">
                <p><strong>Cliente:</strong> {customer.fullName}</p>
                <p><strong>WhatsApp:</strong> {customer.whatsapp}</p>
                <p><strong>Dirección:</strong> {customer.address} (Gualanday)</p>
                <p><strong>Forma de Pago:</strong> {customer.paymentMethod.toUpperCase()}</p>
              </div>

              {/* Items recap */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {items.map((it) => (
                  <div key={it.id} className="text-xs flex justify-between py-1 border-b border-stone-100">
                    <span>{it.quantity}x {it.title}</span>
                    <span className="font-data font-bold">${(it.unitPrice * it.quantity).toLocaleString('es-CO')}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-xs flex justify-between font-bold text-pink-700 text-sm">
                <span>Total Consolidado:</span>
                <span className="font-data">${total.toLocaleString('es-CO')} COP</span>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS STATE */}
          {currentStep === 'success' && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">¡Orden Generada con Éxito!</span>
                <h3 className="font-serif-brand text-2xl font-bold text-[#29150d] mt-1">
                  Pedido #{completedOrderId}
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto mt-2 leading-relaxed">
                  Tu orden ha sido registrada para despacho en Gualanday, Tolima. Descarga tu factura digital en PDF y confirma tu pedido vía WhatsApp.
                </p>
              </div>

              {/* Primary Actions: PDF & WhatsApp */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95"
                >
                  <Download className="w-4 h-4 text-pink-200" />
                  <span>Descargar Factura Digital (PDF)</span>
                </button>

                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Confirmación a WhatsApp (3213610322)</span>
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer Actions */}
        {currentStep !== 'success' && (
          <div className="p-4 sm:p-5 border-t border-pink-200/80 bg-white space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-600">
              <span>Subtotal:</span>
              <span className="font-data font-semibold text-stone-800">${subtotal.toLocaleString('es-CO')} COP</span>
            </div>
            <div className="flex items-center justify-between text-xs text-stone-600">
              <span>Entrega en Gualanday:</span>
              <span className="text-emerald-700 font-semibold">Gratis</span>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-[#29150d] pt-1 border-t border-stone-100">
              <span>Total Pedido:</span>
              <span className="font-data text-pink-700 text-base">${total.toLocaleString('es-CO')} COP</span>
            </div>

            {/* Stepper Buttons */}
            {currentStep === 'cart' && (
              <button
                type="button"
                disabled={items.length === 0}
                onClick={() => setCurrentStep('customer_auth')}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white rounded-xl text-xs font-semibold shadow-md transition-all disabled:opacity-50"
              >
                <span>Continuar a Registro & Verificación</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {currentStep === 'customer_auth' && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep('cart')}
                  className="px-4 py-3 bg-stone-100 text-stone-700 rounded-xl text-xs font-semibold"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  disabled={!customer.isVerified || !customer.address}
                  onClick={() => setCurrentStep('payment')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-pink-600 to-purple-700 text-white rounded-xl text-xs font-semibold shadow-md transition-all disabled:opacity-50"
                >
                  <span>Continuar al Pago</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {currentStep === 'payment' && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep('customer_auth')}
                  className="px-4 py-3 bg-stone-100 text-stone-700 rounded-xl text-xs font-semibold"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep('review')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-pink-600 to-purple-700 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
                >
                  <span>Ver Resumen Final</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {currentStep === 'review' && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep('payment')}
                  className="px-4 py-3 bg-stone-100 text-stone-700 rounded-xl text-xs font-semibold"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={handleFinalizeOrder}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
                >
                  <span>Confirmar Pedido & Facturar</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
