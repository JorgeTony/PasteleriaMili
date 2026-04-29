import { useCart } from '@/hooks/useCart';
import CartSidebar from '@/components/feature/CartSidebar';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import GallerySection from './components/GallerySection';
import ProductsSection from './components/ProductsSection';
import AboutSection from './components/AboutSection';
import CtaSection from './components/CtaSection';
import TestimonialsSection from './components/TestimonialsSection';
import FooterSection from './components/FooterSection';

export default function HomePage() {
  const cart = useCart();

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
      />
      <main>
        <HeroSection />
        <GallerySection />
        <ProductsSection onAddToCart={cart.addItem} />
        <CtaSection />
        <AboutSection />
        <TestimonialsSection />
      </main>
      <FooterSection />
    </div>
  );
}
