<script setup lang="ts">
import { useDeleteReview } from '@/api_services/api_mutations'
import type { Review } from '@/data/review'

const props = defineProps<{ review: Review }>()
const { mutate: deleteReviewMutation } = useDeleteReview()

function deleteReview() {
  if (props.review?.id !== undefined)
    deleteReviewMutation({ reviewId: props.review.id, boardgameId: props.review.boardgameId })
}
</script>

<template>
  <div class="flex flex-col rounded-2xl bg-gray-300 p-5">
    <div class="mb-6 flex flex-row justify-between">
      <div class="text-xl">{{ props.review?.author }}</div>
      <div class="flex h-8 flex-row">
        <img
          :src="
            props.review?.stars >= 1
              ? '/src/assets/icons/full_star.png'
              : '/src/assets/icons/hollow_star.png'
          "
        />
        <img
          :src="
            props.review?.stars >= 2
              ? '/src/assets/icons/full_star.png'
              : '/src/assets/icons/hollow_star.png'
          "
        />
        <img
          :src="
            props.review?.stars >= 3
              ? '/src/assets/icons/full_star.png'
              : '/src/assets/icons/hollow_star.png'
          "
        />
        <img
          :src="
            props.review?.stars >= 4
              ? '/src/assets/icons/full_star.png'
              : '/src/assets/icons/hollow_star.png'
          "
        />
        <img
          :src="
            props.review?.stars >= 5
              ? '/src/assets/icons/full_star.png'
              : '/src/assets/icons/hollow_star.png'
          "
        />
      </div>
    </div>
    <div class="mb-6">{{ props.review?.comment }}</div>
    <div class="flex flex-row justify-between">
      <div>{{ props.review?.reviewDate.toLocaleDateString() }}</div>
      <img class="h-8" src="/src/assets/icons/delete_icon.png" @click="deleteReview" />
    </div>
  </div>
</template>
