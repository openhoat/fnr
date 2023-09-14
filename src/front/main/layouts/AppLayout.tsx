import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Footer } from '../components/Footer'

export const AppLayout: FC = () => (
  <>
    <Outlet />
    <Footer />
  </>
)
