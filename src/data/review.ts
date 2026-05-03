export type Review = {
  id: number
  boardgameId: number
  author: string
  stars: number
  comment: string
  reviewDate: Date
}

export function createReview(data: Partial<Review> = {}): Review {
  return {
    id: data.id ?? -1,
    boardgameId: data.boardgameId ?? -1,
    author: data.author ?? 'unknown',
    stars: data.stars ?? 0,
    comment: data.comment ?? '',
    reviewDate: data.reviewDate ? new Date(data.reviewDate) : new Date(2000, 1, 1),
  }
}
