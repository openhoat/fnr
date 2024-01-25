import { Button, Label, TextInput } from 'flowbite-react'
import type { FC, SyntheticEvent } from 'react'
import { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { AppNavbar } from '../components/AppNavbar'
import { AuthContext } from '../providers/AuthProvider'
import { getBaseUrl } from '../util/helper'

export const SignInPage: FC = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext)
  const navigateTo = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const fetchToken = async (
    username: string,
    password: string,
  ): Promise<void> => {
    await fetch(`${getBaseUrl()}/auth/sign-in`, {
      body: JSON.stringify({ password, username }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
    })
    setAuthenticated(true)
  }
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault()
    void fetchToken(username, password).then(() => {
      navigateTo('/app')
    })
  }
  return (
    <>
      <AppNavbar />
      {authenticated ? (
        <Navigate to={'/app'} replace={false} />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-4 max-w-md gap-4"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Your username" />
            </div>
            <TextInput
              id="username"
              placeholder="myusername"
              required
              type="string"
              value={username}
              onChange={(e): void => {
                setUsername(e.target.value)
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              required
              type="password"
              value={password}
              onChange={(e): void => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <Button id="signInSubmit" type="submit">
            Submit
          </Button>
        </form>
      )}
    </>
  )
}
