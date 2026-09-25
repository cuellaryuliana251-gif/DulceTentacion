import jsPDF from 'jspdf';
import { CartItem, CustomerVerification } from '../types';

export function generateInvoicePDF(
  orderId: string,
  items: CartItem[],
  customer: CustomerVerification,
  subtotal: number,
  total: number
) {
  const doc = new jsPDF();
  const dateStr = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Header Banner Background
  doc.setFillColor(126, 34, 206); // Gourmet Purple (#7e22ce)
  doc.rect(0, 0, 210, 36, 'F');

  // Decorative accent line
  doc.setFillColor(236, 72, 153); // Pink accent (#ec4899)
  doc.rect(0, 36, 210, 4, 'F');

  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('DULCE TENTACIÓN', 14, 20);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Donas Artesanales Gourmet · I.E. Marco Fidel Suárez', 14, 28);
  doc.text('Gualanday, Tolima · WhatsApp: 3213610322', 120, 28);

  // Invoice Details
  doc.setTextColor(41, 21, 13);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('COMPROBANTE DIGITAL DE PEDIDO', 14, 52);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`No. Orden: #${orderId}`, 14, 60);
  doc.text(`Fecha de Emisión: ${dateStr}`, 14, 66);
  doc.text(`Estado: PENDIENTE DE ENTREGA / CONFIRMADO`, 14, 72);

  // Verification Shield
  doc.setFillColor(243, 232, 255);
  doc.roundedRect(120, 46, 76, 28, 3, 3, 'F');
  doc.setTextColor(109, 40, 217);
  doc.setFont('helvetica', 'bold');
  doc.text('CLIENTE VERIFICADO', 126, 56);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(88, 28, 135);
  doc.text(`Token: ${customer.verificationToken || 'DT-VERIFIED-AUTH'}`, 126, 63);
  doc.text(`Tel: ${customer.whatsapp}`, 126, 69);

  // Customer Section
  doc.setFillColor(255, 245, 248);
  doc.roundedRect(14, 80, 182, 30, 2, 2, 'F');

  doc.setTextColor(190, 24, 93);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('DATOS DE ENTREGA DEL CLIENTE', 20, 88);

  doc.setTextColor(41, 21, 13);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(`Nombre Completo: ${customer.fullName}`, 20, 95);
  doc.text(`Dirección en Gualanday: ${customer.address}`, 20, 101);
  doc.text(`Método de Pago: ${customer.paymentMethod.toUpperCase()}`, 110, 95);
  doc.text(`Fecha Deseada: ${customer.desiredDate || 'Lo más pronto posible'}`, 110, 101);

  // Table Header
  let yPos = 120;
  doc.setFillColor(243, 244, 246);
  doc.rect(14, yPos, 182, 8, 'F');
  doc.setTextColor(75, 85, 99);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('DESCRIPCIÓN DEL PRODUCTO', 20, yPos + 6);
  doc.text('CANT', 125, yPos + 6);
  doc.text('PRECIO UNIT', 145, yPos + 6);
  doc.text('TOTAL', 178, yPos + 6);

  yPos += 12;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(41, 21, 13);

  items.forEach((item) => {
    doc.setFont('helvetica', 'bold');
    doc.text(item.title, 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(String(item.quantity), 128, yPos);
    doc.text(`$${item.unitPrice.toLocaleString('es-CO')}`, 145, yPos);
    doc.text(`$${(item.unitPrice * item.quantity).toLocaleString('es-CO')}`, 178, yPos);

    if (item.customDetails) {
      yPos += 5;
      doc.setFontSize(8);
      doc.setTextColor(107, 114, 128);
      const customStr = `Base: ${item.customDetails.base} | Toppings: ${item.customDetails.toppings.join(', ') || 'Ninguno'} | Salsa: ${item.customDetails.sauce}`;
      doc.text(customStr.substring(0, 75), 20, yPos);
      doc.setFontSize(9.5);
      doc.setTextColor(41, 21, 13);
    }

    yPos += 9;
  });

  // Summary lines
  yPos += 4;
  doc.setDrawColor(229, 231, 235);
  doc.line(14, yPos, 196, yPos);
  yPos += 10;

  doc.setFontSize(10);
  doc.text('Subtotal:', 135, yPos);
  doc.text(`$${subtotal.toLocaleString('es-CO')} COP`, 175, yPos);

  yPos += 7;
  doc.text('Envío Local Gualanday:', 135, yPos);
  doc.text('$0 COP (Gratis)', 175, yPos);

  yPos += 8;
  doc.setFillColor(253, 242, 248);
  doc.roundedRect(130, yPos - 5, 66, 12, 2, 2, 'F');
  doc.setTextColor(190, 24, 93);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('TOTAL A PAGAR:', 134, yPos + 3);
  doc.text(`$${total.toLocaleString('es-CO')}`, 175, yPos + 3);

  // Footer notes
  doc.setTextColor(107, 114, 128);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('• Proceso de elaboración higiénico y artesanal realizado por estudiantes de la I.E. Marco Fidel Suárez.', 14, 260);
  doc.text('• Por favor confirme su pedido enviando este comprobante o su número de orden al WhatsApp 3213610322.', 14, 266);
  doc.text('¡Gracias por apoyar el talento y emprendimiento de nuestra juventud tolimense!', 14, 272);

  // Trigger download
  doc.save(`Factura_Dulce_Tentacion_${orderId}.pdf`);
}
