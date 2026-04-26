export * from './product'
export * from './user'
export * from './cart'
export * from './order'

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}
