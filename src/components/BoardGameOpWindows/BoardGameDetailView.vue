<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useBoardgame } from '@/api_services/api_queries'
import { useUserStore } from '@/stores/userstore'
import { useAddReview } from '@/api_services/api_mutations'
import ReviewItemView from './ReviewItemView.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { mutate: addReview } = useAddReview()

const id = computed(() => Number(route.params.id))

const { data: detailedBoardgame } = useBoardgame(id)

const tagList = computed(() => {
  return detailedBoardgame.value?.tags?.join(', ') ?? ''
})

function goBackToCatalogue() {
  router.push('/dashboard/boardgames')
}

// -------
// add new review
// -------

const numberOfStars = ref(0)
const comment = ref('')

function sendNewReview() {
  if (numberOfStars.value == 0 || comment.value == '') return

  const sendingDate = new Date(Date.now())

  const createReviewFields = {
    boardgame_id: id.value,
    author: userStore.currentUser?.username,
    stars: numberOfStars.value,
    comment: comment.value,
    review_date: sendingDate.toISOString().slice(0, 10),
  }

  console.log(createReviewFields)
  addReview(createReviewFields)
}
</script>

<template>
  <div class="flex w-full flex-col justify-center gap-y-3 overflow-y-scroll p-6 text-lg lg:w-4/5">
    <button @click="goBackToCatalogue" class="self-end">← Back</button>
    <div class="flex flex-col gap-y-12 rounded-2xl border-8 border-slate-500 bg-orange-300 p-5">
      <div class="flex flex-col items-center gap-4 gap-x-8 lg:flex-row">
        <img
          :src="detailedBoardgame?.thumbnailURL"
          alt="Boardgame thumbnail"
          class="max-h-64 w-2/3 object-contain lg:w-1/2"
        />
        <div class="flex w-full flex-col items-center gap-y-3 lg:w-2/3 lg:items-start lg:gap-y-0">
          <div class="text-2xl font-bold lg:text-3xl">{{ detailedBoardgame?.name }}</div>
          <div class="pb-8 text-xl lg:text-2xl">{{ detailedBoardgame?.producer }}</div>
          <div class="text-2xl font-bold">{{ detailedBoardgame?.price }} RON</div>
          <div>{{ detailedBoardgame?.numberOfCopies }} copies</div>
          <div>
            {{ detailedBoardgame?.minNumberOfPlayers }} -
            {{ detailedBoardgame?.maxNumberOfPlayers }} players
          </div>
          <div>Tags: {{ tagList }}</div>
        </div>
      </div>
      <div>{{ detailedBoardgame?.description }}</div>
    </div>

    <div class="flex flex-col rounded-2xl bg-orange-300 p-5">
      <div class="flex h-12 flex-row">
        <img
          :src="
            numberOfStars >= 1
              ? '/src/assets/icons/full_star.png'
              : '/src/assets/icons/hollow_star.png'
          "
          @click="numberOfStars = 1"
        />
        <img
          :src="
            numberOfStars >= 2
              ? '/src/assets/icons/full_star.png'
              : '/src/assets/icons/hollow_star.png'
          "
          @click="numberOfStars = 2"
        />
        <img
          :src="
            numberOfStars >= 3
              ? '/src/assets/icons/full_star.png'
              : '/src/assets/icons/hollow_star.png'
          "
          @click="numberOfStars = 3"
        />
        <img
          :src="
            numberOfStars >= 4
              ? '/src/assets/icons/full_star.png'
              : '/src/assets/icons/hollow_star.png'
          "
          @click="numberOfStars = 4"
        />
        <img
          :src="
            numberOfStars >= 5
              ? '/src/assets/icons/full_star.png'
              : '/src/assets/icons/hollow_star.png'
          "
          @click="numberOfStars = 5"
        />
      </div>
      <textarea
        id="addCommentField"
        v-model="comment"
        class="h-16 rounded-lg bg-white p-2"
        placeholder="Add your review here"
      />
      <button @click="sendNewReview">Send</button>
    </div>

    <div v-if="detailedBoardgame?.reviews.length > 0" class="mt-8 mb-4 text-3xl">Comments</div>
    <div v-for="review in detailedBoardgame?.reviews" :key="review.id" class="text-sm">
      <ReviewItemView :review="review" />
    </div>
  </div>
</template>
