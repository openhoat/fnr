import type { FC } from 'react'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from '../styles/HomePage.module.scss'
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
      const responseData: Data = await response.json()
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
  const renderError = () => {
    return <p>Error!</p>
  }
  const renderLoading = () => {
    return <p>Loading…</p>
  }
  const renderData = () => {
    return <p>Version: {data?.version}</p>
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.welcome}>About</h1>
      <div className={styles.content}>
        <Fragment>
          {isLoading ? renderLoading() : renderData()}
          {hasError && renderError()}
        </Fragment>
      </div>
      <div className={styles.button}>
        <Link to="/app">
          <button>Accueil</button>
        </Link>
      </div>
    </div>
  )
}
