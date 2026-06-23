# Batata do Sonho — Delivery 

Um site completo de pedidos de comida online com cardápio interativo, carrinho de compras, calculadora de taxa de entrega e pagamento via Stripe.

## Funcionalidades

- **Cardápio** com categorias (Entradas, Pratos Principais, Sobremesas, Bebidas)
- **Carrinho de compras** com controle de quantidades
- **Calculadora de taxa de entrega** por bairro, com tempo estimado
- **Pagamento seguro** via Stripe Checkout (cartão de crédito)
- pix Qr code
- Interface totalmente em **Português do Brasil**

## Tecnologias

- [TanStack Start](https://tanstack.com/start) — framework React full-stack
- [Tailwind CSS v4](https://tailwindcss.com) — estilização
- [Stripe](https://stripe.com) — pagamentos online
- [Netlify](https://netlify.com) — hospedagem e deploy

## Como rodar localmente

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure as variáveis de ambiente (crie um `.env` na raiz):
   ```
   STRIPE_SECRET_KEY=sk_test_...
   SITE_URL=http://localhost:3000
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse `http://localhost:3000`

## Configuração do Stripe

Para ativar os pagamentos, adicione sua chave secreta do Stripe (`STRIPE_SECRET_KEY`) nas variáveis de ambiente do Netlify ou no arquivo `.env` local. Sem essa chave, o botão de pagamento ficará desativado e uma mensagem de aviso será exibida no carrinho.

## Personalização

- **Cardápio**: edite `src/data/menu.ts` para adicionar, remover ou modificar pratos
- **Bairros de entrega**: ajuste o array `deliveryZones` em `src/data/menu.ts` com os bairros e taxas da sua cidade
- **Batata do Sonho**: altere `Header.tsx` e `__root.tsx`
