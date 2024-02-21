import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const getPackageVersion = async (baseDir: string): Promise<string> => {
  const { version } = JSON.parse(
    await readFile(join(baseDir, 'package.json'), 'utf8'),
  ) as { version: string }
  return version
}

export { getPackageVersion }
