<script setup lang="ts">
import { ref } from 'vue'
import { useAddBoardGameModal } from '@/composables/useAddBoardGameModal'

const { isOpen, errors, close, submit } = useAddBoardGameModal()

const form = ref({
  name: '',
  producer: '',
  description: '',
  price: '',
  numberOfCopies: '',
  minNumberOfPlayers: '',
  maxNumberOfPlayers: '',
  thumbnailURL: '',
})
const taglist = ref('')

function closeOnBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) close()
}

function sendNewBoardGame() {
  submit(form.value, taglist.value)

  form.value = {
    name: '',
    producer: '',
    description: '',
    price: '',
    numberOfCopies: '',
    minNumberOfPlayers: '',
    maxNumberOfPlayers: '',
    thumbnailURL: '',
  }

  taglist.value = ''
}
</script>

<template>
  <Teleport to="body">
    <div
      v-show="isOpen"
      @click="closeOnBackdropClick"
      class="fixed inset-0 z-1000 flex items-center justify-center backdrop-brightness-30"
    >
      <div
        class="flex aspect-1/2 h-128 flex-col gap-y-3 overflow-y-scroll rounded-lg border-4 border-mauve-500 bg-slate-200 p-3 text-lg sm:aspect-4/5 lg:aspect-5/4"
      >
        <span>Name:</span>
        <input
          id="addNameField"
          type="text"
          v-model="form.name"
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
          v-model="form.producer"
          class="rounded-lg bg-white p-2"
          placeholder="Enter producer"
        />
        <span id="addProducerError" v-show="errors.producer" class="text-sm text-orange-600">{{
          errors.producer
        }}</span>

        <span>Description:</span>
        <textarea
          id="addDescriptionField"
          v-model="form.description"
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
          v-model="form.price"
          class="rounded-lg bg-white p-2"
          placeholder="Enter price"
        />
        <span id="addPriceError" v-show="errors.price" class="text-sm text-orange-600">{{
          errors.price
        }}</span>

        <span>Number of copies:</span>
        <input
          id="addCopiesField"
          type="text"
          v-model="form.numberOfCopies"
          class="rounded-lg bg-white p-2"
          placeholder="Enter number of copies"
        />
        <span id="addCopiesError" v-show="errors.numberOfCopies" class="text-sm text-orange-600">{{
          errors.numberOfCopies
        }}</span>

        <span>Number of players:</span>
        <div class="flex flex-col items-center gap-y-2">
          <div class="flex flex-col justify-evenly lg:flex-row">
            <div class="flex flex-col items-center">
              <span>Min</span>
              <input
                id="addMinPlayerField"
                type="text"
                v-model="form.minNumberOfPlayers"
                class="w-2/3 rounded-lg bg-white"
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
                type="text"
                v-model="form.maxNumberOfPlayers"
                class="w-2/3 rounded-lg bg-white"
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
          v-model="form.thumbnailURL"
          class="rounded-lg bg-white p-2"
          placeholder="Enter image URL"
        />
        <span id="addThumbnailError" v-show="errors.thumbnailURL" class="text-sm text-orange-600">{{
          errors.thumbnailURL
        }}</span>
        <img v-bind:src="form.thumbnailURL" />

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
