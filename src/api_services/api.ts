import type { BoardGame } from '@/data/boardgame'
import axios from 'axios'

const api = axios.create({
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

  async getBoardgame(boardgameId: number): Promise<BoardGame> {
    const { data } = await api.get('/api/boardgames/' + boardgameId)
    return data
  },

  async addBoardgame(boardgame: BoardGame): Promise<void> {
    await api.post('/api/boardgames', {
      ...boardgame,
      tags: boardgame.tags.join(';'),
    })
  },

  async deleteBoardgame(boardgameId: number): Promise<void> {
    await api.delete('/api/boardgames/' + boardgameId)
  },

  async updateBoardgame(boardgame: BoardGame): Promise<void> {
    await api.put(`/api/boardgames`, {
      ...boardgame,
      tags: boardgame.tags.join(';'),
    })
  },
}
