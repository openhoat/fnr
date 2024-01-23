import type { FastifyBaseLogger } from 'fastify'

export const toWords = (s: string): RegExpMatchArray | null => {
  const regex =
    /[A-Z\u00C0-\u00D6\u00D8-\u00DE]?[a-z\u00DF-\u00F6\u00F8-\u00FF]+|[A-Z\u00C0-\u00D6\u00D8-\u00DE]+(?![a-z\u00DF-\u00F6\u00F8-\u00FF])|\d+/g
  return s.match(regex)
}

export const toCamelCase = (s: string): string => {
  const words = toWords(s)
  if (!words) {
    return ''
  }
  const camelCaseWords: string[] = words.map((word, index) => {
    const lowerCaseWord = word.toLowerCase()
    return index > 0
      ? `${lowerCaseWord.slice(0, 1).toUpperCase()}${lowerCaseWord.slice(1)}`
      : lowerCaseWord
  })
  return camelCaseWords.join('')
}

export const isKey = <T extends object>(o: T, k: PropertyKey): k is keyof T => {
  return k in o
}

export type IgnoreRejection = <T>(
  p: Promise<T>,
  log?: FastifyBaseLogger,
) => Promise<T | undefined>

export const ignoreRejection: IgnoreRejection = async <T>(
  p: Promise<T>,
  log?: FastifyBaseLogger,
): Promise<T | undefined> => {
  let result: T | undefined
  try {
    result = await p
  } catch (error) {
    log?.debug(String(error))
  }
  return result
}
