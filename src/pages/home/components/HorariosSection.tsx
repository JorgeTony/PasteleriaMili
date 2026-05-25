import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface DaySchedule {
  id: number;
  day_index: number;
  day_name: string;
  open_time: string | null;
  close_time: string | null;
  closed: boolean;
}

const pickupSteps = [
  { icon: 'ri-shopping-bag-line', title: 'Realiza tu pedido', desc: 'Agrega productos al carrito o solicita un encargo especial.' },
  { icon: 'ri-phone-line', title: 'Confirmamos contigo', desc: 'Te contactamos en menos de 24 h para coordinar los detalles.' },
  { icon: 'ri-store-2-line', title: 'Recoge en tienda', desc: 'Visítanos en Av. San Antonio de Carapongo MZ D1 lote 21 dentro del horario de atención.' },
];

function timeToMinutes(t: string) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function shortDay(day: string) {
  return day.slice(0, 3);
}

function formatTime(t: string | null) {
  if (!t) return '';
  return t.slice(0, 5);
}

export default function HorariosSection() {
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);

  useEffect(() => {
    async function fetchSchedule() {
      const { data, error } = await supabase
        .from('business_hours')
        .select('*')
        .eq('active', true)
        .order('day_index', { ascending: true });

      if (error) {
        console.error('Error cargando horarios:', error);
        return;
      }

      setSchedule(data || []);
    }

    fetchSchedule();
  }, []);

  const { todayIndex, isOpen, nextChange } = useMemo(() => {
    if (schedule.length === 0) {
      return { todayIndex: -1, isOpen: false, nextChange: '' };
    }

    const now = new Date();
    const jsDay = now.getDay();
    const idx = jsDay === 0 ? 6 : jsDay - 1;

    const currentDay = schedule.find(day => day.day_index === idx);
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    if (!currentDay) {
      return { todayIndex: idx, isOpen: false, nextChange: '' };
    }

    let open = false;
    let next = '';

    if (!currentDay.closed && currentDay.open_time && currentDay.close_time) {
      const openMin = timeToMinutes(formatTime(currentDay.open_time));
      const closeMin = timeToMinutes(formatTime(currentDay.close_time));

      open = currentMinutes >= openMin && currentMinutes < closeMin;
      next = open
        ? `Cierra a las ${formatTime(currentDay.close_time)}`
        : `Abre a las ${formatTime(currentDay.open_time)}`;
    } else {
      next = 'Hoy cerramos todo el día';
    }

    return { todayIndex: idx, isOpen: open, nextChange: next };
  }, [schedule]);

  return (
    <section id="horarios" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-amber-600" />
              <span className="text-amber-700 text-xs tracking-[0.3em] uppercase font-medium">
                Visítanos
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Horarios de<br />
              <span className="italic text-amber-700">atención</span>
            </h2>
          </div>

          <div className="flex-shrink-0">
            <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl border ${
              isOpen
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpen ? 'bg-green-500' : 'bg-red-400'}`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpen ? 'bg-green-600' : 'bg-red-500'}`} />
              </span>

              <div>
                <p className="text-sm font-semibold leading-none mb-0.5">
                  {isOpen ? 'Abierto ahora' : 'Cerrado ahora'}
                </p>
                <p className={`text-xs ${isOpen ? 'text-green-600' : 'text-red-500'}`}>
                  {nextChange}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-2">
            {schedule.map((day) => {
              const isToday = day.day_index === todayIndex;

              return (
                <div
                  key={day.id}
                  className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all ${
                    isToday
                      ? 'bg-amber-800 text-white'
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-xl text-xs font-bold flex-shrink-0 ${
                      isToday
                        ? 'bg-white/20 text-white'
                        : 'bg-white text-stone-500 border border-stone-200'
                    }`}>
                      {shortDay(day.day_name)}
                    </div>

                    <span className={`font-medium text-sm ${isToday ? 'text-white' : 'text-stone-800'}`}>
                      {day.day_name}
                    </span>

                    {isToday && (
                      <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">
                        Hoy
                      </span>
                    )}
                  </div>

                  {day.closed ? (
                    <span className={`text-sm font-medium ${isToday ? 'text-white/70' : 'text-stone-400'}`}>
                      Cerrado
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${isToday ? 'text-white' : 'text-stone-900'}`}>
                        {formatTime(day.open_time)}
                      </span>
                      <span className={`text-xs ${isToday ? 'text-white/60' : 'text-stone-400'}`}>—</span>
                      <span className={`text-sm font-semibold ${isToday ? 'text-white' : 'text-stone-900'}`}>
                        {formatTime(day.close_time)}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex items-start gap-3 mt-4 px-4 py-3 bg-amber-50 rounded-2xl">
              <div className="w-4 h-4 flex items-center justify-center mt-0.5 flex-shrink-0">
                <i className="ri-information-line text-amber-600 text-sm" />
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                En días festivos el horario puede variar. Síguenos en redes sociales para estar al tanto de cambios especiales.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="relative rounded-2xl overflow-hidden flex-shrink-0" style={{ height: '200px' }}>
              <iframe
                title="Ubicación Pastelería Milis"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Av.+San+Antonio+de+Carapongo+MZ+D1+lote+21,+Lurigancho,+Lima&output=embed"
              />

              <a
                href="https://maps.google.com/?q=Av.+San+Antonio+de+Carapongo+MZ+D1+lote+21"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="absolute bottom-3 right-3 bg-white text-stone-800 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer hover:bg-amber-50 transition-colors"
              >
                <i className="ri-external-link-line text-amber-700" />
                Abrir en Maps
              </a>
            </div>

            <div className="bg-stone-50 rounded-2xl p-5 space-y-3">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-4">
                Contáctanos
              </p>

              <a href="tel:+51959791846" className="flex items-center gap-3 group cursor-pointer">
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-amber-100 flex-shrink-0">
                  <i className="ri-phone-line text-amber-700 text-base" />
                </div>
                <div>
                  <p className="text-xs text-stone-500">Teléfono</p>
                  <p className="text-sm font-medium text-stone-900 group-hover:text-amber-700 transition-colors">
                    +51 959 791 846
                  </p>
                </div>
              </a>

              <a href="mailto:milis.oficial@gmail.com" className="flex items-center gap-3 group cursor-pointer">
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-amber-100 flex-shrink-0">
                  <i className="ri-mail-line text-amber-700 text-base" />
                </div>
                <div>
                  <p className="text-xs text-stone-500">Correo</p>
                  <p className="text-sm font-medium text-stone-900 group-hover:text-amber-700 transition-colors">
                    milis.oficial@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://maps.google.com/?q=Av.+San+Antonio+de+Carapongo+MZ+D1+lote+21"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-amber-100 flex-shrink-0">
                  <i className="ri-map-pin-line text-amber-700 text-base" />
                </div>
                <div>
                  <p className="text-xs text-stone-500">Dirección</p>
                  <p className="text-sm font-medium text-stone-900 group-hover:text-amber-700 transition-colors">
                    Av. San Antonio de Carapongo MZ D1 lote 21
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <p className="text-center text-xs font-semibold text-stone-500 uppercase tracking-wider mb-8">
            ¿Cómo recoger tu pedido?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pickupSteps.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex-shrink-0 relative">
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-amber-50 border border-amber-100">
                    <i className={`${step.icon} text-amber-700 text-xl`} />
                  </div>

                  <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-amber-800 text-white text-xs font-bold">
                    {i + 1}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-stone-900 mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}