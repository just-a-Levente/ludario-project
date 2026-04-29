import { ref } from 'vue'
import { useAddBoardgame } from '@/api_services/api_mutations'
import { parseBoardgameForm } from '@/utils/boardgame_parser_validator'

const isOpen = ref(false)
const currentOffset = ref(0)
const currentLimit = ref(7)

export function setAddModalPaginationContext(offset: number, limit: number) {
  currentOffset.value = offset
  currentLimit.value = limit
}

export function useAddBoardGameModal() {
  const { mutate: addBoardgame, errors } = useAddBoardgame(currentOffset, currentLimit)

  const open = () => (isOpen.value = true)
  const close = () => (isOpen.value = false)

  const submit = (form: Record<string, string>, taglist: string) => {
    const create_request_fields = {
      ...form,
      tags: taglist,
    }
    const { data, errors: validationErrors } = parseBoardgameForm(create_request_fields)

    if (Object.keys(validationErrors).length > 0) {
      errors.value = validationErrors
      return
    }

    addBoardgame(create_request_fields, {
      onSuccess: () => close(),
      onError: (error: any) => {
        if (error.message === 'offline') close()
      },
    })
  }

  return { isOpen, errors, open, close, submit }
}
