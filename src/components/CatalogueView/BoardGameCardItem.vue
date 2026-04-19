<script setup lang="ts">
import { useRouter } from 'vue-router'
import { createBoardGame } from '@/data/boardgame'
import DeleteBoardGameModal from '../BoardGameOpWindows/DeleteBoardGameModal.vue'
import EditBoardGameModal from '../BoardGameOpWindows/EditBoardGameModal.vue'
import { useDeleteBoardGameModal } from '@/composables/useDeleteBoardGameModal'
import { useEditBoardGameModal } from '@/composables/useEditBoardGameModal'

const props = defineProps({
  boardgame: createBoardGame,
})

const { deleteOpen, changeBoardgameToBeDeleted } = useDeleteBoardGameModal()
const { editOpen, changeBoardGameToBeEdited } = useEditBoardGameModal()
const router = useRouter()

function openDetailModal() {
  if (props.boardgame === undefined) return

  router.push(`/dashboard/boardgames/${props.boardgame.id}`)
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
  <div class="flex h-72 w-46 flex-1 flex-col items-center justify-between bg-mauve-200 p-4 text-xl">
    <img :src="props.boardgame?.thumbnailURL" alt="thumbnail image" class="w-36 object-cover" />

    <div class="w-full min-w-0 truncate text-center">
      {{ props.boardgame?.name }}
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

    <DeleteBoardGameModal />
    <EditBoardGameModal />
  </div>
</template>
