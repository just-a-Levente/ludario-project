<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import { useUserStore } from '@/stores/userstore'
import { useChatManager } from '@/composables/useChatManager'

const userStore = useUserStore()
const { messages, newMessage, isConnected, loadHistory, connect, sendMessage } = useChatManager()

const messagesContainer = ref<HTMLElement | null>(null)

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value)
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  })
}

onMounted(async () => {
  await loadHistory()
  connect()
  scrollToBottom()
})

watch(messages, () => scrollToBottom(), { deep: true })

function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function isOwnMessage(sender: string): boolean {
  return sender === userStore.currentUser?.email
}
</script>

<template>
  <div class="flex h-screen flex-col gap-y-3 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between rounded-xl bg-orange-300 px-4 py-2">
      <span class="text-lg font-bold">Live Chat</span>
    </div>

    <!-- Messages -->
    <div
      ref="messagesContainer"
      class="flex flex-1 flex-col gap-y-2 overflow-y-scroll rounded-xl border-4 border-slate-300 bg-white p-4"
    >
      <div v-if="messages.length === 0" class="text-center text-sm text-slate-400">
        No messages yet. Say hello!
      </div>

      <div
        v-for="(message, index) in messages"
        :key="index"
        class="flex flex-col"
        :class="
          message.sender === 'system'
            ? 'items-center'
            : isOwnMessage(message.sender)
              ? 'items-end'
              : 'items-start'
        "
      >
        <!-- system message -->
        <span v-if="message.sender === 'system'" class="text-xs text-slate-400 italic">
          {{ message.content }}
        </span>

        <!-- regular message -->
        <template v-else>
          <span class="mb-0.5 text-xs text-slate-400">
            {{ isOwnMessage(message.sender) ? 'You' : message.sender }}
            · {{ formatTime(message.timestamp) }}
          </span>
          <div
            class="max-w-1/3 rounded-2xl px-4 py-2 text-sm wrap-break-word"
            :class="
              isOwnMessage(message.sender)
                ? 'rounded-tr-none bg-orange-400 text-white'
                : 'rounded-tl-none bg-slate-200 text-slate-800'
            "
          >
            {{ message.content }}
          </div>
        </template>
      </div>
    </div>

    <!-- Input -->
    <div class="flex gap-x-2">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Type a message..."
        class="flex-1 rounded-lg border border-slate-300 bg-white p-2"
        :disabled="!isConnected"
      />
      <button
        @click="sendMessage"
        :disabled="!isConnected"
        class="rounded-lg bg-orange-400 px-4 py-2 text-white hover:bg-orange-500 disabled:opacity-50"
      >
        Send
      </button>
    </div>
  </div>
</template>
