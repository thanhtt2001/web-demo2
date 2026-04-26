import type { CartItem } from './cart'
import type { Address } from './user'

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipping'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export type PaymentMethod = 'cod' | 'bank_transfer' | 'momo' | 'vnpay' | 'credit_card'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export interface Order {
  id: number
  orderCode: string
  userId: number
  items: CartItem[]
  shippingAddress: Address
  status: OrderStatus
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  subtotal: number
  discount: number
  shipping: number
  total: number
  couponCode?: string
  note?: string
  createdAt: string
  updatedAt: string
  estimatedDelivery?: string
}

export interface CheckoutPayload {
  shippingAddressId?: number
  shippingAddress?: Omit<Address, 'id' | 'userId' | 'isDefault'>
  paymentMethod: PaymentMethod
  couponCode?: string
  note?: string
}
