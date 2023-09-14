import type { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { AppLayout } from './layouts/AppLayout'
import { AboutPage } from './pages/AboutPage'
import { ConfigPage } from './pages/ConfigPage'
import { HelloPage } from './pages/HelloPage'
import { HomePage } from './pages/HomePage'

const App: FC = () => {
  return (
    <Routes>
      <Route path="/app" element={<AppLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="hello" element={<HelloPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="config" element={<ConfigPage />} />
      </Route>
    </Routes>
  )
}

export default App
