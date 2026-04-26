<script setup lang="ts">
definePageMeta({ layout: 'auth' })
useSeoMeta({ title: 'Đăng ký - Cosmetic Shop' })

const authStore = useAuthStore()
const { error } = useNotification()
const router = useRouter()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
})

const showPassword = ref(false)
const formError = ref('')

async function handleRegister() {
  formError.value = ''
  if (form.password !== form.confirmPassword) {
    formError.value = 'Mật khẩu xác nhận không khớp'
    return
  }
  if (form.password.length < 8) {
    formError.value = 'Mật khẩu phải có ít nhất 8 ký tự'
    return
  }
  try {
    await authStore.register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      phone: form.phone,
    })
    router.push('/')
  }
  catch (e) {
    error('Đăng ký thất bại', 'Email này đã được sử dụng')
  }
}
</script>

<template>
  <div class="card p-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-1 text-center">Tạo tài khoản</h1>
    <p class="text-gray-500 text-sm text-center mb-6">Tham gia cộng đồng làm đẹp của chúng tôi</p>

    <form class="space-y-4" @submit.prevent="handleRegister">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">Họ</label>
          <input id="firstName" v-model="form.firstName" type="text" required class="input-field" placeholder="Nguyễn">
        </div>
        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Tên</label>
          <input id="lastName" v-model="form.lastName" type="text" required class="input-field" placeholder="Thị A">
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input id="email" v-model="form.email" type="email" required autocomplete="email" class="input-field" placeholder="your@email.com">
      </div>

      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
        <input id="phone" v-model="form.phone" type="tel" class="input-field" placeholder="0912 345 678">
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
        <div class="relative">
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            required
            autocomplete="new-password"
            class="input-field pr-10"
            placeholder="Ít nhất 8 ký tự"
          >
          <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" @click="showPassword = !showPassword">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
        <input
          id="confirmPassword"
          v-model="form.confirmPassword"
          :type="showPassword ? 'text' : 'password'"
          required
          autocomplete="new-password"
          class="input-field"
          placeholder="Nhập lại mật khẩu"
        >
      </div>

      <p v-if="formError" class="text-red-500 text-sm">{{ formError }}</p>

      <button type="submit" class="btn-primary w-full py-3" :disabled="authStore.isLoading">
        <span v-if="authStore.isLoading">Đang tạo tài khoản...</span>
        <span v-else>Đăng ký</span>
      </button>
    </form>

    <div class="mt-6 text-center">
      <p class="text-sm text-gray-500">
        Đã có tài khoản?
        <NuxtLink to="/auth/login" class="text-rose-500 font-medium hover:underline">Đăng nhập</NuxtLink>
      </p>
    </div>
  </div>
</template>
