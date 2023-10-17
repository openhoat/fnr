const savedEnv: Record<string, string | undefined> = {}

const deleteEnvVars: (...names: string[]) => void = (...names) => {
  names.forEach((name) => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete process.env[name]
  })
}

const restoreEnvVars: (...names: string[]) => void = (...names) => {
  deleteEnvVars(...names)
  Object.keys(savedEnv).forEach((name) => {
    process.env[name] = savedEnv[name]
  })
}

const saveEnvVars: (...names: string[]) => void = (...names) => {
  Object.keys(process.env)
    .filter((name) => !names.length || names.includes(name))
    .forEach((name) => {
      savedEnv[name] = process.env[name]
    })
}

export { deleteEnvVars, restoreEnvVars, saveEnvVars }
