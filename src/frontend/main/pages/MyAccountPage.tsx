import { Banner, Card, List, ListItem } from 'flowbite-react'
import type { FC, ReactNode } from 'react'
import { Fragment, useCallback, useEffect, useState } from 'react'

import { AppNavbar } from '../components/AppNavbar'
import { fetchJson } from '../util/fetch-json'
import { renderError, renderLoading } from '../util/renderers'

interface User {
  email: string
  username: string
}

export const MyAccountPage: FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [hasError, setError] = useState<boolean>(false)
  const [data, setData] = useState<User>()
  const fetchMyAccount = useCallback(async () => {
    setLoading(true)
    try {
      const responseData = await fetchJson<User>('/api/v1/users/me', {
        credentials: 'same-origin',
      })
      setData(responseData)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])
  useEffect(() => {
    void fetchMyAccount()
  }, [fetchMyAccount])
  const renderData = (): ReactNode => {
    return (
      <Card className="w-96">
        <List>
          <ListItem>Username: {data?.username}</ListItem>
          <ListItem>Email: {data?.email}</ListItem>
        </List>
      </Card>
    )
  }
  return (
    <>
      <AppNavbar />
      <Banner>
        <div className="left-0 top-0 z-50 flex w-full flex-col justify-between border-b border-gray-200 bg-gray-50 p-4 md:flex-row">
          <div className="mb-4 md:mb-0 md:mr-4">
            <h2 className="mb-1 text-base font-semibold text-gray-900">
              My account
            </h2>
            <div className="flex items-center text-sm font-normal text-gray-500">
              <Fragment>
                {isLoading ? renderLoading() : renderData()}
                {hasError && renderError()}
              </Fragment>
            </div>
          </div>
        </div>
      </Banner>
    </>
  )
}
