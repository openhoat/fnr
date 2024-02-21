import '@testing-library/jest-dom'

import React from 'react'

import type { ExpectExtensionable } from './backend/test/types/jest-custom'

global.React = React

const expectExtension: ExpectExtensionable = {
  async toBeRejectedWith(promise: Promise<unknown>, opt?) {
    try {
      await promise
    } catch (error) {
      handleError(error, opt)
      return {
        message: () => 'promise is rejected with expected error',
        pass: true,
      }
    }
    return { message: () => 'promise is not rejected', pass: false }
  },
  toHaveFailedWith(fn: () => void, opt?) {
    try {
      fn()
    } catch (error) {
      handleError(error, opt)
      return { message: () => 'function thrown expected error', pass: true }
    }
    return { message: () => 'function did not throw any error', pass: false }
  },
}

const handleError = (error: unknown, opt?: ErrorMatcherOptions): void => {
  if (typeof opt === 'function') {
    opt(error)
    return
  }
  if (opt?.error) {
    expect(error).toBe(opt.error)
    return
  }
  if (opt?.type) {
    expect(error).toBeInstanceOf(opt.type)
  }
  if (opt?.message) {
    if (typeof opt.message === 'string') {
      expect(error).toHaveProperty('message', opt.message)
    } else {
      expect(error).toMatchObject({
        message: `${expect.stringMatching(opt.message)}`,
      })
    }
  }
  if (opt?.handler) {
    opt.handler(error)
  }
}

expect.extend(expectExtension)
