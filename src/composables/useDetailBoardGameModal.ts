import { ref } from 'vue'
import { createBoardGame } from '@/data/boardgame'
import type { BoardGame } from '@/data/boardgame'

const isDetailOpen = ref(false)
const detailedBoardgame = ref(createBoardGame({ hidden: false }))

export function useDetailBoardGameModal() {
  const detailOpen = () => (isDetailOpen.value = true)
  const detailClose = () => (isDetailOpen.value = false)
  const changeDetailedBoardgame = (newBoardgame: BoardGame) =>
    (detailedBoardgame.value = newBoardgame)
  return { isDetailOpen, detailedBoardgame, detailOpen, detailClose, changeDetailedBoardgame }
}
