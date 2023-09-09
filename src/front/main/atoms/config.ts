import type { Atom } from 'jotai'
import { atom } from 'jotai'

import { getBaseUrl } from '../util/helper'

interface Config {
  isDevelopment: boolean
}

const configAtom: Atom<Promise<Config>> = atom(async (__, { signal }) => {
  const response = await fetch(`${getBaseUrl()}/api/v1/config`, {
    signal,
    credentials: 'same-origin',
  })
  return response.json()
})

export default configAtom
export type { Config }
