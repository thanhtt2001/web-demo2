<script setup lang="ts">
useSeoMeta({
  title: 'Cosmetic Shop - Mỹ phẩm chính hãng',
  description: 'Mua sắm mỹ phẩm chính hãng, giá tốt nhất tại Cosmetic Shop',
})

const productStore = useProductStore()

productStore.fetchFeatured()
productStore.fetchNewArrivals()
productStore.fetchBestSellers()
productStore.fetchCategories()
</script>

<template>
  <div>
    <!-- Hero Banner -->
    <HomeHeroBanner />

    <!-- Categories -->
    <HomeCategorySection :categories="productStore.categories" />

    <!-- Featured Products -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-8">
        <h2 class="section-title">Sản phẩm nổi bật</h2>
        <p class="section-subtitle">Được yêu thích nhất tại Cosmetic Shop</p>
      </div>
      <ProductGrid :products="productStore.featuredProducts" :columns="4" />
      <div class="text-center mt-8">
        <NuxtLink to="/products" class="btn-outline">Xem tất cả sản phẩm</NuxtLink>
      </div>
    </section>

    <!-- Banner promo -->
    <HomePromoBanner />

    <!-- New Arrivals -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-8">
        <h2 class="section-title">Hàng mới về</h2>
        <p class="section-subtitle">Cập nhật xu hướng làm đẹp mới nhất</p>
      </div>
      <ProductGrid :products="productStore.newArrivals" :columns="4" />
    </section>

    <!-- Best Sellers -->
    <section class="bg-rose-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="section-title">Bán chạy nhất</h2>
          <p class="section-subtitle">Top sản phẩm được mua nhiều nhất</p>
        </div>
        <ProductGrid :products="productStore.bestSellers" :columns="4" />
      </div>
    </section>

    <!-- Brand logos -->
    <HomeBrandSection />

    <!-- Testimonials -->
    <HomeTestimonials />
  </div>
</template>
