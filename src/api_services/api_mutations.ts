import { ref } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { boardgameApi } from '@/api_services/api'
import { createBoardGame } from '@/data/boardgame'
import { checkNetworkStatus } from './api_connection_check'
import { offlineQueue } from './api_operation_sync_queue'

export function useAddBoardgame() {
  const queryClient = useQueryClient()

  const errors = ref<Record<string, string>>({})

  const mutation = useMutation({
    mutationFn: boardgameApi.addBoardgame,

    onMutate: async (newGame) => {
      // optimistic update
      queryClient.setQueryData(['boardgames'], (old: any) => [
        ...(old ?? []),
        createBoardGame(newGame),
      ])

      const online = await checkNetworkStatus()
      if (!online) {
        offlineQueue.value.push({ type: 'create', payload: newGame })
        throw new Error('offline')
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardgames'] })
      errors.value = {}
    },

    onError: async (error: any, variables) => {
      if (error.message === 'offline') return
      errors.value = error.response?.data?.detail ?? {}
    },
  })

  return { ...mutation, errors }
}

export function useUpdateBoardgame() {
  const queryClient = useQueryClient()

  const errors = ref<Record<string, string>>({})

  const mutation = useMutation({
    mutationFn: async (updatedGame: any) => {
      const online = await checkNetworkStatus()
      if (!online) throw new Error('offline')
      return boardgameApi.updateBoardgame(updatedGame)
    },

    onMutate: async (updatedGame) => {
      const previous = queryClient.getQueriesData({ queryKey: ['boardgames'] })
      queryClient.setQueriesData({ queryKey: ['boardgames'] }, (old: any) => {
        if (!old) return old
        if (old.items)
          return {
            ...old,
            items: old.items.map((g: any) => (g.id === Number(updatedGame.id) ? updatedGame : g)),
          }
        if (Array.isArray(old))
          return old.map((g: any) => (g.id === Number(updatedGame.id) ? updatedGame : g))
        return old
      })
      return { previous }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardgames'] })
      queryClient.invalidateQueries({ queryKey: ['boardgame'] })
      errors.value = {}
    },

    onError: async (error: any, variables, context) => {
      if (error.message === 'offline')
        offlineQueue.value.push({ type: 'update', payload: variables })
      else {
        context?.previous?.forEach(([queryKey, data]: [any, any]) => {
          queryClient.setQueryData(queryKey, data)
        })
        errors.value = error.response?.data?.detail ?? {}
      }
    },
  })

  return { ...mutation, errors }
}

export function useDeleteBoardgame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      const online = await checkNetworkStatus()
      if (!online) throw new Error('offline')
      return boardgameApi.deleteBoardgame(id)
    },

    onMutate: async (id: number) => {
      const previous = queryClient.getQueryData(['boardgames'])

      console.log(offlineQueue.value)
      console.log('Attempting to delete from cache')

      queryClient.setQueriesData({ queryKey: ['boardgames'] }, (old: any) => {
        if (!old) return old
        return {
          ...old,
          items: old.items?.filter((g: any) => g.id !== id),
        }
      })

      console.log('Boardgame should be deleted from cache')

      return { previous }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardgames'] })
      console.log(offlineQueue.value)
    },

    onError: async (error, id, context) => {
      if (error.message === 'offline') offlineQueue.value.push({ type: 'delete', payload: id })
      else queryClient.setQueryData(['boardgames'], context?.previous)
    },
  })
}

export async function syncQueue(queryClient: any) {
  for (const op of [...offlineQueue.value]) {
    try {
      if (op.type === 'create') await boardgameApi.addBoardgame(op.payload)

      if (op.type === 'update') await boardgameApi.updateBoardgame(op.payload)

      if (op.type === 'delete') await boardgameApi.deleteBoardgame(op.payload)

      offlineQueue.value.shift()
      console.log(offlineQueue.value.length + ' operations left')
    } catch {
      console.log('WHY ARE YOU HERE')
      return // still offline → stop
    }
  }

  queryClient.invalidateQueries({ queryKey: ['boardgames'] })
}
