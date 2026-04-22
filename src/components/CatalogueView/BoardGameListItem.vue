<script setup lang="ts">
import { useRouter } from 'vue-router'
import { createBoardGame } from '@/data/boardgame'
import DeleteBoardGameModal from '../BoardGameOpWindows/DeleteBoardGameModal.vue'
import EditBoardGameModal from '../BoardGameOpWindows/EditBoardGameModal.vue'
import { useDeleteBoardGameModal } from '@/composables/useDeleteBoardGameModal'
import { useEditBoardGameModal } from '@/composables/useEditBoardGameModal'
import { useCookieManager } from '@/composables/useCookieManager'

const props = defineProps({
  boardgame: createBoardGame,
})

const { deleteOpen, changeBoardgameToBeDeleted } = useDeleteBoardGameModal()
const { editOpen, changeBoardGameToBeEdited } = useEditBoardGameModal()
const router = useRouter()
const cookieManager = useCookieManager()

function openDetailModal() {
  if (props.boardgame === undefined) return

  const recentBoardgameIDs = cookieManager.readCookie<number[]>('recentBoardgames')
  if (recentBoardgameIDs === null) {
    const newBoardgameIDList = [props.boardgame.id]
    cookieManager.writeCookie('recentBoardgames', newBoardgameIDList, 7)
  } else {
    if (recentBoardgameIDs.length >= 15) recentBoardgameIDs.pop()

    recentBoardgameIDs.unshift(props.boardgame.id)
    cookieManager.writeCookie('recentBoardgames', recentBoardgameIDs, 7)
  }

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
  <div
    data-testid="boardgame-item"
    class="flex flex-col items-center justify-between bg-mauve-200 p-4 text-lg sm:flex-row sm:text-2xl"
  >
    <div class="text-center sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap">
      {{ props.boardgame?.name }} - {{ props.boardgame?.producer }} -
      {{ props.boardgame?.numberOfCopies }} copies - {{ props.boardgame?.minNumberOfPlayers }}-{{
        props.boardgame?.maxNumberOfPlayers
      }}
      players
    </div>

    <div class="flex shrink-0 flex-row items-center gap-x-2">
      <button data-testid="detail-button" @click="openDetailModal">
        <img src="/src/assets/icons/details_icon.png" alt="Details" class="w-10" />
      </button>
      <button data-testid="edit-button" @click="openEditModal">
        <img src="/src/assets/icons/edit_icon.png" alt="Edit" class="w-10" />
      </button>
      <button data-testid="delete-button" @click="openDeleteModal">
        <img src="/src/assets/icons/delete_icon.png" alt="Delete" class="w-10" />
      </button>
    </div>

    <DeleteBoardGameModal />
    <EditBoardGameModal />
  </div>
</template>
