import { ref } from 'vue'
import { useUpdateBoardgame } from '@/api_services/api_mutations'
import type { BoardGame } from '@/data/boardgame'
import { parseBoardgameForm } from '@/utils/boardgame_parser_validator'

const isEditOpen = ref(false)

const form = ref<Record<string, string>>({
  id: '',
  hidden: 'false',
  name: '',
  producer: '',
  description: '',
  price: '',
  numberOfCopies: '',
  minNumberOfPlayers: '',
  maxNumberOfPlayers: '',
  thumbnailURL: '',
})

const taglist = ref('')

export function useEditBoardGameModal() {
  const { mutate: updateBoardgame, errors } = useUpdateBoardgame()

  const editOpen = () => (isEditOpen.value = true)
  const editClose = () => (isEditOpen.value = false)

  const changeBoardGameToBeEdited = (boardgame: BoardGame) => {
    form.value = {
      id: String(boardgame.id),
      hidden: String(boardgame.hidden),
      name: boardgame.name,
      producer: boardgame.producer,
      description: boardgame.description,
      price: String(boardgame.price),
      numberOfCopies: String(boardgame.numberOfCopies),
      minNumberOfPlayers: String(boardgame.minNumberOfPlayers),
      maxNumberOfPlayers: String(boardgame.maxNumberOfPlayers),
      thumbnailURL: boardgame.thumbnailURL,
    }

    taglist.value = boardgame.tags.join(';')
  }

  const submit = () => {
    const update_request_fields = {
      ...form.value,
      tags: taglist.value,
    }

    const { data, errors: validationErrors } = parseBoardgameForm(update_request_fields)
    if (Object.keys(validationErrors).length > 0) {
      errors.value = validationErrors
      return
    }

    updateBoardgame(update_request_fields, {
      onSuccess: () => editClose(),
      onError: (error: any) => {
        if (error.message === 'offline') editClose()
      },
    })
  }

  return {
    isEditOpen,
    form,
    taglist,
    errors,
    editOpen,
    editClose,
    changeBoardGameToBeEdited,
    submit,
  }
}
