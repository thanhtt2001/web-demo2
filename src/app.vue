<script setup lang="ts">
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const authStore = useAuthStore()

// Initialize persisted state on client
onMounted(() => {
  cartStore.loadCart()
  wishlistStore.load()
  authStore.initFromStorage()
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NotificationToast />
  </div>
</template>
