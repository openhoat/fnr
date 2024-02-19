import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

export interface AuthContextType {
  authenticated: boolean
  setAuthenticated: (authenticated: boolean) => void
}

export const AuthContext = React.createContext<AuthContextType>({
  authenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuthenticated: (): void => {},
})

interface Props {
  children: React.ReactNode
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [cookies] = useCookies(['authenticated'])
  const [authenticated, setAuthenticated] = useState<boolean>(
    !!cookies.authenticated,
  )
  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
