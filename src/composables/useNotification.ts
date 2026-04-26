import type { Notification } from '~/types'

const notifications = ref<Notification[]>([])

export function useNotification() {
  function add(notification: Omit<Notification, 'id'>) {
    const id = Math.random().toString(36).slice(2)
    const item: Notification = { id, duration: 3000, ...notification }
    notifications.value.push(item)

    if (item.duration && item.duration > 0) {
      setTimeout(() => remove(id), item.duration)
    }
  }

  function remove(id: string) {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) notifications.value.splice(index, 1)
  }

  function success(title: string, message?: string) {
    add({ type: 'success', title, message })
  }

  function error(title: string, message?: string) {
    add({ type: 'error', title, message, duration: 5000 })
  }

  function warning(title: string, message?: string) {
    add({ type: 'warning', title, message })
  }

  function info(title: string, message?: string) {
    add({ type: 'info', title, message })
  }

  return {
    notifications: readonly(notifications),
    add,
    remove,
    success,
    error,
    warning,
    info,
  }
}
