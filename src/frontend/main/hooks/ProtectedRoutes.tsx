import type { FC } from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { AuthContext } from '../providers/AuthProvider'

export const ProtectedRoutes: FC = () => {
  const authContext = useContext(AuthContext)
  return authContext.authenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/app/sign-in" replace={false} />
  )
}
