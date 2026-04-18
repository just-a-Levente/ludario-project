<script setup lang="ts">
import { createBoardGame } from '@/data/boardgame'
import DetailBoardGameModal from '../BoardGameOpWindows/DetailBoardGameModal.vue'
import DeleteBoardGameModal from '../BoardGameOpWindows/DeleteBoardGameModal.vue'
import EditBoardGameModal from '../BoardGameOpWindows/EditBoardGameModal.vue'
import { useDetailBoardGameModal } from '@/composables/useDetailBoardGameModal'
import { useDeleteBoardGameModal } from '@/composables/useDeleteBoardGameModal'
import { useEditBoardGameModal } from '@/composables/useEditBoardGameModal'

const props = defineProps({
  boardgame: createBoardGame,
})

const { detailOpen, changeDetailedBoardgame } = useDetailBoardGameModal()
const { deleteOpen, changeBoardgameToBeDeleted } = useDeleteBoardGameModal()
const { editOpen, changeBoardGameToBeEdited } = useEditBoardGameModal()

function openDetailModal() {
  if (props.boardgame === undefined) return

  changeDetailedBoardgame(props.boardgame)
  detailOpen()
}

function openDeleteModal() {
  if (props.boardgame === undefined) return

  changeBoardgameToBeDeleted(props.boardgame)
  deleteOpen()
}

function openEditModal() {
  if (props.boardgame === undefined) return

  changeBoardGameToBeEdited(props.boardgame)
  editOpen()
}
</script>

<template>
  <div class="flex flex-row items-center justify-between bg-mauve-200 p-4 text-2xl">
    <div class="overflow-hidden text-ellipsis whitespace-nowrap">
      {{ props.boardgame?.name }} - {{ props.boardgame?.producer }} -
      {{ props.boardgame?.numberOfCopies }} copies - {{ props.boardgame?.minNumberOfPlayers }}-{{
        props.boardgame?.maxNumberOfPlayers
      }}
      players
    </div>

    <div class="flex shrink-0 flex-row items-center gap-x-2">
      <button @click="openDetailModal">
        <img src="/src/assets/icons/details_icon.png" alt="Details" class="w-10" />
      </button>
      <button @click="openEditModal">
        <img src="/src/assets/icons/edit_icon.png" alt="Edit" class="w-10" />
      </button>
      <button @click="openDeleteModal">
        <img src="/src/assets/icons/delete_icon.png" alt="Delete" class="w-10" />
      </button>
    </div>

    <DetailBoardGameModal />
    <DeleteBoardGameModal />
    <EditBoardGameModal />
  </div>
</template>
