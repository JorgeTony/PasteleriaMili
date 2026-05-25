import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
interface EncargosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const tiposProducto = [
  'Pastel de cumpleaños',
  'Pastel de boda',
  'Pastel temático',
  'Pan artesanal',
  'Cupcakes personalizados',
  'Macarons',
  'Postres para eventos',
  'Otro',
];

const presupuestos = [
  'Menos de S/ 50',
  'S/ 50 – S/ 150',
  'S/ 150 – S/ 300',
  'S/ 300 – S/ 500',
  'Más de S/ 500',
  'Aún no lo sé',
];

export default function EncargosModal({ isOpen, onClose }: EncargosModalProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [charCount, setCharCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStatus('idle');
      setCharCount(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (status === 'loading') return;

  const form = e.currentTarget;

  const descripcion =
    (form.elements.namedItem('descripcion') as HTMLTextAreaElement)?.value ?? '';

  if (descripcion.length > 500) return;

  setStatus('loading');

  const formData = new FormData(form);

  const payload = {
    nombre: formData.get('nombre'),
    email: formData.get('email'),
    telefono: formData.get('telefono'),
    tipo_producto: formData.get('tipo_producto'),
    fecha_evento: formData.get('fecha_entrega'),
    presupuesto: formData.get('presupuesto'),
    descripcion,
  };

  try {
    const { error } = await supabase
      .from('custom_orders')
      .insert([payload]);

    if (error) {
      console.error(error);
      setStatus('error');
      return;
    }

    setStatus('success');
    form.reset();
    setCharCount(0);

  } catch (err) {
    console.error(err);
    setStatus('error');
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-stone-950/85"
        onClick={status !== 'loading' ? onClose : undefined}
      />

      {/* Panel */}
      <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto flex flex-col">

        {/* Decorative top band */}
        <div
          className="w-full h-2 rounded-t-3xl flex-shrink-0"
          style={{ background: 'linear-gradient(90deg, #92400e, #b45309, #d97706)' }}
        />

        {status === 'success' ? (
          /* ── Success screen ── */
          <div className="flex flex-col items-center text-center px-8 py-16 gap-6">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-50">
              <i className="ri-checkbox-circle-fill text-4xl text-green-500" />
            </div>
            <div>
              <h2
                className="text-2xl font-bold text-stone-900 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                ¡Encargo recibido!
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed max-w-sm mx-auto">
                Gracias por confiar en Milis. Revisaremos tu solicitud y nos pondremos en contacto contigo muy pronto para coordinar todos los detalles.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 rounded-2xl px-5 py-3 text-amber-800 text-sm">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-time-line" />
              </div>
              <span>Tiempo de respuesta: menos de 24 horas</span>
            </div>
            <button
              onClick={onClose}
              className="mt-2 bg-amber-800 hover:bg-amber-900 text-white font-medium px-8 py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap text-sm"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            {/* ── Header ── */}
            <div className="flex items-start justify-between px-8 pt-7 pb-5 border-b border-stone-100">
              <div>
                <p className="text-amber-700 text-xs tracking-widest uppercase font-medium mb-1">Pastelería Milis</p>
                <h2
                  className="text-2xl font-bold text-stone-900"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Solicitar encargo especial
                </h2>
                <p className="text-stone-500 text-sm mt-1">
                  Cuéntanos tu idea y la hacemos realidad
                </p>
              </div>
              <button
                onClick={onClose}
                disabled={status === 'loading'}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors cursor-pointer flex-shrink-0 mt-1"
              >
                <i className="ri-close-line text-xl text-stone-500" />
              </button>
            </div>

            {/* ── Form ── */}
            <form
              ref={formRef}
              data-readdy-form
              onSubmit={handleSubmit}
              className="px-8 py-6 space-y-5"
            >
              {/* Row 1: name + email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5">
                    Nombre completo <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    placeholder="Ej: Ana Torres"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 placeholder:text-stone-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5">
                    Correo electrónico <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="tu@correo.com"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 placeholder:text-stone-400 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: phone + tipo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5">
                    Teléfono / WhatsApp <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    required
                    placeholder="+51 999 999 999"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 placeholder:text-stone-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5">
                    Tipo de producto <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="tipo_producto"
                    required
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 transition-colors bg-white cursor-pointer"
                  >
                    <option value="">Selecciona una opción</option>
                    {tiposProducto.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: date + personas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5">
                    Fecha de entrega deseada <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    name="fecha_entrega"
                    required
                    min={new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]}
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 outline-none focus:border-amber-400 transition-colors bg-white cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5">
                    Número de personas aprox.
                  </label>
                  <input
                    type="number"
                    name="personas"
                    min={1}
                    max={500}
                    placeholder="Ej: 20"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 placeholder:text-stone-400 transition-colors"
                  />
                </div>
              </div>

              {/* Presupuesto */}
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-2">
                  Presupuesto aproximado
                </label>
                <div className="flex flex-wrap gap-2">
                  {presupuestos.map(p => (
                    <label key={p} className="cursor-pointer">
                      <input type="radio" name="presupuesto" value={p} className="sr-only peer" />
                      <span className="inline-block border border-stone-200 text-stone-600 text-xs px-3 py-2 rounded-full peer-checked:bg-amber-800 peer-checked:text-white peer-checked:border-amber-800 hover:border-amber-400 transition-all whitespace-nowrap">
                        {p}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">
                  Descripción del encargo <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="descripcion"
                  required
                  rows={4}
                  maxLength={500}
                  placeholder="Cuéntanos los detalles: colores, sabores, decoración, temática, nombre en el pastel, alergias o restricciones alimenticias..."
                  onChange={e => setCharCount(e.target.value.length)}
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 placeholder:text-stone-400 transition-colors resize-none"
                />
                <p className={`text-xs text-right mt-1 ${charCount > 450 ? 'text-amber-600' : 'text-stone-400'}`}>
                  {charCount}/500
                </p>
              </div>

              {/* Info note */}
              <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                <div className="w-4 h-4 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <i className="ri-lightbulb-line text-amber-600 text-sm" />
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Si tienes imágenes de referencia o inspiración, puedes enviárnoslas por WhatsApp después de completar este formulario. Te confirmaremos disponibilidad en menos de 24 horas.
                </p>
              </div>

              {/* Error */}
              {status === 'error' && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-600 text-sm">
                  <i className="ri-error-warning-line text-base" />
                  Ocurrió un error al enviar. Inténtalo de nuevo.
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 pb-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={status === 'loading'}
                  className="flex-1 border border-stone-200 text-stone-600 font-medium py-3.5 rounded-full hover:bg-stone-50 transition-colors cursor-pointer whitespace-nowrap text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={status === 'loading' || charCount > 500}
                  className="flex-1 bg-amber-800 hover:bg-amber-900 disabled:bg-amber-300 text-white font-semibold py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap text-sm flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <i className="ri-loader-4-line animate-spin text-base" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-line text-base" />
                      Enviar solicitud
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}