import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/checkout/success')({
  component: CheckoutSuccess,
})

function CheckoutSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl p-12 shadow-lg text-center max-w-lg border border-green-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">✅</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
          Pedido confirmado!
        </h1>
        <p className="text-gray-500 mb-2">
          Obrigado pelo seu pedido. Estamos preparando tudo com carinho!
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Você receberá uma confirmação em breve. 🚀
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
