export const getBaseUrl = (): string => {
  const { location } = window
  return `${location.protocol}//${location.host}`
}
