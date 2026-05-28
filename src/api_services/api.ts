import type { BoardGame } from '@/data/boardgame'
import type { PaginatedBoardgamesResponse } from './api_schemas'
import axios from 'axios'
import type { Review } from '@/data/review'
import { useUserStore } from '@/stores/userstore'

// maybe in the future refactor, so that api isn't exposed
// temporary botch for api_connection_check.ts
export const api = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.currentUser) {
    config.headers['User-Email'] = userStore.currentUser.email
    config.headers['User-Role'] = userStore.currentUser.roles[0] ?? 'user'
  }
  return config
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

  // ---------
  // Reviews
  // ---------

  async addReview(reviewData: Record<string, string>): Promise<Review> {
    const { data } = await api.post('/api/reviews', {
      ...reviewData,
    })
    return data
  },

  async deleteReview(reviewId: number): Promise<void> {
    await api.delete('/api/reviews/' + reviewId)
  },
}

export const userApi = {
  async login(email: string, passwordHash: string) {
    const { data } = await api.post('/api/users/login', {
      email,
      password_hash: passwordHash,
    })
    return data
  },

  async register(email: string, username: string, passwordHash: string, isAdmin: boolean) {
    const { data } = await api.post('/api/users/register', {
      email,
      username,
      password_hash: passwordHash,
      is_admin: isAdmin,
    })
    return data
  },
}
