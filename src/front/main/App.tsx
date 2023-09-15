import type { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { ProtectRoutes } from './hooks/ProtectRoutes'
import { AppLayout } from './layouts/AppLayout'
import { AboutPage } from './pages/AboutPage'
import { ConfigPage } from './pages/ConfigPage'
import { HelloPage } from './pages/HelloPage'
import { HomePage } from './pages/HomePage'
import { SignInPage } from './pages/SignInPage'
import { SignOutPage } from './pages/SignOutPage'

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/app" element={<AppLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="hello" element={<HelloPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signout" element={<SignOutPage />} />
          <Route element={<ProtectRoutes />}>
            <Route path="about" element={<AboutPage />} />
            <Route path="config" element={<ConfigPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
