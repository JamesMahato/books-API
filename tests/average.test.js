const { average } = require('../for_test')

describe('average test', () => {
    test('test of [1,2,3]', () => {
        const result = average([1,2,3])
        expect(result).toBe(2)
    })
    
    test('test for [1]', () => {
        const result = average([1])
        expect(result).toBe(1)
    }) 
    
    test('test for []', () => {
        const result = average([])
        expect(result).toBe(0)
    }) 

    test('test for [2,3,4,5,6]', () => {
        const result = average([2,3,4,5,6])
        expect(result).toBe(4)
    }) 
})

