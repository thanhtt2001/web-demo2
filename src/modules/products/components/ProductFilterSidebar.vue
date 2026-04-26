<script setup lang="ts">
import type { ProductFilter } from '~/types'

const props = defineProps<{
  filter: ProductFilter
  isOpen?: boolean
}>()

const emit = defineEmits<{
  update: [filter: Partial<ProductFilter>]
  close: []
}>()

const priceRange = reactive({
  min: props.filter.priceMin ?? 0,
  max: props.filter.priceMax ?? 5_000_000,
})

const selectedBrands = ref<string[]>(props.filter.brand ?? [])
const selectedRating = ref(props.filter.rating ?? 0)

const brands = ['L\'Oréal', 'Lancôme', 'Dior', 'Chanel', 'SK-II', 'Innisfree', 'The Ordinary', 'Laneige', 'Maybelline', 'MAC']

const categories = [
  { label: 'Tất cả', value: '' },
  { label: 'Chăm sóc da', value: 'skincare' },
  { label: 'Trang điểm', value: 'makeup' },
  { label: 'Nước hoa', value: 'perfume' },
  { label: 'Chăm sóc tóc', value: 'haircare' },
  { label: 'Chăm sóc cơ thể', value: 'bodycare' },
]

function applyFilter() {
  emit('update', {
    brand: selectedBrands.value.length ? selectedBrands.value : undefined,
    priceMin: priceRange.min || undefined,
    priceMax: priceRange.max || undefined,
    rating: selectedRating.value || undefined,
    page: 1,
  })
}

function resetFilter() {
  selectedBrands.value = []
  selectedRating.value = 0
  priceRange.min = 0
  priceRange.max = 5_000_000
  emit('update', { brand: undefined, priceMin: undefined, priceMax: undefined, rating: undefined, page: 1 })
}

function toggleBrand(brand: string) {
  const idx = selectedBrands.value.indexOf(brand)
  if (idx > -1) selectedBrands.value.splice(idx, 1)
  else selectedBrands.value.push(brand)
}
</script>

<template>
  <!-- Desktop sidebar -->
  <div class="hidden lg:block">
    <FilterContent
      :categories="categories"
      :brands="brands"
      :selected-brands="selectedBrands"
      :selected-rating="selectedRating"
      :price-range="priceRange"
      :current-category="filter.category"
      @toggle-brand="toggleBrand"
      @set-rating="selectedRating = $event"
      @apply="applyFilter"
      @reset="resetFilter"
      @set-category="emit('update', { category: $event, page: 1 })"
    />
  </div>

  <!-- Mobile drawer -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="lg:hidden fixed inset-0 z-50 flex">
        <div class="absolute inset-0 bg-black/40" @click="emit('close')" />
        <div class="relative ml-auto w-72 bg-white h-full overflow-y-auto p-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-900">Bộ lọc</h3>
            <button class="text-gray-400 hover:text-gray-600" @click="emit('close')">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <FilterContent
            :categories="categories"
            :brands="brands"
            :selected-brands="selectedBrands"
            :selected-rating="selectedRating"
            :price-range="priceRange"
            :current-category="filter.category"
            @toggle-brand="toggleBrand"
            @set-rating="selectedRating = $event"
            @apply="applyFilter(); emit('close')"
            @reset="resetFilter"
            @set-category="emit('update', { category: $event, page: 1 }); emit('close')"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
