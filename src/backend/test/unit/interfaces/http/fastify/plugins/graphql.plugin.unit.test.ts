import type { GraphQLResolveInfo } from 'graphql/index'
import type { MercuriusContext } from 'mercurius'

import { applyPolicy } from '../../../../../../main/interfaces/http/fastify/plugins/graphql.plugin'

describe('backend unit tests', () => {
  describe('interfaces', () => {
    describe('http', () => {
      describe('fastify', () => {
        describe('plugins', () => {
          describe('graphql plugin', () => {
            describe('applyPolicy', () => {
              test('should return true given user in context is matching the policy', async () => {
                // Given
                const policy = { arguments: [{ value: { value: 'user' } }] }
                const parent = {}
                const args = {}
                const user = { role: 'user' }
                const context = { auth: { user } } as MercuriusContext
                const info = {} as GraphQLResolveInfo
                // When
                const result = await applyPolicy(
                  policy,
                  parent,
                  args,
                  context,
                  info,
                )
                // Then
                expect(result).toBe(true)
              })
              test('should throw an unauthorized error given context does not provide auth', async () => {
                // Given
                const policy = { arguments: [{ value: { value: 'user' } }] }
                const parent = {}
                const args = {}
                const context = {} as MercuriusContext
                const info = {} as GraphQLResolveInfo
                // When
                const promise = applyPolicy(policy, parent, args, context, info)
                // Then
                await expect(promise).toBeRejectedWith({
                  message: 'Unauthorized',
                })
              })
            })
          })
        })
      })
    })
  })
})
