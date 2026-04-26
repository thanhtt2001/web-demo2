<script setup lang="ts">
const slides = [
  {
    id: 1,
    title: 'Làm đẹp tự nhiên',
    subtitle: 'Khám phá bộ sưu tập skincare cao cấp',
    description: 'Chăm sóc làn da với những sản phẩm thiên nhiên thuần chay, an toàn cho mọi loại da.',
    cta: 'Mua ngay',
    ctaLink: '/products?category=skincare',
    bg: 'from-rose-100 to-pink-50',
    image: '/images/hero-1.jpg',
  },
  {
    id: 2,
    title: 'Trang điểm hoàn hảo',
    subtitle: 'Bộ sưu tập makeup mùa hè 2025',
    description: 'Tỏa sáng mỗi ngày với những gam màu rực rỡ, bền màu suốt 24 giờ.',
    cta: 'Khám phá',
    ctaLink: '/products?category=makeup',
    bg: 'from-purple-100 to-pink-50',
    image: '/images/hero-2.jpg',
  },
]

const currentSlide = ref(0)
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)
})

onUnmounted(() => clearInterval(timer))
</script>

<template>
  <section class="relative overflow-hidden">
    <TransitionGroup name="fade">
      <div
        v-for="(slide, i) in slides"
        v-show="currentSlide === i"
        :key="slide.id"
        class="bg-gradient-to-r min-h-[480px] md:min-h-[560px] flex items-center"
        :class="slide.bg"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
            <div class="animate-slide-up">
              <p class="text-rose-400 font-medium text-sm uppercase tracking-widest mb-3">{{ slide.subtitle }}</p>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight font-serif">
                {{ slide.title }}
              </h1>
              <p class="text-gray-600 text-lg mb-8 max-w-md leading-relaxed">{{ slide.description }}</p>
              <div class="flex gap-3">
                <NuxtLink :to="slide.ctaLink" class="btn-primary text-base px-8 py-3">
                  {{ slide.cta }}
                </NuxtLink>
                <NuxtLink to="/products" class="btn-outline text-base px-8 py-3">
                  Xem thêm
                </NuxtLink>
              </div>
            </div>
            <div class="hidden md:flex justify-center">
              <div class="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <div class="text-8xl">🌸</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <!-- Dots -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <button
        v-for="(_, i) in slides"
        :key="i"
        class="w-2 h-2 rounded-full transition-all"
        :class="currentSlide === i ? 'bg-rose-400 w-6' : 'bg-rose-200'"
        :aria-label="`Slide ${i + 1}`"
        @click="currentSlide = i"
      />
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
  width: 100%;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
