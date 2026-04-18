import { ref } from 'vue'
import { createBoardGame, copyBoardGame } from '@/data/boardgame'
import type { BoardGame } from '@/data/boardgame'
import { useBoardGamesStore } from '@/stores/boardgamestore'

const isEditOpen = ref(false)
const boardGameToBeEdited = ref(createBoardGame({ hidden: false }))
const editTaglist = ref('')

export function useEditBoardGameModal() {
  const store = useBoardGamesStore()

  const editOpen = () => (isEditOpen.value = true)
  const editClose = () => (isEditOpen.value = false)
  const changeBoardGameToBeEdited = (newBoardGame: BoardGame) => {
    boardGameToBeEdited.value = copyBoardGame(newBoardGame)

    editTaglist.value = ''
    boardGameToBeEdited.value.tags.forEach((element) => {
      editTaglist.value += element + ';'
    })
    editTaglist.value = editTaglist.value.slice(0, editTaglist.value.length - 1)
  }
  const editBoardgame = () => {
    boardGameToBeEdited.value.tags = editTaglist.value.split(';')
    store.updateBoardGame(boardGameToBeEdited.value)
  }
  return {
    isEditOpen,
    boardGameToBeEdited,
    editTaglist,
    editOpen,
    editClose,
    changeBoardGameToBeEdited,
    editBoardgame,
  }
}
