<script setup lang="ts">
useSeoMeta({
  title: 'Tất cả sản phẩm - Cosmetic Shop',
})

const route = useRoute()
const { products, isLoading, total, currentPage, totalPages, filter, search, setPage, setSort } = useProducts()

// Initialize from query params
await search({
  category: route.query.category as string,
  search: route.query.search as string,
  page: Number(route.query.page) || 1,
})

const sortOptions = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'popular', label: 'Phổ biến nhất' },
  { value: 'price-asc', label: 'Giá tăng dần' },
  { value: 'price-desc', label: 'Giá giảm dần' },
  { value: 'rating', label: 'Đánh giá cao' },
]

const isFilterOpen = ref(false)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm text-gray-500 mb-6">
      <NuxtLink to="/" class="hover:text-rose-500">Trang chủ</NuxtLink>
      <span>/</span>
      <span class="text-gray-800">Sản phẩm</span>
    </nav>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Sidebar filter -->
      <aside class="lg:w-64 flex-shrink-0">
        <ProductFilterSidebar
          :filter="filter"
          :is-open="isFilterOpen"
          @update="search"
          @close="isFilterOpen = false"
        />
      </aside>

      <!-- Main content -->
      <div class="flex-1 min-w-0">
        <!-- Toolbar -->
        <div class="flex items-center justify-between mb-6 gap-4">
          <div class="flex items-center gap-3">
            <button
              class="lg:hidden btn-outline text-sm py-2 px-3"
              @click="isFilterOpen = true"
            >
              Bộ lọc
            </button>
            <p class="text-sm text-gray-500">
              <span class="font-medium text-gray-800">{{ total }}</span> sản phẩm
            </p>
          </div>
          <select
            :value="filter.sortBy"
            class="input-field w-auto text-sm py-2"
            @change="setSort(($event.target as HTMLSelectElement).value as typeof filter.sortBy)"
          >
            <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>
        </div>

        <!-- Grid -->
        <ProductGrid :products="products" :loading="isLoading" :columns="3" />

        <!-- Pagination -->
        <ProductPagination
          v-if="totalPages > 1"
          :current-page="currentPage"
          :total-pages="totalPages"
          class="mt-8"
          @change="setPage"
        />
      </div>
    </div>
  </div>
</template>
