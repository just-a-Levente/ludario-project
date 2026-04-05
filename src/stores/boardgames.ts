import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { BoardGame } from '../data/boardgame.ts'

export const useBoardGamesStore = defineStore('boardgames', () => {
  /*   State   */
  const boardgames = ref<BoardGame[]>([])
  let lastID: number = 0

  /*   Getters   */
  const numberOfBoardGames = computed(() => boardgames.value.length)

  /*   Functions   */
  function getLastID(): number {
    const previousLastID = lastID
    lastID++
    return previousLastID
  }

  function getBoardGameByID(gameID: number) {
    return boardgames.value.filter((boardgame) => boardgame.getID() === gameID)[0]
  }

  function addBoardGame(newBoardGame: BoardGame) {
    boardgames.value.push(newBoardGame)
  }

  function updateBoardGame(updatedBoardGame: BoardGame) {
    const index = boardgames.value.findIndex(
      (boardgame) => boardgame.getID() === updatedBoardGame.getID(),
    )
    if (index !== -1) boardgames.value[index] = updatedBoardGame
  }

  function deleteBoardGame(deletedBoardgame: BoardGame) {
    boardgames.value = boardgames.value.filter(
      (boardgame) => boardgame.getID() !== deletedBoardgame.getID(),
    )
  }

  return {
    boardgames,
    numberOfBoardGames,
    getLastID,
    getBoardGameByID,
    addBoardGame,
    updateBoardGame,
    deleteBoardGame,
  }
})
