import './index.css'

import type { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { ProtectedRoutes } from './hooks/ProtectedRoutes'
import { AppLayout } from './layouts/AppLayout'
import { AboutPage } from './pages/AboutPage'
import { ConfigPage } from './pages/ConfigPage'
import { HomePage } from './pages/HomePage'
import { SignInPage } from './pages/SignInPage'
import { SignOutPage } from './pages/SignOutPage'

const App: FC = () => (
  <>
    <Routes>
      <Route path="/app" element={<AppLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="config" element={<ConfigPage />} />
          <Route path="sign-out" element={<SignOutPage />} />
        </Route>
      </Route>
    </Routes>
  </>
)

export default App
