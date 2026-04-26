<script setup lang="ts">
import { formatCurrency } from '~/utils/format'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const { success, error } = useNotification()

await productStore.fetchProductBySlug(route.params.slug as string)

const product = computed(() => productStore.currentProduct)

useSeoMeta({
  title: () => `${product.value?.name} - Cosmetic Shop`,
  description: () => product.value?.shortDescription,
  ogImage: () => product.value?.images[0]?.url,
})

const selectedVariant = ref(product.value?.variants?.[0])
const quantity = ref(1)
const activeTab = ref<'description' | 'ingredients' | 'how-to-use' | 'reviews'>('description')
const activeImageIndex = ref(0)

const isWishlisted = computed(() =>
  product.value ? wishlistStore.isInWishlist(product.value.id) : false,
)

const currentPrice = computed(() => {
  if (!product.value) return 0
  return product.value.price + (selectedVariant.value?.priceModifier ?? 0)
})

function addToCart() {
  if (!product.value) return
  if (product.value.stock === 0) {
    error('Hết hàng', 'Sản phẩm này hiện đã hết hàng')
    return
  }
  cartStore.addItem(product.value, quantity.value, selectedVariant.value)
  success('Đã thêm vào giỏ hàng', `${quantity.value}x ${product.value.name}`)
}

function toggleWishlist() {
  if (!product.value) return
  wishlistStore.toggle(product.value)
}
</script>

<template>
  <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
      <NuxtLink to="/" class="hover:text-rose-500">Trang chủ</NuxtLink>
      <span>/</span>
      <NuxtLink to="/products" class="hover:text-rose-500">Sản phẩm</NuxtLink>
      <span>/</span>
      <NuxtLink :to="`/products?category=${product.categorySlug}`" class="hover:text-rose-500">{{ product.category }}</NuxtLink>
      <span>/</span>
      <span class="text-gray-800 truncate max-w-xs">{{ product.name }}</span>
    </nav>

    <!-- Product detail -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
      <!-- Images -->
      <div>
        <div class="aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-3">
          <img
            :src="product.images[activeImageIndex]?.url || '/images/placeholder.jpg'"
            :alt="product.images[activeImageIndex]?.alt || product.name"
            class="w-full h-full object-cover"
          >
        </div>
        <div class="flex gap-2 overflow-x-auto scrollbar-hide">
          <button
            v-for="(img, i) in product.images"
            :key="img.id"
            class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors"
            :class="activeImageIndex === i ? 'border-rose-400' : 'border-transparent'"
            @click="activeImageIndex = i"
          >
            <img :src="img.url" :alt="img.alt" class="w-full h-full object-cover">
          </button>
        </div>
      </div>

      <!-- Info -->
      <div>
        <p class="text-sm text-rose-400 font-medium mb-1">{{ product.brand }}</p>
        <h1 class="text-2xl font-bold text-gray-900 mb-3 leading-snug">{{ product.name }}</h1>

        <!-- Rating -->
        <div class="flex items-center gap-2 mb-4">
          <div class="flex">
            <svg
              v-for="i in 5"
              :key="i"
              class="w-4 h-4"
              :class="i <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="text-sm text-gray-500">{{ product.rating }} ({{ product.reviewCount }} đánh giá)</span>
        </div>

        <!-- Price -->
        <div class="flex items-center gap-3 mb-5">
          <span class="text-3xl font-bold text-rose-500">{{ formatCurrency(currentPrice) }}</span>
          <span v-if="product.originalPrice" class="text-lg text-gray-400 line-through">
            {{ formatCurrency(product.originalPrice) }}
          </span>
          <span v-if="product.discount" class="badge-sale text-sm px-2 py-1">-{{ product.discount }}%</span>
        </div>

        <p class="text-gray-600 text-sm leading-relaxed mb-5">{{ product.shortDescription }}</p>

        <!-- Variants -->
        <div v-if="product.variants?.length" class="mb-5">
          <p class="text-sm font-medium text-gray-700 mb-2">Phân loại:</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="variant in product.variants"
              :key="variant.id"
              class="px-3 py-1.5 text-sm rounded-full border transition-all"
              :class="selectedVariant?.id === variant.id
                ? 'border-rose-400 bg-rose-50 text-rose-600'
                : 'border-gray-200 text-gray-600 hover:border-rose-300'"
              @click="selectedVariant = variant"
            >
              {{ variant.name }}: {{ variant.value }}
            </button>
          </div>
        </div>

        <!-- Quantity -->
        <div class="flex items-center gap-4 mb-6">
          <p class="text-sm font-medium text-gray-700">Số lượng:</p>
          <div class="flex items-center border border-gray-200 rounded-full overflow-hidden">
            <button
              class="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
              :disabled="quantity <= 1"
              @click="quantity = Math.max(1, quantity - 1)"
            >
              −
            </button>
            <span class="w-10 text-center text-sm font-medium">{{ quantity }}</span>
            <button
              class="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
              :disabled="quantity >= product.stock"
              @click="quantity = Math.min(product.stock, quantity + 1)"
            >
              +
            </button>
          </div>
          <span class="text-xs text-gray-400">Còn {{ product.stock }} sản phẩm</span>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 mb-6">
          <button
            class="flex-1 btn-primary py-3 text-base"
            :disabled="product.stock === 0"
            @click="addToCart"
          >
            {{ product.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ hàng' }}
          </button>
          <button
            class="w-12 h-12 border rounded-full flex items-center justify-center transition-all hover:border-rose-300"
            :class="isWishlisted ? 'border-rose-400 bg-rose-50' : 'border-gray-200'"
            :aria-label="isWishlisted ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'"
            @click="toggleWishlist"
          >
            <svg
              class="w-5 h-5"
              :class="isWishlisted ? 'fill-rose-500 text-rose-500' : 'fill-none text-gray-400'"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <!-- Trust badges -->
        <div class="grid grid-cols-3 gap-3 p-4 bg-rose-50 rounded-xl text-center">
          <div>
            <div class="text-lg mb-1">✓</div>
            <p class="text-xs text-gray-600">Hàng chính hãng</p>
          </div>
          <div>
            <div class="text-lg mb-1">🚚</div>
            <p class="text-xs text-gray-600">Giao hàng nhanh</p>
          </div>
          <div>
            <div class="text-lg mb-1">↩</div>
            <p class="text-xs text-gray-600">Đổi trả 30 ngày</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200 mb-6">
      <div class="flex gap-6 overflow-x-auto scrollbar-hide">
        <button
          v-for="tab in [
            { key: 'description', label: 'Mô tả' },
            { key: 'ingredients', label: 'Thành phần' },
            { key: 'how-to-use', label: 'Cách dùng' },
            { key: 'reviews', label: `Đánh giá (${product.reviewCount})` },
          ]"
          :key="tab.key"
          class="pb-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors"
          :class="activeTab === tab.key
            ? 'border-rose-400 text-rose-500'
            : 'border-transparent text-gray-500 hover:text-gray-700'"
          @click="activeTab = tab.key as typeof activeTab"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="prose prose-sm max-w-none text-gray-600 leading-relaxed mb-12">
      <div v-if="activeTab === 'description'" v-html="product.description" />
      <div v-else-if="activeTab === 'ingredients'">{{ product.ingredients || 'Đang cập nhật...' }}</div>
      <div v-else-if="activeTab === 'how-to-use'">{{ product.howToUse || 'Đang cập nhật...' }}</div>
      <div v-else-if="activeTab === 'reviews'">
        <p class="text-gray-400">Chưa có đánh giá nào.</p>
      </div>
    </div>
  </div>
</template>
