<script setup lang="ts">
import { formatCurrency } from '~/utils/format'
import type { PaymentMethod } from '~/types'

useSeoMeta({ title: 'Thanh toán - Cosmetic Shop' })

const cartStore = useCartStore()
const authStore = useAuthStore()
const { success, error } = useNotification()
const router = useRouter()

// Redirect if cart is empty
if (cartStore.items.length === 0) {
  navigateTo('/cart')
}

const step = ref<1 | 2 | 3>(1)

const shippingForm = reactive({
  fullName: authStore.user?.fullName ?? '',
  phone: authStore.user?.phone ?? '',
  province: '',
  district: '',
  ward: '',
  street: '',
})

const paymentMethod = ref<PaymentMethod>('cod')

const paymentMethods = [
  { value: 'cod', label: 'Thanh toán khi nhận hàng (COD)', icon: '💵' },
  { value: 'momo', label: 'Ví MoMo', icon: '💜' },
  { value: 'vnpay', label: 'VNPay', icon: '🔵' },
  { value: 'bank_transfer', label: 'Chuyển khoản ngân hàng', icon: '🏦' },
]

async function placeOrder() {
  try {
    // Mock order placement
    await new Promise(resolve => setTimeout(resolve, 1000))
    cartStore.clearCart()
    success('Đặt hàng thành công!', 'Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất')
    router.push('/account/orders')
  }
  catch {
    error('Đặt hàng thất bại', 'Vui lòng thử lại sau')
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Thanh toán</h1>

    <!-- Steps -->
    <div class="flex items-center gap-2 mb-8">
      <div
        v-for="(s, i) in ['Địa chỉ', 'Thanh toán', 'Xác nhận']"
        :key="i"
        class="flex items-center gap-2"
      >
        <div
          class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
          :class="step > i + 1 ? 'bg-green-400 text-white' : step === i + 1 ? 'bg-rose-400 text-white' : 'bg-gray-100 text-gray-400'"
        >
          {{ step > i + 1 ? '✓' : i + 1 }}
        </div>
        <span class="text-sm" :class="step === i + 1 ? 'text-gray-800 font-medium' : 'text-gray-400'">{{ s }}</span>
        <span v-if="i < 2" class="text-gray-200 mx-1">—</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Form -->
      <div class="lg:col-span-2">
        <!-- Step 1: Shipping -->
        <div v-if="step === 1" class="card p-6">
          <h2 class="font-semibold text-gray-900 mb-4">Địa chỉ giao hàng</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <input v-model="shippingForm.fullName" type="text" required class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input v-model="shippingForm.phone" type="tel" required class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố</label>
              <input v-model="shippingForm.province" type="text" required class="input-field" placeholder="Hà Nội">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện</label>
              <input v-model="shippingForm.district" type="text" required class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phường/Xã</label>
              <input v-model="shippingForm.ward" type="text" required class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Địa chỉ cụ thể</label>
              <input v-model="shippingForm.street" type="text" required class="input-field" placeholder="Số nhà, tên đường">
            </div>
          </div>
          <button class="btn-primary mt-6" @click="step = 2">Tiếp tục</button>
        </div>

        <!-- Step 2: Payment -->
        <div v-else-if="step === 2" class="card p-6">
          <h2 class="font-semibold text-gray-900 mb-4">Phương thức thanh toán</h2>
          <div class="space-y-3">
            <label
              v-for="method in paymentMethods"
              :key="method.value"
              class="flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors"
              :class="paymentMethod === method.value ? 'border-rose-400 bg-rose-50' : 'border-gray-200 hover:border-gray-300'"
            >
              <input
                v-model="paymentMethod"
                type="radio"
                :value="method.value"
                class="text-rose-400 focus:ring-rose-300"
              >
              <span class="text-lg">{{ method.icon }}</span>
              <span class="text-sm font-medium text-gray-700">{{ method.label }}</span>
            </label>
          </div>
          <div class="flex gap-3 mt-6">
            <button class="btn-outline" @click="step = 1">Quay lại</button>
            <button class="btn-primary" @click="step = 3">Tiếp tục</button>
          </div>
        </div>

        <!-- Step 3: Confirm -->
        <div v-else class="card p-6">
          <h2 class="font-semibold text-gray-900 mb-4">Xác nhận đơn hàng</h2>

          <div class="space-y-3 mb-6">
            <div v-for="item in cartStore.items" :key="item.id" class="flex gap-3">
              <img
                :src="item.product.images[0]?.url || '/images/placeholder.jpg'"
                :alt="item.product.name"
                class="w-14 h-14 object-cover rounded-lg"
              >
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-800">{{ item.product.name }}</p>
                <p class="text-xs text-gray-400">x{{ item.quantity }}</p>
              </div>
              <p class="text-sm font-semibold text-rose-500">{{ formatCurrency(item.totalPrice) }}</p>
            </div>
          </div>

          <div class="border-t pt-4 space-y-2 text-sm mb-6">
            <div class="flex justify-between">
              <span class="text-gray-500">Địa chỉ</span>
              <span class="text-right text-gray-700 max-w-xs">{{ shippingForm.street }}, {{ shippingForm.ward }}, {{ shippingForm.district }}, {{ shippingForm.province }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Thanh toán</span>
              <span>{{ paymentMethods.find(m => m.value === paymentMethod)?.label }}</span>
            </div>
            <div class="flex justify-between font-semibold text-base pt-2 border-t">
              <span>Tổng cộng</span>
              <span class="text-rose-500">{{ formatCurrency(cartStore.total) }}</span>
            </div>
          </div>

          <div class="flex gap-3">
            <button class="btn-outline" @click="step = 2">Quay lại</button>
            <button class="btn-primary flex-1 py-3" @click="placeOrder">
              Đặt hàng
            </button>
          </div>
        </div>
      </div>

      <!-- Order summary -->
      <div class="lg:col-span-1">
        <div class="card p-5 sticky top-24">
          <h3 class="font-semibold text-gray-900 mb-3 text-sm">Đơn hàng ({{ cartStore.itemCount }} sản phẩm)</h3>
          <div class="space-y-2 text-sm mb-4">
            <div class="flex justify-between">
              <span class="text-gray-500">Tạm tính</span>
              <span>{{ formatCurrency(cartStore.subtotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Vận chuyển</span>
              <span :class="cartStore.shipping === 0 ? 'text-green-600' : ''">
                {{ cartStore.shipping === 0 ? 'Miễn phí' : formatCurrency(cartStore.shipping) }}
              </span>
            </div>
            <div class="flex justify-between font-semibold pt-2 border-t">
              <span>Tổng</span>
              <span class="text-rose-500">{{ formatCurrency(cartStore.total) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
