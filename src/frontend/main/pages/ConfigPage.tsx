import { useQuery } from '@apollo/client'
import { Banner, Card, List, ListItem } from 'flowbite-react'
import type { FC, ReactNode } from 'react'
import { Fragment } from 'react'

import { configQuery } from '../../../common/graphql/queries/config.query'
import { AppNavbar } from '../components/AppNavbar'
import { renderError, renderLoading } from '../util/renderers'

type Config = Record<string, boolean | number | string | null>

const ConfigData: FC = () => {
  const { data, loading, error } = useQuery<{ config: Config }>(configQuery)
  const config: Partial<Config> = {
    corsOrigin: data?.config.corsOrigin,
    isDevelopment: data?.config.isDevelopment,
    logLevel: data?.config.logLevel,
  }
  const renderData = (): ReactNode =>
    Object.keys(config)
      .sort((key1, key2) => key1.localeCompare(key2))
      .map((key, index) => (
        <ListItem key={`configItem${index}`}>
          {key}: {`${(config as unknown as Record<string, string>)[key]}`}
        </ListItem>
      ))
  return (
    <Card className="w-96">
      <List key={'configItems'}>
        {loading ? renderLoading() : renderData()}
        {error && renderError(error)}
      </List>
    </Card>
  )
}

export const ConfigPage: FC = () => (
  <>
    <AppNavbar />
    <Banner>
      <div className="left-0 top-0 z-50 flex w-full flex-col justify-between border-b border-gray-200 bg-gray-50 p-4 md:flex-row">
        <div className="mb-4 md:mb-0 md:mr-4">
          <h2 className="mb-1 text-base font-semibold text-gray-900">
            Configuration
          </h2>
          <div className="flex items-center text-sm font-normal text-gray-500">
            <Fragment>
              <ConfigData />
            </Fragment>
          </div>
        </div>
      </div>
    </Banner>
  </>
)
