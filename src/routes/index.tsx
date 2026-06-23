import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import menu, { categories } from '@/data/menu'
import type { Category } from '@/data/menu'
import { MenuCard } from '@/components/MenuCard'
import { Clock, Bike, Star } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: MenuPage,
})

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category | 'todos'>('todos')

  const filtered =
    activeCategory === 'todos'
      ? menu
      : menu.filter((item) => item.category === activeCategory)

  return (
    <div className="max-w-6xl mx-auto px-4 pb-12">
      {/* Hero */}
      <div className="py-8 text-center">
        <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Aberto agora
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
          Peça agora, receba em casa 🚀
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Comida fresquinha e saborosa entregue direto na sua porta. Escolha seus pratos favoritos!
        </p>

        {/* Info chips */}
        <div className="flex items-center justify-center gap-4 mt-5 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Clock size={15} className="text-orange-400" />
            20–50 min
          </span>
          <span className="flex items-center gap-1">
            <Bike size={15} className="text-orange-400" />
            A partir de R$5,00
          </span>
          <span className="flex items-center gap-1">
            <Star size={15} className="text-orange-400" />
            4,9 estrelas
          </span>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as Category | 'todos')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Menu grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <span className="text-5xl">😕</span>
          <p className="mt-4">Nenhum item nessa categoria</p>
        </div>
      )}
    </div>
  )
}
