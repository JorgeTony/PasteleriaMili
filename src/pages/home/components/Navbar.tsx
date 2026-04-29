import { useState, useEffect } from 'react';

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
}

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Productos', href: '#productos' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar({ cartCount, onCartOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-stone-100' : 'bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <a href="#inicio" className="flex flex-col leading-none cursor-pointer">
          <span
            className={`text-2xl font-bold tracking-wider transition-colors ${scrolled ? 'text-stone-900' : 'text-white'}`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Milis
          </span>
          <span className={`text-xs tracking-[0.25em] uppercase transition-colors ${scrolled ? 'text-amber-700' : 'text-amber-200'}`}>
            Pastelería & Panadería
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <li key={link.href} className="flex items-center gap-1">
              {i > 0 && (
                <span className={`text-xs transition-colors ${scrolled ? 'text-stone-300' : 'text-white/30'}`}>♦</span>
              )}
              <a
                href={link.href}
                className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-md hover:text-amber-700 ${
                  scrolled ? 'text-stone-700' : 'text-white/90'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: Cart */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCartOpen}
            className="relative flex items-center gap-2 cursor-pointer"
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              scrolled ? 'bg-stone-100 hover:bg-stone-200' : 'bg-white/20 hover:bg-white/30'
            }`}>
              <i className={`ri-shopping-bag-line text-lg transition-colors ${scrolled ? 'text-stone-700' : 'text-white'}`} />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
              scrolled ? 'hover:bg-stone-100' : 'hover:bg-white/20'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <i className={`text-xl transition-colors ${mobileOpen ? 'ri-close-line' : 'ri-menu-3-line'} ${scrolled ? 'text-stone-700' : 'text-white'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 space-y-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-medium text-stone-700 hover:text-amber-700 border-b border-stone-50"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
