# 💄 Cosmetic Shop

Trang web bán mỹ phẩm chính hãng xây dựng với **Nuxt 3 + TypeScript + Tailwind CSS**.

## 🗂️ Cấu trúc thư mục (Module-based)

```
cosmetic-shop/
├── src/
│   ├── app.vue                    # Root component
│   ├── assets/
│   │   └── css/main.css           # Global styles + Tailwind
│   ├── composables/               # Global composables
│   │   ├── useApi.ts
│   │   └── useNotification.ts
│   ├── layouts/
│   │   ├── default.vue            # Layout chính (header + footer)
│   │   └── auth.vue               # Layout trang đăng nhập/đăng ký
│   ├── locales/                   # i18n translations
│   │   ├── vi.json
│   │   └── en.json
│   ├── middleware/
│   │   ├── auth.ts                # Bảo vệ route cần đăng nhập
│   │   └── guest.ts               # Redirect nếu đã đăng nhập
│   ├── modules/                   # ⭐ Module-based structure
│   │   ├── auth/
│   │   │   ├── components/        # AuthLoginForm, AuthRegisterForm...
│   │   │   └── stores/
│   │   │       └── useAuthStore.ts
│   │   ├── cart/
│   │   │   ├── components/
│   │   │   │   └── CartItem.vue
│   │   │   └── stores/
│   │   │       └── useCartStore.ts
│   │   ├── checkout/
│   │   ├── home/
│   │   │   └── components/
│   │   │       ├── HomeHeroBanner.vue
│   │   │       ├── HomeCategorySection.vue
│   │   │       ├── HomePromoBanner.vue
│   │   │       ├── HomeBrandSection.vue
│   │   │       └── HomeTestimonials.vue
│   │   ├── products/
│   │   │   ├── components/
│   │   │   │   ├── ProductCard.vue
│   │   │   │   ├── ProductGrid.vue
│   │   │   │   ├── ProductFilterSidebar.vue
│   │   │   │   ├── FilterContent.vue
│   │   │   │   └── ProductPagination.vue
│   │   │   ├── composables/
│   │   │   │   └── useProducts.ts
│   │   │   └── stores/
│   │   │       └── useProductStore.ts
│   │   ├── shared/
│   │   │   └── components/
│   │   │       ├── AppHeader.vue
│   │   │       ├── AppFooter.vue
│   │   │       └── NotificationToast.vue
│   │   └── wishlist/
│   │       └── stores/
│   │           └── useWishlistStore.ts
│   ├── pages/                     # File-based routing
│   │   ├── index.vue              # Trang chủ
│   │   ├── [...slug].vue          # 404
│   │   ├── products/
│   │   │   ├── index.vue          # Danh sách sản phẩm
│   │   │   └── [slug].vue         # Chi tiết sản phẩm
│   │   ├── cart/index.vue
│   │   ├── checkout/index.vue
│   │   ├── wishlist/index.vue
│   │   └── auth/
│   │       ├── login.vue
│   │       └── register.vue
│   ├── plugins/
│   │   └── pinia.client.ts
│   └── types/                     # TypeScript types
│       ├── index.ts
│       ├── product.ts
│       ├── user.ts
│       ├── cart.ts
│       └── order.ts
├── nuxt.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🚀 Cài đặt & Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

| Công nghệ | Mục đích |
|-----------|----------|
| **Nuxt 3** | SSR/SSG framework |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **Pinia** | State management |
| **@nuxtjs/i18n** | Đa ngôn ngữ (VI/EN) |

## ✨ Tính năng

- 🏠 **Trang chủ** — Hero banner, danh mục, sản phẩm nổi bật, khuyến mãi
- 🛍️ **Danh sách sản phẩm** — Filter, sort, phân trang
- 📦 **Chi tiết sản phẩm** — Gallery, variants, đánh giá, tabs
- 🛒 **Giỏ hàng** — Thêm/xóa/cập nhật, mã giảm giá
- 💳 **Thanh toán** — Multi-step checkout, nhiều phương thức
- ❤️ **Wishlist** — Lưu sản phẩm yêu thích
- 👤 **Tài khoản** — Đăng nhập, đăng ký, quản lý đơn hàng
- 🌐 **i18n** — Tiếng Việt / English
- 📱 **Responsive** — Mobile-first design

## 🔧 Cấu hình môi trường

Tạo file `.env` từ `.env.example`:

```env
NUXT_PUBLIC_API_BASE=https://api.cosmetic-shop.com
NUXT_API_SECRET=your-secret-key
```
