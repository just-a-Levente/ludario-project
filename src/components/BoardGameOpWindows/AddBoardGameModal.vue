<script setup lang="ts">
import { ref } from 'vue'
import { useAddBoardGameModal } from '@/composables/useAddBoardGameModal'
import { createBoardGame } from '@/data/boardgame'
import { useBoardGamesStore } from '@/stores/boardgamestore'

const store = useBoardGamesStore()
const { isOpen, close } = useAddBoardGameModal()

const emptyBoardGame = ref(
  createBoardGame({
    hidden: false,
    thumbnailURL: '',
    stars: [],
  }),
)
const taglist = ref('')
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

function closeOnBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) close()
}

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

  if (emptyBoardGame.value.name == '') errors.value.name = 'Name required'
  if (emptyBoardGame.value.producer == '') errors.value.producer = 'Producer required'
  if (emptyBoardGame.value.description == '') errors.value.description = 'Description required'
  if (isNaN(emptyBoardGame.value.price) || emptyBoardGame.value.price <= 0)
    errors.value.price = 'Price required'
  if (emptyBoardGame.value.numberOfCopies <= 0)
    errors.value.numberOfCopies = 'Must be positive integer'
  if (emptyBoardGame.value.minNumberOfPlayers <= 0)
    errors.value.minNumberOfPlayers = 'Must be positive integer'
  if (emptyBoardGame.value.maxNumberOfPlayers <= 0)
    errors.value.maxNumberOfPlayers = 'Must be positive integer'
  if (emptyBoardGame.value.minNumberOfPlayers > emptyBoardGame.value.maxNumberOfPlayers)
    errors.value.playerCount = 'Minimum count must be <= maximum count'
  if (taglist.value == '') errors.value.tags = 'Tags required'
  if (emptyBoardGame.value.thumbnailURL == '') errors.value.thumbnailURL = 'Photo URL required'

  // this feels bad
  return JSON.stringify(emptyErrors.value) === JSON.stringify(errors.value)
}

