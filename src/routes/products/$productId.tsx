import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/products/$productId')({
  loader: () => {
    throw redirect({ to: '/' })
  },
  component: () => null,
})
