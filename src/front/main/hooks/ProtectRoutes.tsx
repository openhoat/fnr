import type { FC } from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { AuthContext } from '../providers/AuthProvider'

export const ProtectRoutes: FC = () => {
  const authContext = useContext(AuthContext)
  return authContext?.authenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/app/signin" replace={false} />
  )
}
