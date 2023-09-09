import { useAtom } from 'jotai'
import type { FC } from 'react'
import { Suspense } from 'react'
import { Link } from 'react-router-dom'

import configAtom from '../atoms/config'
import styles from '../styles/HomePage.module.scss'

const ConfigData: FC = () => {
  const [config] = useAtom(configAtom)
  return (
    <ul>
      {Object.keys(config)
        .sort()
        .map((key, index) => (
          <li key={index}>
            {key}: {`${(config as unknown as Record<string, unknown>)[key]}`}
          </li>
        ))}
    </ul>
  )
}

export const ConfigPage: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.welcome}>Config</h1>
      <div className={styles.content}>
        <Suspense fallback={<h3>Loading…</h3>}>
          <ConfigData />
        </Suspense>
      </div>
      <div className={styles.button}>
        <Link to="/app">
          <button>Accueil</button>
        </Link>
      </div>
    </div>
  )
}
