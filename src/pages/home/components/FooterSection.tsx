import { useState } from 'react';

const FORM_URL = 'https://readdy.ai/api/form/d7fbateivmjfhtdrfsug';

export default function FooterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const body = new URLSearchParams({ email });
      await fetch(FORM_URL, { method: 'POST', body, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer id="contacto" className="bg-stone-900 text-white mx-4 mb-4 rounded-2xl overflow-hidden">
      <div className="px-8 md:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Newsletter */}
          <div>
            <p className="text-stone-400 text-xs uppercase tracking-widest mb-2">Boletín</p>
            <h4
              className="text-2xl font-bold leading-tight mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Recibe nuestras<br />novedades
            </h4>
            <p className="text-stone-400 text-xs mb-6">Descuentos exclusivos y nuevos productos cada semana.</p>
            <form onSubmit={handleSubmit} data-readdy-form className="space-y-3">
              <input
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full bg-transparent border-b border-stone-600 focus:border-amber-500 outline-none text-sm py-2 text-white placeholder-stone-500 transition-colors"
              />
              <button
                type="submit"
                className="flex items-center gap-2 bg-white text-stone-900 font-medium text-sm px-6 py-2.5 rounded-full hover:bg-amber-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                Suscribirme <i className="ri-arrow-right-line" />
              </button>
              {status === 'success' && <p className="text-green-400 text-xs">¡Gracias por suscribirte!</p>}
              {status === 'error' && <p className="text-red-400 text-xs">Ocurrió un error. Intenta de nuevo.</p>}
            </form>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-stone-400 text-xs uppercase tracking-widest mb-4">Tienda</p>
            <ul className="space-y-3">
              {[
                { label: 'Pasteles', href: '#productos' },
                { label: 'Panes artesanales', href: '#productos' },
                { label: 'Postres y cupcakes', href: '#productos' },
                { label: 'Encargos especiales', href: '#contacto' },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-stone-300 hover:text-amber-400 text-sm transition-colors underline underline-offset-2 decoration-stone-700 hover:decoration-amber-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-stone-400 text-xs uppercase tracking-widest mb-4">Contacto Milis</p>
            <div className="space-y-2 mb-6">
              <a href="tel:+525512345678" className="block text-stone-300 text-sm hover:text-amber-400 transition-colors">
                +52 55 1234 5678
              </a>
              <a href="mailto:hola@milispasteleria.com" className="block text-stone-300 text-sm hover:text-amber-400 transition-colors">
                hola@milispasteleria.com
              </a>
            </div>
            <p className="text-stone-400 text-xs uppercase tracking-widest mb-2">Ubicación</p>
            <p className="text-stone-300 text-sm leading-relaxed">
              Av. Insurgentes Sur 1234<br />
              Col. Del Valle, CDMX
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-4">
            {[
              { icon: 'ri-instagram-line', href: '#' },
              { icon: 'ri-facebook-circle-line', href: '#' },
              { icon: 'ri-tiktok-line', href: '#' },
            ].map(s => (
              <a key={s.icon} href={s.href} className="text-stone-400 hover:text-amber-400 transition-colors underline underline-offset-2 decoration-stone-700">
                <i className={`${s.icon} text-lg`} />
              </a>
            ))}
          </div>
          <p className="text-stone-500 text-xs">© 2024 Milis Pastelería & Panadería. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="text-stone-500 hover:text-stone-300 text-xs transition-colors underline underline-offset-2">Privacidad</a>
            <a href="#" className="text-stone-500 hover:text-stone-300 text-xs transition-colors underline underline-offset-2">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
