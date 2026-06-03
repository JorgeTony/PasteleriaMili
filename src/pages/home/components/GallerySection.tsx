import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface GallerySectionProps {
  onEncargo: () => void;
}

interface GalleryItem {
  id: number;
  title: string;
  subtitle: string | null;
  label: string;
  image: string;
  type: string;
  sort_order: number;
}

const stats = [
  { value: '200+', label: 'Creaciones únicas' },
  { value: '12', label: 'Variedades disponibles' },
  { value: '5★', label: 'Valoración de clientes' },
  { value: '8', label: 'Años horneando' },
];

const bentoSpans = [2, 1, 1, 1, 1, 2, 2, 2];

export default function GallerySection({ onEncargo }: GallerySectionProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [galleryExtras, setGalleryExtras] = useState<GalleryItem[]>([]);

  useEffect(() => {
    async function fetchGallery() {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error cargando galería:', error);
        return;
      }

      setGalleryItems((data || []).filter(item => item.type === 'main'));
      setGalleryExtras((data || []).filter(item => item.type === 'extra'));
    }

    fetchGallery();
  }, []);

  return (
    <section id="galeria" className="py-28 bg-[#faf8f5] overflow-hidden">
      <div className="px-6 md:px-12 max-w-6xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-amber-600" />
              <span className="text-amber-700 text-xs tracking-[0.3em] uppercase font-medium">
                Galería Destacada
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Creaciones<br />
              <span className="italic text-amber-700">que enamoran</span>
            </h2>
          </div>

          <p className="text-stone-500 text-sm leading-relaxed max-w-xs md:text-right">
            Cada pieza es una obra de arte hecha con pasión, técnica y los mejores ingredientes del mercado.
          </p>
        </div>
      </div>

      <div className="px-6 md:px-12 max-w-6xl mx-auto mb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-200 rounded-2xl overflow-hidden">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-5 flex flex-col items-center text-center">
              <span
                className="text-3xl font-bold text-amber-800 mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stat.value}
              </span>
              <span className="text-stone-500 text-xs">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-12 max-w-6xl mx-auto mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onMouseEnter={() => setHovered(`hero-${item.id}`)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                index === 1 ? 'md:-mt-10 md:mb-0' : ''
              }`}
              style={{ height: index === 1 ? '540px' : '460px' }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 transition-opacity duration-300" />

              <div className="absolute top-4 left-4">
                <span className="bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  {item.label}
                </span>
              </div>

              <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="ri-arrow-right-up-line text-white text-sm" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3
                  className="text-white text-xl font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>

                <div
                  className={`overflow-hidden transition-all duration-400 ${
                    hovered === `hero-${item.id}` ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-white/75 text-sm leading-relaxed">{item.subtitle}</p>
                </div>

                <div className="flex items-center gap-1 mt-3">
                  {[1, 2, 3, 4, 5].map(s => (
                    <i key={s} className="ri-star-fill text-amber-400 text-xs" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryExtras.map((item, index) => {
            const span = bentoSpans[index] ?? 1;
            const isLarge = span === 2;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHovered(`extra-${item.id}`)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative overflow-hidden rounded-xl cursor-pointer ${
                  isLarge ? 'col-span-2' : 'col-span-1'
                }`}
                style={{ height: isLarge ? '220px' : '200px' }}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                  <span
                    className="text-white font-semibold text-sm"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.label}
                  </span>

                  <div
                    className={`w-7 h-7 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 transition-all duration-300 ${
                      hovered === `extra-${item.id}` ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                    }`}
                  >
                    <i className="ri-add-line text-white text-sm" />
                  </div>
                </div>

                <div
                  className={`absolute top-3 right-3 transition-opacity duration-300 ${
                    hovered === `extra-${item.id}` ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span className="bg-amber-500/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    Ver más
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-6 md:px-12 max-w-6xl mx-auto mt-12">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{ background: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #b45309 100%)' }}
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-8">
            <div className="text-center md:text-left">
              <p className="text-amber-200 text-xs tracking-widest uppercase font-medium mb-2">
                Encargos especiales
              </p>

              <h3
                className="text-white text-2xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                ¿Tienes algo especial en mente?
              </h3>

              <p className="text-amber-100/70 text-sm mt-1">
                Creamos pasteles y panes únicos para tu ocasión especial
              </p>
            </div>

            <button
              onClick={onEncargo}
              className="flex-shrink-0 flex items-center gap-2 bg-white text-amber-900 font-semibold px-6 py-3 rounded-full hover:bg-amber-50 transition-colors cursor-pointer whitespace-nowrap text-sm"
            >
              <i className="ri-quill-pen-line text-base" />
              Hacer un encargo
            </button>
          </div>

          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute -bottom-8 right-24 w-24 h-24 rounded-full bg-white/5" />
        </div>
      </div>
    </section>
  );
}