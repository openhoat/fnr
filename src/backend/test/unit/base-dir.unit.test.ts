import { resolve } from 'node:path'

import { when } from 'jest-when'

import { findNearestBaseDir } from '../../main/base-dir'

describe('backend unit tests', () => {
  describe('base dir', () => {
    let findRootMock: jest.Mock
    let baseDir: string
    beforeEach(() => {
      findRootMock = jest.fn()
      jest.doMock('find-root', () => findRootMock)
    })
    afterEach(() => {
      jest.resetModules()
    })
    describe('findNearestBaseDir', () => {
      test('should return project dir given src dir', () => {
        // Given
        const srcDir = resolve(__dirname, '..', '..', '..')
        const expectedResult = resolve(srcDir, '..')
        // When
        const result = findNearestBaseDir(srcDir)
        // Then
        expect(result).toBe(expectedResult)
      })
    })
    test('should return current dir given failed while trying to find root', () => {
      // Given
      const baseDirDirname = resolve(__dirname, '..', '..', 'main')
      const expectedBaseDir = process.cwd()
      when(findRootMock)
        .calledWith(baseDirDirname)
        .mockImplementation(() => {
          throw new Error('oops')
        })
      // When
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      baseDir = (require('../../main/base-dir') as { default: string }).default
      // Then
      expect(findRootMock).toHaveBeenCalledWith(baseDirDirname)
      expect(baseDir).toBe(expectedBaseDir)
    })
  })
})
