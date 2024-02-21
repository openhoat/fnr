import { when } from 'jest-when'

import { startApp } from '../../main/application/starter'

describe('backend unit tests', () => {
  describe('index', () => {
    let withCluster: jest.SpyInstance
    let bootstrap: () => Promise<void>
    beforeAll(() => {
      withCluster = jest.fn()
      jest.doMock('../../main/util/cluster-helper', () => ({ withCluster }))
      // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
      bootstrap = require('../../main/index.ts').bootstrap
    })
    afterEach(() => {
      jest.resetAllMocks()
    })
    afterAll(() => {
      jest.restoreAllMocks()
    })
    test('should call starter with cluster', async () => {
      // When
      await bootstrap()
      // Then
      expect(withCluster).toHaveBeenCalledWith(startApp)
      expect(withCluster).toHaveBeenCalledTimes(1)
    })
    test('should exit given failed to call starter with cluster', async () => {
      // When
      const processExitMock = jest.spyOn(process, 'exit').mockImplementation()
      when(withCluster)
        .calledWith(startApp)
        .mockRejectedValue(new Error('oops'))
      await bootstrap()
      // Then
      expect(withCluster).toHaveBeenCalledWith(startApp)
      expect(withCluster).toHaveBeenCalledTimes(1)
      expect(processExitMock).toHaveBeenCalledWith(1)
      expect(processExitMock).toHaveBeenCalledTimes(1)
    })
  })
})
