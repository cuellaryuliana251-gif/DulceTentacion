/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { DonutConfigurator } from './components/DonutConfigurator';
import { IngredientsSection } from './components/IngredientsSection';
import { AIInventoryHub } from './components/AIInventoryHub';
import { SuggestionsAndContact } from './components/SuggestionsAndContact';
import { CartDrawer } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

import { Product, CartItem, CustomerVerification, InventoryItem } from './types';
import { INITIAL_PRODUCTS, INITIAL_INVENTORY } from './data/mockData';

export default function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('dt_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('dt_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const [customer, setCustomer] = useState<CustomerVerification>(() => {
    const saved = localStorage.getItem('dt_customer');
    return saved
      ? JSON.parse(saved)
      : {
          fullName: '',
          whatsapp: '',
          email: '',
          address: '',
          desiredDate: '',
          paymentMethod: 'efectivo',
          isVerified: false,
        };
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('dt_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('dt_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('dt_customer', JSON.stringify(customer));
  }, [customer]);

  // Handle section scrolling
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add standard catalog product to cart
  const handleAddToCart = (product: Product, selectedBase?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.customDetails?.base === selectedBase
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        productId: product.id,
        title: product.name,
        description: selectedBase ? `Glaseado: ${selectedBase}` : product.subtitle,
        customDetails: selectedBase
          ? {
              base: selectedBase,
              toppings: [],
              sauce: 'Ninguna',
            }
          : undefined,
        unitPrice: product.price,
        quantity: 1,
        image: product.image,
      };

      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  // Add customized donut from configurator
  const handleAddCustomDonut = (customItem: CartItem) => {
    setCartItems((prev) => [...prev, customItem]);
    setIsCartOpen(true);
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove item
  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF6F9]">
      {/* Navbar with 3-zone contract */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
        activeSection={activeSection}
        isCustomerVerified={customer.isVerified}
      />

      <main className="flex-1">
        {/* Hero Banner */}
        <Hero
          onExploreClick={() => scrollToSection('catalogo')}
          onCustomizeClick={() => scrollToSection('personalizador')}
        />

        {/* Product Catalog */}
        <ProductCatalog
          products={products}
          onAddToCart={handleAddToCart}
          onOpenConfigurator={() => scrollToSection('personalizador')}
        />

        {/* Interactive Donut Configurator */}
        <DonutConfigurator onAddCustomDonut={handleAddCustomDonut} />

        {/* Ingredients & Craftsmanship */}
        <IngredientsSection />

        {/* AI Hub: Document & Invoice Extractor, Live Inventory & GitHub Deploy */}
        <AIInventoryHub
          inventory={inventory}
          onUpdateInventory={(updated) => setInventory(updated)}
        />

        {/* Suggestions & Contact */}
        <SuggestionsAndContact />
      </main>

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        customer={customer}
        onUpdateCustomer={(c) => setCustomer(c)}
      />

      {/* Floating WhatsApp Contact Button */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer />
    </div>
  );
}
