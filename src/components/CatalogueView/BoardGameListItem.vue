<script setup lang="ts">
// import type { BoardGame } from '@/data/boardgame'
import { createBoardGame } from '@/data/boardgame'

const props = defineProps({
  boardgame: createBoardGame,
})

const currBoardgame = props.boardgame
</script>

<template>
  <div class="flex flex-row items-center bg-mauve-200 p-4 text-2xl">
    <div class="w-56">{{ currBoardgame?.name }}</div>
    <div class="w-56">{{ currBoardgame?.producer }}</div>
    <div class="w-36">{{ currBoardgame?.price }} RON</div>
    <div class="w-56">{{ currBoardgame?.numberOfCopies }} copies</div>
    <div class="w-48">
      {{ currBoardgame?.minNumberOfPlayers }} - {{ currBoardgame?.maxNumberOfPlayers }} players
    </div>

    <!--<Teleport-->
  </div>
</template>
