import type { ReactNode } from 'react'

export const renderError = (error: Error): ReactNode => (
  <>Error: {error.message}</>
)

export const renderLoading = (): ReactNode => <>Loading…</>
