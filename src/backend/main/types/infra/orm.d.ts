export interface Orm {
  start: () => Promise<void>
  stop: () => Promise<void>
}
