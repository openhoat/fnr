/* eslint-disable sonarjs/no-duplicate-string */
describe('backend unit tests', () => {
  describe('util', () => {
    describe('url helper', () => {
      describe('toLocalhostIfLinux', () => {
        let processPlatform: string
        let toLocalhostIfLinux: (address: string) => string
        type TestCase = [string, string, string]
        const testCases: TestCase[] = [
          ['http://localhost', 'windows', 'http://localhost'],
          ['http://local.io', 'windows', 'http://local.io'],
          ['http://127.0.0.1', 'windows', 'http://127.0.0.1'],
          ['http://localhost', 'linux', 'http://localhost'],
          ['http://local.io', 'linux', 'http://local.io'],
          ['http://localhost', 'linux', 'http://127.0.0.1'],
        ]
        beforeAll(() => {
          processPlatform = process.platform
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const urlHelper = require('../../../main/util/url-helper') as {
            toLocalhostIfLinux: typeof toLocalhostIfLinux
          }
          toLocalhostIfLinux = urlHelper.toLocalhostIfLinux
        })
        afterAll(() => {
          Object.defineProperty(process, 'platform', {
            value: processPlatform,
          })
        })
        test.each(testCases)(
          'should return "%s" given platform is "%s" and address "%s"',
          (expected: string, platform: string, address: string) => {
            // Given
            Object.defineProperty(process, 'platform', {
              value: platform,
            })
            // When
            const result = toLocalhostIfLinux(address)
            // Then
            expect(result).toStrictEqual(expected)
          },
        )
      })
    })
  })
})
