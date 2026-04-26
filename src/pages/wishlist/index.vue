<script setup lang="ts">
useSeoMeta({ title: 'Yêu thích - Cosmetic Shop' })

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const { success } = useNotification()

function moveToCart(productId: number) {
  const product = wishlistStore.items.find(p => p.id === productId)
  if (!product) return
  cartStore.addItem(product, 1)
  wishlistStore.remove(productId)
  success('Đã chuyển vào giỏ hàng', product.name)
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Sản phẩm yêu thích ({{ wishlistStore.count }})</h1>

    <div v-if="wishlistStore.items.length === 0" class="text-center py-20">
      <div class="text-6xl mb-4">💝</div>
      <h2 class="text-xl font-semibold text-gray-700 mb-2">Chưa có sản phẩm yêu thích</h2>
      <p class="text-gray-400 mb-6">Lưu những sản phẩm bạn thích để mua sau</p>
      <NuxtLink to="/products" class="btn-primary">Khám phá sản phẩm</NuxtLink>
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="product in wishlistStore.items" :key="product.id" class="card group">
        <div class="relative aspect-square overflow-hidden bg-gray-50">
          <NuxtLink :to="`/products/${product.slug}`">
            <img
              :src="product.images[0]?.url || '/images/placeholder.jpg'"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            >
          </NuxtLink>
          <button
            class="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 transition-colors"
            aria-label="Xóa khỏi yêu thích"
            @click="wishlistStore.remove(product.id)"
          >
            <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-3">
          <p class="text-xs text-gray-400">{{ product.brand }}</p>
          <NuxtLink :to="`/products/${product.slug}`" class="text-sm font-medium text-gray-800 hover:text-rose-500 line-clamp-2">
            {{ product.name }}
          </NuxtLink>
          <p class="text-rose-500 font-semibold text-sm mt-1">{{ formatCurrency(product.price) }}</p>
          <button class="btn-primary w-full text-sm py-2 mt-2" @click="moveToCart(product.id)">
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { formatCurrency } from '~/utils/format'
</script>
