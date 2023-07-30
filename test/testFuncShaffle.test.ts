import { shuffle } from './FuncShaffl'

it('should return a certain length of the array', () => {
    const inputArray = [1, 2, 3, 4, 5]

    const result = shuffle(inputArray)

    expect(result).toHaveLength(inputArray.length)
})
