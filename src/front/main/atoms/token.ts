import type { Atom } from 'jotai'
import { atom } from 'jotai'

import { getBaseUrl } from '../util/helper'

const tokenAtom: Atom<Promise<string>> = atom(async () => {
  const response = await fetch(`${getBaseUrl()}/auth/token`, {
    body: JSON.stringify({ password: 'MyBigSecret', username: 'johndoe' }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
  })
  const { token }: { token: string } = await response.json()
  console.log('token :', token)
  return token
})

export default tokenAtom
