import { Navbar } from 'flowbite-react'
import type { FC } from 'react'
import { useLinkClickHandler, useLocation } from 'react-router-dom'

export interface AppNavLinkProps {
  id?: string
  text: string
  to: string
}

export const AppNavLink: FC<AppNavLinkProps> = (props: AppNavLinkProps) => {
  const location = useLocation()
  const clickHandler = useLinkClickHandler(props.to)
  return (
    <span onClick={clickHandler}>
      <Navbar.Link
        id={props.id}
        href={props.to}
        active={location.pathname === props.to}
      >
        {props.text}
      </Navbar.Link>
    </span>
  )
}
