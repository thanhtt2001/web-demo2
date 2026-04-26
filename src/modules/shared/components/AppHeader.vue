<script setup lang="ts">
const cartStore = useCartStore()
const authStore = useAuthStore()
const wishlistStore = useWishlistStore()
const { success } = useNotification()

const isMenuOpen = ref(false)
const isSearchOpen = ref(false)
const searchQuery = ref('')

const navLinks = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Sản phẩm', to: '/products' },
  { label: 'Thương hiệu', to: '/brands' },
  { label: 'Khuyến mãi', to: '/sale' },
  { label: 'Blog', to: '/blog' },
]

function handleSearch() {
  if (searchQuery.value.trim()) {
    navigateTo(`/products?search=${encodeURIComponent(searchQuery.value)}`)
    isSearchOpen.value = false
    searchQuery.value = ''
  }
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-rose-100 shadow-sm">
    <!-- Top bar -->
    <div class="bg-rose-400 text-white text-xs text-center py-1.5 px-4">
      🎁 Miễn phí vận chuyển cho đơn hàng từ 500.000đ | Hotline: 1800-xxxx
    </div>

    <!-- Main header -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 flex-shrink-0">
          <div class="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
            <span class="text-white text-sm font-bold">C</span>
          </div>
          <span class="font-serif text-xl font-bold text-gray-800">
            Cosmetic<span class="text-rose-400">Shop</span>
          </span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-6">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-sm font-medium text-gray-600 hover:text-rose-500 transition-colors"
            active-class="text-rose-500"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-3">
          <!-- Search -->
          <button
            class="p-2 text-gray-500 hover:text-rose-500 transition-colors"
            aria-label="Tìm kiếm"
            @click="isSearchOpen = !isSearchOpen"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Wishlist -->
          <NuxtLink to="/wishlist" class="relative p-2 text-gray-500 hover:text-rose-500 transition-colors" aria-label="Yêu thích">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span v-if="wishlistStore.count > 0" class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-400 text-white text-xs rounded-full flex items-center justify-center">
              {{ wishlistStore.count }}
            </span>
          </NuxtLink>

          <!-- Cart -->
          <NuxtLink to="/cart" class="relative p-2 text-gray-500 hover:text-rose-500 transition-colors" aria-label="Giỏ hàng">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span v-if="cartStore.itemCount > 0" class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-400 text-white text-xs rounded-full flex items-center justify-center">
              {{ cartStore.itemCount }}
            </span>
          </NuxtLink>

          <!-- Auth -->
          <template v-if="authStore.isLoggedIn">
            <NuxtLink to="/account" class="hidden sm:flex items-center gap-2 text-sm text-gray-600 hover:text-rose-500 transition-colors">
              <div class="w-7 h-7 bg-rose-100 rounded-full flex items-center justify-center">
                <span class="text-rose-500 text-xs font-semibold">{{ authStore.fullName.charAt(0) }}</span>
              </div>
              <span class="hidden lg:block">{{ authStore.fullName }}</span>
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/auth/login" class="hidden sm:block btn-primary text-sm py-2 px-4">
              Đăng nhập
            </NuxtLink>
          </template>

          <!-- Mobile menu button -->
          <button
            class="md:hidden p-2 text-gray-500"
            aria-label="Menu"
            @click="isMenuOpen = !isMenuOpen"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Search bar -->
      <Transition name="slide-down">
        <div v-if="isSearchOpen" class="pb-4">
          <form class="flex gap-2" @submit.prevent="handleSearch">
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Tìm kiếm sản phẩm, thương hiệu..."
              class="input-field flex-1"
              autofocus
            >
            <button type="submit" class="btn-primary px-4">
              Tìm
            </button>
          </form>
        </div>
      </Transition>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide-down">
      <div v-if="isMenuOpen" class="md:hidden border-t border-rose-100 bg-white px-4 py-4">
        <nav class="flex flex-col gap-3">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-sm font-medium text-gray-600 hover:text-rose-500 py-1"
            @click="isMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
          <div class="border-t border-gray-100 pt-3 mt-1">
            <NuxtLink v-if="!authStore.isLoggedIn" to="/auth/login" class="btn-primary w-full text-center block" @click="isMenuOpen = false">
              Đăng nhập
            </NuxtLink>
            <button v-else class="text-sm text-gray-600" @click="authStore.logout(); isMenuOpen = false">
              Đăng xuất
            </button>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
