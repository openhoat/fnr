import type { FastifyInstance } from 'fastify'
import type { Browser, BrowserLaunchArgumentOptions, Page } from 'puppeteer'
import puppeteer from 'puppeteer'

import server from '../../../back/main/server'

const ci = process.env.CI === 'true'

describe('frontend tests', () => {
  describe('frontend e2e tests', () => {
    describe('Home page', () => {
      let baseUrl: string
      let fastify: FastifyInstance
      let browser: Browser
      let page: Page
      const brandTextSelector = '#brandText'
      const signInNavLink = '#signInNavLink'
      const signOutNavLink = '#signOutNavLink'
      beforeAll(async () => {
        process.env.NODE_ENV = 'production'
        fastify = server.init()
        await server.configure(fastify)
        baseUrl = await server.start(fastify)
      })
      beforeEach(async () => {
        const headless: BrowserLaunchArgumentOptions['headless'] = ci
          ? 'new'
          : false
        browser = await puppeteer.launch({ headless })
        page = await browser.newPage()
        await page.goto(`${baseUrl}/app`)
      })
      afterEach(async () => {
        await browser.close()
      })
      afterAll(async () => {
        await server.stop(fastify)
      })
      test('should contain the brand text', async () => {
        await page.waitForSelector(brandTextSelector)
        const text = await page.$eval(brandTextSelector, (e) => e.textContent)
        expect(text).toContain('Node React TypeScript Demo')
      })
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
