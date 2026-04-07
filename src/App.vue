<script setup lang="ts">
import CatalogueTabularView from './components/CatalogueView/CatalogueTabularView.vue'
import TheNavBar from './components/NavigationBar/TheNavBar.vue'
import { useBoardGamesStore } from './stores/boardgames'

const store = useBoardGamesStore()
store.resetStore()

let currId = store.getLastID()
store.addBoardGame({
  id: currId,
  hidden: false,
  name: 'Saboteur',
  producer: 'Piatnik',
  description: 'Description of Saboteur',
  price: 8.99,
  numberOfCopies: 12,
  minNumberOfPlayers: 4,
  maxNumberOfPlayers: 6,
  photos: ['/uploads/saboteur.jpg'],
  tags: ['social deduction', 'mining'],
  stars: [4, 5, 3, 3, 4],
})

currId = store.getLastID()
store.addBoardGame({
  id: currId,
  hidden: false,
  name: 'Settlers of Catan',
  producer: 'Kosmos',
  description: 'Description of Settlers of Catan',
  price: 14.99,
  numberOfCopies: 12,
  minNumberOfPlayers: 4,
  maxNumberOfPlayers: 6,
  photos: ['/uploads/settlers_of_catan.jpg'],
  tags: ['social deduction', 'colony builder'],
  stars: [4, 5, 5, 5, 4],
})

currId = store.getLastID()
store.addBoardGame({
  id: currId,
  hidden: false,
  name: 'Dune',
  producer: 'Gale Force Nine',
  description: 'Description of Dune',
  price: 21.99,
  numberOfCopies: 4,
  minNumberOfPlayers: 3,
  maxNumberOfPlayers: 6,
  photos: ['/uploads/dune.jpg'],
  tags: ['social deduction', 'colony builder'],
  stars: [3, 3, 3, 5, 4, 2, 3],
})
</script>

<template>
  <div class="flex flex-row">
    <TheNavBar />
    <CatalogueTabularView />
  </div>
</template>
