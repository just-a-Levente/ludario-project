<script setup lang="ts">
import { useRouter } from 'vue-router'
import { createBoardGame } from '@/data/boardgame'
import DeleteBoardGameModal from '../BoardGameOpWindows/DeleteBoardGameModal.vue'
import EditBoardGameModal from '../BoardGameOpWindows/EditBoardGameModal.vue'
import { useDeleteBoardGameModal } from '@/composables/useDeleteBoardGameModal'
import { useEditBoardGameModal } from '@/composables/useEditBoardGameModal'
import { useCookieManager } from '@/composables/useCookieManager'
import { useUserStore } from '@/stores/userstore'

const detailsUrl = '/details_icon.png?url'
const editUrl = '/edit_icon.png?url'
const deleteUrl = '/delete_icon.png?url'

const props = defineProps({
  boardgame: createBoardGame,
})

const { deleteOpen, changeBoardgameToBeDeleted } = useDeleteBoardGameModal()
const { editOpen, changeBoardGameToBeEdited } = useEditBoardGameModal()
const router = useRouter()
const cookieManager = useCookieManager()
const userStore = useUserStore()

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
    class="flex h-72 w-56 flex-1 flex-col items-center justify-between bg-mauve-200 p-4 text-xl sm:w-46"
  >
    <img :src="props.boardgame?.thumbnailURL" alt="thumbnail image" class="w-36 object-cover" />

    <div class="w-full min-w-0 truncate text-center">
      {{ props.boardgame?.name }}
    </div>

    <div class="flex shrink-0 flex-row items-center gap-x-2">
      <button @click="openDetailModal">
        <img :src="detailsUrl" alt="Details" class="w-10" />
      </button>
      <button v-if="userStore.isAdmin()" @click="openEditModal">
        <img :src="editUrl" class="w-10" />
      </button>
      <button v-if="userStore.isAdmin()" @click="openDeleteModal">
        <img :src="deleteUrl" class="w-10" />
      </button>
    </div>

    <DeleteBoardGameModal />
    <EditBoardGameModal />
  </div>
</template>
