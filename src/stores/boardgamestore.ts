import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { createBoardGame, type BoardGame } from '@/data/boardgame.ts'
import { boardgameApi } from '@/api_services/api'

export const useBoardGamesStore = defineStore('boardgames', () => {})
