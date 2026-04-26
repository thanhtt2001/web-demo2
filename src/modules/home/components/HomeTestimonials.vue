<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-8">
      <h2 class="section-title">Khách hàng nói gì</h2>
      <p class="section-subtitle">Hàng nghìn khách hàng tin tưởng và yêu thích</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="review in testimonials"
        :key="review.id"
        class="card p-6"
      >
        <div class="flex mb-3">
          <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed mb-4">"{{ review.comment }}"</p>
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-semibold text-sm">
            {{ review.name.charAt(0) }}
          </div>
          <div>
            <p class="text-sm font-medium text-gray-800">{{ review.name }}</p>
            <p class="text-xs text-gray-400">{{ review.product }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    id: 1,
    name: 'Nguyễn Thị Lan',
    product: 'Kem dưỡng ẩm SK-II',
    comment: 'Sản phẩm chính hãng, giao hàng nhanh. Da mình cải thiện rõ rệt sau 2 tuần sử dụng. Sẽ tiếp tục ủng hộ shop!',
  },
  {
    id: 2,
    name: 'Trần Minh Châu',
    product: 'Son môi Dior',
    comment: 'Màu son đẹp y hình, bền màu cả ngày. Đóng gói cẩn thận, có hộp quà rất sang. Mua làm quà tặng bạn bè ai cũng thích.',
  },
  {
    id: 3,
    name: 'Phạm Thu Hà',
    product: 'Serum Vitamin C The Ordinary',
    comment: 'Giá tốt hơn nhiều so với mua trực tiếp. Hàng có tem chống hàng giả, yên tâm về chất lượng. Dịch vụ khách hàng rất nhiệt tình.',
  },
]
</script>
