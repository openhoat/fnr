import './index.css'

import type { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { AppLayout } from './layouts/AppLayout'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'

const App: FC = () => (
  <>
    <Routes>
      <Route path="/app" element={<AppLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  </>
)

export default App
