import type { FC } from 'react'
import { Link } from 'react-router-dom'

import styles from '../styles/HomePage.module.scss'

export const HelloPage: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.welcome}>Hello</h1>
      <div className={styles.content}>World !</div>
      <div className={styles.button}>
        <Link to="/app">
          <button>Accueil</button>
        </Link>
      </div>
    </div>
  )
}
