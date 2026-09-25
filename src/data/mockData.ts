import { Product, InventoryItem } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'dona-individual',
    name: 'Dona Individual Artesana',
    subtitle: 'ALTO EN AZÚCARES · Receta Original Tolima',
    description: 'Esponjosa y fresca, preparada diariamente con amor por los estudiantes de la I.E. Marco Fidel Suárez. Masa madre reposada y cobertura suave.',
    price: 5000,
    image: '/src/assets/images/product_dona_individual_1790365915848.jpg',
    category: 'individual',
    badge: 'Más Vendida',
    tags: ['Artesanal', 'Fresca del Día', 'Gualanday'],
  },
  {
    id: 'caja-6-unidades',
    name: 'Caja de 6 Unidades Gourmet',
    subtitle: 'ALTO EN AZÚCARES · Para Compartir',
    description: 'La combinación perfecta para compartir con amigos o familia en Gualanday. Incluye selección surtida de glaseados de mora, chocolate, arequipe y menta.',
    price: 25000,
    image: '/src/assets/images/product_caja_6_donuts_1790365925980.jpg',
    category: 'caja',
    badge: 'Ahorro Especial',
    tags: ['Pack Familiar', 'Surtido', 'Regalo'],
  },
  {
    id: 'dona-personalizada',
    name: 'Dona Personalizada Exclusiva',
    subtitle: '¡Única como tú! · Diseña tu Experiencia',
    description: 'Tú eliges la base de glaseado, los toppings más crujientes y la salsa líquida artesanal. Creada a tu gusto exacto al momento de tu pedido.',
    price: 5000,
    maxPrice: 6500,
    image: '/src/assets/images/hero_gourmet_donuts_1790365906517.jpg',
    category: 'personalizada',
    badge: '100% Personalizable',
    tags: ['A tu Medida', 'Topping Libre', 'Salsa Opcional'],
  }
];

export const BASES_LIST = ['Chocolate', 'Menta', 'Fresa', 'Arequipe', 'Mora'] as const;

export const TOPPINGS_LIST = [
  { name: 'Chispas de Chocolate', type: 'dulce' },
  { name: 'Maní Tostado', type: 'frutos' },
  { name: 'Oreo Crunch', type: 'galleta' },
  { name: 'Coco Rallado', type: 'natural' },
  { name: 'Gomitas Frutales', type: 'dulce' },
  { name: 'Masmelos Suaves', type: 'dulce' },
  { name: 'Frutas Frescas', type: 'natural' },
  { name: 'Nutella Pura', type: 'premium' },
  { name: 'Almendras Laminadas', type: 'frutos' },
];

export const SALSAS_LIST = [
  { name: 'Chocolate Real', price: 1500 },
  { name: 'Arequipe Tradicional', price: 1500 },
  { name: 'Fresa Silvestre', price: 1500 },
  { name: 'Maracuyá Intenso', price: 1500 },
  { name: 'Lechera Dulce', price: 1500 },
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-harina',
    name: 'Harina de Trigo de Alta Proteína',
    category: 'insumo',
    stock: 48,
    unit: 'kg',
    unitCostCOP: 4800,
    minimumThreshold: 15,
    lastUpdated: 'Hoy 09:30 AM',
  },
  {
    id: 'inv-mantequilla',
    name: 'Mantequilla Premium Sin Grasas Trans',
    category: 'insumo',
    stock: 22,
    unit: 'kg',
    unitCostCOP: 16500,
    minimumThreshold: 8,
    lastUpdated: 'Hoy 09:30 AM',
  },
  {
    id: 'inv-levadura',
    name: 'Azúcar Refinada & Levadura Natural',
    category: 'insumo',
    stock: 35,
    unit: 'kg',
    unitCostCOP: 5200,
    minimumThreshold: 10,
    lastUpdated: 'Hoy 09:30 AM',
  },
  {
    id: 'inv-huevos',
    name: 'Leche Entera y Huevos Campesinos Frescos',
    category: 'insumo',
    stock: 90,
    unit: 'unidades/litros',
    unitCostCOP: 950,
    minimumThreshold: 30,
    lastUpdated: 'Hoy 08:45 AM',
  },
  {
    id: 'inv-chocolate',
    name: 'Coberturas de Chocolate Real y Cacao',
    category: 'insumo',
    stock: 18,
    unit: 'kg',
    unitCostCOP: 22000,
    minimumThreshold: 5,
    lastUpdated: 'Hoy 10:15 AM',
  },
  {
    id: 'inv-cajas',
    name: 'Cajas de 6 Unidades Ecológicas con Cinta',
    category: 'empaque',
    stock: 140,
    unit: 'cajas',
    unitCostCOP: 1800,
    minimumThreshold: 40,
    lastUpdated: 'Ayer 04:00 PM',
  },
  {
    id: 'inv-donas-stock',
    name: 'Donas Horneadas Listas para Glasear',
    category: 'producto',
    stock: 85,
    unit: 'donas',
    unitCostCOP: 2100,
    minimumThreshold: 20,
    lastUpdated: 'Hoy 06:30 AM',
  }
];

