import { ref } from 'vue'
import { useQueryClient } from '@tanstack/vue-query'
import { api } from './api'

export function useFakerService() {
  const queryClient = useQueryClient()
  const isRunning = ref(false)
  let socket: WebSocket | null = null

  function connect() {
    socket = new WebSocket(`wss://ludario-project-backend.onrender.com/ws/faker`)
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.event === 'boardgame_added') {
        queryClient.invalidateQueries({ queryKey: ['boardgames'] })
        queryClient.invalidateQueries({ queryKey: ['boardgames-infinite'] })
      }
    }
  }

  function disconnect() {
    socket?.close()
    socket = null
  }

  async function toggleFaker() {
    if (!isRunning.value) {
      await api.get('/api/faker/start')
      connect()
      isRunning.value = true
    } else {
      await api.get('/api/faker/stop')
      disconnect()
      isRunning.value = false
    }
  }

  return { isRunning, toggleFaker }
}
