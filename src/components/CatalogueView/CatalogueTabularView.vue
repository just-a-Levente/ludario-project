<script setup lang="ts">
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import { useInfiniteBoardgames } from '@/api_services/api_queries'
import {
  useAddBoardGameModal,
  setAddModalPaginationContext,
} from '@/composables/useAddBoardGameModal'
import { simulateOffline } from '@/api_services/api_connection_check'
import { syncQueue } from '@/api_services/api_mutations'
import { useQueryClient } from '@tanstack/vue-query'
import { useFakerService } from '@/api_services/api_faker_service'
import BoardGameListItem from '@/components/CatalogueView/BoardGameListItem.vue'
import AddBoardGameModal from '../BoardGameOpWindows/AddBoardGameModal.vue'
import ToggleSwitch from 'primevue/toggleswitch'
import BoardGameCardItem from './BoardGameCardItem.vue'

const { open } = useAddBoardGameModal()
const { isRunning, toggleFaker } = useFakerService()
const queryClient = useQueryClient()

const visibleBoardGamesOnPage = 7
const visibleBoardGameCardsOnPage = 12

const visualViewActive = ref(false)

const limit = computed(() =>
  visualViewActive.value ? visibleBoardGameCardsOnPage : visibleBoardGamesOnPage,
)

const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
  useInfiniteBoardgames(limit)

const allItems = computed(() => data.value?.pages.flatMap((page) => page.items) ?? [])

const totalItems = computed(() => data.value?.pages[0]?.totalItems ?? 0)

const sentinel = ref<HTMLElement | null>(null)
const isSentinelVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      isSentinelVisible.value = entries[0].isIntersecting
      if (entries[0].isIntersecting && hasNextPage.value && !isFetchingNextPage.value) {
        fetchNextPage()
      }
    },
    { threshold: 0.1, root: sentinel.value?.parentElement },
  )
  if (sentinel.value) {
    console.log('sentinel found:', sentinel.value)
    observer.observe(sentinel.value)
  } else console.log('sentinel NOT found')
})

function showAddModal() {
  open()
}

function toggleOfflineMode() {
  simulateOffline.value = !simulateOffline.value

  if (!simulateOffline.value) syncQueue(queryClient)
}

watch(hasNextPage, (newVal) => {
  if (newVal && isSentinelVisible.value && !isFetchingNextPage.value) {
    fetchNextPage()
  }
})

watchEffect(() => {
  setAddModalPaginationContext(0, limit.value)
})
</script>

<template>
  <div>
    <div class="flex min-h-screen flex-col items-center justify-between p-8">
      <div class="flex flex-row gap-x-2 pb-3">
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
        <button
          class="rounded-lg px-2 py-0.5 text-xl text-slate-200"
          :class="[
            isRunning
              ? 'bg-green-500 hover:bg-green-600 active:bg-green-800'
              : 'bg-slate-500 hover:bg-slate-600 active:bg-slate-800',
          ]"
          @click="toggleFaker"
        >
          {{ isRunning ? 'Faker On' : 'Faker Off' }}
        </button>
      </div>
      <div
        v-if="visualViewActive === false"
        class="flex h-150 w-11/12 flex-col gap-y-4 overflow-y-scroll"
      >
        <div class="boardgameListItem" v-for="boardgame in allItems" :key="boardgame.id">
          <BoardGameListItem :boardgame="boardgame" />
        </div>
      </div>
      <div
        v-if="visualViewActive === true"
        class="flex h-150 w-11/12 flex-row flex-wrap justify-center gap-5 overflow-y-scroll"
      >
        <div v-for="boardgame in allItems" :key="boardgame.id">
          <BoardGameCardItem :boardgame="boardgame" />
        </div>
      </div>

      <div ref="sentinel" class="h-4 w-full" />

      <div v-if="isFetchingNextPage" class="py-2 text-center text-slate-400">Loading more...</div>
      <div v-if="!hasNextPage && allItems.length > 0" class="py-2 text-center text-slate-400">
        All {{ totalItems }} boardgames loaded
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

        <div v-if="isLoading" class="text-slate-400">Loading...</div>

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
