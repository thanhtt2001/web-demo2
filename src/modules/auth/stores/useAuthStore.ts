import { defineStore } from 'pinia'
import type { User, LoginPayload, RegisterPayload } from '~/types'

// Mock user for development
const MOCK_USER: User = {
  id: 1,
  email: 'demo@cosmeticshop.vn',
  firstName: 'Nguyễn',
  lastName: 'Thị Demo',
  fullName: 'Nguyễn Thị Demo',
  phone: '0912345678',
  createdAt: '2025-01-01T00:00:00Z',
  isEmailVerified: true,
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(null)
  const isLoading = ref(false)

  const isLoggedIn = computed(() => !!user.value && !!accessToken.value)
  const fullName = computed(() => user.value?.fullName ?? '')

  async function login(payload: LoginPayload) {
    isLoading.value = true
    // Simulate API delay
    await new Promise(r => setTimeout(r, 800))
    try {
      // Mock login — accept any credentials in dev
      if (!payload.email || !payload.password) {
        throw new Error('Invalid credentials')
      }
      const mockToken = `mock-token-${Date.now()}`
      user.value = { ...MOCK_USER, email: payload.email }
      accessToken.value = mockToken
      if (import.meta.client) {
        localStorage.setItem('access_token', mockToken)
        localStorage.setItem('user', JSON.stringify(user.value))
      }
    }
    finally {
      isLoading.value = false
    }
  }

  async function register(payload: RegisterPayload) {
    isLoading.value = true
    await new Promise(r => setTimeout(r, 800))
    try {
      const mockToken = `mock-token-${Date.now()}`
      user.value = {
        ...MOCK_USER,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        fullName: `${payload.firstName} ${payload.lastName}`,
        phone: payload.phone ?? '',
      }
      accessToken.value = mockToken
      if (import.meta.client) {
        localStorage.setItem('access_token', mockToken)
        localStorage.setItem('user', JSON.stringify(user.value))
      }
    }
    finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    accessToken.value = null
    if (import.meta.client) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    }
    navigateTo('/')
  }

  function initFromStorage() {
    if (import.meta.client) {
      const token = localStorage.getItem('access_token')
      const savedUser = localStorage.getItem('user')
      if (token && savedUser) {
        try {
          accessToken.value = token
          user.value = JSON.parse(savedUser)
        }
        catch {
          logout()
        }
      }
    }
  }

  return {
    user,
    accessToken,
    isLoading,
    isLoggedIn,
    fullName,
    login,
    register,
    logout,
    initFromStorage,
  }
})
