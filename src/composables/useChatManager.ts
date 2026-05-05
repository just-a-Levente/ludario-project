import { ref, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/userstore'
import { api } from '@/api_services/api'
import type { ChatMessage } from '@/data/chatMessage'

export function useChatManager() {
  const userStore = useUserStore()
  const messages = ref<ChatMessage[]>([])
  const newMessage = ref('')
  const isConnected = ref(false)
  let socket: WebSocket | null = null

  async function loadHistory() {
    const { data } = await api.get('/api/chat/history')
    messages.value = data
  }

  function connect() {
    const email = userStore.currentUser?.email
    if (!email) return

    const wsUrl = `ws://${window.location.host}/api/chat/ws/${email}`
    socket = new WebSocket(wsUrl)

    socket.onopen = () => {
      isConnected.value = true
    }

    socket.onmessage = (event) => {
      const message: ChatMessage = JSON.parse(event.data)
      messages.value.push(message)
    }

    socket.onclose = () => {
      isConnected.value = false
    }

    socket.onerror = () => {
      isConnected.value = false
    }
  }

  function disconnect() {
    socket?.close()
    socket = null
    isConnected.value = false
  }

  function sendMessage() {
    if (!newMessage.value.trim() || !socket || socket.readyState !== WebSocket.OPEN) return
    socket.send(JSON.stringify({ content: newMessage.value.trim() }))
    newMessage.value = ''
  }

  onUnmounted(() => disconnect())

  return { messages, newMessage, isConnected, loadHistory, connect, disconnect, sendMessage }
}
