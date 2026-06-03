import { useState } from 'react';

const PHONE = '51959791846';
const DEFAULT_MSG = encodeURIComponent('Hola! Quisiera hacer un pedido en Pastelería Milis 🎂');

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`https://wa.me/${PHONE}?text=${DEFAULT_MSG}`}
      target="_blank"
      rel="nofollow noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 cursor-pointer group"
      aria-label="Contactar por WhatsApp"
    >
      {/* Tooltip */}
      <div
        className={`transition-all duration-300 origin-right ${
          hovered ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-2 scale-95 pointer-events-none'
        }`}
      >
        <div className="bg-white text-stone-800 text-xs font-medium px-3 py-2 rounded-xl whitespace-nowrap" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
          <span className="font-semibold text-green-700">¡Escríbenos!</span>
          <br />
          <span className="text-stone-500">Pedidos y consultas</span>
        </div>
        {/* Arrow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5">
          <div className="w-2 h-2 bg-white rotate-45" style={{ boxShadow: '1px -1px 3px rgba(0,0,0,0.06)' }} />
        </div>
      </div>

      {/* Button */}
      <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition-all duration-300 hover:scale-110" style={{ boxShadow: '0 4px 20px rgba(37,211,102,0.4)' }}>
        {/* Ping animation */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
        <i className="ri-whatsapp-line text-white text-2xl relative z-10" />
      </div>
    </a>
  );
}