import { Banner } from 'flowbite-react'
import type { FC } from 'react'

import { AppNavbar } from '../components/AppNavbar'

export const HomePage: FC = () => {
  return (
    <>
      <AppNavbar />
      <Banner>
        <div className="flex flex-col bg-gray-50 p-4 md:flex-row">
          <div className="mb-4 md:mb-0 md:mr-4">
            <h2 className="mb-1 text-base font-semibold text-gray-900">
              Welcome!
            </h2>
            <p className="flex text-sm font-normal text-gray-500">
              This is the home page.
            </p>
          </div>
        </div>
      </Banner>
    </>
  )
}
