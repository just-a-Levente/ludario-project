import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBoardGamesStore } from '@/stores/boardgamestore'
import { createBoardGame } from '@/data/boardgame.ts'
import type { BoardGame } from '@/data/boardgame.ts'

let store: ReturnType<typeof useBoardGamesStore>

beforeEach(() => {
  setActivePinia(createPinia())
  store = useBoardGamesStore()
})

describe('BoardGames Store', () => {
  it('initial state is empty', () => {
    expect(store.boardgames).toEqual([])
    expect(store.numberOfBoardGames).toBe(0)
  })

  it('adds a boardgame', () => {
    const game = createBoardGame({ id: 1, name: 'Catan' })

    store.addBoardGame(game)

    expect(store.boardgames.length).toBe(1)
    expect(store.boardgames[0]?.name).toBe('Catan')
  })

  it('gets boardgame by ID', () => {
    const game = createBoardGame({ id: 1, name: 'Catan' })
    store.addBoardGame(game)

    const found = store.getBoardGameByID(1)

    expect(found).toBeDefined()
    expect(found?.name).toBe('Catan')
  })

  it('returns undefined for non-existing ID', () => {
    const found = store.getBoardGameByID(999)
    expect(found).toBeUndefined()
  })

  it('updates a boardgame', () => {
    const game = createBoardGame({ id: 1, name: 'OldName' })
    store.addBoardGame(game)

    const updatedGame = createBoardGame({ id: 1, name: 'NewName' })
    store.updateBoardGame(updatedGame)

    expect(store.boardgames[0]?.name).toBe('NewName')
  })

  it('does not update if ID does not exist', () => {
    const updatedGame = createBoardGame({ id: 999, name: 'GhostGame' })

    store.updateBoardGame(updatedGame)

    expect(store.boardgames.length).toBe(0)
  })

  it('deletes a boardgame', () => {
    const game = createBoardGame({ id: 1 })
    store.addBoardGame(game)

    store.deleteBoardGame(game)

    expect(store.boardgames.length).toBe(0)
  })

  it('resetStore clears everything and resets ID', () => {
    const game = createBoardGame({ id: 1 })
    store.addBoardGame(game)

    store.resetStore()

    expect(store.boardgames.length).toBe(0)

    const id = store.getLastID()
    expect(id).toBe(0)
  })

  it('getLastID increments correctly', () => {
    const id1 = store.getLastID()
    const id2 = store.getLastID()

    expect(id1).toBe(0)
    expect(id2).toBe(1)
  })

  it('numberOfBoardGames updates reactively', () => {
    expect(store.numberOfBoardGames).toBe(0)

    store.addBoardGame(createBoardGame({ id: 1 }))
    store.addBoardGame(createBoardGame({ id: 2 }))

    expect(store.numberOfBoardGames).toBe(2)
  })
})
