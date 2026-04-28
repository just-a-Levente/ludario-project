import type { BoardGame } from '@/data/boardgame'

export type PaginatedBoardgamesResponse = {
  items: BoardGame[]
  totalItems: number
  offset: number
  limit: number
}
