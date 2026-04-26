export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  fullName: string
  avatar?: string
  phone?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  createdAt: string
  isEmailVerified: boolean
}

export interface Address {
  id: number
  userId: number
  fullName: string
  phone: string
  province: string
  district: string
  ward: string
  street: string
  isDefault: boolean
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export interface UpdateProfilePayload {
  firstName?: string
  lastName?: string
  phone?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
}
