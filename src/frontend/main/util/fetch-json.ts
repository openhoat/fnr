import HttpStatusCodes from 'http-status-codes'

import { getBaseUrl } from './helper'

export const fetchJson = async <T = unknown>(
  uriPath: string,
  options: RequestInit,
): Promise<T> => {
  const url = `${getBaseUrl()}${uriPath}`
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  return (
    response.status === HttpStatusCodes.NO_CONTENT
      ? undefined
      : await response.json()
  ) as T
}
