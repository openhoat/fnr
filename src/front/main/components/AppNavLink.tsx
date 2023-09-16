import { Navbar } from 'flowbite-react'
import type { FC } from 'react'
import { useLinkClickHandler, useLocation } from 'react-router-dom'

export interface AppNavLinkProps {
  to: string
  text: string
}

export const AppNavLink: FC<AppNavLinkProps> = (props: AppNavLinkProps) => {
  const location = useLocation()
  const clickHandler = useLinkClickHandler(props.to)
  return (
    <span onClick={clickHandler}>
      <Navbar.Link href={props.to} active={location.pathname === props.to}>
        {props.text}
      </Navbar.Link>
    </span>
  )
}
