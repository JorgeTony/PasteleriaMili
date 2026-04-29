export default function AboutSection() {
  const stats = [
    { number: '15+', label: 'Años de experiencia en repostería artesanal' },
    { number: '80+', label: 'Variedades de panes y pasteles en catálogo' },
    { number: '5K+', label: 'Clientes satisfechos cada mes' },
  ];

  return (
    <section id="nosotros" className="py-24 px-6 md:px-12 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text & Stats */}
          <div>
            <span className="text-amber-700 text-xs tracking-[0.3em] uppercase font-medium mb-3 block">
              Nuestra historia
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Pasión por<br />
              el buen sabor<br />
              desde 2008
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-8 max-w-lg">
              Milis nació de un sueño simple: crear panes y pasteles que hicieran sonreír a las personas. Empezamos en una pequeña cocina familiar y hoy somos el referente de la pastelería artesanal en la ciudad. Cada receta tiene historia, cada ingrediente es seleccionado con cuidado.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {stats.map((stat, i) => (
                <div key={i} className={`${i < 2 ? 'border-r border-stone-200' : ''} pr-4`}>
                  <div
                    className="text-3xl font-bold text-amber-700 mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {stat.number}
                  </div>
                  <p className="text-stone-500 text-xs leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

            <a
              href="#galeria"
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium px-7 py-3.5 rounded-full transition-all cursor-pointer whitespace-nowrap"
            >
              Ver nuestra galería
              <i className="ri-arrow-right-line" />
            </a>
          </div>

          {/* Right: Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden" style={{ height: '220px' }}>
                  <img
                    src="https://readdy.ai/api/search-image?query=professional%20baker%20woman%20decorating%20elegant%20cake%20with%20cream%20in%20modern%20bakery%20kitchen%20warm%20light%20flour%20hands%20artisan%20baking%20process%20cream%20white%20background&width=400&height=300&seq=about1&orientation=landscape"
                    alt="Nuestra pastelera"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden" style={{ height: '160px' }}>
                  <img
                    src="https://readdy.ai/api/search-image?query=close%20up%20hands%20kneading%20bread%20dough%20on%20floured%20wooden%20surface%20artisan%20bakery%20process%20warm%20natural%20light%20rustic%20cream%20background%20craft%20baking&width=400&height=240&seq=about2&orientation=landscape"
                    alt="Elaboración artesanal"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-2xl overflow-hidden" style={{ height: '160px' }}>
                  <img
                    src="https://readdy.ai/api/search-image?query=beautiful%20bakery%20display%20case%20with%20pastries%20tarts%20eclairs%20macarons%20inside%20elegant%20french%20patisserie%20warm%20light%20cream%20white%20background%20luxury&width=400&height=240&seq=about3&orientation=landscape"
                    alt="Exhibición de productos"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden" style={{ height: '220px' }}>
                  <img
                    src="https://readdy.ai/api/search-image?query=fresh%20bread%20coming%20out%20of%20oven%20golden%20crust%20baker%20hands%20with%20oven%20mitts%20professional%20bakery%20warm%20orange%20glow%20cream%20background%20artisan&width=400&height=300&seq=about4&orientation=landscape"
                    alt="Panes frescos del horno"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="absolute -bottom-4 -left-4 bg-amber-800 text-white rounded-2xl p-4 shadow-lg hidden md:block">
              <div className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>100%</div>
              <div className="text-xs text-amber-200">Artesanal</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
