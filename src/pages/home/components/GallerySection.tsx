import { galleryItems, galleryExtras } from '@/mocks/products';

export default function GallerySection() {
  return (
    <section id="galeria" className="py-24 px-6 md:px-12 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-700 text-xs tracking-[0.3em] uppercase font-medium mb-3 block">
            Galería Destacada
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-stone-900 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Creaciones que enamoran
          </h2>
          <p className="text-stone-500 text-base max-w-xl mx-auto">
            Cada pieza es una obra de arte hecha con pasión, técnica y los mejores ingredientes del mercado.
          </p>
        </div>

        {/* Gallery Grid - 3 hero cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${index === 1 ? 'md:-mt-8' : ''}`}
              style={{ height: '480px' }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3
                  className="text-white text-xl font-bold mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Extra gallery - 8 items 4 cols x 2 rows */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {galleryExtras.map(item => (
            <div
              key={item.seq}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
              style={{ height: '200px' }}
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-3 left-3 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
