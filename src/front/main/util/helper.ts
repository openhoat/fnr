export const getBaseUrl = () => {
  const { location } = window
  return `${location.protocol}//${location.host}`
}
