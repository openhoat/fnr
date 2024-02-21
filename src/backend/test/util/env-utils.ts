const savedEnv: Record<string, string | undefined> = {}

const deleteEnvVars: (...names: string[]) => void = (...names) => {
  for (const name of names) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete process.env[name]
  }
}

const restoreEnvVars: (...names: string[]) => void = (...names) => {
  deleteEnvVars(...names)
  for (const name in savedEnv) {
    process.env[name] = savedEnv[name]
  }
}

const saveEnvVars: (...names: string[]) => void = (...names) => {
  for (const name in process.env) {
    if (names.length > 0 && !names.includes(name)) {
      continue
    }
    savedEnv[name] = process.env[name]
  }
}

export { deleteEnvVars, restoreEnvVars, saveEnvVars }
