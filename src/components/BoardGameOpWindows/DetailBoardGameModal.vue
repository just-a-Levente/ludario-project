<script setup lang="ts">
import { ref } from 'vue'
import { useDetailBoardGameModal } from '@/composables/useDetailBoardGameModal'

const { isDetailOpen, detailedBoardgame, detailClose } = useDetailBoardGameModal()

const tagList = ref('Tags: ')
detailedBoardgame.value.tags.forEach((element: string) => {
  tagList.value += element + ', '
})
tagList.value = tagList.value.slice(0, tagList.value.length - 2)

function closeOnBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) detailClose()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-show="isDetailOpen"
      @click="closeOnBackdropClick"
      class="fixed inset-0 z-1000 flex items-center justify-center backdrop-brightness-50"
    >
      <div
        class="flex h-3/4 w-3/5 flex-col gap-y-3 overflow-y-scroll rounded-lg border-4 border-mauve-500 bg-slate-200 p-6 text-lg"
      >
        <div class="flex flex-col gap-y-12">
          <div class="flex flex-row items-center gap-x-8">
            <img :src="detailedBoardgame?.thumbnailURL" alt="Boardgame thumbnail" class="w-1/3" />
            <div class="flex w-2/3 flex-col">
              <div class="text-3xl font-bold">{{ detailedBoardgame?.name }}</div>
              <div class="pb-8 text-2xl">{{ detailedBoardgame?.producer }}</div>
              <div class="font-bold">{{ detailedBoardgame?.price }} RON</div>
              <div>{{ detailedBoardgame?.numberOfCopies }} copies</div>
              <div>
                {{ detailedBoardgame?.minNumberOfPlayers }} -
                {{ detailedBoardgame?.maxNumberOfPlayers }} players
              </div>
              <div>{{ tagList }}</div>
            </div>
          </div>
          <div>{{ detailedBoardgame?.description }}</div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
