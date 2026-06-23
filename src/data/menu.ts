export type Category = 'entradas' | 'principais' | 'sobremesas' | 'bebidas'

export interface MenuItem {
  id: number
  name: string
  category: Category
  description: string
  price: number // in centavos (BRL)
  emoji: string
  tag?: string
}

export interface DeliveryZone {
  bairro: string
  fee: number // in centavos
  time: string
}

export const categories: { id: Category | 'todos'; label: string; emoji: string }[] = [
  { id: 'todos', label: 'Todos', emoji: '🍽️' },
  { id: 'entradas', label: 'Entradas', emoji: '🥗' },
  { id: 'principais', label: 'Pratos Principais', emoji: '🍽️' },
  { id: 'sobremesas', label: 'Sobremesas', emoji: '🍰' },
  { id: 'bebidas', label: 'Bebidas', emoji: '🥤' },
]

export const deliveryZones: DeliveryZone[] = [
  { bairro: 'Centro', fee: 500, time: '20-30 min' },
  { bairro: 'Jardim América', fee: 700, time: '25-35 min' },
  { bairro: 'Vila Nova', fee: 800, time: '30-40 min' },
  { bairro: 'Bela Vista', fee: 600, time: '20-30 min' },
  { bairro: 'Parque Industrial', fee: 1000, time: '35-45 min' },
  { bairro: 'Cidade Alta', fee: 900, time: '30-40 min' },
  { bairro: 'São Luís', fee: 1200, time: '40-50 min' },
  { bairro: 'Outro bairro', fee: 1500, time: '45-60 min' },
]

const menu: MenuItem[] = [
  // Entradas
  {
    id: 1,
    name: 'Coxinha de Frango',
    category: 'entradas',
    description: 'Crocante por fora, recheada com frango desfiado temperado. Acompanha molho especial da casa.',
    price: 1290,
    emoji: '🍗',
    tag: 'Popular',
  },
  {
    id: 2,
    name: 'Pão de Queijo (6 un)',
    category: 'entradas',
    description: 'Pão de queijo artesanal com queijo mineiro e polvilho azedo. Sequinho e saboroso.',
    price: 990,
    emoji: '🧀',
  },
  {
    id: 3,
    name: 'Batata Frita',
    category: 'entradas',
    description: 'Batatas fritas crocantes temperadas com sal e ervas finas. Serve 2 pessoas.',
    price: 1490,
    emoji: '🍟',
  },
  {
    id: 4,
    name: 'Bolinho de Bacalhau',
    category: 'entradas',
    description: 'Bolinhos crocantes de bacalhau com temperos portugueses. Acompanha molho de limão.',
    price: 2490,
    emoji: '🐟',
    tag: 'Novo',
  },
  // Pratos Principais
  {
    id: 5,
    name: 'X-Burguer Especial',
    category: 'principais',
    description: 'Hambúrguer artesanal de 180g, queijo prato, alface, tomate, cebola caramelizada e molho da casa.',
    price: 3290,
    emoji: '🍔',
    tag: 'Popular',
  },
  {
    id: 6,
    name: 'Frango Grelhado',
    category: 'principais',
    description: 'Peito de frango grelhado com ervas, acompanha arroz, feijão e salada mista.',
    price: 2990,
    emoji: '🥘',
  },
  {
    id: 7,
    name: 'Macarrão Bolonhesa',
    category: 'principais',
    description: 'Massa al dente com molho bolonhesa feito com carne bovina moída e tomates italianos.',
    price: 2790,
    emoji: '🍝',
  },
  {
    id: 8,
    name: 'Pizza Margherita',
    category: 'principais',
    description: 'Pizza clássica com molho de tomate, mussarela e manjericão fresco. Tamanho médio.',
    price: 3990,
    emoji: '🍕',
    tag: 'Novo',
  },
  {
    id: 9,
    name: 'Salada Caesar',
    category: 'principais',
    description: 'Alface americana, croutons, queijo parmesão e molho caesar cremoso.',
    price: 2490,
    emoji: '🥗',
    tag: 'Vegano',
  },
  // Sobremesas
  {
    id: 10,
    name: 'Brownie com Sorvete',
    category: 'sobremesas',
    description: 'Brownie de chocolate quente com sorvete de creme e calda de chocolate.',
    price: 1990,
    emoji: '🍫',
    tag: 'Popular',
  },
  {
    id: 11,
    name: 'Pudim de Leite',
    category: 'sobremesas',
    description: 'Pudim de leite condensado com calda de caramelo. Receita da vovó.',
    price: 1290,
    emoji: '🍮',
  },
  {
    id: 12,
    name: 'Açaí na Tigela',
    category: 'sobremesas',
    description: 'Açaí 300ml com granola, banana, mel e leite condensado.',
    price: 1690,
    emoji: '🫐',
  },
  // Bebidas
  {
    id: 13,
    name: 'Refrigerante Lata',
    category: 'bebidas',
    description: 'Coca-Cola, Guaraná ou Fanta em lata 350ml gelada.',
    price: 590,
    emoji: '🥤',
  },
  {
    id: 14,
    name: 'Suco Natural 400ml',
    category: 'bebidas',
    description: 'Suco natural de laranja, limão ou maracujá. Gelado e sem conservantes.',
    price: 990,
    emoji: '🍊',
  },
  {
    id: 15,
    name: 'Água Mineral',
    category: 'bebidas',
    description: 'Água mineral com ou sem gás 500ml.',
    price: 490,
    emoji: '💧',
  },
  {
    id: 16,
    name: 'Milk Shake',
    category: 'bebidas',
    description: 'Milk shake cremoso nos sabores chocolate, morango ou baunilha. 400ml.',
    price: 1890,
    emoji: '🥛',
    tag: 'Popular',
  },
]

export default menu
