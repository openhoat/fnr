import type { FastifyBaseLogger } from 'fastify'

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
  } catch (err) {
    log?.debug(String(err))
  }
  return result
}
