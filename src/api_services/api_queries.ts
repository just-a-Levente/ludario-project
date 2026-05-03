import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { boardgameApi } from '@/api_services/api'
import { createBoardGame } from '@/data/boardgame'
import { createReview } from '@/data/review'
import { useInfiniteQuery } from '@tanstack/vue-query'
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
    queryKey: computed(() => ['boardgames', offset, limit]),

    queryFn: async () => {
      const data = await boardgameApi.getBoardgamesPaginated(offset.value, limit.value)
      return {
        items: data.items.map(createBoardGame),
        totalItems: data.total_count,
        offset: data.offset,
        limit: data.limit,
      }
    },
  })
}

export function useBoardgame(id: Ref<number>) {
  return useQuery({
    queryKey: computed(() => ['boardgame', id.value]),

    queryFn: async () => {
      const data = await boardgameApi.getBoardgame(id.value)

      const parsedReviews: Review[] = []
      data.reviews.forEach((review) => {
        const parsedReview = createReview({
          id: review.id,
          boardgameId: review.boardgame_id,
          author: review.author,
          stars: review.stars,
          comment: review.comment,
          reviewDate: review.review_date,
        })
        parsedReviews.push(parsedReview)
      })
      const parsedData = {
        ...data,
        reviews: parsedReviews,
      }
      return createBoardGame(parsedData)
    },

    enabled: computed(() => id.value >= 0),
  })
}

export function useInfiniteBoardgames(limit: Ref<number>) {
  return useInfiniteQuery({
    queryKey: computed(() => ['boardgames-infinite', limit.value]),
    queryFn: async ({ pageParam = 0 }) => {
      const data = await boardgameApi.getBoardgamesPaginated(pageParam as number, limit.value)
      return {
        items: data.items.map(createBoardGame),
        totalItems: data.total_count,
        offset: data.offset,
        limit: data.limit,
        nextOffset:
          data.offset + data.limit < data.total_count ? data.offset + data.limit : undefined,
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: 0,
  })
}
