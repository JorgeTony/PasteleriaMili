import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface HeroSlide {
  id: number;
  image: string;
  tagline: string;
  title: string;
  subtitle: string;
  active: boolean;
  sort_order: number;
}

export default function HeroSection() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    async function fetchSlides() {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error cargando hero slides:', error);
        return;
      }

      setSlides(data || []);
    }

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setAnimating(true);

      setTimeout(() => {
        setCurrent(p => (p + 1) % slides.length);
        setAnimating(false);
      }, 400);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goTo = (index: number) => {
    if (index === current) return;

    setAnimating(true);

    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  };

  if (slides.length === 0) {
    return (
      <section id="inicio" className="relative w-full h-screen min-h-[600px] bg-stone-900" />
    );
  }

  const slide = slides[current];

  return (
    <section id="inicio" className="relative w-full h-screen min-h-[600px] overflow-hidden">
      <div className={`absolute inset-0 transition-opacity duration-500 ${animating ? 'opacity-0' : 'opacity-100'}`}>
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

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
    </section>
  );
}