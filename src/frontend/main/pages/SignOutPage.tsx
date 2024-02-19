import { Banner } from 'flowbite-react'
import type { FC } from 'react'
import { useCallback, useContext, useEffect } from 'react'

import { AppNavbar } from '../components/AppNavbar'
import { AuthContext } from '../providers/AuthProvider'
import { fetchJson } from '../util/fetch-json'

export const SignOutPage: FC = () => {
  const { setAuthenticated } = useContext(AuthContext)
  const fetchSignOut = useCallback(async () => {
    await fetchJson('/auth/sign-out', {
      method: 'post',
    })
  }, [])
  useEffect(() => {
    void fetchSignOut().then(() => {
      setAuthenticated(false)
    })
  }, [fetchSignOut, setAuthenticated])
  return (
    <>
      <AppNavbar />
      <Banner>
        <div className="left-0 top-0 z-50 flex w-full flex-col justify-between border-b border-gray-200 bg-gray-50 p-4 md:flex-row">
          <div className="mb-4 md:mb-0 md:mr-4">
            <h2 className="mb-1 text-base font-semibold text-gray-900">
              Sign out
            </h2>
            <p className="flex items-center text-sm font-normal text-gray-500">
              You are now logged out.
            </p>
          </div>
        </div>
      </Banner>
    </>
  )
}
