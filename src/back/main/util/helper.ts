export const isKey = <T extends object>(o: T, k: PropertyKey): k is keyof T => {
  return k in o
}
