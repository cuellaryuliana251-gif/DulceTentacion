export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  maxPrice?: number;
  image: string;
  category: 'individual' | 'caja' | 'personalizada';
  badge?: string;
  tags: string[];
}

export interface CustomDonutConfig {
  presentation: 'individual' | 'caja6';
  base: 'Chocolate' | 'Menta' | 'Fresa' | 'Arequipe' | 'Mora';
  toppings: string[];
  sauce: 'Ninguna' | 'Chocolate' | 'Arequipe' | 'Fresa' | 'Maracuyá' | 'Lechera';
  saucePrice: number;
  unitPrice: number;
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  description: string;
  customDetails?: {
    base: string;
    toppings: string[];
    sauce: string;
  };
  unitPrice: number;
  quantity: number;
  image: string;
}

export interface CustomerVerification {
  fullName: string;
  whatsapp: string;
  email: string;
  address: string;
  desiredDate?: string;
  paymentMethod: 'efectivo' | 'nequi' | 'pse';
  isVerified: boolean;
  verificationToken?: string;
  verifiedAt?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'insumo' | 'producto' | 'topping' | 'salsa' | 'empaque';
  stock: number;
  unit: string;
  unitCostCOP: number;
  minimumThreshold: number;
  lastUpdated: string;
}

export interface GitCommitRecord {
  sha: string;
  message: string;
  author: string;
  timestamp: string;
  branch: string;
  status: string;
}

export interface AIDocumentExtractionResult {
  documentType: string;
  documentNumber: string;
  supplierOrEntity: string;
  date: string;
  totalAmount: number;
  currency: string;
  extractedItems: Array<{
    id: string;
    name: string;
    category: string;
    quantityReceived: number;
    unit: string;
    unitCost: number;
    suggestedRetailPrice: number;
    stockImpact: number;
    confidence: number;
    notes: string;
  }>;
  aiSummary: string;
  validationChecks: {
    taxesDetected: boolean;
    mathVerified: boolean;
    supplierVerified: boolean;
  };
}
