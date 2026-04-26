export interface ProductImage {
  id: number
  url: string
  alt: string
  isPrimary: boolean
}

export interface ProductVariant {
  id: number
  name: string
  value: string
  stock: number
  priceModifier: number
}

export interface ProductReview {
  id: number
  userId: number
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  createdAt: string
  helpful: number
}

export interface Product {
  id: number
  slug: string
  name: string
  brand: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  discount?: number
  images: ProductImage[]
  category: string
  categorySlug: string
  tags: string[]
  rating: number
  reviewCount: number
  stock: number
  sku: string
  variants?: ProductVariant[]
  ingredients?: string
  howToUse?: string
  isNew?: boolean
  isBestSeller?: boolean
  isSale?: boolean
  createdAt: string
}

export interface ProductCategory {
  id: number
  name: string
  slug: string
  description?: string
  image?: string
  productCount: number
  parentId?: number
  children?: ProductCategory[]
}

export interface ProductFilter {
  category?: string
  brand?: string[]
  priceMin?: number
  priceMax?: number
  rating?: number
  tags?: string[]
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular'
  page?: number
  limit?: number
  search?: string
}

export interface ProductListResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}
