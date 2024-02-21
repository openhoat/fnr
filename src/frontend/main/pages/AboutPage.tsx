import { Banner, Card, List, ListItem } from 'flowbite-react'
import type { FC, ReactNode } from 'react'
import { Fragment, useCallback, useEffect, useState } from 'react'

import { AppNavbar } from '../components/AppNavbar'
import { fetchJson } from '../util/fetch-json'
import { renderError, renderLoading } from '../util/renderers'

interface About {
  version: string
}

export const AboutPage: FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [hasError, setError] = useState<boolean>(false)
  const [data, setData] = useState<About>()
  const fetchAbout = useCallback(async () => {
    setLoading(true)
    try {
      const responseData = await fetchJson<About>('/api/v1/about', {
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
    void fetchAbout()
  }, [fetchAbout])
  const renderData = (): ReactNode => {
    return (
      <Card className="w-96">
        <List>
          <ListItem>Version: {data?.version}</ListItem>
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
              About
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
