import { Banner } from 'flowbite-react'
import type { FC, ReactNode } from 'react'
import { Fragment, useCallback, useEffect, useState } from 'react'

import { AppNavbar } from '../components/AppNavbar'
import { getBaseUrl } from '../util/helper'

interface Data {
  version: string
}

export const AboutPage: FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [hasError, setError] = useState<boolean>(false)
  const [data, setData] = useState<Data>()
  const fetchAbout = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${getBaseUrl()}/api/v1/about`, {
        credentials: 'same-origin',
      })
      const responseData = (await response.json()) as Data
      setData(responseData)
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])
  useEffect(() => {
    void fetchAbout()
  }, [fetchAbout])
  const renderError = (): ReactNode => {
    return <>Error!</>
  }
  const renderLoading = (): ReactNode => {
    return <>Loading…</>
  }
  const renderData = (): ReactNode => {
    return <>Version: {data?.version}</>
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
            <p className="flex items-center text-sm font-normal text-gray-500">
              <Fragment>
                {isLoading ? renderLoading() : renderData()}
                {hasError && renderError()}
              </Fragment>
            </p>
          </div>
        </div>
      </Banner>
    </>
  )
}
