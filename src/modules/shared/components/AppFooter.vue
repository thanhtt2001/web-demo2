<script setup lang="ts">
const currentYear = new Date().getFullYear()

const footerLinks = {
  company: [
    { label: 'Về chúng tôi', to: '/about' },
    { label: 'Tuyển dụng', to: '/careers' },
    { label: 'Blog làm đẹp', to: '/blog' },
    { label: 'Liên hệ', to: '/contact' },
  ],
  support: [
    { label: 'Hướng dẫn mua hàng', to: '/guide' },
    { label: 'Chính sách đổi trả', to: '/return-policy' },
    { label: 'Chính sách vận chuyển', to: '/shipping' },
    { label: 'Câu hỏi thường gặp', to: '/faq' },
  ],
  categories: [
    { label: 'Chăm sóc da', to: '/products?category=skincare' },
    { label: 'Trang điểm', to: '/products?category=makeup' },
    { label: 'Nước hoa', to: '/products?category=perfume' },
    { label: 'Chăm sóc tóc', to: '/products?category=haircare' },
  ],
}

const socialLinks = [
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'TikTok', href: '#', icon: 'tiktok' },
  { name: 'YouTube', href: '#', icon: 'youtube' },
]
</script>

<template>
  <footer class="bg-gray-900 text-gray-300">
    <!-- Main footer -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-bold">C</span>
            </div>
            <span class="font-serif text-xl font-bold text-white">
              Cosmetic<span class="text-rose-400">Shop</span>
            </span>
          </div>
          <p class="text-sm text-gray-400 leading-relaxed mb-4">
            Điểm đến mua sắm mỹ phẩm chính hãng hàng đầu Việt Nam. Chúng tôi cam kết mang đến những sản phẩm làm đẹp chất lượng cao với giá tốt nhất.
          </p>
          <div class="flex gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              :aria-label="social.name"
              class="w-9 h-9 bg-gray-800 hover:bg-rose-500 rounded-full flex items-center justify-center transition-colors"
            >
              <span class="text-xs">{{ social.name.charAt(0) }}</span>
            </a>
          </div>
        </div>

        <!-- Links -->
        <div>
          <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Công ty</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.company" :key="link.to">
              <NuxtLink :to="link.to" class="text-sm text-gray-400 hover:text-rose-400 transition-colors">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Hỗ trợ</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.support" :key="link.to">
              <NuxtLink :to="link.to" class="text-sm text-gray-400 hover:text-rose-400 transition-colors">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Danh mục</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.categories" :key="link.to">
              <NuxtLink :to="link.to" class="text-sm text-gray-400 hover:text-rose-400 transition-colors">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Newsletter -->
      <div class="mt-10 pt-8 border-t border-gray-800">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 class="text-white font-semibold mb-1">Đăng ký nhận ưu đãi</h4>
            <p class="text-sm text-gray-400">Nhận thông tin khuyến mãi và tips làm đẹp mỗi tuần</p>
          </div>
          <form class="flex gap-2 w-full md:w-auto" @submit.prevent>
            <input
              type="email"
              placeholder="Email của bạn"
              class="input-field bg-gray-800 border-gray-700 text-white placeholder-gray-500 flex-1 md:w-64"
            >
            <button type="submit" class="btn-primary whitespace-nowrap">
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p class="text-xs text-gray-500">
          © {{ currentYear }} CosmeticShop. Tất cả quyền được bảo lưu.
        </p>
        <div class="flex items-center gap-4">
          <NuxtLink to="/privacy" class="text-xs text-gray-500 hover:text-gray-300">Chính sách bảo mật</NuxtLink>
          <NuxtLink to="/terms" class="text-xs text-gray-500 hover:text-gray-300">Điều khoản sử dụng</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
