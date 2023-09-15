import type { FC } from 'react'
import { useCallback, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../providers/AuthProvider'
import styles from '../styles/HomePage.module.scss'
import { getBaseUrl } from '../util/helper'

export const SignOutPage: FC = () => {
  const { setAuthenticated } = useContext(AuthContext)
  const fetchSignOut = useCallback(async () => {
    await fetch(`${getBaseUrl()}/auth/signout`, {
      method: 'post',
    })
  }, [])
  useEffect(() => {
    void fetchSignOut().then(() => {
      setAuthenticated(false)
    })
  }, [fetchSignOut, setAuthenticated])
  return (
    <div className={styles.container}>
      <h1 className={styles.welcome}>Sign out</h1>
      <div className={styles.content}>You are now logged out!</div>
      <div className={styles.button}>
        <Link to="/app">
          <button>Accueil</button>
        </Link>
      </div>
    </div>
  )
}
