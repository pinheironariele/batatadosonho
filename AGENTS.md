# AGENTS.md — Guia para Agentes de IA

## Visão Geral

Site de delivery de comida construído com TanStack Start (React SSR/full-stack), Tailwind CSS v4 e Stripe para pagamentos. Toda a interface está em Português do Brasil.

## Estrutura de Diretórios

```
src/
  data/
    menu.ts          # Cardápio completo + zonas de entrega (fonte de verdade)
  contexts/
    CartContext.tsx   # Estado global do carrinho (React Context)
  components/
    Header.tsx        # Cabeçalho com logo e botão do carrinho
    CartDrawer.tsx    # Gaveta lateral do carrinho (seleção de bairro + checkout)
    MenuCard.tsx      # Card de item do cardápio
  routes/
    __root.tsx        # Layout raiz com CartProvider + Header + CartDrawer
    index.tsx         # Página principal: filtro por categoria + grid de produtos
    checkout/
      success.tsx     # Tela de pedido confirmado
      cancel.tsx      # Tela de pagamento cancelado
    products/
      $productId.tsx  # Redireciona para / (rota legada do template)
  lib/
    stripe.ts         # Server functions: getStripeEnabled, createCheckoutSession
```

## Convenções

- Preços são armazenados em **centavos de BRL** (ex: R$12,90 = `1290`)
- Formatação de moeda via `toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })`
- Checkout passa um array de itens + taxa de entrega ao Stripe como `line_items` separados, todos em BRL
- O estado do carrinho vive apenas no cliente (sem persistência em banco de dados — dados não sobrevivem a recarregamentos de página)

## Adicionando Novas Categorias

1. Adicione o novo valor ao tipo `Category` em `src/data/menu.ts`
2. Insira a entrada correspondente em `categories[]`
3. Defina a cor de fundo em `categoryBg` no `MenuCard.tsx`

## Zonas de Entrega

Edite `deliveryZones` em `src/data/menu.ts`. Cada zona tem:
- `bairro`: nome exibido no select
- `fee`: taxa em centavos de BRL
- `time`: string de tempo estimado (ex: `"20-30 min"`)

## Variáveis de Ambiente Necessárias

| Variável | Descrição |
|----------|-----------|
| `STRIPE_SECRET_KEY` | Chave secreta do Stripe (sk_live_... ou sk_test_...) |
| `SITE_URL` | URL base do site (para redirects do Stripe) |

## Decisões Notáveis

- **Sem banco de dados**: O cardápio é estático em `src/data/menu.ts`. Para um restaurante real com cardápio dinâmico, migrar para Netlify Database com Drizzle ORM.
- **Moeda BRL**: O checkout Stripe usa `currency: 'brl'` — diferente do template original que usava USD.
- **CartDrawer no root**: O carrinho fica no layout raiz para persistir entre navegações sem perder o estado.
- **Rota `/products/$productId`**: Redireciona para `/` pois o fluxo de compra é direto pelo cardápio via carrinho.
