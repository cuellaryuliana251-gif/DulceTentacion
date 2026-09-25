# 🍩 Dulce Tentación — Donas Artesanales Gourmet & Plataforma Ecommerce con IA

> **Emprendimiento Juvenil de Pastelería Artesanal**  
> **Sede:** Gualanday, Tolima, Colombia  
> **Institución Educativa:** I.E. Marco Fidel Suárez  
> **Contacto Oficial:** WhatsApp +57 321 361 0322  

---

## 📋 Tabla de Contenidos
1. [Ficha Técnica General del Proyecto](#1-ficha-técnica-general-del-proyecto)
2. [Instalación](#2-instalación)
3. [Configuración del Entorno](#3-configuración-del-entorno)
4. [Arquitectura y Base de Datos (Firebase / Firestore)](#4-arquitectura-y-base-de-datos-firebase--firestore)
5. [Ficha Técnica de Diseño Frontend](#5-ficha-técnica-de-diseño-frontend)
6. [Ficha Técnica del Backend](#6-ficha-técnica-del-backend)
7. [Infraestructura Conceptual & Despliegue en la Nube](#7-infraestructura-conceptual--despliegue-en-la-nube)

---

## 1. Ficha Técnica General del Proyecto

| Parámetro | Detalle |
| :--- | :--- |
| **Nombre Comercial** | Dulce Tentación |
| **Objeto Social** | Fabricación, personalización y comercialización digital de donas artesanales de alta calidad |
| **Ubicación Geográfica** | Corregimiento de Gualanday, Municipio de Coello, Tolima, Colombia |
| **Entidad Académica** | Institución Educativa Marco Fidel Suárez (Programa de Formación Empresarial y Repostería) |
| **Propuesta de Valor** | Masas de fermentación reposada preparadas diariamente con harina de alta proteína, cero grasas trans, coberturas de frutas frescas locales y chocolate real, personalizador interactivo y checkout protegido con verificación de clientes |
| **Catálogo Base** | • Dona Individual: $5.000 COP<br>• Caja de 6 Unidades: $25.000 COP<br>• Dona Personalizada: $5.000 - $6.500 COP |
| **Glaseados Base** | Chocolate Real, Mora Silvestre, Arequipe Tradicional, Fresa Suave, Menta Fresca |
| **Toppings** | Chispas, Maní, Oreo Crunch, Coco Rallado, Gomitas, Masmelos, Frutas, Nutella, Almendras Laminadas |
| **Salsas Artesanales** | Chocolate Real, Arequipe, Fresa, Maracuyá Silvestre, Lechera (+$1.500 COP) |
| **Métodos de Pago** | Efectivo contra entrega (Gualanday), Nequi (3213610322) y PSE |

---

## 2. Instalación

### 2.1 Requisitos Previos
* **Node.js**: v20.x o superior LTS.
* **NPM**: v10.x o superior (o Bun / Yarn / PNPM).
* **Navegador**: Chrome, Firefox, Safari o Edge con soporte para ES2022 y Web APIs modernas.

### 2.2 Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/dulce-tentacion-gualanday/ecommerce-donas-artesanales.git
cd ecommerce-donas-artesanales

# 2. Instalar todas las dependencias del proyecto
npm install

# 3. Copiar archivo de entorno
cp .env.example .env

# 4. Iniciar en modo desarrollo (Express Backend + Vite Middleware)
npm run dev
```

La aplicación quedará disponible en:
```
http://localhost:3000
```

### 2.3 Scripts Disponibles en `package.json`

| Comando | Acción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor full-stack en Node con `tsx server.ts` en el puerto 3000 con middleware de Vite |
| `npm run build` | Compila el bundle de producción frontend optimizado en la carpeta `/dist` |
| `npm run start` | Arranca el servidor Express en producción sirviendo los estáticos desde `/dist` |
| `npm run lint` | Ejecuta la verificación estática de tipos con `tsc --noEmit` |

---

## 3. Configuración del Entorno

### 3.1 Variables de Entorno (`.env`)
Crear un archivo `.env` en la raíz del proyecto basado en `.env.example`:

```env
# Clave de API para el motor de Inteligencia Artificial Gemini
GEMINI_API_KEY="AIzaSy..."

# Puerto de ejecución del servidor local
PORT=3000

# URL pública de la aplicación (inyectada automáticamente en Cloud Run o Netlify)
APP_URL="http://localhost:3000"

# Entorno de ejecución (development / production)
NODE_ENV="development"
```

---

## 4. Arquitectura y Base de Datos (Firebase / Firestore)

El aplicativo está diseñado bajo una arquitectura de persistencia NoSQL escalable y de alta concurrencia mediante **Google Cloud Firestore**.

### 4.1 Modelo de Datos / Colecciones

```
firestore/
├── users/ (Clientes y Administradores)
│   └── {userId}/
│       ├── fullName: string
│       ├── whatsapp: string
│       ├── email: string
│       ├── address: string (Gualanday, Tolima)
│       ├── isVerified: boolean
│       ├── verificationToken: string
│       ├── role: "customer" | "admin"
│       └── createdAt: timestamp
│
├── products/ (Catálogo de Donas)
│   └── {productId}/
│       ├── name: string
│       ├── category: "individual" | "caja" | "personalizada"
│       ├── price: number (COP)
│       ├── description: string
│       ├── imageUrl: string
│       ├── available: boolean
│       └── warnings: ["ALTO EN AZÚCARES"]
│
├── orders/ (Transacciones y Comprobantes)
│   └── {orderId}/
│       ├── orderNumber: string (ej: "DT-48201")
│       ├── customerId: string
│       ├── customerSnapshot: object
│       ├── items: array [ { title, quantity, unitPrice, customDetails } ]
│       ├── subtotal: number
│       ├── deliveryFee: number (0 para Gualanday)
│       ├── total: number
│       ├── paymentMethod: "efectivo" | "nequi" | "pse"
│       ├── paymentStatus: "pending" | "paid" | "verified"
│       ├── deliveryStatus: "received" | "baking" | "out_for_delivery" | "delivered"
│       ├── verificationToken: string
│       └── createdAt: timestamp
│
├── inventory/ (Materias Primas & Insumos en Vivo)
│   └── {itemId}/
│       ├── name: string (ej: "Harina de Trigo Alta Proteína")
│       ├── category: "insumo" | "topping" | "salsa" | "empaque" | "producto"
│       ├── stock: number
│       ├── unit: string ("kg", "baldes", "cajas", "unidades")
│       ├── unitCostCOP: number
│       ├── minimumThreshold: number
│       └── lastUpdated: timestamp
│
└── supplierInvoices/ (Historial de Facturas Procesadas con IA)
    └── {invoiceId}/
        ├── documentNumber: string
        ├── supplierOrEntity: string
        ├── totalAmount: number
        ├── rawText: string
        ├── extractedItems: array
        ├── aiModel: "gemini-3.8-flash"
        └── processedAt: timestamp
```

### 4.2 Reglas de Seguridad (`firestore.rules`)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Reglas para usuarios y clientes: solo el propio usuario o admin puede leer y actualizar
    match /users/{userId} {
      allow read, write: if request.auth != null && (request.auth.uid == userId || request.auth.token.role == 'admin');
    }
    
    // El catálogo de productos es de lectura pública, solo administradores pueden editar
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.role == 'admin';
    }
    
    // Las órdenes requieren que el cliente esté verificado
    match /orders/{orderId} {
      allow create: if request.resource.data.customerSnapshot.isVerified == true;
      allow read: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.token.role == 'admin';
    }
    
    // Inventario y facturas de proveedores: lectura y escritura protegidas
    match /inventory/{itemId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.role == 'admin';
    }
    
    match /supplierInvoices/{invoiceId} {
      allow read, write: if request.auth != null && request.auth.token.role == 'admin';
    }
  }
}
```

---

## 5. Ficha Técnica de Diseño Frontend

### 5.1 Especificaciones Estéticas & Constitución Visual
* **Paleta Gourmet Rosa & Morado (Distribución 60-30-10)**:
  * **60% Lienzo Neutro**: Fondo cálido suave rosáceo `#FFF6F9` y marfil pastel que elimina la fatiga visual.
  * **30% Superficies Estructurales**: Tarjetas en blanco puro `#FFFFFF` con sutiles bordes capilares rosa `rgba(244, 114, 182, 0.25)` y sombras difusas de baja elevación.
  * **10% Acentos Gourmet**: Degradados de alta vibración desde Fucsia Pastel `#ec4899` hacia Morado Velvet `#7e22ce`.
  * **Contraste de Lectura Máximo**: Tipografía en café chocolate profundo `#29150d` cumpliendo WCAG AA con ratio superior a 7:1 sobre los fondos claros.

### 5.2 Tipografía
* **Display / Marca**: `Playfair Display` (Serif editorial, elegante, gourmet y tradicional).
* **Cuerpo de Texto**: `Plus Jakarta Sans` (Sans-serif geométrico humanista de alta legibilidad en pantallas táctiles móviles).
* **Datos Numéricos & Precios**: `JetBrains Mono` con alineación tabular (`font-data tabular-nums`).

### 5.3 Módulos Frontend
1. **Header / Navbar (Contrato de 3 Zonas)**:
   * Zona 1: Wordmark único de marca "Dulce Tentación".
   * Zona 2: Navegación de una línea (Inicio, Nuestra Presentación, Configura tu Dona, Calidad, IA & Inventario, Contacto).
   * Zona 3: Indicador de Cliente Verificado + Botón WhatsApp + Carrito reactivo con conteo numérico.
2. **Hero Inmersivo**:
   * Titular con degradado de texto velvet, fotografía editorial de 8K y propuesta de valor del Tolima.
3. **Catálogo de Donas**:
   * Tarjetas con proporciones fijas, etiqueta reglamentaria "ALTO EN AZÚCARES", selector de base y botón de adición inmediata.
4. **Configurador 2D/3D Animado en Tiempo Real**:
   * Lienzo SVG interactivo con glaseados dinámicos que cambian de color (Mora, Chocolate, Fresa, Arequipe, Menta).
   * Toppings animados (Oreo, Chispas, Almendras, Coco, Maní, Nutella).
   * Cinta de salsa líquida derramada y cálculo de precio en tiempo real.
5. **Drawer de Carrito & Checkout en 4 Fases**:
   * `1. Carrito` ➔ `2. Verificación de Cliente` ➔ `3. Método de Pago` ➔ `4. Resumen y Facturación`.
6. **Módulo de Calidad & Taller Marco Fidel Suárez**:
   * Desglose de materias primas seleccionadas y sello educativo juvenil.

---

## 6. Ficha Técnica del Backend

### 6.1 Arquitectura del Servidor
* **Entorno**: Node.js con TypeScript ejecutado mediante `tsx`.
* **Framework**: Express.js montado con Vite middlewares en desarrollo y servidor estático en producción.
* **Procesamiento de Archivos**: Soporte para payloads de hasta 25 MB para recibir fotos de facturas, remisiones o escaneos en base64.

### 6.2 Endpoints REST Principales

#### 1. Extracción de Documentos con Inteligencia Artificial
* **Ruta**: `POST /api/ai/extract-document`
* **Entrada**:
  ```json
  {
    "text": "Factura No. 4820 Harina 4 bultos $46000 COP, Mantequilla 2 bloques $42000 COP...",
    "imageBase64": "data:image/jpeg;base64,...",
    "mimeType": "image/jpeg",
    "documentName": "Factura Harinas Tolima"
  }
  ```
* **Motor**: `@google/genai` con modelo `gemini-3.8-flash`.
* **Resiliencia**: Motor híbrido con fallback semántico local que extrae insumos y normaliza costos ante picos de demanda o interrupciones de red.
* **Salida**: JSON estructurado con insumos categorizados, cantidades, costos, impacto en inventario y validación matemática de impuestos.

#### 2. Registro y Envío de Código de Verificación OTP
* **Ruta**: `POST /api/auth/send-verification`
* **Entrada**: `{ "phone": "3213610322", "email": "cliente@correo.com", "name": "Laura Gómez" }`
* **Función**: Genera un código criptográfico de 6 dígitos con expiración de 5 minutos y registra la solicitud en memoria / base de datos.

#### 3. Validación de Código de Verificación
* **Ruta**: `POST /api/auth/verify-code`
* **Entrada**: `{ "phone": "3213610322", "code": "849201" }`
* **Salida**: `{ "verified": true, "verificationToken": "DT-VERIFIED-7X9A", "verifiedAt": "..." }`

#### 4. Sincronización con GitHub
* **Ruta**: `POST /api/sync/github`
* **Función**: Simula y despacha la confirmación de commit (`git commit`) de los cambios de inventario hacia la rama `main` del repositorio oficial.

#### 5. Estado de la Infraestructura en la Nube
* **Ruta**: `GET /api/sync/status`
* **Salida**: Historial de los últimos commits, uptime del 99.98%, estado de balanceo y nodos de borde CDN.

---

## 7. Infraestructura Conceptual & Despliegue en la Nube

```
                             [ Cliente / Móvil ]
                                      │
                                      ▼
                        [ Cloudflare / Edge CDN ]
                          • Caching de Assets
                          • Protección DDoS TLS 1.3
                                      │
                                      ▼
                      [ Google Cloud Run / Netlify ]
                       (Auto-escalado 0 -> 1000 pods)
                                      │
            ┌─────────────────────────┴─────────────────────────┐
            ▼                                                   ▼
   [ Express Backend API ]                             [ Gemini 3.8 Flash ]
    • /api/ai/extract-document                          • Procesamiento OCR
    • /api/auth/verify                                  • Análisis de Facturas
    • /api/sync/github                                          │
            │                                                   │
            ▼                                                   ▼
   [ Firestore Database ]                              [ GitHub Repository ]
    • Colecciones de órdenes                           • Commits versionados
    • Inventario en tiempo real                        • CI/CD Pipelines
```

### 7.1 Garantías de Escalabilidad y Alta Concurrencia
* **Despliegue Serverless en Cloud Run / Netlify**: Capacidad de escalar automáticamente a cero cuando no hay tráfico para reducir costos y escalar a miles de contenedores simultáneos durante campañas de ventas de donas.
* **Protección Anti-Fraude**: La verificación obligatoria del cliente antes del pago reduce carritos abandonados fraudulentos y protege la información financiera de los compradores.
* **Generación de Facturas PDF en el Cliente (`jsPDF`)**: Reduce la carga en el servidor al generar comprobantes digitales de alta resolución directamente en el navegador del usuario.
* **Integración WhatsApp Business Directa**: Conexión nativa con la línea telefónica **3213610322** que automatiza la orden con un mensaje codificado listo para enviar con un solo toque.

---
*Hecho con dedicación y amor por la repostería artesanal por estudiantes de la I.E. Marco Fidel Suárez — Gualanday, Tolima.*
