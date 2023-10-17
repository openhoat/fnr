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
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Node React TypeScript Demo
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <AppNavLink to={'/app'} text={'Home'} />
        <AppNavLink to={'/app/config'} text={'Config'} />
        <AppNavLink to={'/app/about'} text={'About'} />
        {authContext.authenticated ? (
          <AppNavLink to={'/app/sign-out'} text={'Sign out'} />
        ) : (
          <AppNavLink to={'/app/sign-in'} text={'Sign in'} />
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}
