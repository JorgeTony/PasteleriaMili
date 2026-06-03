import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error cargando testimonios:', error);
        return;
      }

      setTestimonials(data || []);
    }

    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) {
    return null;
  }

  const prev = () =>
    setCurrent(p => (p - 1 + testimonials.length) % testimonials.length);

  const next = () =>
    setCurrent(p => (p + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold text-stone-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ( Lo que dicen nuestros clientes )
          </h2>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-full mb-8">
            <i className="ri-star-fill text-amber-400 text-sm" />
            <span className="text-sm font-medium">
              {t.rating}.0 / 5.0
            </span>
          </div>

          <blockquote
            className="text-stone-700 text-lg md:text-xl leading-relaxed mb-10 italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            &ldquo;{t.text}&rdquo;
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="text-left">
              <div className="text-stone-900 font-semibold text-base">
                {t.name}
              </div>

              <div className="text-stone-400 text-xs mt-0.5">
                {t.role}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          <button
            onClick={prev}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-stone-200 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <i className="ri-arrow-left-s-line text-stone-600 text-lg" />
          </button>

          <button
            onClick={next}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-stone-900 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <i className="ri-arrow-right-s-line text-white text-lg" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all cursor-pointer ${
                i === current
                  ? 'w-6 h-2 bg-amber-700'
                  : 'w-2 h-2 bg-stone-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}