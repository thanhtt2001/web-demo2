import { defineStore } from 'pinia'
import type { Product } from '~/types'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<Product[]>([])

  const count = computed(() => items.value.length)

  function isInWishlist(productId: number): boolean {
    return items.value.some(p => p.id === productId)
  }

  function toggle(product: Product) {
    const index = items.value.findIndex(p => p.id === product.id)
    if (index > -1) {
      items.value.splice(index, 1)
    }
    else {
      items.value.push(product)
    }
    persist()
  }

  function remove(productId: number) {
    items.value = items.value.filter(p => p.id !== productId)
    persist()
  }

  function persist() {
    if (import.meta.client) {
      localStorage.setItem('wishlist', JSON.stringify(items.value))
    }
  }

  function load() {
    if (import.meta.client) {
      const saved = localStorage.getItem('wishlist')
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

  return { items, count, isInWishlist, toggle, remove, load }
})
