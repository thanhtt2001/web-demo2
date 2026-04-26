<script setup lang="ts">
useSeoMeta({ title: 'Tài khoản - Cosmetic Shop' })

const authStore = useAuthStore()

// Redirect if not logged in
if (!authStore.isLoggedIn) {
  navigateTo('/auth/login')
}

const menuItems = [
  { label: 'Thông tin cá nhân', to: '/account', icon: '👤' },
  { label: 'Đơn hàng của tôi', to: '/account/orders', icon: '📦' },
  { label: 'Địa chỉ giao hàng', to: '/account/addresses', icon: '📍' },
  { label: 'Đổi mật khẩu', to: '/account/password', icon: '🔒' },
]
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Tài khoản của tôi</h1>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Sidebar -->
      <aside class="md:col-span-1">
        <div class="card p-4">
          <div class="flex flex-col items-center text-center mb-4 pb-4 border-b">
            <div class="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-2">
              <span class="text-rose-500 text-2xl font-bold">{{ authStore.user?.fullName?.charAt(0) }}</span>
            </div>
            <p class="font-semibold text-gray-800">{{ authStore.fullName }}</p>
            <p class="text-xs text-gray-400">{{ authStore.user?.email }}</p>
          </div>
          <nav class="space-y-1">
            <NuxtLink
              v-for="item in menuItems"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors"
              active-class="bg-rose-50 text-rose-600 font-medium"
              exact-active-class="bg-rose-50 text-rose-600 font-medium"
            >
              <span>{{ item.icon }}</span>
              {{ item.label }}
            </NuxtLink>
            <button
              class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 w-full transition-colors"
              @click="authStore.logout()"
            >
              <span>🚪</span>
              Đăng xuất
            </button>
          </nav>
        </div>
      </aside>

      <!-- Content -->
      <div class="md:col-span-3">
        <div class="card p-6">
          <h2 class="font-semibold text-gray-900 mb-4">Thông tin cá nhân</h2>
          <form class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Họ</label>
              <input :value="authStore.user?.firstName" type="text" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tên</label>
              <input :value="authStore.user?.lastName" type="text" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input :value="authStore.user?.email" type="email" class="input-field" disabled>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input :value="authStore.user?.phone" type="tel" class="input-field">
            </div>
            <div class="sm:col-span-2">
              <button type="submit" class="btn-primary">Lưu thay đổi</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
