<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBoardgames } from '@/api_services/api_queries'
import { useAddBoardGameModal } from '@/composables/useAddBoardGameModal'
import BoardGameListItem from '@/components/CatalogueView/BoardGameListItem.vue'
import AddBoardGameModal from '../BoardGameOpWindows/AddBoardGameModal.vue'
import ToggleSwitch from 'primevue/toggleswitch'
import BoardGameCardItem from './BoardGameCardItem.vue'

const { open } = useAddBoardGameModal()

const visibleBoardGamesOnPage = 7
const visibleBoardGameCardsOnPage = 12

const { data: boardgames } = useBoardgames()

const visualViewActive = ref(false)
const page = ref(0)

const totalPages = computed(() => {
  if (!boardgames.value) return 0

  const len = boardgames.value.length

  return visualViewActive.value
    ? Math.ceil(len / visibleBoardGameCardsOnPage)
    : Math.ceil(len / visibleBoardGamesOnPage)
})

const visibleBoardGames = computed(() => {
  if (!boardgames.value) return []

  const start = visualViewActive.value
    ? page.value * visibleBoardGameCardsOnPage
    : page.value * visibleBoardGamesOnPage

  const end = visualViewActive.value
    ? start + visibleBoardGameCardsOnPage
    : start + visibleBoardGamesOnPage

  return boardgames.value.slice(start, end)
})

function getStartingPage() {
  page.value = 0
}

function getEndingPage() {
  page.value = Math.max(totalPages.value - 1, 0)
}

function getPreviousPage() {
  if (page.value == 0) page.value = totalPages.value - 1
  else page.value--
}

function getNextPage() {
  if (page.value == totalPages.value - 1) page.value = 0
  else page.value++
}

function showAddModal() {
  open()
}
</script>

<template>
  <div>
    <div class="flex min-h-screen flex-col items-center justify-between p-8">
      <div
        v-if="visualViewActive === false"
        class="flex w-11/12 flex-col gap-y-4 overflow-y-scroll"
      >
        <div class="boardgameListItem" v-for="boardgame in visibleBoardGames" :key="boardgame.id">
          <BoardGameListItem :boardgame="boardgame" />
        </div>
      </div>
      <div
        v-if="visualViewActive === true"
        class="flex w-11/12 flex-row flex-wrap justify-center gap-5"
      >
        <div v-for="boardgame in visibleBoardGames" :key="boardgame.id">
          <BoardGameCardItem :boardgame="boardgame" />
        </div>
      </div>
      <div class="flex w-11/12 flex-col items-center justify-evenly gap-4 pt-6 lg:flex-row">
        <div>
          <button
            id="addButton"
            class="rounded-lg bg-slate-500 px-2 py-0.5 text-xl text-slate-200 hover:bg-slate-600 active:bg-slate-800"
            @click="showAddModal"
          >
            + Add boardgame
          </button>
        </div>
        <div class="flex flex-row gap-x-3 text-xl">
          <button
            class="rounded-lg bg-orange-300 px-2 py-0.5 hover:bg-orange-500 active:bg-orange-600"
            @click="getStartingPage"
          >
            &lt;&lt;
          </button>
          <button
            class="rounded-lg bg-orange-300 px-2 py-0.5 hover:bg-orange-500 active:bg-orange-600"
            @click="getPreviousPage"
          >
            &lt;
          </button>
          <div>{{ page + 1 }} / {{ totalPages }}</div>
          <button
            class="rounded-lg bg-orange-300 px-2 py-0.5 hover:bg-orange-500 active:bg-orange-600"
            @click="getNextPage"
          >
            &gt;
          </button>
          <button
            class="rounded-lg bg-orange-300 px-2 py-0.5 hover:bg-orange-500 active:bg-orange-600"
            @click="getEndingPage"
          >
            &gt;&gt;
          </button>
        </div>
        <div class="flex flex-row items-center gap-x-3">
          <div class="primevue-scope">
            <div>Tabular view</div>
            <ToggleSwitch v-model="visualViewActive" />
            <div>Visual view</div>
          </div>
        </div>
      </div>
    </div>

    <AddBoardGameModal />
  </div>
</template>

<style lang="css" scoped>
.primevue-scope {
  all: revert;
  display: flex;
  flex-direction: row;
  column-gap: calc(var(--spacing) * 3);
}
</style>
