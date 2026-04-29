import { useState, useEffect } from 'react';

const slides = [
  {
    image: 'https://readdy.ai/api/search-image?query=luxurious%20bakery%20interior%20with%20beautiful%20cakes%20and%20pastries%20on%20display%20warm%20golden%20light%20elegant%20french%20patisserie%20atmosphere%20cream%20and%20warm%20tones%20rich%20detail&width=1600&height=900&seq=hero1&orientation=landscape',
    tagline: 'Artesanal & Auténtico',
    title: 'El arte de\nendulzar\ntu mundo',
    subtitle: 'Pasteles, panes y postres creados con amor y los mejores ingredientes',
  },
  {
    image: 'https://readdy.ai/api/search-image?query=beautiful%20assortment%20of%20fresh%20baked%20breads%20sourdough%20baguettes%20focaccia%20in%20warm%20golden%20light%20rustic%20wood%20bakery%20counter%20cream%20beige%20warm%20tones&width=1600&height=900&seq=hero2&orientation=landscape',
    tagline: 'Horneado cada mañana',
    title: 'Panes\nartesanales\nfrescos',
    subtitle: 'Masa madre de 48 horas, harinas seleccionadas y técnicas tradicionales',
  },
  {
    image: 'https://readdy.ai/api/search-image?query=stunning%20collection%20of%20french%20pastries%20macarons%20eclairs%20tarts%20on%20elegant%20marble%20surface%20soft%20natural%20light%20luxury%20patisserie%20cream%20white%20background%20beautiful&width=1600&height=900&seq=hero3&orientation=landscape',
    tagline: 'Postres de autor',
    title: 'Repostería\nfina para\ncada momento',
    subtitle: 'Inspiración francesa con ingredientes locales de primera calidad',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(p => (p + 1) % slides.length);
        setAnimating(false);
      }, 400);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    if (index === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  };

  const slide = slides[current];

  return (
    <section id="inicio" className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${animating ? 'opacity-0' : 'opacity-100'}`}>
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className={`relative z-10 flex flex-col items-center justify-center h-full text-center px-6 transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <span className="text-amber-300 text-xs tracking-[0.3em] uppercase mb-4 font-medium">
          {slide.tagline}
        </span>
        <h1
          className="text-white text-5xl md:text-7xl font-bold leading-tight mb-6 whitespace-pre-line"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {slide.title}
        </h1>
        <p className="text-white/75 text-base md:text-lg max-w-md mb-10 leading-relaxed">
          {slide.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#productos"
            className="bg-amber-800 hover:bg-amber-900 text-white font-medium px-8 py-4 rounded-full flex items-center gap-2 transition-all hover:gap-3 cursor-pointer whitespace-nowrap text-sm"
          >
            Ver productos
            <i className="ri-arrow-right-line" />
          </a>
          <a
            href="#galeria"
            className="text-white/90 hover:text-white text-sm font-medium flex items-center gap-2 cursor-pointer whitespace-nowrap border-b border-white/30 hover:border-white transition-all pb-0.5"
          >
            Explorar galería
            <i className="ri-arrow-right-up-line text-xs" />
          </a>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              i === current ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2">
        <div className="h-12 w-px bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-bounce" />
        </div>
        <span className="text-white/50 text-xs tracking-widest rotate-90 origin-center mt-2">scroll</span>
      </div>
    </section>
  );
}
