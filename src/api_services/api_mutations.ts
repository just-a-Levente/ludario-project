import { ref } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { boardgameApi } from '@/api_services/api'

export function useAddBoardgame() {
  const queryClient = useQueryClient()

  const errors = ref<Record<string, string>>({})

  const mutation = useMutation({
    mutationFn: boardgameApi.addBoardgame,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardgames'] })
      errors.value = {}
    },

    onError: (error: any) => {
      errors.value = error.response?.data?.detail ?? {}
    },
  })

  return { ...mutation, errors }
}

export function useUpdateBoardgame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: boardgameApi.updateBoardgame,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardgames'] })
      queryClient.invalidateQueries({ queryKey: ['boardgame'] })
    },
  })
}

export function useDeleteBoardgame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => boardgameApi.deleteBoardgame(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardgames'] })
    },
  })
}
