<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userApi } from '@/api_services/api'
import AuthLayout from './AuthLayout.vue'
import { sha256 } from 'js-sha256'

const router = useRouter()

const form = ref({ email: '', username: '', password: '', confirmPassword: '' })
const errors = ref<Record<string, string>>({})
const isTransitionActive = ref(false)
const transitionDuration = 700

function hashString(inputString: string): string {
  return sha256(inputString)
}

function validate(): boolean {
  errors.value = {}
  if (!form.value.email.trim()) errors.value.email = 'Email is required'
  if (!form.value.username.trim()) errors.value.username = 'Username is required'
  if (!form.value.password) errors.value.password = 'Password is required'
  if (form.value.password !== form.value.confirmPassword)
    errors.value.confirmPassword = 'Passwords do not match'
  return Object.keys(errors.value).length === 0
}

async function register() {
  if (!validate()) return
  const passwordHash = hashString(form.value.password)
  try {
    await userApi.register(form.value.email, form.value.username, passwordHash, false)
    isTransitionActive.value = true
    setTimeout(() => router.push('/login'), transitionDuration)
  } catch (error: any) {
    if (error.response?.status === 409) errors.value.email = 'Email already registered'
    else errors.value.email = 'Registration failed, please try again'
  }
}
</script>

<template>
  <AuthLayout :is-transition-active="isTransitionActive">
    <div
      class="flex flex-col items-center gap-y-6 rounded-xl rounded-br-4xl border-4 border-orange-500 bg-orange-200 p-5"
    >
      <span class="text-center text-xl text-orange-600">Create an account</span>
      <div class="flex w-full flex-col gap-y-1.5">
        <label class="text-orange-600">E-mail:</label>
        <input class="rounded-lg bg-white p-2" type="text" v-model="form.email" />
        <span v-show="errors.email" class="text-sm text-orange-600">{{ errors.email }}</span>

        <label class="text-orange-600">Username:</label>
        <input class="rounded-lg bg-white p-2" type="text" v-model="form.username" />
        <span v-show="errors.username" class="text-sm text-orange-600">{{ errors.username }}</span>

        <label class="text-orange-600">Password:</label>
        <input class="rounded-lg bg-white p-2" type="password" v-model="form.password" />
        <span v-show="errors.password" class="text-sm text-orange-600">{{ errors.password }}</span>

        <label class="text-orange-600">Confirm password:</label>
        <input class="rounded-lg bg-white p-2" type="password" v-model="form.confirmPassword" />
        <span v-show="errors.confirmPassword" class="text-sm text-orange-600">{{
          errors.confirmPassword
        }}</span>
      </div>
      <div class="flex w-96 flex-row-reverse justify-between rounded-xl">
        <button
          @click.prevent="register"
          class="rounded-xl rounded-br-3xl bg-orange-600 p-3 text-mauve-200"
        >
          Register
        </button>
        <RouterLink to="/login" class="self-center text-sm text-orange-600 underline">
          Back to login
        </RouterLink>
      </div>
    </div>
  </AuthLayout>
</template>
