import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ThemeProvider } from '@material-tailwind/react'
import type { ReactNode } from 'react'
import { StrictMode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { AuthProvider } from './providers/AuthProvider'
import { getBaseUrl } from './util/helper'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${getBaseUrl()}/graphql`,
})

export const createApp = (): ReactNode => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Suspense fallback={<h3>Loading…</h3>}>
          <ApolloProvider client={client}>
            <AuthProvider>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </AuthProvider>
          </ApolloProvider>
        </Suspense>
      </BrowserRouter>
    </StrictMode>
  )
}
