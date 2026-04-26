<script setup lang="ts">
import { formatCurrency } from '~/utils/format'

useSeoMeta({ title: 'Giỏ hàng - Cosmetic Shop' })

const cartStore = useCartStore()
const couponInput = ref('')
const couponError = ref('')

function applyCoupon() {
  couponError.value = ''
  const ok = cartStore.applyCoupon(couponInput.value)
  if (!ok) couponError.value = 'Mã giảm giá không hợp lệ hoặc đã hết hạn'
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Giỏ hàng ({{ cartStore.itemCount }} sản phẩm)</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-20">
      <div class="text-6xl mb-4">🛒</div>
      <h2 class="text-xl font-semibold text-gray-700 mb-2">Giỏ hàng trống</h2>
      <p class="text-gray-400 mb-6">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
      <NuxtLink to="/products" class="btn-primary">Mua sắm ngay</NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart items -->
      <div class="lg:col-span-2 space-y-4">
        <CartItem
          v-for="item in cartStore.items"
          :key="item.id"
          :item="item"
          @remove="cartStore.removeItem(item.id)"
          @update-quantity="cartStore.updateQuantity(item.id, $event)"
        />
      </div>

      <!-- Order summary -->
      <div class="lg:col-span-1">
        <div class="card p-6 sticky top-24">
          <h2 class="font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h2>

          <div class="space-y-3 text-sm mb-4">
            <div class="flex justify-between">
              <span class="text-gray-500">Tạm tính</span>
              <span>{{ formatCurrency(cartStore.subtotal) }}</span>
            </div>
            <div v-if="cartStore.couponDiscount > 0" class="flex justify-between text-green-600">
              <span>Giảm giá ({{ cartStore.couponCode }})</span>
              <span>-{{ formatCurrency(cartStore.couponDiscount) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Phí vận chuyển</span>
              <span :class="cartStore.shipping === 0 ? 'text-green-600' : ''">
                {{ cartStore.shipping === 0 ? 'Miễn phí' : formatCurrency(cartStore.shipping) }}
              </span>
            </div>
            <div class="border-t pt-3 flex justify-between font-semibold text-base">
              <span>Tổng cộng</span>
              <span class="text-rose-500">{{ formatCurrency(cartStore.total) }}</span>
            </div>
          </div>

          <!-- Coupon -->
          <div class="mb-4">
            <div class="flex gap-2">
              <input
                v-model="couponInput"
                type="text"
                placeholder="Mã giảm giá"
                class="input-field flex-1 text-sm py-2"
              >
              <button class="btn-outline text-sm py-2 px-3" @click="applyCoupon">
                Áp dụng
              </button>
            </div>
            <p v-if="couponError" class="text-red-500 text-xs mt-1">{{ couponError }}</p>
          </div>

          <NuxtLink to="/checkout" class="btn-primary w-full text-center block py-3">
            Tiến hành thanh toán
          </NuxtLink>

          <NuxtLink to="/products" class="btn-outline w-full text-center block py-2.5 mt-2 text-sm">
            Tiếp tục mua sắm
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
