export type Image = {
  key: number
  value: string
}
export type Products = {
  name: string
  price: number
  images: Image[]
}

export const products: Products[] = [
  {
    name: '18k Four - Prong Solitaire Ring',
    price: 340,
    images: [
      {
        key: 1,
        value:
          'https://almas-online.com/image/cache/catalog/aymen/solitare/four/whiTE/photo%202-1x1.jpg',
      },

      {
        key: 2,
        value:
          'https://almas-online.com/image/cache/catalog/aymen/solitare/four/whiTE/photo%201-1x1.jpg',
      },
    ],
  },
  {
    name: '18k Four - Prong Solitaire Ring',
    price: 340,
    images: [
      {
        key: 1,
        value:
          'https://almas-online.com/image/cache/catalog/aymen/solitare/four/whiTE/photo%202-1x1.jpg',
      },
      {
        key: 2,
        value:
          'https://almas-online.com/image/cache/catalog/aymen/solitare/four/whiTE/photo%201-1x1.jpg',
      },
    ],
  },
  {
    name: '18k Four - Prong Solitaire Ring',
    price: 340,
    images: [
      {
        key: 1,
        value:
          'https://almas-online.com/image/cache/catalog/aymen/solitare/four/whiTE/photo%202-1x1.jpg',
      },
      {
        key: 2,
        value:
          'https://almas-online.com/image/cache/catalog/aymen/solitare/four/whiTE/photo%201-1x1.jpg',
      },
    ],
  },
]
