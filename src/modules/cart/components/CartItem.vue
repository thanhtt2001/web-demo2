<script setup lang="ts">
import type { CartItem } from '~/types'
import { formatCurrency } from '~/utils/format'

const props = defineProps<{ item: CartItem }>()
const emit = defineEmits<{
  remove: []
  updateQuantity: [quantity: number]
}>()
</script>

<template>
  <div class="card p-4 flex gap-4">
    <NuxtLink :to="`/products/${item.product.slug}`" class="flex-shrink-0">
      <img
        :src="item.product.images[0]?.url || '/images/placeholder.jpg'"
        :alt="item.product.name"
        class="w-20 h-20 object-cover rounded-xl"
      >
    </NuxtLink>

    <div class="flex-1 min-w-0">
      <div class="flex justify-between gap-2">
        <div>
          <p class="text-xs text-gray-400">{{ item.product.brand }}</p>
          <NuxtLink :to="`/products/${item.product.slug}`" class="text-sm font-medium text-gray-800 hover:text-rose-500 line-clamp-2">
            {{ item.product.name }}
          </NuxtLink>
          <p v-if="item.variant" class="text-xs text-gray-400 mt-0.5">
            {{ item.variant.name }}: {{ item.variant.value }}
          </p>
        </div>
        <button
          class="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
          aria-label="Xóa sản phẩm"
          @click="emit('remove')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="flex items-center justify-between mt-3">
        <div class="flex items-center border border-gray-200 rounded-full overflow-hidden">
          <button
            class="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-sm"
            :disabled="item.quantity <= 1"
            @click="emit('updateQuantity', item.quantity - 1)"
          >
            −
          </button>
          <span class="w-8 text-center text-sm">{{ item.quantity }}</span>
          <button
            class="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-sm"
            @click="emit('updateQuantity', item.quantity + 1)"
          >
            +
          </button>
        </div>
        <span class="font-semibold text-rose-500 text-sm">{{ formatCurrency(item.totalPrice) }}</span>
      </div>
    </div>
  </div>
</template>
