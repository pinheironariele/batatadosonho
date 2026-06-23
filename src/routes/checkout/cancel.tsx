import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/checkout/cancel')({
  component: CheckoutCancel,
})

function CheckoutCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl p-12 shadow-lg text-center max-w-lg border border-red-100">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">😔</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
          Pagamento cancelado
        </h1>
        <p className="text-gray-500 mb-8">
          Seu pedido não foi finalizado. Nenhuma cobrança foi realizada.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors"
        >
          Voltar ao Cardápio
        </Link>
      </div>
    </div>
  )
}
