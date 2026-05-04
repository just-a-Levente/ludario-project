import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/data/user'

export const useUserStore = defineStore('users', () => {
  const currentUser = ref<User | undefined>(undefined)

  function setCurrentUser(user: User) {
    currentUser.value = user
  }

  function clearCurrentUser() {
    currentUser.value = undefined
  }

  function hasPermission(permission: string): boolean {
    return currentUser.value?.permissions.includes(permission) ?? false
  }

  function isAdmin(): boolean {
    return currentUser.value?.roles.includes('admin') ?? false
  }

  return { currentUser, setCurrentUser, clearCurrentUser, hasPermission, isAdmin }
})
