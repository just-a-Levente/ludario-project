import type { BoardGame } from '@/data/boardgame'

export type PaginatedBoardgamesResponse = {
  items: BoardGame[]
  total_count: number
  offset: number
  limit: number
}
