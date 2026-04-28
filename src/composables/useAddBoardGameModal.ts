import { ref } from 'vue'
import { useAddBoardgame } from '@/api_services/api_mutations'

const isOpen = ref(false)

export function useAddBoardGameModal() {
  const { mutate: addBoardgame, errors } = useAddBoardgame()

  const open = () => (isOpen.value = true)
  const close = () => (isOpen.value = false)

  const submit = (form: Record<string, string>, taglist: string) => {
    const create_request_fields = {
      ...form,
      tags: taglist,
    }

    addBoardgame(create_request_fields, {
      onSuccess: () => close(),
    })
  }

  return { isOpen, errors, open, close, submit }
}
