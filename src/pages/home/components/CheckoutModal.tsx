import { useState, useEffect } from 'react';
import { CartItem } from '@/hooks/useCart';
import { supabase } from '@/lib/supabaseClient';

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
}

type Step = 'form' | 'success';

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  notes: '',
};

export default function CheckoutModal({
  isOpen,
  items,
  total,
  onClose,
  onSuccess,
}: CheckoutModalProps) {
  const [step, setStep] = useState<Step>('form');
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
const [savedItems, setSavedItems] = useState<CartItem[]>([]);
const [savedTotal, setSavedTotal] = useState(0);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep('form');
      setForm(initialForm);
      setErrors({});
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!form.email.trim()) newErrors.email = 'El correo es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Correo inválido';
    if (!form.phone.trim()) newErrors.phone = 'El teléfono es requerido';
    if (!form.address.trim()) newErrors.address = 'La dirección es requerida';
    if (!form.city.trim()) newErrors.city = 'La ciudad es requerida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      const subtotal = items.reduce((sum, i) => {
        const price = i.product.price;
        return sum + price * i.quantity;
      }, 0);

      const recipient = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
      };

      const { data: orderHeader, error: headerError } = await supabase
        .from('order_headers')
        .insert({
          currency: 'PEN',
          payment_provider: 'manual',
          status: 'pending_payment',
          subtotal_items: subtotal,
          shipping_total: 0,
          tax_total: 0,
          customer_notes: form.notes.trim() || null,
          recipient,
          customer_id: null,
        })
        .select('id')
        .single();

      if (headerError || !orderHeader) throw headerError;

      const orderItems = items.map(i => ({
        order_id: orderHeader.id,
        product_id: String(i.product.id),
        product_name: i.product.name,
        quantity: i.quantity,
        unit_price: i.product.price,
        final_price: i.product.price,
        subtotal: i.product.price * i.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      setOrderId(orderHeader.id);
setSavedItems(items);
setSavedTotal(total);
setStep('success');

setTimeout(() => {
  onSuccess();
}, 300);
    } catch (err: any) {
  console.error('Error al procesar el pedido:', err);
  alert(err?.message || JSON.stringify(err, null, 2));
} finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-stone-950/85"
        onClick={step === 'success' ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {step === 'form' ? (
          <>
            {/* Header */}
            <div className="sticky top-0 bg-white px-8 pt-8 pb-5 border-b border-stone-100 flex items-center justify-between z-10">
              <div>
                <h2
                  className="text-2xl font-bold text-stone-900"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Finalizar pedido
                </h2>
                <p className="text-stone-500 text-sm mt-1">Completa tus datos para confirmar</p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-xl text-stone-500" />
              </button>
            </div>

            <div className="px-8 py-6 space-y-8">
              {/* Order Summary */}
              <div>
                <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-4">
                  Resumen del pedido
                </h3>
                <div className="bg-stone-50 rounded-2xl p-4 space-y-3">
                  {items.length > 0 ? (
  items.map(item => (
    <div key={item.product.id} className="flex justify-between items-center">
      <span className="text-sm text-stone-700">
        {item.product.name} <span className="text-stone-400">x{item.quantity}</span>
      </span>
      <span className="text-sm font-medium text-stone-900">
        S/ {(item.product.price * item.quantity).toFixed(2)}
      </span>
    </div>
  ))
) : (
  <p className="text-sm text-stone-500">Pedido registrado correctamente.</p>
)}
                  <div className="border-t border-stone-200 pt-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-stone-700">Total</span>
                    <span className="text-lg font-bold text-amber-800">S/ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Customer Form */}
              <div>
                <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-4">
                  Datos de entrega
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-stone-600 mb-1.5">
                      Nombre completo <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ej: María García"
                      className={`w-full border rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400 ${
                        errors.name
                          ? 'border-red-300 bg-red-50 focus:border-red-400'
                          : 'border-stone-200 bg-white focus:border-amber-400'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1.5">
                      Correo electrónico <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@correo.com"
                      className={`w-full border rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400 ${
                        errors.email
                          ? 'border-red-300 bg-red-50 focus:border-red-400'
                          : 'border-stone-200 bg-white focus:border-amber-400'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1.5">
                      Teléfono <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+51 999 999 999"
                      className={`w-full border rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400 ${
                        errors.phone
                          ? 'border-red-300 bg-red-50 focus:border-red-400'
                          : 'border-stone-200 bg-white focus:border-amber-400'
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-stone-600 mb-1.5">
                      Dirección de entrega <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Av. Principal 123, Dpto 4B"
                      className={`w-full border rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400 ${
                        errors.address
                          ? 'border-red-300 bg-red-50 focus:border-red-400'
                          : 'border-stone-200 bg-white focus:border-amber-400'
                      }`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1.5">
                      Ciudad <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Lima"
                      className={`w-full border rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400 ${
                        errors.city
                          ? 'border-red-300 bg-red-50 focus:border-red-400'
                          : 'border-stone-200 bg-white focus:border-amber-400'
                      }`}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-stone-600 mb-1.5">
                      Notas del pedido <span className="text-stone-400">(opcional)</span>
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Instrucciones especiales, dedicatorias, alergias..."
                      rows={3}
                      maxLength={500}
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-amber-400 resize-none"
                    />
                    <p className="text-xs text-stone-400 text-right mt-1">{form.notes.length}/500</p>
                  </div>
                </div>
              </div>

              {/* Pickup note */}
              <div className="flex items-start gap-3 bg-amber-50 rounded-2xl px-4 py-3">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <i className="ri-information-line text-amber-600 text-base" />
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Recibirás una confirmación por correo electrónico. Nos pondremos en contacto contigo para coordinar los detalles del pago y la entrega. ¡Gracias por elegirnos!
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white px-8 py-5 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClose}
                className="flex-1 border border-stone-200 text-stone-600 font-medium py-3.5 rounded-full hover:bg-stone-50 transition-colors cursor-pointer whitespace-nowrap text-sm"
              >
                Volver al carrito
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-amber-800 hover:bg-amber-900 disabled:bg-amber-300 text-white font-medium py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap text-sm flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin text-base" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <i className="ri-check-double-line text-base" />
                    Confirmar pedido — S/ {total.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          /* Success Screen */
          <div className="flex flex-col items-center text-center px-8 py-14 gap-6">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-50">
              <i className="ri-checkbox-circle-fill text-4xl text-green-500" />
            </div>
            <div>
              <h2
                className="text-2xl font-bold text-stone-900 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                ¡Pedido confirmado!
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed">
                Tu pedido <span className="font-semibold text-stone-700">#{orderId}</span> ha sido recibido.<br />
                Te contactaremos pronto a <span className="font-semibold text-amber-700">{form.email}</span> para coordinar el pago y la entrega.
              </p>
            </div>

            {/* Order mini-summary */}
            <div className="w-full bg-stone-50 rounded-2xl p-5 space-y-2 text-left">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">Tu pedido</p>
              {savedItems.map(item => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <span className="text-sm text-stone-700">
                    {item.product.name} <span className="text-stone-400">x{item.quantity}</span>
                  </span>
                  <span className="text-sm font-medium text-stone-900">
                    S/ {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-stone-200 pt-2 flex justify-between items-center">
                <span className="text-sm font-semibold text-stone-700">Total</span>
                <span className="font-bold text-amber-800 text-base">
  S/ {savedTotal.toFixed(2)}
</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-stone-500">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-map-pin-line text-amber-600" />
              </div>
              <span>{form.address}, {form.city}</span>
            </div>

            <button
              onClick={onClose}
              className="mt-2 w-full bg-amber-800 hover:bg-amber-900 text-white font-medium py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap text-sm"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}