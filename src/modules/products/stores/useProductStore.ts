import { defineStore } from 'pinia'
import type { Product, ProductFilter, ProductListResponse, ProductCategory } from '~/types'
import {
  mockProducts,
  mockFeaturedProducts,
  mockNewArrivals,
  mockBestSellers,
  mockCategories,
} from '~/data/mockProducts'

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const featuredProducts = ref<Product[]>([])
  const newArrivals = ref<Product[]>([])
  const bestSellers = ref<Product[]>([])
  const categories = ref<ProductCategory[]>([])
  const currentProduct = ref<Product | null>(null)
  const isLoading = ref(false)
  const total = ref(0)
  const currentPage = ref(1)
  const totalPages = ref(1)

  // ─── Mock helpers ────────────────────────────────────────────────────────────
  function filterMockProducts(filter: ProductFilter): ProductListResponse {
    let result = [...mockProducts]

    if (filter.category) {
      result = result.filter(p => p.categorySlug === filter.category)
    }
    if (filter.brand?.length) {
      result = result.filter(p => filter.brand!.includes(p.brand))
    }
    if (filter.priceMin !== undefined) {
      result = result.filter(p => p.price >= filter.priceMin!)
    }
    if (filter.priceMax !== undefined) {
      result = result.filter(p => p.price <= filter.priceMax!)
    }
    if (filter.rating) {
      result = result.filter(p => p.rating >= filter.rating!)
    }
    if (filter.search) {
      const q = filter.search.toLowerCase()
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q),
      )
    }

    // Sort
    switch (filter.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    const page = filter.page ?? 1
    const limit = filter.limit ?? 12
    const totalCount = result.length
    const paginated = result.slice((page - 1) * limit, page * limit)

    return {
      products: paginated,
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    }
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────
  async function fetchProducts(filter: ProductFilter = {}) {
    isLoading.value = true
    // Simulate network delay
    await new Promise(r => setTimeout(r, 300))
    try {
      const response = filterMockProducts(filter)
      products.value = response.products
      total.value = response.total
      currentPage.value = response.page
      totalPages.value = response.totalPages
    }
    finally {
      isLoading.value = false
    }
  }

  async function fetchProductBySlug(slug: string) {
    isLoading.value = true
    await new Promise(r => setTimeout(r, 200))
    try {
      currentProduct.value = mockProducts.find(p => p.slug === slug) ?? null
    }
    finally {
      isLoading.value = false
    }
  }

  function fetchFeatured() {
    featuredProducts.value = mockFeaturedProducts
  }

  function fetchNewArrivals() {
    newArrivals.value = mockNewArrivals
  }

  function fetchBestSellers() {
    bestSellers.value = mockBestSellers
  }

  function fetchCategories() {
    categories.value = mockCategories
  }

  return {
    products,
    featuredProducts,
    newArrivals,
    bestSellers,
    categories,
    currentProduct,
    isLoading,
    total,
    currentPage,
    totalPages,
    fetchProducts,
    fetchProductBySlug,
    fetchFeatured,
    fetchNewArrivals,
    fetchBestSellers,
    fetchCategories,
  }
})
