import type { Browser, Page } from 'puppeteer'
import puppeteer from 'puppeteer'

import { startApp } from '../../../backend/main/application/starter'
import type { IocContainer } from '../../../backend/main/types/application/ioc'
import {
  restoreEnvVars,
  saveEnvVars,
} from '../../../backend/test/util/env-utils'
import { headless } from './headless'

describe('frontend tests', () => {
  describe('frontend e2e tests', () => {
    describe('Home page', () => {
      let baseUrl: string
      let iocContainer: IocContainer
      let browser: Browser
      let page: Page
      const brandTextSelector = '#brandText'
      beforeAll(async () => {
        saveEnvVars('NODE_ENV')
        process.env.NODE_ENV = 'production'
        iocContainer = await startApp()
        if (!iocContainer.httpServer.baseUrl) {
          throw new Error(
            'Http server has no base URL: may be due to an error while starting',
          )
        }
        baseUrl = iocContainer.httpServer.baseUrl
      })
      beforeEach(async () => {
        browser = await puppeteer.launch({ headless })
        page = await browser.newPage()
        await page.goto(`${baseUrl}/app`)
      })
      afterEach(async () => {
        await browser.close()
      })
      afterAll(async () => {
        await iocContainer.httpServer.stop()
        restoreEnvVars('NODE_ENV')
      })
      test('should contain the brand text', async () => {
        await page.waitForSelector(brandTextSelector)
        const text = await page.$eval(brandTextSelector, (e) => e.textContent)
        expect(text).toContain('Node React TS Demo')
      }, 10_000)
    })
  })
})
