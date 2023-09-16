import { Banner, ListGroup } from 'flowbite-react'
import { useAtom } from 'jotai'
import type { FC } from 'react'
import { Suspense } from 'react'

import configAtom from '../atoms/config'
import { AppNavbar } from '../components/AppNavbar'

const ConfigData: FC = () => {
  const [config] = useAtom(configAtom)
  return (
    <ListGroup key={'configItems'}>
      {Object.keys(config)
        .sort()
        .map((key, index) => (
          <ListGroup.Item key={`configItem${index}`}>
            {key}: {`${(config as unknown as Record<string, unknown>)[key]}`}
          </ListGroup.Item>
        ))}
    </ListGroup>
  )
}

export const ConfigPage: FC = () => {
  return (
    <>
      <AppNavbar />
      <Banner>
        <div className="left-0 top-0 z-50 flex w-full flex-col justify-between border-b border-gray-200 bg-gray-50 p-4 md:flex-row">
          <div className="mb-4 md:mb-0 md:mr-4">
            <h2 className="mb-1 text-base font-semibold text-gray-900">
              Configuration
            </h2>
            <Suspense fallback={<h3>Loading…</h3>}>
              <ConfigData />
            </Suspense>
          </div>
        </div>
      </Banner>
    </>
  )
}
