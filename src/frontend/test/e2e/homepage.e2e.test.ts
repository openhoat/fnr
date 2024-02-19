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
      const signInNavLink = '#signInNavLink'
      const signOutNavLink = '#signOutNavLink'
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
      test('should sign in', async () => {
        // Given
        await page.waitForSelector(signInNavLink)
        // When
        await page.click(signInNavLink)
        await page.type('#username', 'johndoe')
        await page.type('#password', 'MyBigSecret')
        await page.click('#signInSubmit')
        // Then
        await page.waitForSelector(signOutNavLink)
        await page.waitForSelector('#configNavLink')
        await page.waitForSelector('#aboutNavLink')
      })
      test('should sign out', async () => {
        // Given
        await page.waitForSelector(brandTextSelector)
        await page.click(signInNavLink)
        await page.type('#username', 'johndoe')
        await page.type('#password', 'MyBigSecret')
        await page.click('#signInSubmit')
        await page.waitForSelector(signOutNavLink)
        // When
        await page.click(signOutNavLink)
        // Then
        await page.waitForSelector(signInNavLink)
      })
    })
  })
})
