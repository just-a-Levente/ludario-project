import { ref } from 'vue'
import { createBoardGame } from '@/data/boardgame'
import type { BoardGame } from '@/data/boardgame'

const isDetailOpen = ref(false)
const detailedBoardgame = ref(createBoardGame({ hidden: false }))
const tagList = ref('')

export function useDetailBoardGameModal() {
  const detailOpen = () => (isDetailOpen.value = true)
  const detailClose = () => (isDetailOpen.value = false)
  const changeDetailedBoardgame = (newBoardgame: BoardGame) => {
    detailedBoardgame.value = newBoardgame

    tagList.value = ''
    detailedBoardgame.value.tags.forEach((element) => {
      tagList.value += element + ', '
    })
    tagList.value = tagList.value.slice(0, tagList.value.length - 2)
  }
  return {
    isDetailOpen,
    detailedBoardgame,
    tagList,
    detailOpen,
    detailClose,
    changeDetailedBoardgame,
  }
}
