import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { BoardGame } from '@/data/boardgame.ts'

export const useBoardGamesStore = defineStore('boardgames', () => {
  /*   State   */
  const boardgames = ref<BoardGame[]>([])
  let lastID: number = 0

  /*   Getters   */
  const numberOfBoardGames = computed(() => boardgames.value.length)

  /*   Functions   */
  function resetStore(): void {
    lastID = 0
    boardgames.value = []
  }

  function getLastID(): number {
    const previousLastID = lastID
    lastID++
    return previousLastID
  }

  function getBoardGameByID(gameID: number | undefined) {
    return boardgames.value.find((boardgame) => boardgame.id === gameID)
  }

  function addBoardGame(newBoardGame: BoardGame) {
    boardgames.value.push(newBoardGame)
  }

  function updateBoardGame(updatedBoardGame: BoardGame) {
    const index = boardgames.value.findIndex((boardgame) => boardgame.id === updatedBoardGame.id)
    if (index !== -1) boardgames.value[index] = updatedBoardGame
  }

  function deleteBoardGame(deletedBoardgame: BoardGame) {
    boardgames.value = boardgames.value.filter((boardgame) => boardgame.id !== deletedBoardgame.id)
  }

  return {
    boardgames,
    numberOfBoardGames,
    getLastID,
    getBoardGameByID,
    addBoardGame,
    updateBoardGame,
    deleteBoardGame,
    resetStore,
  }
})
