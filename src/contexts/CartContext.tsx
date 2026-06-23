import { createContext, useContext, useState, useCallback } from 'react'
import type { MenuItem, DeliveryZone } from '@/data/menu'

export interface CartItem {
  item: MenuItem
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: MenuItem) => void
  removeItem: (itemId: number) => void
  updateQuantity: (itemId: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  deliveryZone: DeliveryZone | null
  setDeliveryZone: (zone: DeliveryZone | null) => void
  isCartOpen: boolean
  setCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone | null>(null)
  const [isCartOpen, setCartOpen] = useState(false)

  const addItem = useCallback((item: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id)
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci,
        )
      }
      return [...prev, { item, quantity: 1 }]
    })
    setCartOpen(true)
  }, [])

  const removeItem = useCallback((itemId: number) => {
    setItems((prev) => prev.filter((ci) => ci.item.id !== itemId))
  }, [])

  const updateQuantity = useCallback((itemId: number, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((ci) => ci.item.id !== itemId))
    } else {
      setItems((prev) =>
        prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity } : ci)),
      )
    }
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setDeliveryZone(null)
  }, [])

  const totalItems = items.reduce((sum, ci) => sum + ci.quantity, 0)
  const subtotal = items.reduce(
    (sum, ci) => sum + ci.item.price * ci.quantity,
    0,
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryZone,
        setDeliveryZone,
        isCartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
