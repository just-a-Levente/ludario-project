<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userstore'
import { userApi } from '@/api_services/api'
import router from '@/router'
import AuthLayout from './AuthLayout.vue'

const userstore = useUserStore()

const formInputForUser = ref({
  emailInput: '',
  passwordInput: '',
})

// TODO add more error statuses
const errorStatus = ref(false)

const isTransitionActive = ref(false)
const transitionDuration = 700

async function hashString(inputString: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(inputString)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)

  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('')

  return hashHex
}

async function validateLoginInput() {
  const inputPasswordHash = await hashString(formInputForUser.value.passwordInput)
  try {
    const user = await userApi.login(formInputForUser.value.emailInput, inputPasswordHash)
    userstore.setCurrentUser(user)
    errorStatus.value = false
    isTransitionActive.value = true
    setTimeout(() => router.push('/dashboard/boardgames'), transitionDuration)
  } catch {
    errorStatus.value = true
  }
}
</script>

<template>
  <AuthLayout :is-transition-active="isTransitionActive">
    <div
      class="flex flex-col items-center gap-y-6 rounded-xl rounded-br-4xl border-4 border-orange-500 bg-orange-200 p-5"
    >
      <div>
        <span class="text-center text-xl text-orange-600">Log in to your account</span>
      </div>
      <div class="flex w-full flex-col gap-y-1.5">
        <label class="text-orange-600" for="email">E-mail:</label>
        <input
          class="rounded-lg bg-white p-2"
          data-testid="inputEmail"
          type="text"
          name="email"
          v-model="formInputForUser.emailInput"
        />

        <label class="text-orange-600" for="password">Password:</label>
        <input
          class="rounded-lg bg-white p-2"
          data-testid="inputPassword"
          type="password"
          name="password"
          v-model="formInputForUser.passwordInput"
        />

        <span v-show="errorStatus" class="text-orange-600">Invalid email-password combination</span>
      </div>
      <div class="flex w-96 flex-row-reverse justify-between rounded-xl">
        <div class="w-auto">
          <button
            @click.prevent="validateLoginInput"
            data-testid="loginButton"
            class="rounded-xl rounded-br-3xl bg-orange-600 p-3 text-mauve-200"
          >
            Enter
          </button>
          <RouterLink to="/register" class="self-center text-sm text-orange-600 underline">
            Create an account
          </RouterLink>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>
