<script setup lang="ts">
import { useEditBoardGameModal } from '@/composables/useEditBoardGameModal'

const { isEditOpen, form, taglist, errors, editClose, submit } = useEditBoardGameModal()

function closeOnBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    editClose()
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      v-show="isEditOpen"
      @click="closeOnBackdropClick"
      class="fixed inset-0 z-1000 flex items-center justify-center backdrop-brightness-90"
    >
      <div
        data-testid="editModal"
        class="flex aspect-1/2 h-128 flex-col gap-y-3 overflow-y-scroll rounded-lg border-4 border-mauve-500 bg-slate-200 p-3 text-lg sm:aspect-4/5 lg:aspect-5/4"
      >
        <span>Name:</span>
        <input
          data-testid="editNameField"
          type="text"
          v-model="form.name"
          class="rounded-lg bg-white p-2"
          placeholder="Enter name"
        />
        <span data-testid="editNameError" v-show="errors.name" class="text-sm text-orange-600">{{
          errors.name
        }}</span>

        <span>Producer:</span>
        <input
          data-testid="editProducerField"
          type="text"
          v-model="form.producer"
          class="rounded-lg bg-white p-2"
          placeholder="Enter producer"
        />
        <span
          data-testid="editProducerError"
          v-show="errors.producer"
          class="text-sm text-orange-600"
          >{{ errors.producer }}</span
        >

        <span>Description:</span>
        <textarea
          data-testid="editDescriptionField"
          v-model="form.description"
          class="rounded-lg bg-white p-2"
          placeholder="Enter description"
        />
        <span
          data-testid="editDescriptionError"
          v-show="errors.description"
          class="text-sm text-orange-600"
          >{{ errors.description }}</span
        >

        <span>Price:</span>
        <input
          data-testid="editPriceField"
          type="text"
          v-model="form.price"
          class="rounded-lg bg-white p-2"
          placeholder="Enter price"
        />
        <span data-testid="editPriceError" v-show="errors.price" class="text-sm text-orange-600">{{
          errors.price
        }}</span>

        <span>Number of copies:</span>
        <input
          data-testid="editCopiesField"
          type="text"
          v-model="form.numberOfCopies"
          class="rounded-lg bg-white p-2"
          placeholder="Enter number of copies"
        />
        <span
          data-testid="editCopiesError"
          v-show="errors.numberOfCopies"
          class="text-sm text-orange-600"
          >{{ errors.numberOfCopies }}</span
        >

        <span>Number of players:</span>
        <div class="flex flex-col items-center gap-y-2">
          <div class="flex flex-col justify-evenly lg:flex-row">
            <div class="flex flex-col items-center">
              <span>Min</span>
              <input
                data-testid="editMinPlayerField"
                type="text"
                v-model="form.minNumberOfPlayers"
                class="w-2/3 rounded-lg bg-white"
              />
              <span
                data-testid="editMinPlayerError"
                v-show="errors.minNumberOfPlayers"
                class="text-sm text-orange-600"
                >{{ errors.minNumberOfPlayers }}</span
              >
            </div>
            <div class="flex flex-col items-center">
              <span>Max</span>
              <input
                data-testid="editMaxPlayerField"
                type="text"
                v-model="form.maxNumberOfPlayers"
                class="w-2/3 rounded-lg bg-white"
              />
              <span
                data-testid="editMaxPlayerError"
                v-show="errors.maxNumberOfPlayers"
                class="text-sm text-orange-600"
                >{{ errors.maxNumberOfPlayers }}</span
              >
            </div>
          </div>
          <span
            data-testid="editPlayerCountError"
            v-show="errors.playerCount"
            class="text-sm text-orange-600"
            >{{ errors.playerCount }}</span
          >
        </div>

        <span>Tags:</span>
        <input
          data-testid="editTagsField"
          type="text"
          v-model="taglist"
          class="rounded-lg bg-white p-2"
          placeholder="Enter tags (separated by ;)"
        />
        <span data-testid="editTagsError" v-show="errors.tags" class="text-sm text-orange-600">{{
          errors.tags
        }}</span>

        <span>Thumbnail URL:</span>
        <input
          data-testid="editThumbnailField"
          type="text"
          v-model="form.thumbnailURL"
          class="rounded-lg bg-white p-2"
          placeholder="Enter image URL"
        />
        <span
          data-testid="editThumbnailError"
          v-show="errors.thumbnailURL"
          class="text-sm text-orange-600"
          >{{ errors.thumbnailURL }}</span
        >
        <img v-bind:src="form.thumbnailURL" />

        <button
          data-testid="editBoardgameButton"
          @click="submit"
          class="rounded-lg bg-orange-300 px-2 py-0.5 hover:bg-orange-500 active:bg-orange-600"
        >
          Edit board game
        </button>
      </div>
    </div>
  </Teleport>
</template>
