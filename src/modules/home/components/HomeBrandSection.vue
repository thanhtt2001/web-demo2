<template>
  <section class="border-y border-gray-100 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-center text-sm text-gray-400 uppercase tracking-widest mb-8">Thương hiệu đối tác</p>
      <div class="flex items-center justify-center flex-wrap gap-8 md:gap-12">
        <div
          v-for="brand in ['L\'Oréal', 'Lancôme', 'Dior', 'Chanel', 'SK-II', 'Innisfree', 'The Ordinary', 'Laneige']"
          :key="brand"
          class="text-gray-300 hover:text-gray-500 font-serif font-semibold text-lg transition-colors cursor-pointer"
        >
          {{ brand }}
        </div>
      </div>
    </div>
  </section>
</template>
