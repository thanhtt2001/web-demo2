import { defineStore } from 'pinia'
import type { Cart, CartItem, AddToCartPayload, Product, ProductVariant } from '~/types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const couponCode = ref<string | undefined>()
  const couponDiscount = ref(0)
  const SHIPPING_THRESHOLD = 500_000
  const SHIPPING_FEE = 30_000

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.totalPrice, 0),
  )

  const shipping = computed(() =>
    subtotal.value >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE,
  )

  const total = computed(() =>
    subtotal.value - couponDiscount.value + shipping.value,
  )

  const cart = computed<Cart>(() => ({
    items: items.value,
    subtotal: subtotal.value,
    discount: couponDiscount.value,
    shipping: shipping.value,
    total: total.value,
    couponCode: couponCode.value,
    couponDiscount: couponDiscount.value,
  }))

  function addItem(product: Product, quantity: number = 1, variant?: ProductVariant) {
    const price = product.price + (variant?.priceModifier ?? 0)
    const existingIndex = items.value.findIndex(
      item => item.product.id === product.id && item.variant?.id === variant?.id,
    )

    if (existingIndex > -1) {
      items.value[existingIndex].quantity += quantity
      items.value[existingIndex].totalPrice = items.value[existingIndex].quantity * price
    }
    else {
      const id = `${product.id}-${variant?.id ?? 'default'}-${Date.now()}`
      items.value.push({
        id,
        product,
        variant,
        quantity,
        price,
        totalPrice: quantity * price,
      })
    }
    persistCart()
  }

  function removeItem(itemId: string) {
    items.value = items.value.filter(item => item.id !== itemId)
    persistCart()
  }

  function updateQuantity(itemId: string, quantity: number) {
    const item = items.value.find(i => i.id === itemId)
    if (!item) return
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }
    item.quantity = quantity
    item.totalPrice = quantity * item.price
    persistCart()
  }

  function clearCart() {
    items.value = []
    couponCode.value = undefined
    couponDiscount.value = 0
    persistCart()
  }

  function applyCoupon(code: string) {
    // Mock coupon logic — replace with API call
    const coupons: Record<string, number> = {
      WELCOME10: 0.1,
      SALE20: 0.2,
    }
    const discount = coupons[code.toUpperCase()]
    if (discount) {
      couponCode.value = code
      couponDiscount.value = Math.round(subtotal.value * discount)
      return true
    }
    return false
  }

  function persistCart() {
    if (import.meta.client) {
      localStorage.setItem('cart', JSON.stringify(items.value))
    }
  }

  function loadCart() {
    if (import.meta.client) {
      const saved = localStorage.getItem('cart')
      if (saved) {
        try {
          items.value = JSON.parse(saved)
        }
        catch {
          items.value = []
        }
      }
    }
  }

  return {
    items,
    couponCode,
    couponDiscount,
    itemCount,
    subtotal,
    shipping,
    total,
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
    loadCart,
  }
})
