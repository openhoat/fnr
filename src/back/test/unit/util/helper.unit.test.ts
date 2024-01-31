import { toCamelCase } from '../../../main/util/helper'

describe('backend unit tests', () => {
  describe('util', () => {
    describe('helper', () => {
      describe('toCamelCase', () => {
        type TestCase = [string, string]
        const testCases: TestCase[] = [
          ['example', 'example'],
          ['Example', 'example'],
          ['EXAMPLE', 'example'],
          ['this is an example', 'thisIsAnExample'],
          ['This is an example', 'thisIsAnExample'],
          ['THIS_IS_AN_EXAMPLE', 'thisIsAnExample'],
        ]
        test.each(testCases)(
          'should return "%s" given "%s"',
          (s: string, expected: string) => {
            // When
            const result = toCamelCase(s)
            // Then
            expect(result).toBe(expected)
          },
        )
      })
    })
  })
})
