import type React from 'react'
import { Link } from 'react-router-dom'

import styles from '../styles/HomePage.module.scss'

export const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.welcome}>Bienvenue</h1>
      <div className={styles.content}>
        Bienvenue sur la page d&lsquo;accueil !
      </div>
      <div className={styles.button}>
        <Link to="hello">
          <button>Hello</button>
        </Link>
        <Link to="about">
          <button>About</button>
        </Link>
      </div>
    </div>
  )
}
