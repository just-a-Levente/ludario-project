import { expect, test, it, describe, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBoardGamesStore } from '../stores/boardgames.ts'
import { BoardGame } from '../data/boardgame.ts'

describe('testing Pinia store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('creates empty Pinia store', () => {
      const store = useBoardGamesStore()
      expect(store.numberOfBoardGames).toBe(0)
      expect(store.boardgames).toStrictEqual([])
    })

    it('get last ID two times', () => {
      const store = useBoardGamesStore()
      expect(store.getLastID()).toBe(0)
      expect(store.getLastID()).toBe(1)
    })

    it('add and delete board game', () => {
      const store = useBoardGamesStore()
      const newIndex = store.getLastID()

      const testBoardGame = new BoardGame(
        newIndex,
        false,
        'TestBoardGame',
        'RandomProducer',
        'nope',
        8.99,
        0,
        5,
        2,
        4,
        [],
        [],
        [],
      )

      store.addBoardGame(testBoardGame)
      expect(store.getBoardGameByID(newIndex)).toStrictEqual(testBoardGame)
      store.deleteBoardGame(testBoardGame)
      expect(store.getBoardGameByID(newIndex)).toStrictEqual(undefined)
    })

    it('update board game in store', () => {
      const store = useBoardGamesStore()
      const newIndex = store.getLastID()

      const testBoardGame = new BoardGame(
        newIndex,
        false,
        'TestBoardGame',
        'RandomProducer',
        'nope',
        8.99,
        0,
        5,
        2,
        4,
        [],
        [],
        [],
      )
      const anotherTestBoardGame = new BoardGame(
        newIndex,
        false,
        'TestBoardGame',
        'RandomProducer',
        "don't read this",
        8.99,
        0,
        5,
        2,
        4,
        [],
        [],
        [],
      )

      store.addBoardGame(testBoardGame)
      store.updateBoardGame(anotherTestBoardGame)

      expect(store.getBoardGameByID(newIndex).getDescription()).toBe("don't read this")
      expect(testBoardGame.getDescription()).toBe('nope')
    })

    it('no update in board game', () => {
      const store = useBoardGamesStore()
      const newIndex = store.getLastID()

      const testBoardGame = new BoardGame(
        newIndex,
        false,
        'TestBoardGame',
        'RandomProducer',
        'nope',
        8.99,
        0,
        5,
        2,
        4,
        [],
        [],
        [],
      )
      const anotherTestBoardGame = new BoardGame(
        newIndex + 2,
        false,
        'TestBoardGame',
        'RandomProducer',
        "don't read this",
        8.99,
        0,
        5,
        2,
        4,
        [],
        [],
        [],
      )

      store.addBoardGame(testBoardGame)
      store.updateBoardGame(anotherTestBoardGame)

      expect(store.getBoardGameByID(newIndex).getDescription()).toBe('nope')
      expect(testBoardGame.getDescription()).toBe('nope')
    })
  })
})
