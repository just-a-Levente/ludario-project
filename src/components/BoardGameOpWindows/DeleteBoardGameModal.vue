<script setup lang="ts">
import { useDeleteBoardGameModal } from '@/composables/useDeleteBoardGameModal'

const { isDeleteOpen, deleteClose, boardgameToBeDeleted, deleteBoardgame } =
  useDeleteBoardGameModal()

function closeOnBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) deleteClose()
}

function deleteSelectedBoardgame() {
  deleteBoardgame()
  deleteClose()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-show="isDeleteOpen"
      @click="closeOnBackdropClick"
      class="fixed inset-0 z-1000 flex items-center justify-center backdrop-brightness-90"
    >
      <div
        data-testid="deleteModal"
        class="flex aspect-2/1 flex-col items-center gap-y-6 overflow-y-scroll rounded-lg border-4 border-mauve-500 bg-slate-200 p-6 text-lg"
      >
        <div class="w-full">Do you want to delete {{ boardgameToBeDeleted.name }}?</div>
        <div class="flex w-full flex-row justify-around">
          <button
            @click.prevent="deleteClose"
            class="rounded-xl bg-slate-500 px-3 py-2 text-mauve-200"
          >
            No
          </button>
          <button
            data-testid="confirmDeleteButton"
            @click.prevent="deleteSelectedBoardgame"
            class="rounded-xl bg-orange-600 px-3 py-2 text-mauve-200"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
