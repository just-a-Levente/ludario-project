import { ref } from 'vue'
import { useDeleteBoardgame } from '@/api_services/api_mutations'
// import { createBoardGame } from '@/data/boardgame'
import type { BoardGame } from '@/data/boardgame'

const isDeleteOpen = ref(false)
// const boardgameToBeDeleted = ref(createBoardGame({ hidden: false }))
const boardgameToBeDeleted = ref<BoardGame | null>(null)

export function useDeleteBoardGameModal() {
  const { mutate: deleteMutation } = useDeleteBoardgame()

  const deleteOpen = () => (isDeleteOpen.value = true)

  const deleteClose = () => {
    isDeleteOpen.value = false
    boardgameToBeDeleted.value = null
  }

  const changeBoardgameToBeDeleted = (boardgame: BoardGame) =>
    (boardgameToBeDeleted.value = boardgame)

  const deleteBoardgame = () => {
    if (!boardgameToBeDeleted.value) return

    deleteMutation(boardgameToBeDeleted.value.id, {
      onSuccess: () => {
        deleteClose()
      },
    })
  }

  return {
    isDeleteOpen,
    boardgameToBeDeleted,
    deleteOpen,
    deleteClose,
    changeBoardgameToBeDeleted,
    deleteBoardgame,
  }
}
