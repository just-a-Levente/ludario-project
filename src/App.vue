<script setup lang="ts">
import { useUserStore } from './stores/userstore'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

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
    <VueQueryDevtools />
  </div>
</template>
