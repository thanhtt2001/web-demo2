<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Banner 1 -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 p-8 text-white">
        <div class="relative z-10">
          <p class="text-sm font-medium opacity-90 mb-1">Ưu đãi đặc biệt</p>
          <h3 class="text-2xl font-bold mb-2 font-serif">Giảm đến 50%</h3>
          <p class="text-sm opacity-80 mb-4">Cho tất cả sản phẩm skincare</p>
          <NuxtLink to="/sale" class="inline-block bg-white text-rose-500 font-medium text-sm px-5 py-2 rounded-full hover:bg-rose-50 transition-colors">
            Mua ngay
          </NuxtLink>
        </div>
        <div class="absolute right-4 bottom-0 text-7xl opacity-20">💆</div>
      </div>

      <!-- Banner 2 -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-400 to-indigo-500 p-8 text-white">
        <div class="relative z-10">
          <p class="text-sm font-medium opacity-90 mb-1">Bộ sưu tập mới</p>
          <h3 class="text-2xl font-bold mb-2 font-serif">Makeup 2025</h3>
          <p class="text-sm opacity-80 mb-4">Xu hướng trang điểm mới nhất</p>
          <NuxtLink to="/products?category=makeup&tag=new" class="inline-block bg-white text-purple-500 font-medium text-sm px-5 py-2 rounded-full hover:bg-purple-50 transition-colors">
            Khám phá
          </NuxtLink>
        </div>
        <div class="absolute right-4 bottom-0 text-7xl opacity-20">💄</div>
      </div>
    </div>
  </section>
</template>
