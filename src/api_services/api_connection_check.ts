import { ref } from 'vue'
import { api } from '@/api_services/api'

export const isOnline = ref(true)
export const simulateOffline = ref(false)

export async function checkNetworkStatus() {
  if (simulateOffline.value || !navigator.onLine) {
    isOnline.value = false
    return false
  }

  try {
    await api.get('/api/status', { timeout: 2000 })
    isOnline.value = true
    return true
  } catch {
    isOnline.value = false
    return false
  }
}
