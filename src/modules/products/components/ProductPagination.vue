<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  change: [page: number]
}>()

const pages = computed(() => {
  const range: (number | '...')[] = []
  const delta = 2
  const left = props.currentPage - delta
  const right = props.currentPage + delta + 1

  for (let i = 1; i <= props.totalPages; i++) {
    if (i === 1 || i === props.totalPages || (i >= left && i < right)) {
      range.push(i)
    }
  }

  const result: (number | '...')[] = []
  let prev: number | undefined
  for (const page of range as number[]) {
    if (prev && page - prev > 1) result.push('...')
    result.push(page)
    prev = page
  }
  return result
})
</script>

<template>
  <nav class="flex items-center justify-center gap-1" aria-label="Phân trang">
    <button
      class="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-rose-300 hover:text-rose-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      :disabled="currentPage === 1"
      aria-label="Trang trước"
      @click="emit('change', currentPage - 1)"
    >
      ‹
    </button>

    <template v-for="(page, i) in pages" :key="i">
      <span v-if="page === '...'" class="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">…</span>
      <button
        v-else
        class="w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-colors"
        :class="page === currentPage
          ? 'bg-rose-400 text-white'
          : 'border border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-500'"
        :aria-label="`Trang ${page}`"
        :aria-current="page === currentPage ? 'page' : undefined"
        @click="emit('change', page as number)"
      >
        {{ page }}
      </button>
    </template>

    <button
      class="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-rose-300 hover:text-rose-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      :disabled="currentPage === totalPages"
      aria-label="Trang sau"
      @click="emit('change', currentPage + 1)"
    >
      ›
    </button>
  </nav>
</template>
