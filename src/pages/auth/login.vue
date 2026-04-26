<script setup lang="ts">
definePageMeta({ layout: 'auth' })
useSeoMeta({ title: 'Đăng nhập - Cosmetic Shop' })

const authStore = useAuthStore()
const { error } = useNotification()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

const showPassword = ref(false)

async function handleLogin() {
  try {
    await authStore.login(form)
    router.push('/')
  }
  catch (e) {
    error('Đăng nhập thất bại', 'Email hoặc mật khẩu không đúng')
  }
}
</script>

<template>
  <div class="card p-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-1 text-center">Đăng nhập</h1>
    <p class="text-gray-500 text-sm text-center mb-6">Chào mừng bạn trở lại!</p>

    <form class="space-y-4" @submit.prevent="handleLogin">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          autocomplete="email"
          placeholder="your@email.com"
          class="input-field"
        >
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
        <div class="relative">
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            required
            autocomplete="current-password"
            placeholder="••••••••"
            class="input-field pr-10"
          >
          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            :aria-label="showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'"
            @click="showPassword = !showPassword"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          </button>
        </div>
        <div class="flex justify-end mt-1">
          <NuxtLink to="/auth/forgot-password" class="text-xs text-rose-500 hover:underline">
            Quên mật khẩu?
          </NuxtLink>
        </div>
      </div>

      <button
        type="submit"
        class="btn-primary w-full py-3"
        :disabled="authStore.isLoading"
      >
        <span v-if="authStore.isLoading">Đang đăng nhập...</span>
        <span v-else>Đăng nhập</span>
      </button>
    </form>

    <div class="mt-6 text-center">
      <p class="text-sm text-gray-500">
        Chưa có tài khoản?
        <NuxtLink to="/auth/register" class="text-rose-500 font-medium hover:underline">
          Đăng ký ngay
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
