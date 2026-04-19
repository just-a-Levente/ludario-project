<script setup lang="ts">
import { ref } from 'vue'
import { useEditBoardGameModal } from '@/composables/useEditBoardGameModal'

const { isEditOpen, editClose, boardGameToBeEdited, editBoardgame, editTaglist } =
  useEditBoardGameModal()

const errors = ref({
  name: '',
  producer: '',
  description: '',
  price: '',
  numberOfCopies: '',
  minNumberOfPlayers: '',
  maxNumberOfPlayers: '',
  playerCount: '',
  thumbnailURL: '',
  tags: '',
})
const emptyErrors = ref({
  name: '',
  producer: '',
  description: '',
  price: '',
  numberOfCopies: '',
  minNumberOfPlayers: '',
  maxNumberOfPlayers: '',
  playerCount: '',
  thumbnailURL: '',
  tags: '',
})

function validateInput() {
  errors.value = {
    name: '',
    producer: '',
    description: '',
    price: '',
    numberOfCopies: '',
    minNumberOfPlayers: '',
    maxNumberOfPlayers: '',
    playerCount: '',
    thumbnailURL: '',
    tags: '',
  }

  if (boardGameToBeEdited.value.name == '') errors.value.name = 'Name required'
  if (boardGameToBeEdited.value.producer == '') errors.value.producer = 'Producer required'
  if (boardGameToBeEdited.value.description == '') errors.value.description = 'Description required'
  if (boardGameToBeEdited.value.price == 0) errors.value.price = 'Price required'
  if (boardGameToBeEdited.value.numberOfCopies <= 0)
    errors.value.numberOfCopies = 'Must be positive integer'
  if (boardGameToBeEdited.value.minNumberOfPlayers <= 0)
    errors.value.minNumberOfPlayers = 'Must be positive integer'
  if (boardGameToBeEdited.value.maxNumberOfPlayers <= 0)
    errors.value.maxNumberOfPlayers = 'Must be positive integer'
  if (boardGameToBeEdited.value.minNumberOfPlayers > boardGameToBeEdited.value.maxNumberOfPlayers)
    errors.value.playerCount = 'Minimum count must be <= maximum count'
  if (editTaglist.value == '') errors.value.tags = 'Tags required'
  if (boardGameToBeEdited.value.thumbnailURL == '') errors.value.thumbnailURL = 'Photo URL required'

  // this feels bad
  return JSON.stringify(emptyErrors.value) === JSON.stringify(errors.value)
}

function closeOnBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) editClose()
}

function editSelectedBoardgame() {
  if (!validateInput()) return

  editBoardgame()
  editClose()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-show="isEditOpen"
      @click="closeOnBackdropClick"
      class="justify-cneter fixed inset-0 z-1000 flex items-center justify-center backdrop-brightness-75"
    >
      <div
        class="flex h-3/4 w-2/5 flex-col gap-y-3 overflow-y-scroll rounded-lg border-4 border-mauve-500 bg-slate-200 p-3 text-lg"
      >
        <span>Name:</span>
        <input
          type="text"
          v-model="boardGameToBeEdited.name"
          class="rounded-lg bg-white p-2"
          placeholder="Enter name"
        />
        <span v-show="errors.name" class="text-sm text-orange-600">{{ errors.name }}</span>

        <span>Producer:</span>
        <input
          type="text"
          v-model="boardGameToBeEdited.producer"
          class="rounded-lg bg-white p-2"
          placeholder="Enter producer"
        />
        <span v-show="errors.producer" class="text-sm text-orange-600">{{ errors.producer }}</span>

        <span>Description:</span>
        <textarea
          v-model="boardGameToBeEdited.description"
          class="rounded-lg bg-white p-2"
          placeholder="Enter description"
        />
        <span v-show="errors.description" class="text-sm text-orange-600">{{
          errors.description
        }}</span>

        <span>Price:</span>
        <input
          type="text"
          v-model="boardGameToBeEdited.price"
          class="rounded-lg bg-white p-2"
          placeholder="Enter price"
        />
        <span v-show="errors.price" class="text-sm text-orange-600">{{ errors.price }}</span>

        <span>Number of copies:</span>
        <input
          type="number"
          v-model="boardGameToBeEdited.numberOfCopies"
          class="rounded-lg bg-white p-2"
          placeholder="Enter number of copies"
        />
        <span v-show="errors.numberOfCopies" class="text-sm text-orange-600">{{
          errors.numberOfCopies
        }}</span>

        <span>Number of players:</span>
        <div class="flex flex-col items-center gap-y-2">
          <div class="flex flex-row justify-evenly">
            <div class="flex flex-col items-center">
              <span>Min</span>
              <input
                type="number"
                v-model="boardGameToBeEdited.minNumberOfPlayers"
                class="w-auto rounded-lg bg-white"
              />
              <span v-show="errors.minNumberOfPlayers" class="text-sm text-orange-600">{{
                errors.minNumberOfPlayers
              }}</span>
            </div>
            <div class="flex flex-col items-center">
              <span>Max</span>
              <input
                type="number"
                v-model="boardGameToBeEdited.maxNumberOfPlayers"
                class="w-auto rounded-lg bg-white"
              />
              <span v-show="errors.maxNumberOfPlayers" class="text-sm text-orange-600">{{
                errors.maxNumberOfPlayers
              }}</span>
            </div>
          </div>
          <span v-show="errors.playerCount" class="text-sm text-orange-600">{{
            errors.playerCount
          }}</span>
        </div>

        <span>Tags:</span>
        <input
          type="text"
          v-model="editTaglist"
          class="rounded-lg bg-white p-2"
          placeholder="Enter tags (separated by ;)"
        />
        <span v-show="errors.tags" class="text-sm text-orange-600">{{ errors.tags }}</span>

        <span>Thumbnail URL:</span>
        <input
          type="text"
          v-model="boardGameToBeEdited.thumbnailURL"
          class="rounded-lg bg-white p-2"
          placeholder="Enter image URL"
        />
        <span v-show="errors.thumbnailURL" class="text-sm text-orange-600">{{
          errors.thumbnailURL
        }}</span>
        <img v-bind:src="boardGameToBeEdited.thumbnailURL" />

        <button
          @click="editSelectedBoardgame"
          class="rounded-lg bg-orange-300 px-2 py-0.5 hover:bg-orange-500 active:bg-orange-600"
        >
          Edit board game
        </button>
      </div>
    </div>
  </Teleport>
</template>