function sendNewBoardGame() {
  if (!validateInput()) return

  const newID = store.getLastID()
  const newBoardGame = createBoardGame({
    id: newID,
    hidden: emptyBoardGame.value.hidden,
    name: emptyBoardGame.value.name,
    producer: emptyBoardGame.value.producer,
    description: emptyBoardGame.value.description,
    price: emptyBoardGame.value.price,
    numberOfCopies: emptyBoardGame.value.numberOfCopies,
    minNumberOfPlayers: emptyBoardGame.value.minNumberOfPlayers,
    maxNumberOfPlayers: emptyBoardGame.value.maxNumberOfPlayers,
    thumbnailURL: emptyBoardGame.value.thumbnailURL,
    tags: taglist.value.split(';'),
    stars: emptyBoardGame.value.stars,
  })

  emptyBoardGame.value.name = ''
  emptyBoardGame.value.producer = ''
  emptyBoardGame.value.description = ''
  emptyBoardGame.value.price = 0
  emptyBoardGame.value.numberOfCopies = 0
  emptyBoardGame.value.minNumberOfPlayers = 0
  emptyBoardGame.value.maxNumberOfPlayers = 0
  taglist.value = ''
  emptyBoardGame.value.thumbnailURL = ''

  store.addBoardGame(newBoardGame)
  // empty form and errors
  // emit()
  close()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-show="isOpen"
      @click="closeOnBackdropClick"
      class="fixed inset-0 z-1000 flex items-center justify-center backdrop-brightness-75"
    >
      <div
        class="flex h-3/4 w-2/5 flex-col gap-y-3 overflow-y-scroll rounded-lg border-4 border-mauve-500 bg-slate-200 p-3 text-lg"
      >
        <span>Name:</span>
        <input
          id="addNameField"
          type="text"
          v-model="emptyBoardGame.name"
          class="rounded-lg bg-white p-2"
          placeholder="Enter name"
        />
        <span id="addNameError" v-show="errors.name" class="text-sm text-orange-600">{{
          errors.name
        }}</span>

        <span>Producer:</span>
        <input
          id="addProducerField"
          type="text"
          v-model="emptyBoardGame.producer"
          class="rounded-lg bg-white p-2"
          placeholder="Enter producer"
        />
        <span id="addProducerError" v-show="errors.producer" class="text-sm text-orange-600">{{
          errors.producer
        }}</span>

        <span>Description:</span>
        <textarea
          id="addDescriptionField"
          v-model="emptyBoardGame.description"
          class="rounded-lg bg-white p-2"
          placeholder="Enter description"
        />
        <span
          id="addDescriptionError"
          v-show="errors.description"
          class="text-sm text-orange-600"
          >{{ errors.description }}</span
        >

        <span>Price:</span>
        <input
          id="addPriceField"
          type="text"
          v-model="emptyBoardGame.price"
          class="rounded-lg bg-white p-2"
          placeholder="Enter price"
        />
        <span id="addPriceError" v-show="errors.price" class="text-sm text-orange-600">{{
          errors.price
        }}</span>

        <span>Number of copies:</span>
        <input
          id="addCopiesField"
          type="number"
          v-model="emptyBoardGame.numberOfCopies"
          class="rounded-lg bg-white p-2"
          placeholder="Enter number of copies"
        />
        <span id="addCopiesError" v-show="errors.numberOfCopies" class="text-sm text-orange-600">{{
          errors.numberOfCopies
        }}</span>

        <span>Number of players:</span>
        <div class="flex flex-col items-center gap-y-2">
          <div class="flex flex-row justify-evenly">
            <div class="flex flex-col items-center">
              <span>Min</span>
              <input
                id="addMinPlayerField"
                type="number"
                v-model="emptyBoardGame.minNumberOfPlayers"
                class="w-auto rounded-lg bg-white"
              />
              <span
                id="addMinPlayerError"
                v-show="errors.minNumberOfPlayers"
                class="text-sm text-orange-600"
                >{{ errors.minNumberOfPlayers }}</span
              >
            </div>
            <div class="flex flex-col items-center">
              <span>Max</span>
              <input
                id="addMaxPlayerField"
                type="number"
                v-model="emptyBoardGame.maxNumberOfPlayers"
                class="w-auto rounded-lg bg-white"
              />
              <span
                id="addMaxPlayerError"
                v-show="errors.maxNumberOfPlayers"
                class="text-sm text-orange-600"
                >{{ errors.maxNumberOfPlayers }}</span
              >
            </div>
          </div>
          <span
            id="addPlayerCountError"
            v-show="errors.playerCount"
            class="text-sm text-orange-600"
            >{{ errors.playerCount }}</span
          >
        </div>

        <span>Tags:</span>
        <input
          id="addTagsField"
          type="text"
          v-model="taglist"
          class="rounded-lg bg-white p-2"
          placeholder="Enter tags (separated by ;)"
        />
        <span id="addTagsError" v-show="errors.tags" class="text-sm text-orange-600">{{
          errors.tags
        }}</span>

        <span>Thumbnail URL:</span>
        <input
          id="addThumbnailField"
          type="text"
          v-model="emptyBoardGame.thumbnailURL"
          class="rounded-lg bg-white p-2"
          placeholder="Enter image URL"
        />
        <span id="addThumbnailError" v-show="errors.thumbnailURL" class="text-sm text-orange-600">{{
          errors.thumbnailURL
        }}</span>
        <img v-bind:src="emptyBoardGame.thumbnailURL" />

        <button
          id="addNewBoardgameButton"
          @click="sendNewBoardGame"
          class="rounded-lg bg-orange-300 px-2 py-0.5 hover:bg-orange-500 active:bg-orange-600"
        >
          Add board game
        </button>
      </div>
    </div>
  </Teleport>
</template>
