import findRoot from 'find-root'

export const findNearestBaseDir = (from = __dirname) => {
  try {
    return findRoot(from)
  } catch {
    return undefined
  }
}

export default findNearestBaseDir() ?? process.cwd()
