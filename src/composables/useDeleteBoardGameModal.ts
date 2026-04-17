import { ref } from 'vue'
import { createBoardGame } from '@/data/boardgame'
import { useBoardGamesStore } from '@/stores/boardgamestore'
import type { BoardGame } from '@/data/boardgame'

const isDeleteOpen = ref(false)
const boardgameToBeDeleted = ref(createBoardGame({ hidden: false }))

export function useDeleteBoardGameModal() {
  const store = useBoardGamesStore()

  const deleteOpen = () => (isDeleteOpen.value = true)
  const deleteClose = () => (isDeleteOpen.value = false)
  const changeBoardgameToBeDeleted = (newBoardgame: BoardGame) =>
    (boardgameToBeDeleted.value = newBoardgame)
  const deleteBoardgame = () => store.deleteBoardGame(boardgameToBeDeleted.value)
  return {
    isDeleteOpen,
    boardgameToBeDeleted,
    deleteOpen,
    deleteClose,
    changeBoardgameToBeDeleted,
    deleteBoardgame,
  }
}
