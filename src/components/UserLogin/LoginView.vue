<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userstore'
import router from '@/router'

const userstore = useUserStore()

const formInputForUser = ref({
  emailInput: '',
  passwordInput: '',
})

async function hashString(inputString: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(inputString)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)

  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('')

  return hashHex
}

// TODO add more error statuses
const errorStatus = ref(false)

const isTransitionActive = ref(false)
const transitionDuration = 700

async function validateLoginInput() {
  // TODO implement validating against the user store + error messages + register
  const inputPasswordHash = await hashString(formInputForUser.value.passwordInput)
  const passwordHash = userstore.getUserByEmail(formInputForUser.value.emailInput)?.passwordhash

  if (passwordHash === inputPasswordHash) {
    errorStatus.value = false
    userstore.setCurrentUser(formInputForUser.value.emailInput)

    isTransitionActive.value = true

    setTimeout(() => {
      router.push('/dashboard/boardgames')
    }, transitionDuration)
  } else {
    errorStatus.value = true
  }
}
</script>

<template>
  <div class="relative h-dvh">
    <div class="relative z-20 m-4 flex flex-col items-center justify-center gap-y-3 md:pt-10">
      <div class="flex flex-col items-center gap-y-5">
        <div class="">
          <img src="/public/logo_with_title.png" alt="Ludario logo" />
        </div>
        <span class="py-3 text-center text-lg font-bold md:text-2xl"
          >An online board game shop for newcomers and veterans alike</span
        >
      </div>
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

          <!-- EXPAND THIS -->
          <span v-show="errorStatus" class="text-orange-600">ERROR</span>
        </div>
        <div class="flex flex-row items-end justify-between rounded-xl">
          <div class="w-1/2">
            <span class="text-sm text-orange-600"
              >You don't have an account? Create an account</span
            >
          </div>
          <div>
            <button
              @click.prevent="validateLoginInput"
              data-testid="loginButton"
              class="rounded-xl rounded-br-3xl bg-orange-600 p-3 text-mauve-200"
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed bottom-0 z-10 flex w-dvw flex-row">
      <img src="/public/images/bottom_hexagons_updated.png" class="md:hidden" />
      <img src="/public/images/bottom_hexagons_full.png" class="hidden md:inline" />
    </div>
    <div
      class="fixed inset-0 z-50 border-t-8 border-t-orange-600 bg-slate-500 transition-transform duration-700 ease-in-out"
      :class="isTransitionActive ? 'translate-y-0' : 'translate-y-full'"
    ></div>
    <!--
    <Transition name="card-slide-up">
      <div v-if="isTransitionActive" class="fixed inset-0 z-50 bg-slate-500"></div>
    </Transition>
    -->
  </div>
</template>
