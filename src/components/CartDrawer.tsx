import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { deliveryZones } from '@/data/menu'
import { getStripeEnabled, createCheckoutSession } from '@/lib/stripe'
import { X, Plus, Minus, Trash2, MapPin, Clock, ShoppingBag } from 'lucide-react'
import { useEffect } from 'react'

function formatBRL(centavos: number) {
  return (centavos / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function CartDrawer() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    deliveryZone,
    setDeliveryZone,
    isCartOpen,
    setCartOpen,
  } = useCart()

  const [stripeEnabled, setStripeEnabled] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedBairro, setSelectedBairro] = useState('')

  useEffect(() => {
    getStripeEnabled().then(setStripeEnabled)
  }, [])

  const handleZoneChange = (bairro: string) => {
    setSelectedBairro(bairro)
    const zone = deliveryZones.find((z) => z.bairro === bairro) ?? null
    setDeliveryZone(zone)
  }

  const deliveryFee = deliveryZone?.fee ?? 0
  const total = subtotal + deliveryFee

  const handleCheckout = async () => {
    if (!deliveryZone) return
    setLoading(true)
    try {
      const url = await createCheckoutSession({
        data: {
          items: items.map((ci) => ({
            name: ci.item.name,
            price: ci.item.price,
            quantity: ci.quantity,
          })),
          deliveryFee: deliveryZone.fee,
          deliveryBairro: deliveryZone.bairro,
        },
      })
      if (url) {
        clearCart()
        window.location.href = url
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setLoading(false)
    }
  }

  if (!isCartOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-orange-500" size={22} />
            <h2 className="font-bold text-lg">Seu Pedido</h2>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <span className="text-6xl mb-4">🛒</span>
              <p className="text-lg font-medium">Carrinho vazio</p>
              <p className="text-sm">Adicione itens do cardápio</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-orange-600 font-semibold text-sm">
                      {formatBRL(item.price * quantity)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center bg-white rounded-full border border-gray-200 hover:border-orange-400 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-5 text-center text-sm font-bold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 flex items-center justify-center text-red-400 hover:text-red-600 transition-colors ml-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Delivery calculator */}
              <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="text-orange-500" size={16} />
                  <h3 className="font-semibold text-sm">Taxa de Entrega</h3>
                </div>
                <select
                  value={selectedBairro}
                  onChange={(e) => handleZoneChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-orange-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <option value="">Selecione seu bairro...</option>
                  {deliveryZones.map((zone) => (
                    <option key={zone.bairro} value={zone.bairro}>
                      {zone.bairro} — {formatBRL(zone.fee)}
                    </option>
                  ))}
                </select>
                {deliveryZone && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <Clock size={12} />
                    <span>Tempo estimado: {deliveryZone.time}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-4 space-y-3">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatBRL(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxa de entrega</span>
                <span>
                  {deliveryZone ? formatBRL(deliveryFee) : '—'}
                </span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
                <span>Total</span>
                <span className="text-orange-600">{formatBRL(total)}</span>
              </div>
            </div>

            {!stripeEnabled && stripeEnabled !== null && (
              <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
                ⚠️ Pagamento online não configurado. Configure sua chave Stripe.
              </p>
            )}

            <button
              onClick={handleCheckout}
              disabled={
                loading ||
                !deliveryZone ||
                stripeEnabled === false ||
                stripeEnabled === null
              }
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
            >
              {loading
                ? 'Processando...'
                : !deliveryZone
                  ? 'Selecione o bairro de entrega'
                  : `Pagar ${formatBRL(total)}`}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
