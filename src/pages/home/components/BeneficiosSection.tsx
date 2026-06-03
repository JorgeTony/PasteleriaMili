import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Benefit {
  id: number;
  icon: string;
  title: string;
  description: string;
  bg_class: string;
  icon_color_class: string;
  accent_class: string;
}

const features = [
  { icon: 'ri-store-2-line', label: 'Retiro en tienda' },
  { icon: 'ri-cake-2-line', label: 'Encargos personalizados' },
  { icon: 'ri-whatsapp-line', label: 'Pedidos por WhatsApp' },
  { icon: 'ri-gift-line', label: 'Packaging especial' },
];

export default function BeneficiosSection() {
  const [beneficios, setBeneficios] = useState<Benefit[]>([]);

  useEffect(() => {
    async function fetchBenefits() {
      const { data, error } = await supabase
        .from('benefits')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error cargando beneficios:', error);
        return;
      }

      setBeneficios(data || []);
    }

    fetchBenefits();
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 bg-stone-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <span className="text-amber-700 text-xs tracking-[0.3em] uppercase font-medium mb-3 block">
            Nuestra diferencia
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ¿Por qué elegir<br />
            <span className="italic text-amber-700">Milis?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {beneficios.map((b) => (
            <div
              key={b.id}
              className={`${b.bg_class} rounded-2xl p-6 flex flex-col gap-4 transition-transform hover:-translate-y-1 duration-300`}
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${b.accent_class}`}>
                <i className={`${b.icon} ${b.icon_color_class} text-2xl`} />
              </div>

              <div>
                <h3 className="text-stone-900 font-semibold text-sm mb-2 leading-snug">
                  {b.title}
                </h3>

                <p className="text-stone-500 text-xs leading-relaxed">
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-800 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p
            className="text-white text-lg font-semibold text-center sm:text-left"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Todo lo que necesitas, en un solo lugar
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-medium px-4 py-2 rounded-full whitespace-nowrap"
              >
                <i className={`${f.icon} text-amber-300`} />
                {f.label}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}