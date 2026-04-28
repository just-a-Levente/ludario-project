import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { boardgameApi } from '@/api_services/api'
import { createBoardGame } from '@/data/boardgame'
import type { Ref, ComputedRef } from 'vue'

export function useBoardgames() {
  return useQuery({
    queryKey: ['boardgames'],

    queryFn: async () => {
      const data = await boardgameApi.getAllBoardgames()
      return data.map(createBoardGame)
    },
  })
}

export function usePaginatedBoardgames(offset: ComputedRef<number>, limit: Ref<number>) {
  return useQuery({
    queryKey: ['boardgames', offset.value, limit.value],

    queryFn: async () => {
      const data = await boardgameApi.getBoardgamesPaginated(offset.value, limit.value)
      return {
        ...data,
        items: data.items.map(createBoardGame),
      }
    },

    placeholderData: (prev) => prev,
  })
}

export function useBoardgame(id: Ref<number>) {
  return useQuery({
    queryKey: computed(() => ['boardgame', id.value]),

    queryFn: async () => {
      const data = await boardgameApi.getBoardgame(id.value)
      return createBoardGame(data)
    },

    enabled: computed(() => id.value >= 0),
  })
}
