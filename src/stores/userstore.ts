import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/data/user'

export const useUserStore = defineStore('users', () => {
  /*   State   */
  const users = ref<User[]>([])
  let currentUser: User | undefined

  /*   Getters   */

  /*   Functions   */
  function resetUsers() {
    users.value = []
    currentUser = undefined
  }

  function getUserByEmail(email: string) {
    return users.value.find((user) => user.email === email)
  }

  function setCurrentUser(currentEmail: string) {
    currentUser = getUserByEmail(currentEmail)
  }

  function addNewUser(newUser: User) {
    const index = users.value.findIndex((user) => user.email === newUser.email)
    if (index === -1) users.value.push(newUser)
  }

  return {
    users,
    currentUser,
    resetUsers,
    getUserByEmail,
    setCurrentUser,
    addNewUser,
  }
})
