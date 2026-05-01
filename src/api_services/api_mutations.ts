import { ref } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { boardgameApi } from '@/api_services/api'
import { createBoardGame } from '@/data/boardgame'
import { checkNetworkStatus } from './api_connection_check'
import { offlineQueue } from './api_operation_sync_queue'
import type { Ref } from 'vue'

export function useAddBoardgame(offset: Ref<number>, limit: Ref<number>) {
  const queryClient = useQueryClient()

  const errors = ref<Record<string, string>>({})

  const mutation = useMutation({
    mutationFn: async (newGame: any) => {
      const online = await checkNetworkStatus()
      if (!online) throw new Error('offline')
      return boardgameApi.addBoardgame(newGame)
    },

    onMutate: async (newGame) => {
      const queryKey = ['boardgames', offset, limit]
      const previous = queryClient.getQueryData(queryKey)
      const tempId = -Date.now()

      queryClient.setQueryData(queryKey, (old: any) => {
        if (!old) return old
        return {
          ...old,
          items: [...old.items, { ...createBoardGame(newGame), id: tempId }],
        }
      })
      return { previous, tempId, queryKey }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardgames'] })
      queryClient.invalidateQueries({ queryKey: ['boardgames-infinite'] })
      errors.value = {}
    },

    onError: async (error: any, variables, context) => {
      if (error.message === 'offline')
        offlineQueue.value.push({ type: 'create', payload: variables })
      else {
        queryClient.setQueryData(context?.queryKey, context?.previous)
        errors.value = error.response?.data?.detail ?? {}
      }
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
      queryClient.invalidateQueries({ queryKey: ['boardgames-infinite'] })
      queryClient.invalidateQueries({ queryKey: ['boardgame'] }) // TODO: make it so that only the updated board game's cache gets invalidated/updated
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
      queryClient.invalidateQueries({ queryKey: ['boardgames-infinite'] })
      // TODO: make it so that the deleted board game's cache gets invalidated
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
    } catch {
      return
    }
  }

  queryClient.invalidateQueries({ queryKey: ['boardgames'] })
}
