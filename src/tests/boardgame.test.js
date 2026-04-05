import { expect, test, it, describe, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { existsSync } from 'fs'
import { BoardGame } from '../data/boardgame.ts'

const testBoardGame = new BoardGame(
  0,
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

describe('testing model class', () => {
  describe('getters', () => {
    it('get id', () => {
      expect(testBoardGame.getID()).toBe(0)
    })

    it('get hidden status', () => {
      expect(testBoardGame.getHiddenStatus()).toBe(false)
    })

    it('get name', () => {
      expect(testBoardGame.getName()).toBe('TestBoardGame')
    })

    it('get producer', () => {
      expect(testBoardGame.getProducer()).toBe('RandomProducer')
    })

    it('get description', () => {
      expect(testBoardGame.getDescription()).toBe('nope')
    })

    it('get price', () => {
      expect(testBoardGame.getPrice()).toBe(8.99)
    })

    it('get discount', () => {
      expect(testBoardGame.getDiscount()).toBe(0)
    })

    it('get number of copies', () => {
      expect(testBoardGame.getNumberOfCopies()).toBe(5)
    })

    it('get min number of players', () => {
      expect(testBoardGame.getMinNumberOfPlayers()).toBe(2)
    })

    it('get max number of players', () => {
      expect(testBoardGame.getMaxNumberOfPlayers()).toBe(4)
    })

    it('get photo locations', () => {
      expect(testBoardGame.getPhotos()).toStrictEqual([])
    })

    it('get tags', () => {
      expect(testBoardGame.getTags()).toStrictEqual([])
    })

    it('get stars', () => {
      expect(testBoardGame.getStars()).toStrictEqual([])
    })
  })

  describe('setters', () => {
    it('set hidden status', () => {
      testBoardGame.setHiddenStatus(true)
      expect(testBoardGame.getHiddenStatus()).toBe(true)
    })

    it('set name', () => {
      testBoardGame.setName('DifferentName')
      expect(testBoardGame.getName()).toBe('DifferentName')
    })

    it('set producer', () => {
      testBoardGame.setProducer('RivalProducer')
      expect(testBoardGame.getProducer()).toBe('RivalProducer')
    })

    it('set description', () => {
      testBoardGame.setDescription('extranope')
      expect(testBoardGame.getDescription()).toBe('extranope')
    })

    it('set price', () => {
      testBoardGame.setPrice(4.99)
      expect(testBoardGame.getPrice()).toBe(4.99)
    })

    it('set discount', () => {
      testBoardGame.setDiscount(50)
      expect(testBoardGame.getDiscount()).toBe(50)
    })

    it('set number of copies', () => {
      testBoardGame.setNumberOfCopies(6)
      expect(testBoardGame.getNumberOfCopies()).toBe(6)
    })

    it('set min number of players', () => {
      testBoardGame.setMinNumberOfPlayers(3)
      expect(testBoardGame.getMinNumberOfPlayers()).toBe(3)
    })

    it('set max number of players', () => {
      testBoardGame.setMaxNumberOfPlayers(7)
      expect(testBoardGame.getMaxNumberOfPlayers()).toBe(7)
    })

    it('set photo locations', () => {
      const placeholderPath = 'public/images/placeholder.png'
      const doesFileExist = existsSync(placeholderPath)

      expect(doesFileExist).toBe(true)
      testBoardGame.setPhotos([placeholderPath])
      expect(testBoardGame.getPhotos()).toStrictEqual([placeholderPath])
    })

    it('set tags', () => {
      testBoardGame.setTags(['eurogame'])
      expect(testBoardGame.getTags()).toStrictEqual(['eurogame'])
    })

    it('set stars', () => {
      testBoardGame.addStar(6)
      expect(testBoardGame.getStars()).toStrictEqual([6])
    })
  })
})
