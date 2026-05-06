<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/api_services/api'

type ObservationEntry = {
  user_email: string
  reason: string
  added_at: string
}

const entries = ref<ObservationEntry[]>([])

async function loadList() {
  const { data } = await api.get('/api/logs/observation')
  entries.value = data
}

async function removeFromList(email: string) {
  await api.delete(`/api/logs/observation/${email}`)
  await loadList()
}

onMounted(loadList)
</script>

<template>
  <div class="flex flex-col gap-y-4 p-6">
    <h1 class="text-2xl font-bold">Observation List</h1>

    <div v-if="entries.length === 0" class="text-slate-400">No suspicious users detected.</div>

    <div
      v-for="entry in entries"
      :key="entry.user_email"
      class="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4"
    >
      <div class="flex flex-col gap-y-1">
        <span class="font-semibold text-red-700">{{ entry.user_email }}</span>
        <span class="text-sm text-red-500">{{ entry.reason }}</span>
        <span class="text-xs text-slate-400">
          Flagged at {{ new Date(entry.added_at).toLocaleString() }}
        </span>
      </div>
      <button
        @click="removeFromList(entry.user_email)"
        class="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  </div>
</template>
