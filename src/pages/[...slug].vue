<script setup lang="ts">
useSeoMeta({ title: '404 - Trang không tìm thấy' })
</script>

<template>
  <div class="min-h-[60vh] flex items-center justify-center">
    <div class="text-center">
      <div class="text-8xl font-bold text-gradient mb-4">404</div>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">Trang không tìm thấy</h1>
      <p class="text-gray-500 mb-8">Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
      <div class="flex gap-3 justify-center">
        <NuxtLink to="/" class="btn-primary">Về trang chủ</NuxtLink>
        <NuxtLink to="/products" class="btn-outline">Xem sản phẩm</NuxtLink>
      </div>
    </div>
  </div>
</template>
