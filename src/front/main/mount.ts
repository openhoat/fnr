import { createRoot } from 'react-dom/client'

import { createApp } from './base'

const rootElement: Element | null = document.querySelector('main')
if (!rootElement) {
  throw new Error('Missing main DOM container')
}
const root = createRoot(rootElement)
root.render(createApp())
