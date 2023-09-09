import type { Atom } from 'jotai'
import { atom } from 'jotai'

import { getBaseUrl } from './util/helper'

interface Config {
  isDevelopment: boolean
}

const configAtom: Atom<Promise<Config>> = atom(async () => {
  const response = await fetch(`${getBaseUrl()}/api/v1/config`)
  return response.json()
})

export default configAtom
export type { Config }
