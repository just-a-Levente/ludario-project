<script setup lang="ts">
import { ref, computed, watch, watchEffect } from 'vue'
import { usePaginatedBoardgames } from '@/api_services/api_queries'
import { useAddBoardGameModal } from '@/composables/useAddBoardGameModal'
import { simulateOffline } from '@/api_services/api_connection_check'
import { syncQueue } from '@/api_services/api_mutations'
import { useQueryClient } from '@tanstack/vue-query'
import { setAddModalPaginationContext } from '@/composables/useAddBoardGameModal'
import BoardGameListItem from '@/components/CatalogueView/BoardGameListItem.vue'
import AddBoardGameModal from '../BoardGameOpWindows/AddBoardGameModal.vue'
import ToggleSwitch from 'primevue/toggleswitch'
import BoardGameCardItem from './BoardGameCardItem.vue'

const { open } = useAddBoardGameModal()
const queryClient = useQueryClient()

const visibleBoardGamesOnPage = 7
const visibleBoardGameCardsOnPage = 12

const visualViewActive = ref(false)
const page = ref(0)
const limit = computed(() =>
  visualViewActive.value ? visibleBoardGameCardsOnPage : visibleBoardGamesOnPage,
)
const offset = computed(() => page.value * limit.value)

const { data, isLoading } = usePaginatedBoardgames(offset, limit)

const items = computed(() => data.value?.items ?? [])

const totalPages = computed(() => {
  const total = data.value?.totalItems
  if (total == null) return 1

  return Math.max(1, Math.ceil(total / limit.value))
})

function getStartingPage() {
  page.value = 0
}

function getEndingPage() {
  page.value = Math.max(totalPages.value - 1, 0)
}

function getPreviousPage() {
  if (page.value > 0) page.value--
}

function getNextPage() {
  if (page.value < totalPages.value - 1) page.value++
}

function showAddModal() {
  open()
}

function toggleOfflineMode() {
  simulateOffline.value = !simulateOffline.value

  if (!simulateOffline.value) syncQueue(queryClient)
}

watch(limit, () => {
  page.value = 0
})

watch(totalPages, (newTotal) => {
  if (page.value >= newTotal) {
    page.value = Math.max(0, newTotal - 1)
  }
})

watchEffect(() => {
  setAddModalPaginationContext(offset.value, limit.value)
})
</script>

<template>
  <div>
    <div class="flex min-h-screen flex-col items-center justify-between p-8">
      <div class="flex flex-row gap-y-2 pb-3">
        <button
          class="rounded-lg px-2 py-0.5 text-xl text-slate-200"
          :class="[
            simulateOffline
              ? 'bg-slate-500 hover:bg-slate-600 active:bg-slate-800'
              : 'bg-green-500 hover:bg-green-600 active:bg-green-800',
          ]"
          @click="toggleOfflineMode"
        >
          {{ simulateOffline ? 'Offline' : 'Online' }}
        </button>
      </div>
      <div
        v-if="visualViewActive === false"
        class="flex w-11/12 flex-col gap-y-4 overflow-y-scroll"
      >
        <div class="boardgameListItem" v-for="boardgame in items" :key="boardgame.id">
          <BoardGameListItem :boardgame="boardgame" />
        </div>
      </div>
      <div
        v-if="visualViewActive === true"
        class="flex w-11/12 flex-row flex-wrap justify-center gap-5"
      >
        <div v-for="boardgame in items" :key="boardgame.id">
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
          <div v-if="isLoading">Loading</div>
          <div v-else>{{ page + 1 }} / {{ totalPages }}</div>
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
