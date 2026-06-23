import { useCart } from '@/contexts/CartContext'
import { ShoppingCart } from 'lucide-react'

export function Header() {
  const { totalItems, setCartOpen } = useCart()

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-orange-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🍴</span>
          <div>
            <h1 className="font-bold text-xl leading-none text-orange-600">
              Sabor & Cia
            </h1>
            <p className="text-xs text-gray-500 leading-none">
              Delivery de qualidade
            </p>
          </div>
        </div>

        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors font-medium text-sm shadow-md"
        >
          <ShoppingCart size={18} />
          <span>Carrinho</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems > 9 ? '9+' : totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