export const INGREDIENTS_SHOWCASE = [
  {
    title: 'Harina de Trigo de Alta Proteína',
    description: 'Seleccionada cuidadosamente para otorgar la consistencia aireada, elástica y suave que caracteriza nuestras donas.',
    highlight: 'Fuerza & Textura'
  },
  {
    title: 'Leche Entera y Huevos Frescos',
    description: 'Provenientes de productores locales del Tolima, garantizando esponjosidad pura y sabor casero.',
    highlight: '100% Frescura Local'
  },
  {
    title: 'Mantequilla de Primera Calidad',
    description: 'Sin grasas hidrogenadas ni grasas trans, fundida a baja temperatura para un aroma delicado.',
    highlight: 'Cero Grasas Trans'
  },
  {
    title: 'Levadura Natural y Azúcar Refinada',
    description: 'Fermentación lenta y controlada que maximiza el volumen esponjoso sin sobrecargar el paladar.',
    highlight: 'Fermentación Lenta'
  },
  {
    title: 'Esencias de Vainilla & Canela',
    description: 'Aromas naturales que se impregnan en la masa artesanal desde el primer hervor matutino.',
    highlight: 'Aromas Naturales'
  },
  {
    title: 'Coberturas de Chocolate Real & Frutas',
    description: 'Frutas frescas de mora y maracuyá del Tolima combinadas con cacao auténtico para un acabado gourmet.',
    highlight: 'Glaseado Brillante'
  }
];

export const SAMPLE_INVOICE_PRESETS = [
  {
    name: 'Factura Harinas & Lácteos Tolima (#FAC-4820)',
    content: `DISTRIBUIDORA HARINAS Y LÁCTEOS DEL TOLIMA S.A.S.
NIT: 900.824.119-1 | Gualanday - Ibagué, Tolima
FACTURA ELECTRÓNICA DE VENTA No. FAC-4820
FECHA: 2026-09-24 | CLIENTE: Dulce Tentación - I.E. Marco Fidel Suárez

DESCRIPCIÓN DE MERCANCÍA:
1. Harina de Trigo Especial Alta Proteína (Bulto 25kg) - Cant: 4 Bultos - Valor Unit: $46.000 COP - Subtotal: $184.000 COP
2. Mantequilla Extra Fina Sin Grasas Trans (Bloque 5kg) - Cant: 2 Bloques - Valor Unit: $42.000 COP - Subtotal: $84.000 COP
3. Cobertura de Chocolate Negro Real 65% Cacao (Caja 5kg) - Cant: 2 Cajas - Valor Unit: $55.000 COP - Subtotal: $110.000 COP
4. Cajas Kraft de Repostería para 6 Donas - Cant: 100 Cajas - Valor Unit: $1.200 COP - Subtotal: $120.000 COP

SUBTOTAL: $498.000 COP
IVA (Exento Ley Emprendimiento): $0 COP
TOTAL PAGADO: $498.000 COP`
  },
  {
    name: 'Recibo Insumos Dulces & Toppings (#REC-901)',
    content: `PROVEEDORA DE REPOSTERÍA Y TOPPINGS EL PARAÍSO
Gualanday, Tolima - Tel: 3105559812
RECIBO DE CAJA No. 901

ENTREGA DE MATERIALES A DULCE TENTACIÓN:
- Nutella Balde Gastronómico 3kg: Cantidad 1 - Costo: $95.000 COP
- Galleta Oreo Triturada Especial: Cantidad 5 bolsas (1kg c/u) - Costo Unitario: $14.000 COP ($70.000)
- Maní Tostado sin Sal: Cantidad 4 bolsas (1kg c/u) - Costo Unitario: $11.000 COP ($44.000)
- Fruta Pulpa Mora y Maracuyá Silvestre: Cantidad 8 kg - Costo Unitario: $6.000 COP ($48.000)

TOTAL RECIBO: $257.000 COP`
  }
];
