<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useBoardgame } from '@/api_services/api_queries'

const route = useRoute()
const router = useRouter()

const id = computed(() => Number(route.params.id))

const { data: detailedBoardgame } = useBoardgame(id)

const tagList = computed(() => {
  return detailedBoardgame.value?.tags?.join(', ') ?? ''
})

function goBackToCatalogue() {
  router.push('/dashboard/boardgames')
}
</script>

<template>
  <div class="flex w-full flex-col justify-center gap-y-3 overflow-y-scroll p-6 text-lg lg:w-4/5">
    <button @click="goBackToCatalogue" class="self-end">← Back</button>
    <div class="flex flex-col gap-y-12 rounded-2xl border-8 border-slate-500 bg-orange-300 p-5">
      <div class="flex flex-col items-center gap-4 gap-x-8 lg:flex-row">
        <img
          :src="detailedBoardgame?.thumbnailURL"
          alt="Boardgame thumbnail"
          class="max-h-64 w-2/3 object-contain lg:w-1/2"
        />
        <div class="flex w-full flex-col items-center gap-y-3 lg:w-2/3 lg:items-start lg:gap-y-0">
          <div class="text-2xl font-bold lg:text-3xl">{{ detailedBoardgame?.name }}</div>
          <div class="pb-8 text-xl lg:text-2xl">{{ detailedBoardgame?.producer }}</div>
          <div class="text-2xl font-bold">{{ detailedBoardgame?.price }} RON</div>
          <div>{{ detailedBoardgame?.numberOfCopies }} copies</div>
          <div>
            {{ detailedBoardgame?.minNumberOfPlayers }} -
            {{ detailedBoardgame?.maxNumberOfPlayers }} players
          </div>
          <div>Tags: {{ tagList }}</div>
        </div>
      </div>
      <div>{{ detailedBoardgame?.description }}</div>
    </div>

    <div class="mt-8 mb-4 text-3xl">Comments</div>
    <div v-for="review in detailedBoardgame?.reviews" :key="review.id" class="text-sm">
      <div class="flex flex-col rounded-2xl bg-gray-300 p-5">
        <div class="mb-6 flex flex-row justify-between">
          <div class="text-xl">{{ review.author }}</div>
          <div class="flex h-8 flex-row">
            <img
              :src="
                review.stars >= 1
                  ? '/src/assets/icons/full_star.png'
                  : '/src/assets/icons/hollow_star.png'
              "
            />
            <img
              :src="
                review.stars >= 2
                  ? '/src/assets/icons/full_star.png'
                  : '/src/assets/icons/hollow_star.png'
              "
            />
            <img
              :src="
                review.stars >= 3
                  ? '/src/assets/icons/full_star.png'
                  : '/src/assets/icons/hollow_star.png'
              "
            />
            <img
              :src="
                review.stars >= 4
                  ? '/src/assets/icons/full_star.png'
                  : '/src/assets/icons/hollow_star.png'
              "
            />
            <img
              :src="
                review.stars >= 5
                  ? '/src/assets/icons/full_star.png'
                  : '/src/assets/icons/hollow_star.png'
              "
            />
          </div>
        </div>
        <div class="mb-6">{{ review.comment }}</div>
        <div>{{ review.reviewDate.toLocaleDateString() }}</div>
      </div>
    </div>
  </div>
</template>
