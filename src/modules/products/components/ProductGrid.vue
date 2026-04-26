<script setup lang="ts">
import type { Product } from '~/types'

defineProps<{
  products: Product[]
  loading?: boolean
  columns?: 2 | 3 | 4
}>()
</script>

<template>
  <div>
    <!-- Loading skeleton -->
    <div
      v-if="loading"
      class="grid gap-4"
      :class="{
        'grid-cols-2': columns === 2,
        'grid-cols-2 md:grid-cols-3': columns === 3,
        'grid-cols-2 md:grid-cols-3 lg:grid-cols-4': !columns || columns === 4,
      }"
    >
      <div v-for="i in 8" :key="i" class="card animate-pulse">
        <div class="aspect-square bg-gray-200" />
        <div class="p-3 space-y-2">
          <div class="h-3 bg-gray-200 rounded w-1/3" />
          <div class="h-4 bg-gray-200 rounded" />
          <div class="h-4 bg-gray-200 rounded w-3/4" />
          <div class="h-5 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    </div>

    <!-- Products grid -->
    <div
      v-else-if="products.length > 0"
      class="grid gap-4"
      :class="{
        'grid-cols-2': columns === 2,
        'grid-cols-2 md:grid-cols-3': columns === 3,
        'grid-cols-2 md:grid-cols-3 lg:grid-cols-4': !columns || columns === 4,
      }"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-16">
      <div class="text-5xl mb-4">🔍</div>
      <h3 class="text-lg font-semibold text-gray-700 mb-2">Không tìm thấy sản phẩm</h3>
      <p class="text-gray-400 text-sm">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
    </div>
  </div>
</template>
