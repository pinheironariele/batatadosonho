import { createServerFn } from '@tanstack/react-start'

export const getStripeEnabled = createServerFn({ method: 'GET' }).handler(
  () => !!process.env.STRIPE_SECRET_KEY,
)

export interface CheckoutItem {
  name: string
  price: number // in centavos (BRL)
  quantity: number
}

export interface CheckoutInput {
  items: CheckoutItem[]
  deliveryFee: number // in centavos
  deliveryBairro: string
}

export const createCheckoutSession = createServerFn({
  method: 'POST',
})
  .inputValidator((input: CheckoutInput) => input)
  .handler(async ({ data }) => {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe não está configurado')
    }
    const { default: Stripe } = await import('stripe')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      data.items.map((item) => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      }))

    if (data.deliveryFee > 0) {
      lineItems.push({
        price_data: {
          currency: 'brl',
          product_data: {
            name: `Taxa de entrega — ${data.deliveryBairro}`,
          },
          unit_amount: data.deliveryFee,
        },
        quantity: 1,
      })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.SITE_URL ?? 'http://localhost:3000'}/checkout/success`,
      cancel_url: `${process.env.SITE_URL ?? 'http://localhost:3000'}/checkout/cancel`,
    })

    return session.url
  })
