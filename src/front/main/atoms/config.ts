import type { Atom } from 'jotai'
import { atom } from 'jotai'

import { getBaseUrl } from '../util/helper'

interface Config {
  isDevelopment: boolean
}

const configAtom = atom(async (__, { signal }) => {
  const response = await fetch(`${getBaseUrl()}/api/v1/config`, {
    signal,
    credentials: 'same-origin',
  })
  return response.json()
}) as Atom<Promise<Config>>

export default configAtom
export type { Config }
