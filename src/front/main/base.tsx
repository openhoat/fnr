import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

export const createApp = () => (
  <React.StrictMode>
    <BrowserRouter>
      <React.Suspense fallback={<h3>Loading…</h3>}>
        <App />
      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>
)
