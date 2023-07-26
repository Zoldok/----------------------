import { it, expect, describe } from '@jest/globals'
import { getNumCards } from './GetNumCards'
describe('getNumCards()', () => {
    it('should return 6 for easy difficulty', () => {
        const difficulty = 'easy'
        const expected = 6

        const result = getNumCards(difficulty)

        expect(expected).toBe(result)
    })

    it('should return 12 for medium difficulty', () => {
        const difficulty = 'medium'
        const expected = 12

        const result = getNumCards(difficulty)

        expect(expected).toBe(result)
    })

    it('should return 18 for hard difficulty', () => {
        const difficulty = 'hard'
        const expected = 18

        const result = getNumCards(difficulty)

        expect(expected).toBe(result)
    })

    it('should return 6 for unknown difficulty', () => {
        const difficulty = 'unknown'
        const expected = 6

        const result = getNumCards(difficulty)

        expect(expected).toBe(result)
    })
})
