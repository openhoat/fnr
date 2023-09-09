import React, { useCallback, useEffect, useState } from 'react'

import { getBaseUrl } from '../util/helper'

export type AuthContextType = {
  token: string | undefined
  setToken: (token: string) => void
}

export const AuthContext = React.createContext<AuthContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | undefined>()
  const fetchToken = useCallback(async () => {
    const response = await fetch(`${getBaseUrl()}/auth/token`, {
      body: JSON.stringify({ password: 'MyBigSecret', username: 'johndoe' }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
    })
    const data: { token: string } = await response.json()
    setToken(data.token)
  }, [])
  useEffect(() => void fetchToken(), [fetchToken])
  return (
    <AuthContext.Provider value={{ setToken, token }}>
      {children}
    </AuthContext.Provider>
  )
}
