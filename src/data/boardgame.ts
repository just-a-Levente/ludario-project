export type BoardGame = {
  id: number
  hidden: boolean
  name: string
  producer: string
  description: string
  price: number
  numberOfCopies: number
  minNumberOfPlayers: number
  maxNumberOfPlayers: number
  thumbnailURL: string
  tags: string[]
  stars: number[]
}

export function createBoardGame(data: Partial<BoardGame> = {}): BoardGame {
  return {
    id: data.id ?? -1,
    hidden: data.hidden ?? false,
    name: data.name ?? '',
    producer: data.producer ?? '',
    description: data.description ?? '',
    price: data.price ?? 0,
    numberOfCopies: data.numberOfCopies ?? 0,
    minNumberOfPlayers: data.minNumberOfPlayers ?? 1,
    maxNumberOfPlayers: data.maxNumberOfPlayers ?? 1,
    thumbnailURL: data.thumbnailURL ?? '',
    tags: data.tags ?? [],
    stars: data.stars ?? [],
  }
}
