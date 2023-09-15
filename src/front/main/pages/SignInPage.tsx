import type { FC, SyntheticEvent } from 'react'
import { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { AuthContext } from '../providers/AuthProvider'
import styles from '../styles/HomePage.module.scss'
import { getBaseUrl } from '../util/helper'

export const SignInPage: FC = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext)
  const navigateTo = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const fetchToken = async (username: string, password: string) => {
    await fetch(`${getBaseUrl()}/auth/signin`, {
      body: JSON.stringify({ password, username }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
    })
    setAuthenticated(true)
  }
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    void fetchToken(username, password).then(() => {
      navigateTo(-2)
    })
  }
  return (
    <>
      {authenticated ? (
        <Navigate to={'/app'} replace={false} />
      ) : (
        <div className={styles.container}>
          <h1 className={styles.welcome}>Sign in</h1>
          <div className={styles.content}>
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
              <label>
                <p>Username</p>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <label>
                <p>Password</p>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
