import { useQuery } from '@apollo/client'
import { Banner, Card, List, ListItem } from 'flowbite-react'
import type { FC, ReactNode } from 'react'
import { Fragment } from 'react'

import { aboutQuery } from '../../../common/graphql/queries/about.query'
import { AppNavbar } from '../components/AppNavbar'
import { renderError, renderLoading } from '../util/renderers'

interface About {
  version: string
}

const AboutData: FC = () => {
  const { data, loading, error } = useQuery<{ about: About }>(aboutQuery, {})
  const about: Partial<About> = {
    version: data?.about.version,
  }
  const renderData = (): ReactNode => {
    return <ListItem>Version: {about.version}</ListItem>
  }
  return (
    <Card className="w-96">
      <List key={'configItems'}>
        {loading ? renderLoading() : renderData()}
        {error && renderError(error)}
      </List>
    </Card>
  )
}

export const AboutPage: FC = () => (
  <>
    <AppNavbar />
    <Banner>
      <div className="left-0 top-0 z-50 flex w-full flex-col justify-between border-b border-gray-200 bg-gray-50 p-4 md:flex-row">
        <div className="mb-4 md:mb-0 md:mr-4">
          <h2 className="mb-1 text-base font-semibold text-gray-900">About</h2>
          <div className="flex items-center text-sm font-normal text-gray-500">
            <Fragment>
              <AboutData />
            </Fragment>
          </div>
        </div>
      </div>
    </Banner>
  </>
)
