import type { FastifyBaseLogger } from 'fastify'
import findRoot from 'find-root'

export const isKey = <T extends object>(o: T, k: PropertyKey): k is keyof T => {
  return k in o
}

export const findNearestBaseDir = (from = __dirname) => {
  try {
    return findRoot(from)
  } catch {
    return undefined
  }
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
