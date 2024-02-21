import { ThemeProvider } from '@material-tailwind/react'
import type { ReactNode } from 'react'
import { StrictMode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

export const createApp = (): ReactNode => (
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<h3>Loading…</h3>}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
)
