<script setup lang="ts">
import { useBoardGamesStore } from './stores/boardgamestore'
import { useUserStore } from './stores/userstore'

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
  thumbnailURL:
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkuplayboardgamestore.com%2Fwp-content%2Fuploads%2F2023%2F08%2Fsaboteur-box.jpg&f=1&nofb=1&ipt=81572d0cfaa7bb2617cd861785c23c9dc3aa9058f5a3ac37eb3a9ef53e7f0a6c',
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
  thumbnailURL:
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.catan.com%2Fsites%2Fdefault%2Ffiles%2F2021-07%2F0001021_catan-25th-anniversary-edition.png&f=1&nofb=1&ipt=0690943ce60e9167480837ac28fcd490b57c76a310bdc433203130f5a2a6dcc1',
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
  thumbnailURL:
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.belloflostsouls.net%2Fwp-content%2Fuploads%2F2019%2F06%2FDune-Box-Left-Small.jpg&f=1&nofb=1&ipt=6d876cfe897e070c657cc0d94248be93e4a8c0e4e4da99628d4e1bf387b68d6f',
  tags: ['social deduction', 'colony builder'],
  stars: [3, 3, 3, 5, 4, 2, 3],
})

const userstore = useUserStore()
userstore.resetUsers()

userstore.addNewUser({
  email: 'le.kovacs789@gmail.com',
  username: 'Leti',
  passwordhash: '5c1a9af982e629455d7e0f830b2c387eb02a12a953f59b560893f1152fe7fd57',
  isAdmin: true,
})
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
