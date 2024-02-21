import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import App from '../../main/App'

describe('frontend tests', () => {
  describe('frontend unit tests', () => {
    describe('App', () => {
      test('should render', () => {
        render(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
        )
      })
    })
  })
})
