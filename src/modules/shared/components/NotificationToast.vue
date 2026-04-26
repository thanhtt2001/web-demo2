<script setup lang="ts">
const { notifications, remove } = useNotification()

const iconMap = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
}

const colorMap = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
}

const iconColorMap = {
  success: 'bg-green-100 text-green-600',
  error: 'bg-red-100 text-red-600',
  warning: 'bg-yellow-100 text-yellow-600',
  info: 'bg-blue-100 text-blue-600',
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg animate-slide-up"
          :class="colorMap[notification.type]"
        >
          <div class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold" :class="iconColorMap[notification.type]">
            {{ iconMap[notification.type] }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm">{{ notification.title }}</p>
            <p v-if="notification.message" class="text-xs mt-0.5 opacity-80">{{ notification.message }}</p>
          </div>
          <button
            class="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            :aria-label="`Đóng thông báo: ${notification.title}`"
            @click="remove(notification.id)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
