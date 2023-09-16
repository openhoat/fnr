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
      <AppNavbar />
      {authenticated ? (
        <Navigate to={'/app'} replace={false} />
      ) : (
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
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
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      )}
    </>
  )
}
