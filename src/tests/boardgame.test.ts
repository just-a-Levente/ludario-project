import { expect, describe, it, beforeEach } from 'vitest'
import type { BoardGame } from '../data/boardgame.ts'
import { copyBoardGame, createBoardGame } from '../data/boardgame.ts'

let testBoardGame: BoardGame

beforeEach(() => {
  testBoardGame = createBoardGame({
    id: 0,
    hidden: false,
    name: 'TestBoardGame',
    producer: 'RandomProducer',
    description: 'nope',
    price: 8.99,
    numberOfCopies: 5,
    minNumberOfPlayers: 2,
    maxNumberOfPlayers: 4,
    thumbnailURL: '',
    tags: [],
    stars: [],
  })
})

describe('testing boardgame model (type-based)', () => {
  describe('properties', () => {
    it('id', () => {
      expect(testBoardGame.id).toBe(0)
    })

    it('default id', () => {
      const emptyBoardGame: BoardGame = createBoardGame({ name: 'idk' })
      expect(emptyBoardGame.id).toBe(-1)
    })

    it('hidden status', () => {
      expect(testBoardGame.hidden).toBe(false)
    })

    it('name', () => {
      expect(testBoardGame.name).toBe('TestBoardGame')
    })

    it('producer', () => {
      expect(testBoardGame.producer).toBe('RandomProducer')
    })

    it('description', () => {
      expect(testBoardGame.description).toBe('nope')
    })

    it('price', () => {
      expect(testBoardGame.price).toBe(8.99)
    })

    it('number of copies', () => {
      expect(testBoardGame.numberOfCopies).toBe(5)
    })

    it('min players', () => {
      expect(testBoardGame.minNumberOfPlayers).toBe(2)
    })

    it('max players', () => {
      expect(testBoardGame.maxNumberOfPlayers).toBe(4)
    })

    it('photos', () => {
      expect(testBoardGame.thumbnailURL).toStrictEqual('')
    })

    it('tags', () => {
      expect(testBoardGame.tags).toStrictEqual([])
    })

    it('stars', () => {
      expect(testBoardGame.stars).toStrictEqual([])
    })
  })

  describe('mutations', () => {
    it('set hidden status', () => {
      testBoardGame.hidden = true
      expect(testBoardGame.hidden).toBe(true)
    })

    it('set name', () => {
      testBoardGame.name = 'DifferentName'
      expect(testBoardGame.name).toBe('DifferentName')
    })

    it('set producer', () => {
      testBoardGame.producer = 'RivalProducer'
      expect(testBoardGame.producer).toBe('RivalProducer')
    })

    it('set description', () => {
      testBoardGame.description = 'extranope'
      expect(testBoardGame.description).toBe('extranope')
    })

    it('set price', () => {
      testBoardGame.price = 4.99
      expect(testBoardGame.price).toBe(4.99)
    })

    it('set number of copies', () => {
      testBoardGame.numberOfCopies = 6
      expect(testBoardGame.numberOfCopies).toBe(6)
    })

    it('set min players', () => {
      testBoardGame.minNumberOfPlayers = 3
      expect(testBoardGame.minNumberOfPlayers).toBe(3)
    })

    it('set max players', () => {
      testBoardGame.maxNumberOfPlayers = 7
      expect(testBoardGame.maxNumberOfPlayers).toBe(7)
    })

    it('set photos', () => {
      const placeholderPath = 'public/images/placeholder.png'

      testBoardGame.thumbnailURL = placeholderPath
      expect(testBoardGame.thumbnailURL).toStrictEqual(placeholderPath)
    })

    it('set tags', () => {
      testBoardGame.tags = ['eurogame']
      expect(testBoardGame.tags).toStrictEqual(['eurogame'])
    })

    it('add star', () => {
      testBoardGame.stars.push(6)
      expect(testBoardGame.stars).toStrictEqual([6])
    })
  })

  describe('copy', () => {
    it('copy board game', () => {
      const testCopyBoardGame = copyBoardGame(testBoardGame)
      testCopyBoardGame.name = 'TestCopyBoardGame'

      expect(testBoardGame.name).toBe('TestBoardGame')
      expect(testCopyBoardGame.name).toBe('TestCopyBoardGame')
    })
  })
})
