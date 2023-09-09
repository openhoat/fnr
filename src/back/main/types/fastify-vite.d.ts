declare module '@fastify/vite' {
  import type { FastifyPluginCallback } from 'fastify'
  export default function plugin(): FastifyPluginCallback
  export type FastifyViteOptions = {
    dev: boolean
    root: string
    spa?: boolean
  }
}
