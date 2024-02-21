import baseDir from '../../../../main/base-dir'
import { getPackageVersion } from '../../../../main/util/package-version'
import { getTestCase, registerHooks } from '../../util/server-test-hooks'

describe('backend tests', () => {
  describe('backend server e2e tests', () => {
    registerHooks()
    describe('GET /api/v1/about', () => {
      test('should respond an object including version', async () => {
        // Given
        const expectedVersion = await getPackageVersion(baseDir)
        const testCase = getTestCase()
        await testCase
          .step('Get about')
          .spec()
          // When
          .get('/api/v1/about')
          // Then
          .expectStatus(200)
          .expectJsonLike({
            version: expectedVersion,
          })
          .toss()
      })
    })
  })
})
