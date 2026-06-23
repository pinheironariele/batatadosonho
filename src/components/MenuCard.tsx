import { useCart } from '@/contexts/CartContext'
import type { MenuItem } from '@/data/menu'
import { Plus, Check } from 'lucide-react'
import { useState } from 'react'

const tagColors: Record<string, string> = {
  Popular: 'bg-orange-500 text-white',
  Novo: 'bg-emerald-500 text-white',
  Vegano: 'bg-green-100 text-green-700',
}

const categoryBg: Record<string, string> = {
  entradas: 'from-amber-100 to-orange-100',
  principais: 'from-red-100 to-orange-100',
  sobremesas: 'from-pink-100 to-rose-100',
  bebidas: 'from-blue-100 to-cyan-100',
}

function formatBRL(centavos: number) {
  return (centavos / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100 flex flex-col">
      {/* Image area */}
      <div
        className={`bg-gradient-to-br ${categoryBg[item.category]} flex items-center justify-center h-36`}
      >
        <span className="text-6xl">{item.emoji}</span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-gray-800 leading-tight">{item.name}</h3>
          {item.tag && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${tagColors[item.tag] ?? 'bg-gray-100 text-gray-600'}`}
            >
              {item.tag}
            </span>
          )}
        </div>

        <p className="text-gray-500 text-sm leading-snug flex-1 mb-3">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-orange-600 font-bold text-lg">
            {formatBRL(item.price)}
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            {added ? (
              <>
                <Check size={14} />
                Adicionado
              </>
            ) : (
              <>
                <Plus size={14} />
                Adicionar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
