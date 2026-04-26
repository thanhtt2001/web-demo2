<script setup lang="ts">
import type { Product } from '~/types'
import { formatCurrency, calcDiscount } from '~/utils/format'

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const { success } = useNotification()

const isWishlisted = computed(() => wishlistStore.isInWishlist(props.product.id))
const discount = computed(() =>
  props.product.originalPrice
    ? calcDiscount(props.product.originalPrice, props.product.price)
    : 0,
)

function addToCart() {
  cartStore.addItem(props.product, 1)
  success('Đã thêm vào giỏ hàng', props.product.name)
}

function toggleWishlist() {
  wishlistStore.toggle(props.product)
}
</script>

<template>
  <article class="card group cursor-pointer">
    <!-- Image -->
    <div class="relative overflow-hidden aspect-square bg-gray-50">
      <NuxtLink :to="`/products/${product.slug}`">
        <img
          :src="product.images[0]?.url || '/images/placeholder.jpg'"
          :alt="product.images[0]?.alt || product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        >
      </NuxtLink>

      <!-- Badges -->
      <div class="absolute top-2 left-2 flex flex-col gap-1">
        <span v-if="discount > 0" class="badge-sale">-{{ discount }}%</span>
        <span v-if="product.isNew" class="badge-new">Mới</span>
        <span v-if="product.isBestSeller" class="badge-hot">Hot</span>
      </div>

      <!-- Wishlist button -->
      <button
        class="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center transition-all hover:scale-110"
        :aria-label="isWishlisted ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'"
        @click.prevent="toggleWishlist"
      >
        <svg
          class="w-4 h-4 transition-colors"
          :class="isWishlisted ? 'fill-rose-500 text-rose-500' : 'fill-none text-gray-400'"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <!-- Quick add overlay -->
      <div class="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <button
          class="w-full bg-rose-400 hover:bg-rose-500 text-white text-sm font-medium py-2.5 transition-colors"
          @click.prevent="addToCart"
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>

    <!-- Info -->
    <div class="p-3">
      <p class="text-xs text-gray-400 mb-0.5">{{ product.brand }}</p>
      <NuxtLink :to="`/products/${product.slug}`">
        <h3 class="text-sm font-medium text-gray-800 line-clamp-2 hover:text-rose-500 transition-colors leading-snug">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <!-- Rating -->
      <div class="flex items-center gap-1 mt-1.5">
        <div class="flex">
          <svg
            v-for="i in 5"
            :key="i"
            class="w-3 h-3"
            :class="i <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <span class="text-xs text-gray-400">({{ product.reviewCount }})</span>
      </div>

      <!-- Price -->
      <div class="flex items-center gap-2 mt-2">
        <span class="font-semibold text-rose-500">{{ formatCurrency(product.price) }}</span>
        <span v-if="product.originalPrice" class="text-xs text-gray-400 line-through">
          {{ formatCurrency(product.originalPrice) }}
        </span>
      </div>
    </div>
  </article>
</template>
