import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import CartSidebar from '@/components/feature/CartSidebar';
import WhatsAppButton from '@/components/feature/WhatsAppButton';
import CheckoutModal from './components/CheckoutModal';
import EncargosModal from './components/EncargosModal';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import GallerySection from './components/GallerySection';
import ProductsSection from './components/ProductsSection';
import AboutSection from './components/AboutSection';
import BeneficiosSection from './components/BeneficiosSection';
import CtaSection from './components/CtaSection';
import TestimonialsSection from './components/TestimonialsSection';
import HorariosSection from './components/HorariosSection';
import FooterSection from './components/FooterSection';

export default function HomePage() {
  const cart = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isEncargosOpen, setIsEncargosOpen] = useState(false);

  const handleCheckout = () => {
    cart.setIsOpen(false);
    setTimeout(() => setIsCheckoutOpen(true), 300);
  };

  const handleCheckoutSuccess = () => {
    cart.clearCart();
  };

  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Lato', sans-serif" }}>
      <Navbar cartCount={cart.count} onCartOpen={() => cart.setIsOpen(true)} />

      <CartSidebar
        isOpen={cart.isOpen}
        onClose={() => cart.setIsOpen(false)}
        items={cart.items}
        total={cart.total}
        onUpdateQuantity={cart.updateQuantity}
        onRemove={cart.removeItem}
        onClear={cart.clearCart}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cart.items}
        total={cart.total}
        onClose={handleCheckoutClose}
        onSuccess={handleCheckoutSuccess}
      />

      <main>
        <HeroSection />
        <GallerySection onEncargo={() => setIsEncargosOpen(true)} />
        <ProductsSection onAddToCart={cart.addItem} />
        <CtaSection onEncargo={() => setIsEncargosOpen(true)} />
        <AboutSection />
        <BeneficiosSection />
        <TestimonialsSection />
        <HorariosSection />
      </main>

      <EncargosModal
        isOpen={isEncargosOpen}
        onClose={() => setIsEncargosOpen(false)}
      />

      <WhatsAppButton />
      <FooterSection />
    </div>
  );
}