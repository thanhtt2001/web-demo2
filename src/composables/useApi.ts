import type { ApiResponse } from '~/types'

export function useApi() {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  async function get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    const data = await $fetch<ApiResponse<T>>(`${baseURL}${endpoint}`, {
      method: 'GET',
      params,
    })
    return data.data
  }

  async function post<T>(endpoint: string, body?: unknown): Promise<T> {
    const data = await $fetch<ApiResponse<T>>(`${baseURL}${endpoint}`, {
      method: 'POST',
      body,
    })
    return data.data
  }

  async function put<T>(endpoint: string, body?: unknown): Promise<T> {
    const data = await $fetch<ApiResponse<T>>(`${baseURL}${endpoint}`, {
      method: 'PUT',
      body,
    })
    return data.data
  }

  async function del<T>(endpoint: string): Promise<T> {
    const data = await $fetch<ApiResponse<T>>(`${baseURL}${endpoint}`, {
      method: 'DELETE',
    })
    return data.data
  }

  return { get, post, put, del }
}
