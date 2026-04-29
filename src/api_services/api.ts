import type { BoardGame } from '@/data/boardgame'
import type { PaginatedBoardgamesResponse } from './api_schemas'
import axios from 'axios'

// maybe in the future refactor, so that api isn't exposed
// temporary botch for api_connection_check.ts
export const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const boardgameApi = {
  async getAllBoardgames(): Promise<BoardGame[]> {
    const { data } = await api.get('/api/boardgames')
    return data
  },

  async getBoardgamesPaginated(
    offset: number,
    limit: number,
  ): Promise<PaginatedBoardgamesResponse> {
    const { data } = await api.get('/api/boardgames/page', {
      params: {
        offset,
        limit,
      },
    })

    return data
  },

  async getBoardgame(boardgameId: number): Promise<BoardGame> {
    const { data } = await api.get('/api/boardgames/' + boardgameId)
    return data
  },

  async addBoardgame(boardgameData: Record<string, string>): Promise<BoardGame> {
    const { data } = await api.post('/api/boardgames', {
      ...boardgameData,
    })
    return data
  },

  async updateBoardgame(boardgameData: Record<string, string>): Promise<BoardGame> {
    const { data } = await api.put(`/api/boardgames`, {
      ...boardgameData,
    })
    return data
  },

  async deleteBoardgame(boardgameId: number): Promise<void> {
    await api.delete('/api/boardgames/' + boardgameId)
  },
}
