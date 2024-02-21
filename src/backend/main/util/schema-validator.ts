import type Joi from 'joi'

export const validate = <T>(data: T, schema: Joi.ObjectSchema<T>): T => {
  const validationResult = schema.validate(data)
  const { error } = validationResult
  if (error) {
    throw new Error(error.message)
  }
  const { value } = validationResult
  return value
}
