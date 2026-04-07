<script setup lang="ts">
import { ref } from 'vue'
import { useAddBoardGameModal } from '@/composables/useAddBoardGameModal'
import { createBoardGame } from '@/data/boardgame'
import { useBoardGamesStore } from '@/stores/boardgames'

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

function closeOnBackdropClick(e) {
  if (e.target === e.currentTarget) close()
}

function validateInputAndSend() {
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

  store.addBoardGame(newBoardGame)
  close()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-show="isOpen"
      @click="closeOnBackdropClick"
      class="fixed inset-0 z-1000 flex items-center justify-center backdrop-brightness-50"
    >
      <div
        class="flex h-3/4 w-2/5 flex-col gap-y-3 overflow-y-scroll rounded-lg border-4 border-mauve-500 bg-slate-200 p-3 text-lg"
      >
        <span>Name:</span>
        <input
          type="text"
          v-model="emptyBoardGame.name"
          class="rounded-lg bg-white p-2"
          placeholder="Enter name"
        />

        <span>Producer:</span>
        <input
          type="text"
          v-model="emptyBoardGame.producer"
          class="rounded-lg bg-white p-2"
          placeholder="Enter producer"
        />

        <span>Description:</span>
        <textarea
          v-model="emptyBoardGame.description"
          class="rounded-lg bg-white p-2"
          placeholder="Enter description"
        />

        <span>Price:</span>
        <input
          type="text"
          v-model="emptyBoardGame.price"
          class="rounded-lg bg-white p-2"
          placeholder="Enter price"
        />

        <span>Number of copies:</span>
        <input
          type="number"
          v-model="emptyBoardGame.numberOfCopies"
          class="rounded-lg bg-white p-2"
          placeholder="Enter number of copies"
        />

        <span>Number of players:</span>
        <div class="flex flex-row justify-evenly">
          <div class="flex flex-col items-center">
            <span>Min</span>
            <input
              type="number"
              v-model="emptyBoardGame.minNumberOfPlayers"
              class="w-auto rounded-lg bg-white"
            />
          </div>
          <div class="flex flex-col items-center">
            <span>Max</span>
            <input
              type="number"
              v-model="emptyBoardGame.maxNumberOfPlayers"
              class="w-auto rounded-lg bg-white"
            />
          </div>
        </div>

        <span>Tags:</span>
        <input
          type="text"
          v-model="taglist"
          class="rounded-lg bg-white p-2"
          placeholder="Enter tags (separated by ;)"
        />

        <span>Thumbnail URL:</span>
        <input
          type="text"
          v-model="emptyBoardGame.thumbnailURL"
          class="rounded-lg bg-white p-2"
          placeholder="Enter image URL"
        />
        <img v-bind:src="emptyBoardGame.thumbnailURL" />

        <button
          @click="validateInputAndSend"
          class="rounded-lg bg-orange-300 px-2 py-0.5 hover:bg-orange-500 active:bg-orange-600"
        >
          Add board game
        </button>
      </div>
    </div>
  </Teleport>
</template>
