import { useEffect } from 'react';
import { CartItem } from '@/hooks/useCart';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onUpdateQuantity: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
  onClear: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  items,
  total,
  onUpdateQuantity,
  onRemove,
  onClear,
}: CartSidebarProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 flex flex-col shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-stone-900 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              Tu Carrito
            </span>
            {items.length > 0 && (
              <span className="bg-amber-700 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl text-stone-600" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-stone-50">
                <i className="ri-shopping-bag-line text-3xl text-stone-400" />
              </div>
              <p className="text-stone-500 text-sm">Tu carrito está vacío.<br />¡Agrega algo delicioso!</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.product.id} className="flex gap-4 py-3 border-b border-stone-50">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-stone-900 leading-tight mb-1 line-clamp-2">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-stone-500 mb-2 capitalize">{item.product.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-stone-50 rounded-full px-1 py-1">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white transition-colors cursor-pointer"
                      >
                        <i className="ri-subtract-line text-sm text-stone-600" />
                      </button>
                      <span className="text-sm font-medium text-stone-800 w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white transition-colors cursor-pointer disabled:opacity-40"
                      >
                        <i className="ri-add-line text-sm text-stone-600" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-stone-900">
                        S/ {(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => onRemove(item.product.id)}
                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <i className="ri-delete-bin-line text-sm text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-stone-100 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-stone-500 text-sm">Subtotal</span>
              <span className="font-bold text-stone-900 text-lg">S/ {total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-amber-800 hover:bg-amber-900 text-white font-medium py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap text-sm">
              Proceder al pago
            </button>
            <button
              onClick={onClear}
              className="w-full text-stone-400 hover:text-red-500 text-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}
