import Joi from 'joi'

import { validate } from '../../../main/util/schema-validator'

describe('backend unit tests', () => {
  describe('util', () => {
    describe('schema validator', () => {
      describe('validate', () => {
        test('should throw an error because given data is not valid with given schema', () => {
          // Given
          interface Data {
            foo: string
          }
          const data = { foo: 567 } as unknown as Data
          const schema: Joi.ObjectSchema<Data> = Joi.object({
            foo: Joi.string(),
          })
          // When
          const fn = (): Data => validate(data, schema)
          // Then
          expect(fn).toHaveFailedWith({ message: '"foo" must be a string' })
        })
      })
    })
  })
})
