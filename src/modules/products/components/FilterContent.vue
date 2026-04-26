<script setup lang="ts">
defineProps<{
  categories: { label: string; value: string }[]
  brands: string[]
  selectedBrands: string[]
  selectedRating: number
  priceRange: { min: number; max: number }
  currentCategory?: string
}>()

const emit = defineEmits<{
  toggleBrand: [brand: string]
  setRating: [rating: number]
  apply: []
  reset: []
  setCategory: [category: string]
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- Categories -->
    <div>
      <h4 class="font-semibold text-gray-800 mb-3 text-sm">Danh mục</h4>
      <ul class="space-y-1.5">
        <li v-for="cat in categories" :key="cat.value">
          <button
            class="w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors"
            :class="currentCategory === cat.value || (!currentCategory && !cat.value)
              ? 'bg-rose-50 text-rose-600 font-medium'
              : 'text-gray-600 hover:bg-gray-50'"
            @click="emit('setCategory', cat.value)"
          >
            {{ cat.label }}
          </button>
        </li>
      </ul>
    </div>

    <!-- Price range -->
    <div>
      <h4 class="font-semibold text-gray-800 mb-3 text-sm">Khoảng giá</h4>
      <div class="space-y-2">
        <div class="flex gap-2">
          <input
            :value="priceRange.min"
            type="number"
            placeholder="Từ"
            class="input-field text-sm py-2 flex-1"
            @input="priceRange.min = Number(($event.target as HTMLInputElement).value)"
          >
          <input
            :value="priceRange.max"
            type="number"
            placeholder="Đến"
            class="input-field text-sm py-2 flex-1"
            @input="priceRange.max = Number(($event.target as HTMLInputElement).value)"
          >
        </div>
      </div>
    </div>

    <!-- Brands -->
    <div>
      <h4 class="font-semibold text-gray-800 mb-3 text-sm">Thương hiệu</h4>
      <div class="space-y-2 max-h-48 overflow-y-auto">
        <label
          v-for="brand in brands"
          :key="brand"
          class="flex items-center gap-2 cursor-pointer group"
        >
          <input
            type="checkbox"
            :checked="selectedBrands.includes(brand)"
            class="w-4 h-4 rounded border-gray-300 text-rose-400 focus:ring-rose-300"
            @change="emit('toggleBrand', brand)"
          >
          <span class="text-sm text-gray-600 group-hover:text-gray-800">{{ brand }}</span>
        </label>
      </div>
    </div>

    <!-- Rating -->
    <div>
      <h4 class="font-semibold text-gray-800 mb-3 text-sm">Đánh giá tối thiểu</h4>
      <div class="space-y-1.5">
        <button
          v-for="r in [4, 3, 2, 1]"
          :key="r"
          class="flex items-center gap-2 w-full text-left px-2 py-1 rounded-lg transition-colors"
          :class="selectedRating === r ? 'bg-rose-50' : 'hover:bg-gray-50'"
          @click="emit('setRating', selectedRating === r ? 0 : r)"
        >
          <div class="flex">
            <svg v-for="i in 5" :key="i" class="w-3.5 h-3.5" :class="i <= r ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="text-xs text-gray-500">trở lên</span>
        </button>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-2 pt-2">
      <button class="btn-primary flex-1 text-sm py-2" @click="emit('apply')">Áp dụng</button>
      <button class="btn-outline flex-1 text-sm py-2" @click="emit('reset')">Xóa lọc</button>
    </div>
  </div>
</template>
