import { atom } from 'jotai'

import { fetchJson } from '../util/fetch-json'

interface Config {
  isDevelopment: boolean
}

const configAtom = atom((__, { signal }) =>
  fetchJson<Config>('/api/v1/config', {
    signal,
    credentials: 'same-origin',
  }),
)

export default configAtom
export type { Config }
