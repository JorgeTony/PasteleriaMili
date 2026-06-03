interface CtaSectionProps {
  onEncargo: () => void;
}

export default function CtaSection({ onEncargo }: CtaSectionProps) {
  return (
    <section className="py-0 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        {/* Left: Image */}
        <div className="relative">
          <img
            src="https://readdy.ai/api/search-image?query=elegant%20wedding%20cake%20being%20decorated%20by%20pastry%20chef%20with%20white%20roses%20and%20gold%20details%20luxury%20bakery%20studio%20warm%20soft%20light%20cream%20white%20background%20beauty%20art&width=800&height=600&seq=cta1&orientation=landscape"
            alt="Pasteles personalizados"
            className="w-full h-full object-cover object-top min-h-[350px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
          <div className="absolute top-6 left-6">
            <span className="text-white/80 text-xs tracking-widest uppercase bg-black/20 px-3 py-1 rounded-full">Encargos especiales</span>
          </div>
          <div className="absolute bottom-6 left-6 right-8">
            <h3
              className="text-white text-3xl md:text-4xl font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Haz tu<br />
              encargo<br />
              personalizado
            </h3>
          </div>
        </div>

        {/* Right: Info */}
        <div className="bg-stone-50 flex flex-col items-center justify-center px-10 py-16 text-center">
          <h3
            className="text-stone-900 text-3xl md:text-4xl font-bold leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Diseñamos el pastel<br />
            de tus sueños
          </h3>
          <p className="text-stone-500 text-sm leading-relaxed mb-10 max-w-sm">
            Bodas, quinceañeras, cumpleaños o eventos corporativos. Trabajamos contigo para crear una pieza única que refleje tu visión y sorprenda a todos tus invitados.
          </p>
          <button
            onClick={onEncargo}
            className="inline-flex items-center gap-2 bg-amber-800 hover:bg-amber-900 text-white text-sm font-medium px-8 py-4 rounded-full transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-quill-pen-line text-base" />
            Hacer un encargo
          </button>
        </div>
      </div>
    </section>
  );
}
