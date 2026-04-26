<script setup lang="ts">
import type { ProductCategory } from '~/types'

defineProps<{
  categories: ProductCategory[]
}>()

const defaultCategories = [
  { id: 1, name: 'Chăm sóc da', slug: 'skincare', icon: '✨', color: 'bg-rose-50', productCount: 0 },
  { id: 2, name: 'Trang điểm', slug: 'makeup', icon: '💄', color: 'bg-pink-50', productCount: 0 },
  { id: 3, name: 'Nước hoa', slug: 'perfume', icon: '🌸', color: 'bg-purple-50', productCount: 0 },
  { id: 4, name: 'Chăm sóc tóc', slug: 'haircare', icon: '💆', color: 'bg-amber-50', productCount: 0 },
  { id: 5, name: 'Chăm sóc cơ thể', slug: 'bodycare', icon: '🧴', color: 'bg-green-50', productCount: 0 },
  { id: 6, name: 'Dụng cụ làm đẹp', slug: 'tools', icon: '🪞', color: 'bg-blue-50', productCount: 0 },
]
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-8">
      <h2 class="section-title">Danh mục sản phẩm</h2>
      <p class="section-subtitle">Tìm kiếm sản phẩm theo danh mục yêu thích</p>
    </div>

    <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
      <NuxtLink
        v-for="cat in (categories.length ? categories : defaultCategories)"
        :key="cat.id"
        :to="`/products?category=${cat.slug}`"
        class="flex flex-col items-center gap-2 p-4 rounded-2xl hover:shadow-md transition-all group"
        :class="(cat as any).color || 'bg-gray-50'"
      >
        <div class="text-3xl group-hover:scale-110 transition-transform">
          {{ (cat as any).icon || '🌿' }}
        </div>
        <span class="text-xs font-medium text-gray-700 text-center leading-tight">{{ cat.name }}</span>
        <span v-if="cat.productCount > 0" class="text-xs text-gray-400">{{ cat.productCount }} SP</span>
      </NuxtLink>
    </div>
  </section>
</template>
