// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  nitro: {
    preset: 'vercel',
  },

  // Module-based directory structure
  srcDir: 'src/',

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  // Auto-import composables and utils per module
  imports: {
    dirs: [
      'modules/*/composables',
      'modules/*/stores',
      'modules/*/utils',
    ],
  },

  // Auto-import components per module
  components: [
    { path: '~/components', pathPrefix: false },
    { path: '~/modules/home/components', pathPrefix: false },
    { path: '~/modules/products/components', prefix: 'Product' },
    { path: '~/modules/cart/components', prefix: 'Cart' },
    { path: '~/modules/auth/components', prefix: 'Auth' },
    { path: '~/modules/checkout/components', prefix: 'Checkout' },
    { path: '~/modules/account/components', prefix: 'Account' },
    { path: '~/modules/shared/components', pathPrefix: false },
  ],

  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://api.cosmetic-shop.com',
      appName: 'Cosmetic Shop',
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Cosmetic Shop - Mỹ phẩm chính hãng',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Mua sắm mỹ phẩm chính hãng, giá tốt nhất tại Cosmetic Shop',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap',
        },
      ],
    },
  },
})
