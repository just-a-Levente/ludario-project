import { ref } from 'vue'

type PendingOperation =
  | { type: 'create'; payload: any }
  | { type: 'update'; payload: any }
  | { type: 'delete'; payload: number }

export const offlineQueue = ref<PendingOperation[]>([])
