import { Navbar } from 'flowbite-react'
import type { FC } from 'react'

import { AppNavLink } from './AppNavLink'

export const AppNavbar: FC = () => {
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
      </Navbar.Collapse>
    </Navbar>
  )
}
