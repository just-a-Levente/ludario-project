<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userstore'
import { userApi } from '@/api_services/api'
import router from '@/router'
import AuthLayout from './AuthLayout.vue'
import { sha256 } from 'js-sha256'

const userstore = useUserStore()

const formInputForUser = ref({
  emailInput: '',
  passwordInput: '',
})

// TODO add more error statuses
const errorStatus = ref(false)

const isTransitionActive = ref(false)
const transitionDuration = 700

function hashString(inputString: string): string {
  return sha256(inputString)
}

async function validateLoginInput() {
  const inputPasswordHash = hashString(formInputForUser.value.passwordInput)
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

function goToRegister() {
  router.push('/register')
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
      <div class="flex w-96 flex-row justify-between rounded-xl">
        <span @click="goToRegister" class="self-center text-sm text-orange-600 underline">
          Create an account
        </span>
        <button
          @click.prevent="validateLoginInput"
          data-testid="loginButton"
          class="rounded-xl rounded-br-3xl bg-orange-600 p-3 text-mauve-200"
        >
          Enter
        </button>
      </div>
    </div>
  </AuthLayout>
</template>
