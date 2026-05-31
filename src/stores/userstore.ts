import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userApi } from '@/api_services/api'
import router from '@/router'
import type { User } from '@/data/user'

export const useUserStore = defineStore('users', () => {
  const currentUser = ref<User | undefined>(undefined)

  function setCurrentUser(user: User) {
    currentUser.value = user
  }

  function clearCurrentUser() {
    currentUser.value = undefined
  }

  async function logout() {
    try {
      await userApi.logout() // tells server to delete refresh token + clear cookies
    } finally {
      clearCurrentUser()
    }
  }

  function hasPermission(permission: string): boolean {
    return currentUser.value?.permissions.includes(permission) ?? false
  }

  function isAdmin(): boolean {
    return currentUser.value?.roles.includes('admin') ?? false
  }

  return { currentUser, setCurrentUser, clearCurrentUser, logout, hasPermission, isAdmin }
})
