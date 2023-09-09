import { StrictMode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { AuthProvider } from './providers/AuthProvider'

export const createApp = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Suspense fallback={<h3>Loading…</h3>}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Suspense>
      </BrowserRouter>
    </StrictMode>
  )
}
