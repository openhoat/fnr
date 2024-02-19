import { Navbar } from 'flowbite-react'
import type { FC } from 'react'
import { useContext } from 'react'

import { AuthContext } from '../providers/AuthProvider'
import { AppNavLink } from './AppNavLink'

export const AppNavbar: FC = () => {
  const authContext = useContext(AuthContext)
  return (
    <Navbar fluid>
      <Navbar.Brand href="/app">
        <span
          id="brandText"
          className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
        >
          Node React TS Demo
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <AppNavLink to={'/app'} text={'Home'} />
        <AppNavLink id="aboutNavLink" to={'/app/about'} text={'About'} />
        {authContext.authenticated ? (
          <>
            <AppNavLink id="configNavLink" to={'/app/config'} text={'Config'} />
            <AppNavLink
              id="signOutNavLink"
              to={'/app/sign-out'}
              text={'Sign out'}
            />
          </>
        ) : (
          <AppNavLink id="signInNavLink" to={'/app/sign-in'} text={'Sign in'} />
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}
