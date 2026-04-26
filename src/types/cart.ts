import type { Product, ProductVariant } from './product'

export interface CartItem {
  id: string
  product: Product
  variant?: ProductVariant
  quantity: number
  price: number
  totalPrice: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  discount: number
  shipping: number
  total: number
  couponCode?: string
  couponDiscount?: number
}

export interface AddToCartPayload {
  productId: number
  variantId?: number
  quantity: number
}
