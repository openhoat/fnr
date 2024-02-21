import { pickFromDict, toCamelCase, toWords } from '../../../main/util/helper'

describe('backend unit tests', () => {
  describe('util', () => {
    describe('helper', () => {
      describe('toWords', () => {
        type TestCase = [string, string[]]
        const testCases: TestCase[] = [
          ['this is an example', ['this', 'is', 'an', 'example']],
        ]
        test.each(testCases)(
          'should return "%s" given "%s"',
          (s: string, expected: string[]) => {
            // When
            const result = toWords(s)
            // Then
            expect(result).toStrictEqual(expected)
          },
        )
      })
      describe('toCamelCase', () => {
        type TestCase = [string, string]
        const testCases: TestCase[] = [
          ['example', 'example'],
          ['Example', 'example'],
          ['EXAMPLE', 'example'],
          ['this is an example', 'thisIsAnExample'],
          ['This is an example', 'thisIsAnExample'],
          ['THIS_IS_AN_EXAMPLE', 'thisIsAnExample'],
          ['', ''],
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
      describe('pickFromDict', () => {
        type TestCase = [Record<string, string>, NodeJS.Dict<string>, string[]]
        const testCases: TestCase[] = [
          [{ foo: 'bar' }, { foo: 'bar', hello: 'world' }, ['foo', '']],
        ]
        test.each(testCases)(
          'should return "%s" given source "%s" and keys "%s"',
          (
            expected: Record<string, string>,
            source: NodeJS.Dict<string>,
            keys: string[],
          ) => {
            // Given
            // const keyTransformer
            // When
            const result = pickFromDict(source, keys /*,keyTransformer*/)
            // Then
            expect(result).toStrictEqual(expected)
          },
        )
      })
    })
  })
})
