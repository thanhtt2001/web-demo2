import type { ProductFilter } from '~/types'

export function useProducts() {
  const store = useProductStore()

  const filter = reactive<ProductFilter>({
    page: 1,
    limit: 12,
    sortBy: 'newest',
  })

  async function search(overrides?: Partial<ProductFilter>) {
    Object.assign(filter, overrides)
    await store.fetchProducts(filter)
  }

  function setPage(page: number) {
    filter.page = page
    store.fetchProducts(filter)
  }

  function setSort(sortBy: ProductFilter['sortBy']) {
    filter.sortBy = sortBy
    filter.page = 1
    store.fetchProducts(filter)
  }

  function setCategory(category: string) {
    filter.category = category
    filter.page = 1
    store.fetchProducts(filter)
  }

  return {
    filter,
    products: computed(() => store.products),
    isLoading: computed(() => store.isLoading),
    total: computed(() => store.total),
    currentPage: computed(() => store.currentPage),
    totalPages: computed(() => store.totalPages),
    search,
    setPage,
    setSort,
    setCategory,
  }
}
