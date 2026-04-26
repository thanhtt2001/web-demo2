<script setup lang="ts">
import { formatCurrency, formatDate } from '~/utils/format'
import type { OrderStatus } from '~/types'

useSeoMeta({ title: 'Đơn hàng của tôi - Cosmetic Shop' })

const authStore = useAuthStore()
if (!authStore.isLoggedIn) navigateTo('/auth/login')

// Mock orders for display
const orders = ref([
  {
    id: 1,
    orderCode: 'CS2025001',
    status: 'delivered' as OrderStatus,
    total: 850000,
    itemCount: 3,
    createdAt: '2025-04-20T10:00:00Z',
  },
  {
    id: 2,
    orderCode: 'CS2025002',
    status: 'shipping' as OrderStatus,
    total: 1200000,
    itemCount: 2,
    createdAt: '2025-04-24T14:30:00Z',
  },
])

const statusMap: Record<OrderStatus, { label: string; class: string }> = {
  pending: { label: 'Chờ xác nhận', class: 'bg-yellow-100 text-yellow-700' },
  confirmed: { label: 'Đã xác nhận', class: 'bg-blue-100 text-blue-700' },
  processing: { label: 'Đang xử lý', class: 'bg-indigo-100 text-indigo-700' },
  shipping: { label: 'Đang giao', class: 'bg-orange-100 text-orange-700' },
  delivered: { label: 'Đã giao', class: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Đã hủy', class: 'bg-red-100 text-red-700' },
  refunded: { label: 'Đã hoàn tiền', class: 'bg-gray-100 text-gray-700' },
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Đơn hàng của tôi</h1>

    <div v-if="orders.length === 0" class="text-center py-16">
      <div class="text-5xl mb-4">📦</div>
      <p class="text-gray-500">Bạn chưa có đơn hàng nào</p>
      <NuxtLink to="/products" class="btn-primary mt-4 inline-block">Mua sắm ngay</NuxtLink>
    </div>

    <div v-else class="space-y-4">
      <div v-for="order in orders" :key="order.id" class="card p-5">
        <div class="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p class="font-semibold text-gray-800">#{{ order.orderCode }}</p>
            <p class="text-xs text-gray-400 mt-0.5">{{ formatDate(order.createdAt) }} · {{ order.itemCount }} sản phẩm</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="badge px-3 py-1 text-xs" :class="statusMap[order.status].class">
              {{ statusMap[order.status].label }}
            </span>
            <span class="font-semibold text-rose-500">{{ formatCurrency(order.total) }}</span>
          </div>
        </div>
        <div class="flex gap-2 mt-4">
          <NuxtLink :to="`/account/orders/${order.id}`" class="btn-outline text-sm py-1.5 px-4">
            Chi tiết
          </NuxtLink>
          <button v-if="order.status === 'pending'" class="text-sm text-red-500 hover:underline px-2">
            Hủy đơn
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
