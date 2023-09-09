import type React from 'react'
import { Outlet } from 'react-router-dom'

import { Footer } from '../components/Footer'

export const AppLayout: React.FC = () => (
  <>
    <Outlet />
    <Footer />
  </>
)
