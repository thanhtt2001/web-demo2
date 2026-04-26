<template>
  <div class="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2">
          <div class="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
            <span class="text-white font-bold">C</span>
          </div>
          <span class="font-serif text-2xl font-bold text-gray-800">
            Cosmetic<span class="text-rose-400">Shop</span>
          </span>
        </NuxtLink>
      </div>
      <slot />
    </div>
  </div>
</template>
