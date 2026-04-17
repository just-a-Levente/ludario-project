<script setup lang="ts">
import { createBoardGame } from '@/data/boardgame'
import DetailBoardGameModal from '../BoardGameOpWindows/DetailBoardGameModal.vue'
import DeleteBoardGameModal from '../BoardGameOpWindows/DeleteBoardGameModal.vue'
import { useDetailBoardGameModal } from '@/composables/useDetailBoardGameModal'
import { useDeleteBoardGameModal } from '@/composables/useDeleteBoardGameModal'

const props = defineProps({
  boardgame: createBoardGame,
})

const currBoardgame = props.boardgame
const { detailOpen, changeDetailedBoardgame } = useDetailBoardGameModal()
const { deleteOpen, changeBoardgameToBeDeleted } = useDeleteBoardGameModal()

function openDetailModal() {
  if (currBoardgame === undefined) return

  changeDetailedBoardgame(currBoardgame)
  detailOpen()
}

function openDeleteModal() {
  if (currBoardgame === undefined) return

  changeBoardgameToBeDeleted(currBoardgame)
  deleteOpen()
}
</script>

<template>
  <div class="flex flex-row items-center justify-between bg-mauve-200 p-4 text-2xl">
    <div class="overflow-hidden text-ellipsis whitespace-nowrap">
      {{ currBoardgame?.name }} - {{ currBoardgame?.producer }} -
      {{ currBoardgame?.numberOfCopies }} copies - {{ currBoardgame?.minNumberOfPlayers }}-{{
        currBoardgame?.maxNumberOfPlayers
      }}
      players
    </div>

    <div class="flex shrink-0 flex-row items-center gap-x-2">
      <button @click="openDetailModal">
        <img src="/src/assets/icons/details_icon.png" alt="Details" class="w-10" />
      </button>
      <button>
        <img src="/src/assets/icons/edit_icon.png" alt="Edit" class="w-10" />
      </button>
      <button @click="openDeleteModal">
        <img src="/src/assets/icons/delete_icon.png" alt="Delete" class="w-10" />
      </button>
    </div>

    <DetailBoardGameModal />
    <DeleteBoardGameModal />
  </div>
</template>
